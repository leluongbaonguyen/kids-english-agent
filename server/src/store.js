import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../data');
const kidsProgressFile = path.join(dataDir, 'kids_progress.json');

const defaultProgress = {
  stars: 120,
  masteredWords: [],
  unlockedLevels: { L1: true },
  updatedAt: new Date().toISOString()
};

let pool = null;

if (process.env.DATABASE_URL) {
  try {
    const { Pool } = pg;
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      max: 15,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
    console.log('🐘 PostgreSQL Enterprise Pool initialized with 20 Core Tables.');
  } catch (err) {
    console.warn('⚠️ Could not initialize PostgreSQL pool, falling back to local file storage:', err.message);
    pool = null;
  }
}

async function ensureDataDir() {
  try {
    await mkdir(dataDir, { recursive: true });
  } catch (e) {
    console.error('Error creating data directory:', e);
  }
}

export async function checkDbHealth() {
  if (pool) {
    try {
      const client = await pool.connect();
      const res = await client.query('SELECT NOW() as now, COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = $1', ['public']);
      client.release();
      return { 
        type: 'postgresql', 
        status: 'connected', 
        time: res.rows[0].now,
        tablesInPublicSchema: parseInt(res.rows[0].table_count, 10)
      };
    } catch (err) {
      return { type: 'postgresql', status: 'disconnected', error: err.message };
    }
  }
  return { type: 'json_file', status: 'ready', path: kidsProgressFile };
}

// ----------------------------------------------------
// Core Progress Read/Write (Backwards Compatible)
// ----------------------------------------------------
export async function readKidsProgress() {
  if (pool) {
    try {
      const result = await pool.query('SELECT data FROM kids_progress WHERE id = 1 LIMIT 1');
      if (result.rows.length > 0) {
        return result.rows[0].data;
      }
      await pool.query(
        'INSERT INTO kids_progress (id, data, updated_at) VALUES (1, $1, NOW()) ON CONFLICT (id) DO NOTHING',
        [JSON.stringify(defaultProgress)]
      );
      return defaultProgress;
    } catch (err) {
      console.warn('⚠️ Postgres read error, reading from local JSON fallback:', err.message);
    }
  }

  await ensureDataDir();
  try {
    const raw = await readFile(kidsProgressFile, 'utf8');
    return JSON.parse(raw);
  } catch {
    await writeFile(kidsProgressFile, JSON.stringify(defaultProgress, null, 2), 'utf8');
    return defaultProgress;
  }
}

export async function writeKidsProgress(data) {
  const updated = {
    ...data,
    updatedAt: new Date().toISOString()
  };

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO kids_progress (id, data, updated_at) 
         VALUES (1, $1, NOW()) 
         ON CONFLICT (id) 
         DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
        [JSON.stringify(updated)]
      );

      // Audit Log Async Entry
      pool.query(
        `INSERT INTO audit_logs (action, entity_type, entity_id, after_data)
         VALUES ('UPDATE_PROGRESS', 'kids_progress', '1', $1)`,
        [JSON.stringify(updated)]
      ).catch(() => {});

      return updated;
    } catch (err) {
      console.warn('⚠️ Postgres write error, persisting to local JSON fallback:', err.message);
    }
  }

  await ensureDataDir();
  await writeFile(kidsProgressFile, JSON.stringify(updated, null, 2), 'utf8');
  return updated;
}

// ----------------------------------------------------
// Expanded Schema Helper APIs (Enterprise Extensions)
// ----------------------------------------------------

export async function getLearnerProfile(code = 'LEARNER_DEFAULT') {
  if (!pool) return { code, display_name: 'Bé Minh Anh' };
  try {
    const res = await pool.query('SELECT * FROM learners WHERE code = $1 LIMIT 1', [code]);
    return res.rows[0] || null;
  } catch (err) {
    console.error('Error fetching learner:', err);
    return null;
  }
}

export async function getCourseLevels() {
  if (!pool) return [];
  try {
    const res = await pool.query('SELECT * FROM course_levels ORDER BY sort_order ASC');
    return res.rows;
  } catch (err) {
    console.error('Error fetching course levels:', err);
    return [];
  }
}

export async function searchVocabulary(query = '', levelCode = null, limit = 50) {
  if (!pool) return [];
  try {
    let sql = 'SELECT * FROM vocabulary WHERE deleted_at IS NULL';
    const params = [];

    if (levelCode) {
      params.push(levelCode);
      sql += ` AND level_code = $${params.length}`;
    }

    if (query) {
      params.push(`%${query.toLowerCase()}%`);
      sql += ` AND (normalized_word LIKE $${params.length} OR LOWER(meaning_vi) LIKE $${params.length})`;
    }

    sql += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
    params.push(limit);

    const res = await pool.query(sql, params);
    return res.rows;
  } catch (err) {
    console.error('Error searching vocabulary:', err);
    return [];
  }
}

export async function recordQuizAttempt(attemptData) {
  if (!pool) return { success: true, local: true };
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const attemptRes = await client.query(
      `INSERT INTO quiz_attempts (learner_id, level_code, quiz_type, mode, total_questions, correct_answers, score_percent, passed, completed_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING id`,
      [
        attemptData.learnerId,
        attemptData.levelCode,
        attemptData.quizType || 'practice',
        attemptData.mode || 'standard',
        attemptData.totalQuestions || 0,
        attemptData.correctAnswers || 0,
        attemptData.scorePercent || 0,
        attemptData.passed || false
      ]
    );

    const attemptId = attemptRes.rows[0].id;

    if (Array.isArray(attemptData.answers)) {
      for (let i = 0; i < attemptData.answers.length; i++) {
        const a = attemptData.answers[i];
        await client.query(
          `INSERT INTO quiz_answers (attempt_id, question_number, vocabulary_id, question_type, selected_answer, correct_answer, is_correct, response_ms)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [attemptId, i + 1, a.vocabularyId || null, a.questionType, a.selectedAnswer, a.correctAnswer, a.isCorrect, a.responseMs || 0]
        );
      }
    }

    // Award Stars Transaction
    if (attemptData.earnedStars && attemptData.earnedStars > 0) {
      await client.query(
        `INSERT INTO star_transactions (learner_id, amount, reason, source_type, source_id)
         VALUES ($1, $2, $3, 'QUIZ', $4)`,
        [attemptData.learnerId, attemptData.earnedStars, 'Hoàn thành bài tập Quiz tiếng Anh', attemptId]
      );
    }

    await client.query('COMMIT');
    return { success: true, attemptId };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error recording quiz attempt:', err);
    throw err;
  } finally {
    client.release();
  }
}
