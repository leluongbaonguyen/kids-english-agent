-- ============================================================
-- KIDS ENGLISH AGENT - ONLINE DATABASE (ENTERPRISE GRADE 24/7)
-- PostgreSQL / Supabase / Oracle Cloud VM
-- Schema Version: 2.0 (20 Core Tables & Full Optimization)
-- ============================================================

-- Dùng cho tìm kiếm gần đúng (Fuzzy Search & Trigram Indexing)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- 1. LEARNERS - HỌC VIÊN / BÉ
-- ============================================================

CREATE TABLE IF NOT EXISTS public.learners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,

    birth_date DATE,
    age_group TEXT,

    avatar_url TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 2. COURSE LEVELS (Level L1 → L6)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.course_levels (
    code TEXT PRIMARY KEY,

    sort_order SMALLINT NOT NULL UNIQUE,

    name TEXT NOT NULL,

    badge TEXT,

    description TEXT,

    icon TEXT,

    target_words INTEGER NOT NULL DEFAULT 100
        CHECK (target_words > 0),

    unlock_threshold NUMERIC(5,2)
        NOT NULL DEFAULT 90.00
        CHECK (unlock_threshold BETWEEN 0 AND 100),

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 3. VOCABULARY CATEGORIES (Chủ đề từ vựng)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.vocabulary_categories (
    code TEXT PRIMARY KEY,

    level_code TEXT NOT NULL
        REFERENCES public.course_levels(code)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    sort_order SMALLINT NOT NULL,

    name TEXT NOT NULL,

    icon TEXT,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(level_code, sort_order)
);


-- ============================================================
-- 4. VOCABULARY (TỪ VỰNG HỌC TẬP)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    legacy_id TEXT UNIQUE,

    word TEXT NOT NULL,

    normalized_word TEXT
        GENERATED ALWAYS AS (
            LOWER(BTRIM(word))
        ) STORED,

    meaning_vi TEXT NOT NULL,

    ipa TEXT,

    vietnamese_phonetic TEXT,

    word_type TEXT,

    level_code TEXT NOT NULL
        REFERENCES public.course_levels(code)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    category_code TEXT
        REFERENCES public.vocabulary_categories(code)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    image_value TEXT,

    image_url TEXT,

    audio_url TEXT,

    hint TEXT,

    example_en TEXT,

    example_vi TEXT,

    difficulty SMALLINT
        CHECK (difficulty BETWEEN 1 AND 10),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    deleted_at TIMESTAMPTZ,

    delete_reason TEXT,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE UNIQUE INDEX IF NOT EXISTS uq_vocabulary_normalized_level_category
ON public.vocabulary (
    normalized_word,
    level_code,
    COALESCE(category_code, '')
)
WHERE deleted_at IS NULL;


CREATE INDEX IF NOT EXISTS idx_vocabulary_level_category
ON public.vocabulary(level_code, category_code)
WHERE deleted_at IS NULL;


CREATE INDEX IF NOT EXISTS idx_vocabulary_category
ON public.vocabulary(category_code);


CREATE INDEX IF NOT EXISTS idx_vocabulary_word_trgm
ON public.vocabulary
USING GIN (normalized_word gin_trgm_ops)
WHERE deleted_at IS NULL;


CREATE INDEX IF NOT EXISTS idx_vocabulary_meaning_trgm
ON public.vocabulary
USING GIN (LOWER(meaning_vi) gin_trgm_ops)
WHERE deleted_at IS NULL;


CREATE INDEX IF NOT EXISTS idx_vocabulary_metadata
ON public.vocabulary
USING GIN (metadata);


-- ============================================================
-- 5. POSTER PAGES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.poster_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    page_number INTEGER NOT NULL UNIQUE
        CHECK (page_number > 0),

    title TEXT NOT NULL,

    subtitle TEXT,

    badge TEXT,

    icon TEXT,

    level_code TEXT
        REFERENCES public.course_levels(code)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    description TEXT,

    image_url TEXT,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE INDEX IF NOT EXISTS idx_poster_pages_level
ON public.poster_pages(level_code);


-- ============================================================
-- 6. POSTER SECTIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.poster_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    page_id UUID NOT NULL
        REFERENCES public.poster_pages(id)
        ON DELETE CASCADE,

    section_key TEXT NOT NULL,

    sort_order SMALLINT NOT NULL,

    title TEXT NOT NULL,

    icon TEXT,

    theme TEXT,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    UNIQUE(page_id, section_key),

    UNIQUE(page_id, sort_order)
);


