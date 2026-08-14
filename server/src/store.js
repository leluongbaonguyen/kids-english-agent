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
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
    console.log('🐘 PostgreSQL pool initialized for Kids English Agent.');
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
      const res = await client.query('SELECT NOW() as now');
      client.release();
      return { type: 'postgresql', status: 'connected', time: res.rows[0].now };
    } catch (err) {
      return { type: 'postgresql', status: 'disconnected', error: err.message };
    }
  }
  return { type: 'json_file', status: 'ready', path: kidsProgressFile };
}

export async function readKidsProgress() {
  if (pool) {
    try {
      const result = await pool.query('SELECT data FROM kids_progress WHERE id = 1 LIMIT 1');
      if (result.rows.length > 0) {
        return result.rows[0].data;
      }
      // Insert default progress if record does not exist
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
      return updated;
    } catch (err) {
      console.warn('⚠️ Postgres write error, persisting to local JSON fallback:', err.message);
    }
  }

  await ensureDataDir();
  await writeFile(kidsProgressFile, JSON.stringify(updated, null, 2), 'utf8');
  return updated;
}

