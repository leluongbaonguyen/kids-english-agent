-- ========================================================
-- Kids English Learning Agent - PostgreSQL Database Init
-- Target: Oracle Cloud VM PostgreSQL 24/7 Deployment
-- ========================================================

-- 1. Create Database (Run as postgres superuser if DB not yet created)
-- CREATE DATABASE app_db;

-- 2. Create dedicated app user with strong password
-- CREATE USER app_user WITH ENCRYPTED PASSWORD 'REPLACE_WITH_STRONG_PASSWORD';
-- GRANT ALL PRIVILEGES ON DATABASE app_db TO app_user;

-- Connect to app_db
\c app_db

-- 3. Create Table for Kids Progress
CREATE TABLE IF NOT EXISTS kids_progress (
    id INT PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create trigger to update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_kids_progress_timestamp ON kids_progress;
CREATE TRIGGER set_kids_progress_timestamp
BEFORE UPDATE ON kids_progress
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();

-- 5. Seed default progress record if empty
INSERT INTO kids_progress (id, data)
VALUES (
    1,
    '{"stars": 120, "masteredWords": [], "unlockedLevels": {"L1": true}, "updatedAt": "2026-08-14T00:00:00.000Z"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 6. Grant table permissions to app_user
GRANT ALL PRIVILEGES ON TABLE kids_progress TO app_user;

SELECT * FROM kids_progress;