-- ============================================================
-- 7. POSTER SECTION WORDS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.poster_section_words (
    section_id UUID NOT NULL
        REFERENCES public.poster_sections(id)
        ON DELETE CASCADE,

    vocabulary_id UUID NOT NULL
        REFERENCES public.vocabulary(id)
        ON DELETE RESTRICT,

    sort_order SMALLINT NOT NULL,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    PRIMARY KEY(section_id, vocabulary_id),

    UNIQUE(section_id, sort_order)
);


CREATE INDEX IF NOT EXISTS idx_poster_section_words_vocab
ON public.poster_section_words(vocabulary_id);


-- ============================================================
-- 8. LEARNER WORD PROGRESS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.learner_word_progress (
    learner_id UUID NOT NULL
        REFERENCES public.learners(id)
        ON DELETE CASCADE,

    vocabulary_id UUID NOT NULL
        REFERENCES public.vocabulary(id)
        ON DELETE CASCADE,

    status TEXT NOT NULL DEFAULT 'learning'
        CHECK (
            status IN (
                'new',
                'learning',
                'review',
                'mastered'
            )
        ),

    correct_count INTEGER NOT NULL DEFAULT 0
        CHECK (correct_count >= 0),

    incorrect_count INTEGER NOT NULL DEFAULT 0
        CHECK (incorrect_count >= 0),

    review_count INTEGER NOT NULL DEFAULT 0
        CHECK (review_count >= 0),

    first_seen_at TIMESTAMPTZ,

    last_reviewed_at TIMESTAMPTZ,

    next_review_at TIMESTAMPTZ,

    mastered_at TIMESTAMPTZ,

    mastery_score NUMERIC(5,2)
        NOT NULL DEFAULT 0
        CHECK (mastery_score BETWEEN 0 AND 100),

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY(learner_id, vocabulary_id)
);


CREATE INDEX IF NOT EXISTS idx_progress_learner_status
ON public.learner_word_progress(
    learner_id,
    status
);


CREATE INDEX IF NOT EXISTS idx_progress_next_review
ON public.learner_word_progress(
    learner_id,
    next_review_at
)
WHERE status <> 'mastered';


CREATE INDEX IF NOT EXISTS idx_progress_vocab
ON public.learner_word_progress(vocabulary_id);


-- ============================================================
-- 9. LEARNER LEVEL PROGRESS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.learner_level_progress (
    learner_id UUID NOT NULL
        REFERENCES public.learners(id)
        ON DELETE CASCADE,

    level_code TEXT NOT NULL
        REFERENCES public.course_levels(code)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    is_unlocked BOOLEAN NOT NULL DEFAULT FALSE,

    is_force_unlocked BOOLEAN NOT NULL DEFAULT FALSE,

    mastery_percent NUMERIC(5,2)
        NOT NULL DEFAULT 0
        CHECK (mastery_percent BETWEEN 0 AND 100),

    unlocked_at TIMESTAMPTZ,

    last_calculated_at TIMESTAMPTZ,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY(learner_id, level_code)
);


CREATE INDEX IF NOT EXISTS idx_level_progress_level
ON public.learner_level_progress(level_code);


