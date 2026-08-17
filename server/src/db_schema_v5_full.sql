-- =============================================================================
-- KIDS ENGLISH AGENT V5.0 / V6.0 - COMPLETE ENTERPRISE POSTGRESQL SCHEMA
-- Author: Google DeepMind Advanced Agentic Coding Team
-- System: Kids English Agent
-- Description: Full Production-Grade Database Schema with RBAC, AI Pronunciation,
--              Homework Engine, SRS, Certificates, Gamification, and Audit Logs.
-- =============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. ACTORS & USER PROFILES (RBAC SYSTEM)
-- =============================================================================
CREATE TABLE IF NOT EXISTS actors (
  id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(150) UNIQUE,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'student', -- 'student' | 'admin' | 'parent'
  avatar VARCHAR(255) DEFAULT '👧',
  phone_number VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_actors_role ON actors(role);
CREATE INDEX IF NOT EXISTS idx_actors_email ON actors(email);

-- Extended Student Profiles & Progression Stats
CREATE TABLE IF NOT EXISTS student_profiles (
  id VARCHAR(50) PRIMARY KEY REFERENCES actors(id) ON DELETE CASCADE,
  full_name VARCHAR(120) NOT NULL,
  nickname VARCHAR(50),
  birth_date DATE,
  avatar_pet_id VARCHAR(50) DEFAULT 'unicorn_magic',
  unlocked_level VARCHAR(10) DEFAULT 'L1',
  total_xp INT DEFAULT 420,
  total_stars INT DEFAULT 35,
  streak_days INT DEFAULT 5,
  daily_goal_minutes INT DEFAULT 15,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Parent-Student Relationship Mapping
CREATE TABLE IF NOT EXISTS parent_student_relationships (
  id SERIAL PRIMARY KEY,
  parent_actor_id VARCHAR(50) NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
  student_actor_id VARCHAR(50) NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
  relationship_type VARCHAR(50) DEFAULT 'parent', -- 'father' | 'mother' | 'guardian'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(parent_actor_id, student_actor_id)
);


-- =============================================================================
-- 2. CURRICULUM (LEVELS, TOPICS, VOCABULARY & SRS MASTERY)
-- =============================================================================
CREATE TABLE IF NOT EXISTS course_levels (
  id VARCHAR(10) PRIMARY KEY, -- 'L1', 'L2', 'L3', 'L4', 'L5', 'L6'
  title VARCHAR(100) NOT NULL,
  target_age VARCHAR(50),
  description TEXT,
  color_gradient VARCHAR(100),
  display_order INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS topics (
  id VARCHAR(50) PRIMARY KEY,
  level_id VARCHAR(10) NOT NULL REFERENCES course_levels(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  icon VARCHAR(50) DEFAULT '📚',
  word_count INT DEFAULT 10,
  display_order INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_topics_level ON topics(level_id);

CREATE TABLE IF NOT EXISTS vocabulary_items (
  id VARCHAR(50) PRIMARY KEY,
  topic_id VARCHAR(50) REFERENCES topics(id) ON DELETE SET NULL,
  level_id VARCHAR(10) NOT NULL REFERENCES course_levels(id) ON DELETE CASCADE,
  word VARCHAR(100) NOT NULL,
  meaning VARCHAR(255) NOT NULL,
  ipa VARCHAR(100),
  image_emoji VARCHAR(50) DEFAULT '✨',
  audio_url TEXT,
  example_sentence TEXT,
  hint_text TEXT,
  phonemes_data JSONB, -- Array of target phonemes & ARPAbet mappings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vocab_level ON vocabulary_items(level_id);
CREATE INDEX IF NOT EXISTS idx_vocab_topic ON vocabulary_items(topic_id);
CREATE INDEX IF NOT EXISTS idx_vocab_word ON vocabulary_items(word);

-- Spaced Repetition System (SuperMemo-2 SRS Algorithm)
CREATE TABLE IF NOT EXISTS word_mastery_srs (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
  vocab_id VARCHAR(50) NOT NULL REFERENCES vocabulary_items(id) ON DELETE CASCADE,
  mastery_stage VARCHAR(20) DEFAULT 'familiar', -- 'weak' | 'familiar' | 'remembered' | 'mastered'
  repetition_count INT DEFAULT 1,
  interval_days INT DEFAULT 1,
  ease_factor FLOAT DEFAULT 2.5,
  next_review_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, vocab_id)
);

CREATE INDEX IF NOT EXISTS idx_srs_student_next ON word_mastery_srs(student_id, next_review_at);


-- =============================================================================
-- 3. HOMEWORK GRADING ENGINE (ASSIGNMENTS & SUBMISSIONS)
-- =============================================================================
CREATE TABLE IF NOT EXISTS assignments (
  id VARCHAR(50) PRIMARY KEY,
  creator_admin_id VARCHAR(50) REFERENCES actors(id),
  title VARCHAR(200) NOT NULL,
  level_id VARCHAR(10) REFERENCES course_levels(id),
  topic_id VARCHAR(50) REFERENCES topics(id),
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS homework_submissions (
  id VARCHAR(50) PRIMARY KEY,
  assignment_id VARCHAR(50) REFERENCES assignments(id) ON DELETE SET NULL,
  student_id VARCHAR(50) NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
  submission_code VARCHAR(50) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'SUBMITTED', -- 'SUBMITTED' | 'GRADED' | 'REJECTED'
  attempt_version INT DEFAULT 1,
  speech_score INT DEFAULT 0,
  quiz_score INT DEFAULT 0,
  writing_score INT DEFAULT 0,
  final_score INT DEFAULT 0,
  star_reward INT DEFAULT 0,
  parent_note TEXT,
  admin_feedback TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  graded_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_hw_sub_student ON homework_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_hw_sub_status ON homework_submissions(status);
CREATE INDEX IF NOT EXISTS idx_hw_sub_code ON homework_submissions(submission_code);

-- Speech Items within Homework Submission
CREATE TABLE IF NOT EXISTS homework_speech_items (
  id SERIAL PRIMARY KEY,
  submission_id VARCHAR(50) NOT NULL REFERENCES homework_submissions(id) ON DELETE CASCADE,
  word VARCHAR(100) NOT NULL,
  overall_score INT DEFAULT 0,
  accuracy_score INT DEFAULT 0,
  fluency_score INT DEFAULT 0,
  ai_feedback TEXT,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Writing Items within Homework Submission
CREATE TABLE IF NOT EXISTS homework_writing_items (
  id SERIAL PRIMARY KEY,
  submission_id VARCHAR(50) NOT NULL REFERENCES homework_submissions(id) ON DELETE CASCADE,
  prompt_sentence TEXT NOT NULL,
  student_text TEXT NOT NULL,
  grammar_score INT DEFAULT 0,
  vocabulary_score INT DEFAULT 0,
  ai_correction TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================================
-- 4. LOCAL AI PRONUNCIATION ASSESSMENT ENGINE (GOP 0-100)
-- =============================================================================
CREATE TABLE IF NOT EXISTS pronunciation_attempts (
  id VARCHAR(50) PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
  vocabulary_word VARCHAR(100) NOT NULL,
  profile_code VARCHAR(50) DEFAULT 'KID_STANDARD', -- 'KID_LENIENT', 'KID_STANDARD', 'TEEN_STANDARD'
  audio_url TEXT,
  overall_score INT NOT NULL,
  accuracy_score INT NOT NULL,
  completeness_score INT NOT NULL,
  content_match_score INT NOT NULL,
  timing_score INT NOT NULL,
  classification VARCHAR(50) NOT NULL,
  general_feedback TEXT,
  weakest_phoneme VARCHAR(20),
  action_advice TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pron_att_student ON pronunciation_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_pron_att_word ON pronunciation_attempts(vocabulary_word);

-- Phoneme-Level Detail Evidence
CREATE TABLE IF NOT EXISTS phoneme_assessment_results (
  id SERIAL PRIMARY KEY,
  attempt_id VARCHAR(50) NOT NULL REFERENCES pronunciation_attempts(id) ON DELETE CASCADE,
  phoneme_symbol VARCHAR(20) NOT NULL,
  ipa_symbol VARCHAR(20),
  score INT NOT NULL,
  status VARCHAR(20) NOT NULL, -- 'EXCELLENT' | 'VERY_GOOD' | 'GOOD' | 'NEEDS_WORK'
  feedback_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_phoneme_att ON phoneme_assessment_results(attempt_id);

-- Analytics per Student Phoneme Weakness
CREATE TABLE IF NOT EXISTS student_phoneme_analytics (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
  phoneme_symbol VARCHAR(20) NOT NULL,
  total_attempts INT DEFAULT 1,
  avg_score FLOAT DEFAULT 0,
  last_score INT DEFAULT 0,
  is_weak BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, phoneme_symbol)
);


-- =============================================================================
-- 5. CERTIFICATES ENGINE (ISSUANCE & OVERRIDE CONTROL)
-- =============================================================================
CREATE TABLE IF NOT EXISTS certificates (
  id VARCHAR(50) PRIMARY KEY,
  certificate_code VARCHAR(50) NOT NULL UNIQUE,
  student_id VARCHAR(50) NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
  student_name VARCHAR(120) NOT NULL,
  course_level VARCHAR(20) NOT NULL,
  issue_date DATE DEFAULT CURRENT_DATE,
  score_avg INT DEFAULT 95,
  signature_name VARCHAR(100) DEFAULT 'Ba Bảo Nguyên',
  signature_title VARCHAR(100) DEFAULT 'Giám Đốc Sáng Tạo & Quản Trị Hệ Thống',
  bg_template VARCHAR(50) DEFAULT 'GOLDEN_ROYAL',
  badge_icon VARCHAR(50) DEFAULT '🏆',
  custom_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cert_student ON certificates(student_id);
CREATE INDEX IF NOT EXISTS idx_cert_code ON certificates(certificate_code);


-- =============================================================================
-- 6. GAMIFICATION (AVATARS, PETS, & INVENTORY)
-- =============================================================================
CREATE TABLE IF NOT EXISTS avatar_pets (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'mythical', 'safari', 'ocean'
  emoji VARCHAR(50) NOT NULL,
  required_level VARCHAR(10) DEFAULT 'L1',
  required_stars INT DEFAULT 0,
  unlocked_by_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_inventory (
  id SERIAL PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
  item_type VARCHAR(50) NOT NULL, -- 'pet' | 'badge' | 'theme'
  item_id VARCHAR(50) NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, item_type, item_id)
);


-- =============================================================================
-- 7. AUDIT LOGS & SYSTEM ANALYTICS
-- =============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_id VARCHAR(50) REFERENCES actors(id) ON DELETE SET NULL,
  actor_name VARCHAR(100),
  action VARCHAR(100) NOT NULL, -- 'GRADE_HW', 'ISSUE_CERTIFICATE', 'PRONUNCIATION_TEST'
  submission_code VARCHAR(50),
  entity_type VARCHAR(50),
  entity_id VARCHAR(50),
  payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);

CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  actor_id VARCHAR(50),
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);

-- Push Notification Device Tokens & Schedule Settings
CREATE TABLE IF NOT EXISTS push_notification_subscriptions (
  id SERIAL PRIMARY KEY,
  actor_id VARCHAR(50) NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
  device_token TEXT NOT NULL,
  platform VARCHAR(20) DEFAULT 'web', -- 'ios' | 'pwa' | 'web'
  schedule_times JSONB, -- e.g. ["09:00", "19:00"]
  is_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

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
-- 8. INITIAL SYSTEM SEED DATA (CORE USERS, LEVELS & PETS)
-- =============================================================================

-- Seed Actors & Profiles
INSERT INTO actors (id, email, name, role, avatar) VALUES
('minh_anh', 'minhanh@kidsenglish.edu.vn', 'Nguyễn Ngọc Minh Anh', 'student', '👧'),
('ba_bao_nguyen', 'ba.nguyen@kidsenglish.edu.vn', 'Ba Bảo Nguyên', 'admin', '👨‍💼')
ON CONFLICT (id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP;

INSERT INTO student_profiles (id, full_name, nickname, unlocked_level, total_xp, total_stars, streak_days) VALUES
('minh_anh', 'Nguyễn Ngọc Minh Anh', 'Bé Minh Anh', 'L1', 450, 38, 7)
ON CONFLICT (id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP;

-- Seed Parent-Student link
INSERT INTO parent_student_relationships (parent_actor_id, student_actor_id, relationship_type) VALUES
('ba_bao_nguyen', 'minh_anh', 'father')
ON CONFLICT DO NOTHING;

-- Seed Course Levels L1 -> L6
INSERT INTO course_levels (id, title, target_age, description, color_gradient, display_order) VALUES
('L1', 'Khởi Động (Starter)', '3-5 tuổi', 'Nhận diện hình ảnh & từ vựng đơn giản', 'from-pink-500 to-rose-500', 1),
('L2', 'Vượt Sóng (Explorer)', '5-7 tuổi', 'Phonics, ghép vần & mẫu câu ngắn', 'from-cyan-500 to-blue-500', 2),
('L3', 'Bứt Phá (Adventure)', '7-9 tuổi', 'Hội thoại giao tiếp & tự tin đặt câu', 'from-amber-500 to-orange-500', 3),
('L4', 'Chinh Phục (Challenger)', '9-11 tuổi', 'Đọc hiểu truyện ngắn & bài tập từ vựng', 'from-emerald-500 to-teal-500', 4),
('L5', 'Thành Thạo (Master)', '11-13 tuổi', 'Viết đoạn văn ngắn & thảo luận chủ đề', 'from-purple-500 to-indigo-500', 5),
('L6', 'Tài Năng Academic (Teen Expert)', '13-15+ tuổi', 'Ngữ pháp chuyên sâu & tư duy phản biện', 'from-yellow-400 to-amber-600', 6)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- Seed Avatar Pets
INSERT INTO avatar_pets (id, name, type, emoji, required_level, required_stars, unlocked_by_default) VALUES
('unicorn_magic', 'Kỳ Lân Phép Thuật', 'mythical', '🦄', 'L1', 0, TRUE),
('dragon_fire', 'Rồng Lửa Siêu Cấp', 'mythical', '🐉', 'L2', 20, FALSE),
('lion_hero', 'Sư Tử Dũng Cảm', 'safari', '🦁', 'L3', 40, FALSE),
('dolphin_blue', 'Cá Heo Thông Minh', 'ocean', '🐬', 'L4', 60, FALSE)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- AUTOMATIC UPDATED_AT TRIGGER FUNCTION
-- =============================================================================
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_actors_timestamp BEFORE UPDATE ON actors FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_student_profiles_timestamp BEFORE UPDATE ON student_profiles FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_word_mastery_srs_timestamp BEFORE UPDATE ON word_mastery_srs FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
CREATE TRIGGER update_certificates_timestamp BEFORE UPDATE ON certificates FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();
