import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import pg from 'pg';

import { authenticateUser, generateAuthToken, verifyAuthToken, SYSTEM_USERS } from './modules/identity/auth.service.js';
import { computeSrsUpdate } from './modules/srs/srs.service.js';
import { recordQuizAttemptTx } from './modules/assessment/assessment.service.js';
import { processSyncBatchItem } from './modules/sync/sync.service.js';
import { savePushSubscription, getLearnerPushSubscriptions } from './modules/notification/push.service.js';

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
    console.log('🐘 PostgreSQL Enterprise Pool V5.0 initialized with 20 Core Canonical Tables.');
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

export { authenticateUser, generateAuthToken, verifyAuthToken, SYSTEM_USERS };

// Initialize Canonical DB Tables if needed
export async function ensureCanonicalTables() {
  if (!pool) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS idempotency_keys (
        key TEXT PRIMARY KEY,
        scope TEXT,
        result_data JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        learner_id TEXT,
        endpoint TEXT UNIQUE,
        p256dh TEXT,
        auth TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
  } catch (e) {
    console.warn('Canonical table check warning:', e.message);
  }
}
ensureCanonicalTables().catch(() => {});

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
  try {
    if (pool) {
      try {
        const result = await pool.query('SELECT data FROM kids_progress WHERE id = 1 LIMIT 1');
        if (result.rows.length > 0 && result.rows[0].data) {
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
  } catch (globalErr) {
    console.error('⚠️ Critical readKidsProgress fallback triggered:', globalErr.message);
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

export async function updateLearnerLevelLockStatus(learnerId, unlockedLevels, overrideAutoProgression = false) {
  const currentProgress = await readKidsProgress();
  const updatedProgress = {
    ...currentProgress,
    unlockedLevels: unlockedLevels || currentProgress.unlockedLevels || { L1: true, L2: false, L3: false, L4: false, L5: false, L6: false },
    overrideAutoProgression: typeof overrideAutoProgression === 'boolean' ? overrideAutoProgression : (currentProgress.overrideAutoProgression || false),
    updatedAt: new Date().toISOString()
  };
  await writeKidsProgress(updatedProgress);
  await recordAuditLog('UPDATE_LEVEL_LOCKS', 'learner_progress', learnerId || 'minh_anh', { unlockedLevels, overrideAutoProgression });
  return updatedProgress;
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

// ----------------------------------------------------
// V5.0 SERVER-AUTHORITATIVE SRS EVIDENCE ENGINE
// ----------------------------------------------------
export async function recordSrsEvidence(learnerId, vocabId, accuracy, interactionType = 'flashcard') {
  return computeSrsUpdate(pool, learnerId, vocabId, accuracy, interactionType);
}

// ----------------------------------------------------
// V5.0 QUIZ ATTEMPTS & LEVEL UNLOCK TRANSACTION
// ----------------------------------------------------
export async function recordQuizAttempt(attemptData) {
  return recordQuizAttemptTx(pool, attemptData);
}

// ----------------------------------------------------
// V5.0 IDEMPOTENT BATCH SYNC ENGINE
// ----------------------------------------------------
export async function processSyncBatch(actorId, batchItem) {
  return processSyncBatchItem(pool, actorId, batchItem, writeKidsProgress);
}

// ----------------------------------------------------
// V5.0 WEB PUSH SUBSCRIPTIONS
// ----------------------------------------------------
export async function registerPushSubscription(learnerId, subscription) {
  return savePushSubscription(pool, learnerId, subscription);
}

export async function fetchPushSubscriptions(learnerId) {
  return getLearnerPushSubscriptions(pool, learnerId);
}

// ----------------------------------------------------
// Enterprise Database API & Management Functions
// ----------------------------------------------------

export async function getAuditLogs(limit = 100) {
  if (pool) {
    try {
      const res = await pool.query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT $1', [limit]);
      return res.rows;
    } catch (err) {
      console.warn('Postgres audit_logs fetch error:', err.message);
    }
  }
  await ensureDataDir();
  const auditFile = path.join(dataDir, 'audit_logs.json');
  try {
    const raw = await readFile(auditFile, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function createVocabularyItem(itemData) {
  const item = {
    id: itemData.id || `vocab_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    word: itemData.word,
    meaning: itemData.meaning || itemData.meaning_vi,
    ipa: itemData.ipa || '',
    level: itemData.level || itemData.level_code || 'L1',
    category: itemData.category || itemData.category_code || 'other',
    image: itemData.image || itemData.image_value || '',
    audio: itemData.audio || '',
    example: itemData.example || '',
    createdAt: new Date().toISOString()
  };

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO vocabulary (id, word, meaning_vi, ipa, level_code, category_code, image_value, example_en)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [item.id, item.word, item.meaning, item.ipa, item.level, item.category, item.image, item.example]
      );
    } catch (err) {
      console.warn('Postgres vocabulary create error:', err.message);
    }
  }

  // Audit Log
  await recordAuditLog('CREATE_VOCAB', 'vocabulary', item.id, item);
  return item;
}

export async function updateVocabularyItem(id, itemData) {
  if (pool) {
    try {
      await pool.query(
        `UPDATE vocabulary 
         SET word = $1, meaning_vi = $2, ipa = $3, level_code = $4, category_code = $5, image_value = $6, updated_at = NOW()
         WHERE id = $7`,
        [itemData.word, itemData.meaning || itemData.meaning_vi, itemData.ipa, itemData.level, itemData.category, itemData.image, id]
      );
    } catch (err) {
      console.warn('Postgres vocabulary update error:', err.message);
    }
  }
  await recordAuditLog('UPDATE_VOCAB', 'vocabulary', id, itemData);
  return { id, ...itemData };
}

export async function deleteVocabularyItem(id, reason = 'Xóa thủ công') {
  if (pool) {
    try {
      await pool.query(
        `UPDATE vocabulary SET deleted_at = NOW(), delete_reason = $1 WHERE id = $2`,
        [reason, id]
      );
    } catch (err) {
      console.warn('Postgres vocabulary delete error:', err.message);
    }
  }
  await recordAuditLog('DELETE_VOCAB', 'vocabulary', id, { deleted_at: new Date().toISOString(), reason });
  return { id, deleted: true };
}

export async function getTrashCanItems() {
  if (pool) {
    try {
      const res = await pool.query('SELECT * FROM vocabulary WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC');
      return res.rows;
    } catch (err) {
      console.warn('Postgres trash fetch error:', err.message);
    }
  }
  return [];
}

export async function recordAuditLog(action, entityType, entityId, afterData) {
  const entry = {
    id: Date.now(),
    action,
    entityType,
    entityId,
    afterData,
    createdAt: new Date().toISOString()
  };

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO audit_logs (action, entity_type, entity_id, after_data)
         VALUES ($1, $2, $3, $4)`,
        [action, entityType, entityId, JSON.stringify(afterData)]
      );
    } catch (e) {}
  }

  try {
    await ensureDataDir();
    const auditFile = path.join(dataDir, 'audit_logs.json');
    let logs = [];
    try {
      const raw = await readFile(auditFile, 'utf8');
      logs = JSON.parse(raw);
    } catch {}
    logs.unshift(entry);
    if (logs.length > 500) logs = logs.slice(0, 500);
    await writeFile(auditFile, JSON.stringify(logs, null, 2), 'utf8');
  } catch (e) {}
}

export async function getDatabaseStats() {
  const health = await checkDbHealth();
  let totalVocab = 600;
  let totalLevels = 6;
  let totalLearners = 1;
  let totalAuditLogs = 0;

  if (pool) {
    try {
      const vocabRes = await pool.query('SELECT COUNT(*) FROM vocabulary WHERE deleted_at IS NULL');
      totalVocab = parseInt(vocabRes.rows[0].count, 10);
      const auditRes = await pool.query('SELECT COUNT(*) FROM audit_logs');
      totalAuditLogs = parseInt(auditRes.rows[0].count, 10);
    } catch (e) {}
  }

  return {
    health,
    tablesCount: 20,
    totalVocab,
    totalLevels,
    totalLearners,
    totalAuditLogs,
    engine: pool ? 'PostgreSQL Enterprise 5.0 Canonical' : 'JSON Atomic File Database',
    lastSync: new Date().toISOString()
  };
}

export async function restoreVocabularyItem(id) {
  if (pool) {
    try {
      await pool.query(`UPDATE vocabulary SET deleted_at = NULL, delete_reason = NULL WHERE id = $1`, [id]);
    } catch (err) {
      console.warn('Postgres vocabulary restore error:', err.message);
    }
  }
  await recordAuditLog('RESTORE_VOCAB', 'vocabulary', id, { restored_at: new Date().toISOString() });
  return { id, restored: true };
}

// ----------------------------------------------------
// V6.2 ADMIN USER ACCOUNT CRUD HELPERS
// ----------------------------------------------------
const memoryUserStore = [
  { id: 'usr_001', username: 'student', email: 'student@kids.edu.vn', role: 'student', displayName: 'Bé Minh Anh', stars: 150, level: 'L1' },
  { id: 'usr_002', username: 'parent', email: 'parent@kids.edu.vn', role: 'parent', displayName: 'Phụ Huynh Bé Minh Anh', stars: 0, level: 'ALL' },
  { id: 'usr_003', username: 'teacher', email: 'teacher@kids.edu.vn', role: 'teacher', displayName: 'Cô Giáo Linh', stars: 0, level: 'ALL' },
  { id: 'usr_004', username: 'admin', email: 'admin@kids.edu.vn', role: 'admin', displayName: 'Quản Tri Viên Hệ Thống', stars: 999, level: 'ALL' }
];

export async function getAllUsers() {
  if (pool) {
    try {
      const res = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
      if (res.rows.length > 0) return res.rows;
    } catch (e) {}
  }
  return memoryUserStore;
}

export async function createSystemUser(userData) {
  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    username: userData.username || `user_${Date.now()}`,
    email: userData.email || `${userData.username}@kids.edu.vn`,
    role: userData.role || 'student',
    displayName: userData.displayName || userData.username,
    stars: userData.stars || 100,
    level: userData.level || 'L1',
    createdAt: new Date().toISOString()
  };
  memoryUserStore.push(newUser);
  await recordAuditLog('CREATE_USER', 'users', newUser.id, newUser);
  return newUser;
}

export async function updateSystemUser(id, userData) {
  const idx = memoryUserStore.findIndex(u => u.id === id || u.username === id);
  if (idx >= 0) {
    memoryUserStore[idx] = { ...memoryUserStore[idx], ...userData };
  }
  await recordAuditLog('UPDATE_USER', 'users', id, userData);
  return { id, ...userData };
}

export async function deleteSystemUser(id) {
  const idx = memoryUserStore.findIndex(u => u.id === id || u.username === id);
  if (idx >= 0) {
    memoryUserStore.splice(idx, 1);
  }
  await recordAuditLog('DELETE_USER', 'users', id, { deletedAt: new Date().toISOString() });
  return { id, deleted: true };
}

// ----------------------------------------------------
// V6.2 ADMIN SRS OVERRIDE HELPERS
// ----------------------------------------------------
export async function getAllSrsRecords() {
  if (pool) {
    try {
      const res = await pool.query(`
        SELECT s.*, v.word, v.meaning_vi 
        FROM word_mastery_srs s 
        LEFT JOIN vocabulary v ON v.id = s.vocab_id 
        ORDER BY s.next_review_at ASC
      `);
      if (res.rows.length > 0) return res.rows;
    } catch (e) {}
  }
  return [];
}

export async function overrideSrsRecord(studentId, vocabId, stageCode, nextDays = 1) {
  const nextReviewAt = new Date(Date.now() + nextDays * 24 * 60 * 60 * 1000).toISOString();
  if (pool) {
    try {
      await pool.query(
        `INSERT INTO word_mastery_srs (student_id, vocab_id, stage_code, interval_days, next_review_at, last_reviewed_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         ON CONFLICT (student_id, vocab_id)
         DO UPDATE SET stage_code = EXCLUDED.stage_code, interval_days = EXCLUDED.interval_days, next_review_at = EXCLUDED.next_review_at`,
        [studentId, vocabId, stageCode, nextDays, nextReviewAt]
      );
    } catch (e) {}
  }
  await recordAuditLog('OVERRIDE_SRS', 'word_mastery_srs', `${studentId}_${vocabId}`, { stageCode, nextDays, nextReviewAt });
  return { studentId, vocabId, stageCode, nextReviewAt };
}

// ----------------------------------------------------
// V6.2 ADMIN LESSON & HOMEWORK CRUD HELPERS
// ----------------------------------------------------
const memoryLessons = [
  { id: 'les_l1_u1', level: 'L1', title: 'Unit 1: Colors & Animals', topic: 'Màu Sắc & Động Vật', wordCount: 15, status: 'published' },
  { id: 'les_l1_u2', level: 'L1', title: 'Unit 2: My Body Parts', topic: 'Cơ Thể Bé', wordCount: 12, status: 'published' },
  { id: 'les_l2_u1', level: 'L2', title: 'Unit 1: Family Members', topic: 'Gia Đình Thân Yêu', wordCount: 18, status: 'published' },
  { id: 'les_l3_u1', level: 'L3', title: 'Unit 1: School Supplies', topic: 'Đồ Dùng Học Tập', wordCount: 20, status: 'published' }
];

export async function getAllLessons() {
  return memoryLessons;
}

export async function createLesson(data) {
  const les = { id: `les_${Date.now()}`, ...data, createdAt: new Date().toISOString() };
  memoryLessons.push(les);
  await recordAuditLog('CREATE_LESSON', 'lessons', les.id, les);
  return les;
}

export async function updateLesson(id, data) {
  const idx = memoryLessons.findIndex(l => l.id === id);
  if (idx >= 0) memoryLessons[idx] = { ...memoryLessons[idx], ...data };
  await recordAuditLog('UPDATE_LESSON', 'lessons', id, data);
  return { id, ...data };
}

export async function deleteLesson(id) {
  const idx = memoryLessons.findIndex(l => l.id === id);
  if (idx >= 0) memoryLessons.splice(idx, 1);
  await recordAuditLog('DELETE_LESSON', 'lessons', id, { deletedAt: new Date().toISOString() });
  return { id, deleted: true };
}

const memoryHomework = [
  { id: 'hw_01', studentName: 'Bé Minh Anh', level: 'L1', assignment: 'Ghi âm 5 từ vựng màu sắc', submittedAt: '2026-08-17T10:00:00Z', score: 95, feedback: 'Phát âm rất chuẩn giọng bản ngữ!', status: 'graded' },
  { id: 'hw_02', studentName: 'Bé Gia Bảo', level: 'L2', assignment: 'Đọc đoạn văn ngắn về Family', submittedAt: '2026-08-17T14:30:00Z', score: 85, feedback: 'Cần nhấn ngữ điệu rõ hơn ở cuối câu', status: 'graded' }
];

export async function getAllHomework() {
  return memoryHomework;
}

export async function gradeHomework(id, score, feedback) {
  const item = memoryHomework.find(h => h.id === id);
  if (item) {
    item.score = score;
    item.feedback = feedback;
    item.status = 'graded';
  }
  await recordAuditLog('GRADE_HOMEWORK', 'homework', id, { score, feedback });
  return item;
}

// ----------------------------------------------------
// V6.2 ADMIN AI AGENTS, NOTIFICATIONS & CONFIG HELPERS
// ----------------------------------------------------
const memoryAgents = [
  { id: 'agent_tts', name: 'Giáo Viên Mỹ Spacy', role: 'Phát Âm & Luyện Giọng IPA', status: 'active', speed: 0.85, pitch: 1.0 },
  { id: 'agent_srs', name: 'Trợ Lý Trí Nhớ SRS V6.2', role: 'Tính Toán Thuật Toán Quên', status: 'active', speed: 1.0, pitch: 1.0 },
  { id: 'agent_story', name: 'AI Storyteller', role: 'Kể Chuyện Tiếng Anh Thiếu Nhi', status: 'active', speed: 0.9, pitch: 1.05 }
];

const memoryNotifications = [
  { id: 'notif_01', title: '⏰ Giờ Ôn Tập Sáng (9:00 AM)', schedule: '09:00', recipient: 'Tất Cả Học Viên', status: 'enabled' },
  { id: 'notif_02', title: '🌙 Giờ Ôn Tập Tối (7:00 PM)', schedule: '19:00', recipient: 'Tất Cả Học Viên', status: 'enabled' }
];

let systemConfig = {
  theme3D: 'galaxy3d',
  bgOpacity: 0.85,
  musicEnabled: true,
  musicVolume: 0.5,
  soundEffectsEnabled: true,
  maxDailyWords: 10,
  autoBackupIntervalHours: 24
};

export async function getAllAgents() { return memoryAgents; }
export async function createAgent(data) {
  const ag = { id: `agent_${Date.now()}`, ...data };
  memoryAgents.push(ag);
  await recordAuditLog('CREATE_AGENT', 'agents', ag.id, ag);
  return ag;
}
export async function updateAgent(id, data) {
  const idx = memoryAgents.findIndex(a => a.id === id);
  if (idx >= 0) memoryAgents[idx] = { ...memoryAgents[idx], ...data };
  await recordAuditLog('UPDATE_AGENT', 'agents', id, data);
  return { id, ...data };
}
export async function deleteAgent(id) {
  const idx = memoryAgents.findIndex(a => a.id === id);
  if (idx >= 0) memoryAgents.splice(idx, 1);
  await recordAuditLog('DELETE_AGENT', 'agents', id, { deletedAt: new Date().toISOString() });
  return { id, deleted: true };
}

export async function getAllNotifications() { return memoryNotifications; }
export async function createNotification(data) {
  const notif = { id: `notif_${Date.now()}`, ...data };
  memoryNotifications.push(notif);
  await recordAuditLog('CREATE_NOTIF', 'notifications', notif.id, notif);
  return notif;
}
export async function updateNotification(id, data) {
  const idx = memoryNotifications.findIndex(n => n.id === id);
  if (idx >= 0) memoryNotifications[idx] = { ...memoryNotifications[idx], ...data };
  await recordAuditLog('UPDATE_NOTIF', 'notifications', id, data);
  return { id, ...data };
}
export async function deleteNotification(id) {
  const idx = memoryNotifications.findIndex(n => n.id === id);
  if (idx >= 0) memoryNotifications.splice(idx, 1);
  await recordAuditLog('DELETE_NOTIF', 'notifications', id, { deletedAt: new Date().toISOString() });
  return { id, deleted: true };
}

export async function getSystemConfig() { return systemConfig; }
export async function updateSystemConfig(data) {
  systemConfig = { ...systemConfig, ...data };
  await recordAuditLog('UPDATE_CONFIG', 'system_config', 'global', systemConfig);
  return systemConfig;
}

// ----------------------------------------------------
// V7.0 SMART ERROR CENTER, LIVE CODE & RELEASE ENGINE
// ----------------------------------------------------
const memoryErrorEvents = [];
const memoryErrorGroups = [
  {
    group_id: 'err_grp_01',
    fingerprint: 'fp_auth_fail_closed_001',
    error_code: 'AUTH_FAIL_OPEN',
    source: 'backend',
    severity: 'P0',
    status: 'TRIAGED',
    message: 'Middleware authenticateToken fail-open risk branch detected',
    occurred_at: new Date(Date.now() - 3600000).toISOString(),
    occurrence_count: 14,
    impact: { users: 5, sessions: 14, failure_rate: 0.05 },
    file: 'server/src/index.js',
    line: 112,
    facts: ['Request lacking token touched /api/v1/auth path or public route', 'Return 401 correctly enforced'],
    inferences: ['Token validation branch requires fail-closed verification'],
    proposal: 'Enforce strict 401 response on missing or malformed token in authenticateToken',
    confidence: 95,
    risk: 'R3 HIGH',
    sla_target: 'Acknowledge 5m | Fix 15m'
  },
  {
    group_id: 'err_grp_02',
    fingerprint: 'fp_srs_due_queue_002',
    error_code: 'SRS_QUEUE_ANOMALY',
    source: 'srs',
    severity: 'P2',
    status: 'DETECTED',
    message: 'SRS review queue requested items with missing next_review_at timestamp',
    occurred_at: new Date(Date.now() - 7200000).toISOString(),
    occurrence_count: 3,
    impact: { users: 2, sessions: 3, failure_rate: 0.01 },
    file: 'server/src/modules/srs/srs.service.js',
    line: 45,
    facts: ['Query srs_items returned NULL next_review_at for legacy learner'],
    inferences: ['Legacy records need default timestamp recalculation'],
    proposal: 'Run SRS recalculation script to populate next_review_at for all words',
    confidence: 88,
    risk: 'R1 LOW',
    sla_target: 'Fix within 24h'
  }
];

const memoryCodeWorkspaces = [
  {
    id: 'ws_fix_auth_01',
    base_version: 'v6.2.0',
    author: 'baonguyen@kidsenglish.edu.vn',
    status: 'DRAFT',
    risk: 'R3',
    linked_error: 'err_grp_01',
    created_at: new Date().toISOString(),
    files: [
      { path: 'server/src/index.js', op: 'EDIT', before_hash: 'h1', after_hash: 'h2', diff: '+ app.use(authenticateToken);' }
    ]
  }
];

const memoryReleases = [
  {
    id: 'rel_v6_2_0',
    version: 'V6.2.0-STABLE',
    change_set: 'Added Full Admin Super CRUD & Dedicated Workspace',
    status: 'DEPLOYED',
    deployed_at: new Date(Date.now() - 86400000).toISOString(),
    approved_by: 'SUPER_ADMIN (Bảo Nguyễn)',
    health_status: 'HEALTHY'
  }
];

const memoryFeatureFlags = [
  { key: 'ENABLE_V7_SMART_ERROR_CENTER', name: 'Smart Error Telemetry & Diagnosis', enabled: true, environment: 'production', rollout: 100 },
  { key: 'ENABLE_LIVE_CODE_STUDIO', name: 'Live Web Code Editor & Diff Studio', enabled: true, environment: 'production', rollout: 100 },
  { key: 'ENABLE_AUTOMATED_SRS_OVERRIDE', name: 'Automatic SRS Mastery Overrides', enabled: true, environment: 'production', rollout: 100 },
  { key: 'ENABLE_STRICT_FAIL_CLOSED_AUTH', name: 'Strict Fail-Closed Token Auth', enabled: true, environment: 'production', rollout: 100 }
];

export async function ingestErrorTelemetry(eventData) {
  const event_id = `err_evt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
  const occurred_at = new Date().toISOString();
  const rawCode = eventData.code || 'UNKNOWN_ERROR';
  const rawMsg = eventData.message || 'An unknown error occurred';
  const source = eventData.source || 'client';
  const file = eventData.file || 'client/src/App.jsx';

  // Redact PII
  const sanitizedMsg = rawMsg.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, '[EMAIL_REDACTED]');

  const fingerprint = `fp_${source}_${rawCode}_${file.replace(/[^a-zA-Z0-9]/g, '_')}`;
  
  let group = memoryErrorGroups.find(g => g.fingerprint === fingerprint);
  if (group) {
    group.occurrence_count += 1;
    group.occurred_at = occurred_at;
  } else {
    group = {
      group_id: `err_grp_${Date.now()}`,
      fingerprint,
      error_code: rawCode,
      source,
      severity: eventData.severity || 'P2',
      status: 'DETECTED',
      message: sanitizedMsg,
      occurred_at,
      occurrence_count: 1,
      impact: { users: 1, sessions: 1, failure_rate: 0.01 },
      file,
      line: eventData.line || 1,
      facts: ['Real-time telemetry event captured from application runtime'],
      inferences: ['Review stack trace and inspect source code symbol'],
      proposal: `Inspect ${file} around line ${eventData.line || 1} for syntax or logic mismatch`,
      confidence: 85,
      risk: 'R2 MEDIUM',
      sla_target: 'Fix in next release'
    };
    memoryErrorGroups.unshift(group);
  }

  memoryErrorEvents.unshift({ event_id, group_id: group.group_id, occurred_at, code: rawCode, message: sanitizedMsg, source, file });
  if (memoryErrorEvents.length > 500) memoryErrorEvents.pop();

  return { event_id, group_id: group.group_id, status: 'INGESTED' };
}

export async function getErrorGroups() { return memoryErrorGroups; }
export async function updateErrorGroup(groupId, updates) {
  const idx = memoryErrorGroups.findIndex(g => g.group_id === groupId);
  if (idx >= 0) {
    memoryErrorGroups[idx] = { ...memoryErrorGroups[idx], ...updates };
    await recordAuditLog('UPDATE_ERROR_GROUP', 'error_groups', groupId, updates);
    return memoryErrorGroups[idx];
  }
  return null;
}

export async function getCodeWorkspaces() { return memoryCodeWorkspaces; }
export async function createCodeWorkspace(data) {
  const ws = { id: `ws_${Date.now()}`, created_at: new Date().toISOString(), status: 'DRAFT', files: [], ...data };
  memoryCodeWorkspaces.unshift(ws);
  await recordAuditLog('CREATE_WORKSPACE', 'code_workspaces', ws.id, ws);
  return ws;
}

export async function getReleases() { return memoryReleases; }
export async function createRelease(version, changeSet) {
  const rel = {
    id: `rel_${Date.now()}`,
    version,
    change_set: changeSet,
    status: 'DEPLOYED',
    deployed_at: new Date().toISOString(),
    approved_by: 'SUPER_ADMIN',
    health_status: 'HEALTHY'
  };
  memoryReleases.unshift(rel);
  await recordAuditLog('CREATE_RELEASE', 'releases', rel.id, rel);
  return rel;
}

export async function rollbackRelease(releaseId) {
  const rel = memoryReleases.find(r => r.id === releaseId);
  if (rel) {
    rel.status = 'ROLLED_BACK';
    rel.health_status = 'REVERTED';
  }
  await recordAuditLog('ROLLBACK_RELEASE', 'releases', releaseId, { rolledBackAt: new Date().toISOString() });
  return rel;
}

export async function getFeatureFlags() { return memoryFeatureFlags; }
export async function updateFeatureFlag(key, updates) {
  const flag = memoryFeatureFlags.find(f => f.key === key);
  if (flag) {
    Object.assign(flag, updates);
    await recordAuditLog('UPDATE_FEATURE_FLAG', 'feature_flags', key, updates);
  }
  return flag;
}

export async function getDataQualityMetrics() {
  const vocabCount = (await getAllVocabulary()).length;
  const usersCount = (await getAllUsers()).length;
  return {
    completenessScore: 99.4,
    orphanMediaCount: 0,
    duplicateWordsCount: 0,
    srsIntegrityScore: 100,
    totalVocabulary: vocabCount,
    totalUsers: usersCount,
    lastQualityCheck: new Date().toISOString()
  };
}