-- ============================================================
-- 10. QUIZ ATTEMPTS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    learner_id UUID NOT NULL
        REFERENCES public.learners(id)
        ON DELETE CASCADE,

    level_code TEXT
        REFERENCES public.course_levels(code)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    quiz_type TEXT NOT NULL DEFAULT 'practice',

    mode TEXT,

    total_questions INTEGER NOT NULL DEFAULT 0
        CHECK (total_questions >= 0),

    correct_answers INTEGER NOT NULL DEFAULT 0
        CHECK (correct_answers >= 0),

    score_percent NUMERIC(5,2)
        NOT NULL DEFAULT 0
        CHECK (score_percent BETWEEN 0 AND 100),

    passed BOOLEAN NOT NULL DEFAULT FALSE,

    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    completed_at TIMESTAMPTZ,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB
);


CREATE INDEX IF NOT EXISTS idx_quiz_attempts_learner_completed
ON public.quiz_attempts(
    learner_id,
    completed_at DESC
);


CREATE INDEX IF NOT EXISTS idx_quiz_attempts_level
ON public.quiz_attempts(
    level_code,
    passed
);


-- ============================================================
-- 11. QUIZ ANSWERS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.quiz_answers (
    id BIGSERIAL PRIMARY KEY,

    attempt_id UUID NOT NULL
        REFERENCES public.quiz_attempts(id)
        ON DELETE CASCADE,

    question_number INTEGER NOT NULL,

    vocabulary_id UUID
        REFERENCES public.vocabulary(id)
        ON DELETE SET NULL,

    question_type TEXT,

    selected_answer TEXT,

    correct_answer TEXT,

    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    response_ms INTEGER,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    UNIQUE(attempt_id, question_number)
);


CREATE INDEX IF NOT EXISTS idx_quiz_answers_vocab
ON public.quiz_answers(vocabulary_id);


-- ============================================================
-- 12. STAR TRANSACTIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.star_transactions (
    id BIGSERIAL PRIMARY KEY,

    learner_id UUID NOT NULL
        REFERENCES public.learners(id)
        ON DELETE CASCADE,

    amount INTEGER NOT NULL
        CHECK (amount <> 0),

    reason TEXT NOT NULL,

    source_type TEXT,

    source_id TEXT,

    balance_after INTEGER,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE INDEX IF NOT EXISTS idx_star_transactions_learner
ON public.star_transactions(
    learner_id,
    created_at DESC
);


-- ============================================================
-- 13. REWARD DEFINITIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.reward_definitions (
    code TEXT PRIMARY KEY,

    stars_needed INTEGER NOT NULL
        CHECK (stars_needed >= 0),

    title TEXT NOT NULL,

    reward_text TEXT NOT NULL,

    icon TEXT,

    bonus_stars INTEGER NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB
);


-- ============================================================
-- 14. LEARNER REWARDS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.learner_rewards (
    learner_id UUID NOT NULL
        REFERENCES public.learners(id)
        ON DELETE CASCADE,

    reward_code TEXT NOT NULL
        REFERENCES public.reward_definitions(code)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    claimed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    PRIMARY KEY(learner_id, reward_code)
);


CREATE INDEX IF NOT EXISTS idx_learner_rewards_reward
ON public.learner_rewards(reward_code);


-- ============================================================
-- 15. PARENT REMINDERS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.parent_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    learner_id UUID NOT NULL
        REFERENCES public.learners(id)
        ON DELETE CASCADE,

    message TEXT NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    scheduled_for TIMESTAMPTZ,

    delivered_at TIMESTAMPTZ,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE INDEX IF NOT EXISTS idx_parent_reminders_active
ON public.parent_reminders(
    learner_id,
    is_active,
    scheduled_for
);


-- ============================================================
-- 16. IMPORT JOBS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.import_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    job_name TEXT NOT NULL,

    mode TEXT NOT NULL
        CHECK (
            mode IN (
                'UPSERT',
                'CREATE_ONLY',
                'UPDATE_ONLY',
                'SKIP_DUPLICATE'
            )
        ),

    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (
            status IN (
                'pending',
                'dry_run',
                'running',
                'completed',
                'failed',
                'rolled_back'
            )
        ),

    created_count INTEGER NOT NULL DEFAULT 0,

    updated_count INTEGER NOT NULL DEFAULT 0,

    skipped_count INTEGER NOT NULL DEFAULT 0,

    error_count INTEGER NOT NULL DEFAULT 0,

    rollback_payload JSONB,

    metadata JSONB NOT NULL DEFAULT '{}'::JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    completed_at TIMESTAMPTZ,

    rolled_back_at TIMESTAMPTZ
);


