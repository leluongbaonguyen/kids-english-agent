-- =============================================================================
-- ENGLISH LEARNING PLATFORM V3 - COMPLETE DATABASE SCHEMA (POSTGRESQL / SUPABASE)
-- =============================================================================

-- 1. ACTORS & USER PROFILES
CREATE TABLE IF NOT EXISTS actors (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'student', -- 'student' | 'admin' | 'parent'
  avatar VARCHAR(255) DEFAULT '🦄',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial actors
INSERT INTO actors (id, name, role, avatar) VALUES
('minh_anh', 'Nguyễn Ngọc Minh Anh', 'student', '👧'),
('ba_bao_nguyen', 'Ba Bảo Nguyên', 'admin', '👨‍💼')
ON CONFLICT (id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP;


-- 2. COURSE LEVELS (L1 -> L6)
CREATE TABLE IF NOT EXISTS course_levels (
  id VARCHAR(10) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  target_age VARCHAR(50),
  description TEXT,
  color_gradient VARCHAR(100),
  display_order INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed levels L1 -> L6
INSERT INTO course_levels (id, title, target_age, description, color_gradient, display_order) VALUES
('L1', 'Khởi Động (Starter)', '3-5 tuổi', 'Nhận diện hình ảnh & từ vựng đơn giản', 'from-pink-500 to-rose-500', 1),
('L2', 'Vượt Sóng (Explorer)', '5-7 tuổi', 'Phonics, ghép vần & mẫu câu ngắn', 'from-cyan-500 to-blue-500', 2),
('L3', 'Bứt Phá (Adventure)', '7-9 tuổi', 'Hội thoại giao tiếp & tự tin đặt câu', 'from-amber-500 to-orange-500', 3),
('L4', 'Chinh Phục (Challenger)', '9-11 tuổi', 'Đọc hiểu truyện ngắn & bài tập từ vựng', 'from-emerald-500 to-teal-500', 4),
('L5', 'Thành Thạo (Master)', '11-13 tuổi', 'Viết đoạn văn ngắn & thảo luận chủ đề', 'from-purple-500 to-indigo-500', 5),
('L6', 'Tài Năng Academic (Teen Expert)', '13-15+ tuổi', 'Ngữ pháp chuyên sâu & tư duy phản biện', 'from-yellow-400 to-amber-600', 6)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;


-- 3. TOPICS PER LEVEL
CREATE TABLE IF NOT EXISTS topics (
  id VARCHAR(50) PRIMARY KEY,
  level_id VARCHAR(10) REFERENCES course_levels(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  icon VARCHAR(50) DEFAULT '📚',
  word_count INT DEFAULT 10,
  display_order INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 4. VOCABULARY ITEMS (1000+ WORDS)
CREATE TABLE IF NOT EXISTS vocabulary_items (
  id VARCHAR(50) PRIMARY KEY,
  topic_id VARCHAR(50) REFERENCES topics(id) ON DELETE SET NULL,
  level_id VARCHAR(10) REFERENCES course_levels(id) ON DELETE CASCADE,
  word VARCHAR(100) NOT NULL,
  meaning VARCHAR(255) NOT NULL,
  ipa VARCHAR(100),
  image_emoji VARCHAR(50) DEFAULT '✨',
  audio_url TEXT,
  example_sentence TEXT,
  hint_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vocab_level ON vocabulary_items(level_id);
CREATE INDEX IF NOT EXISTS idx_vocab_word ON vocabulary_items(word);


-- 5. LEARNER PROGRESS
CREATE TABLE IF NOT EXISTS user_progress (
  actor_id VARCHAR(50) PRIMARY KEY REFERENCES actors(id) ON DELETE CASCADE,
  unlocked_level VARCHAR(10) DEFAULT 'L1',
  total_xp INT DEFAULT 420,
  total_stars INT DEFAULT 35,
  current_streak INT DEFAULT 5,
  daily_goal_minutes INT DEFAULT 15,
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 6. WORD MASTERY SRS (SPACED REPETITION SYSTEM)
CREATE TABLE IF NOT EXISTS word_mastery_srs (
  id SERIAL PRIMARY KEY,
  actor_id VARCHAR(50) REFERENCES actors(id) ON DELETE CASCADE,
  vocab_id VARCHAR(50) REFERENCES vocabulary_items(id) ON DELETE CASCADE,
  mastery_stage VARCHAR(20) DEFAULT 'familiar', -- 'weak' | 'familiar' | 'remembered' | 'mastered'
  repetition_count INT DEFAULT 1,
  next_review_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(actor_id, vocab_id)
);


-- 7. DAILY STUDY PLANS
CREATE TABLE IF NOT EXISTS daily_study_plans (
  id VARCHAR(50) PRIMARY KEY,
  actor_id VARCHAR(50) REFERENCES actors(id) ON DELETE CASCADE,
  plan_date DATE DEFAULT CURRENT_DATE,
  block_data JSONB NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 8. ANALYTICS & AUDIT EVENT LOGS
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  actor_id VARCHAR(50),
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at);


-- 9. CMS CONTENT EDITS LOG
CREATE TABLE IF NOT EXISTS cms_content_edits (
  id SERIAL PRIMARY KEY,
  admin_id VARCHAR(50) REFERENCES actors(id),
  action_type VARCHAR(50) NOT NULL, -- 'CREATE_TOPIC' | 'UPDATE_VOCAB' | 'OVERRIDE_LEVEL'
  target_id VARCHAR(50),
  payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 10. USER SETTINGS & CONFIG
CREATE TABLE IF NOT EXISTS user_settings (
  actor_id VARCHAR(50) PRIMARY KEY REFERENCES actors(id) ON DELETE CASCADE,
  bg_theme VARCHAR(50) DEFAULT 'galaxy3d',
  bg_config JSONB,
  audio_volume FLOAT DEFAULT 0.5,
  is_muted BOOLEAN DEFAULT FALSE,
  voice_gender VARCHAR(10) DEFAULT 'female',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- REAL-TIME SYNC TRIGGER FOR UPDATED_AT TIMESTAMP
-- =============================================================================
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_actors_timestamp BEFORE UPDATE ON actors FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_user_progress_timestamp BEFORE UPDATE ON user_progress FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