-- ============================================================
-- 17. IMPORT JOB ROWS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.import_job_rows (
    id BIGSERIAL PRIMARY KEY,

    job_id UUID NOT NULL
        REFERENCES public.import_jobs(id)
        ON DELETE CASCADE,

    row_number INTEGER NOT NULL,

    action TEXT,

    status TEXT NOT NULL DEFAULT 'pending',

    input_data JSONB NOT NULL DEFAULT '{}'::JSONB,

    result_data JSONB,

    error_code TEXT,

    error_message TEXT,

    UNIQUE(job_id, row_number)
);


CREATE INDEX IF NOT EXISTS idx_import_job_rows_job_status
ON public.import_job_rows(
    job_id,
    status
);


-- ============================================================
-- 18. AUDIT LOGS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id BIGSERIAL PRIMARY KEY,

    actor_type TEXT NOT NULL DEFAULT 'system',

    actor_id TEXT,

    actor_role TEXT,

    action TEXT NOT NULL,

    entity_type TEXT NOT NULL,

    entity_id TEXT,

    before_data JSONB,

    after_data JSONB,

    reason TEXT,

    request_id TEXT,

    ip_address INET,

    user_agent TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE INDEX IF NOT EXISTS idx_audit_entity
ON public.audit_logs(
    entity_type,
    entity_id,
    created_at DESC
);


CREATE INDEX IF NOT EXISTS idx_audit_actor
ON public.audit_logs(
    actor_id,
    created_at DESC
);


CREATE INDEX IF NOT EXISTS idx_audit_created
ON public.audit_logs(created_at DESC);


-- ============================================================
-- 19. APP SETTINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.app_settings (
    key TEXT PRIMARY KEY,

    value JSONB NOT NULL,

    description TEXT,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 20. KIDS PROGRESS (Compatibility Layer)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.kids_progress (
    id INTEGER PRIMARY KEY DEFAULT 1,

    data JSONB NOT NULL DEFAULT '{}'::JSONB,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- SEED INITIAL COURSE LEVELS & DEFAULT LEARNER
-- ============================================================

INSERT INTO public.course_levels (code, sort_order, name, badge, description, target_words, unlock_threshold)
VALUES 
    ('L1', 1, 'Starter English', '🌱 Level 1', 'Từ vựng nền tảng dễ nhớ cho bé', 50, 80.00),
    ('L2', 2, 'Elementary English', '🌟 Level 2', 'Từ vựng giao tiếp hàng ngày', 80, 85.00),
    ('L3', 3, 'Intermediate Kids', '🚀 Level 3', 'Mở rộng câu từ và hình ảnh', 100, 90.00),
    ('L4', 4, 'Advanced Explorer', '🏆 Level 4', 'Khám phá tự nhiên và khoa học', 120, 90.00),
    ('L5', 5, 'Master Communicator', '👑 Level 5', 'Giao tiếp tiếng Anh tự tin', 150, 95.00),
    ('L6', 6, 'English Super Star', '💎 Level 6', 'Thành thạo từ vựng chuẩn Cambridge', 200, 95.00)
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.learners (code, display_name, age_group)
VALUES ('LEARNER_DEFAULT', 'Bé Minh Anh', 'Kids 5-10')
ON CONFLICT (code) DO NOTHING;


-- ============================================================
-- ENABLE ROW LEVEL SECURITY & REVOKE ANON PERMISSIONS
-- ============================================================

ALTER TABLE public.learners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poster_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poster_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poster_section_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_word_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_level_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.star_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_job_rows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kids_progress ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;

-- Confirm created tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
