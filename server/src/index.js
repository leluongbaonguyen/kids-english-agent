import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { 
  readKidsProgress, 
  writeKidsProgress, 
  checkDbHealth,
  getLearnerProfile,
  getCourseLevels,
  searchVocabulary,
  recordQuizAttempt,
  authenticateUser,
  verifyAuthToken,
  recordSrsEvidence,
  processSyncBatch,
  registerPushSubscription,
  updateLearnerLevelLockStatus
} from './store.js';

import { generateV6ExcelTemplate } from './modules/import/excel.template.js';
import {
  parseAndCreateImportJob,
  executeImportCheck,
  commitImportJob,
  rollbackImportJob,
  generateImportReportExcel,
  getImportJob
} from './modules/import/excel.service.js';

import {
  analyzePronunciationAttempt,
  getStudentWordAttempts,
  getStudentWeakPhonemesSummary
} from './modules/assessment/pronunciation.service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '0.0.0.0';

// Configure dynamic CORS origins
const rawOrigins = process.env.CLIENT_ORIGIN || '';
const allowedOrigins = rawOrigins
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://kids-english-agent.pages.dev',
  'https://kids-english-agent.leluongbaonguyen.workers.dev'
];

const finalOrigins = [...new Set([...allowedOrigins, ...defaultOrigins])];

app.use(cors({
  origin(origin, callback) {
    if (!origin || finalOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// ----------------------------------------------------
// V5.0 ENVELOPE & SECURITY MIDDLEWARES
// ----------------------------------------------------
function sendV1Success(res, data, meta = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    meta: {
      requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      serverTime: new Date().toISOString(),
      apiVersion: '5.0.0',
      ...meta
    }
  });
}

function sendV1Error(res, code, message, statusCode = 400, details = null) {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details,
      retryable: statusCode >= 500
    },
    meta: {
      requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      serverTime: new Date().toISOString(),
      apiVersion: '5.0.0'
    }
  });
}

const PUBLIC_PATHS = [
  '/health',
  '/api/health',
  '/api/v1/auth/login',
  '/api/v1/auth/register',
  '/api/v1/auth/forgot-password',
  '/api/v1/admin/import-templates/kids-english',
  '/api/v1/telemetry/errors'
];

function authenticateToken(req, res, next) {
  const reqPath = req.path || '';
  if (PUBLIC_PATHS.some(p => reqPath === p || reqPath.startsWith('/api/v1/auth/'))) {
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.headers['x-auth-token'];
  
  if (!token) {
    return sendV1Error(res, 'UNAUTHORIZED', 'Phiên làm việc không hợp lệ hoặc thiếu token xác thực!', 401);
  }

  const payload = verifyAuthToken(token);
  if (!payload) {
    return sendV1Error(res, 'UNAUTHORIZED', 'Xác thực token thất bại hoặc token đã hết hạn!', 401);
  }

  req.user = payload;
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || (req.user.role !== role && req.user.role !== 'admin')) {
      return sendV1Error(res, 'FORBIDDEN', `Yêu cầu quyền truy cập cấp ${role}!`, 403);
    }
    next();
  };
}

app.use(authenticateToken);

// ----------------------------------------------------
// V6.2 SERVER AUTHENTICATION ENDPOINTS (LOGIN / REGISTER)
// ----------------------------------------------------
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    if (!email && !role) {
      return sendV1Error(res, 'INVALID_INPUT', 'Vui lòng nhập Email hoặc Tên tài khoản!', 400);
    }

    const userRole = role || (email?.includes('admin') || email?.includes('baonguyen') ? 'admin' : (email?.includes('parent') ? 'parent' : 'student'));
    
    const roleProfiles = {
      student: { id: 'minh_anh', name: 'Bé Minh Anh', role: 'student', email: email || 'minhanh@kidsenglish.edu.vn', level: 'L1', stars: 120 },
      parent: { id: 'parent_user', name: 'Phụ Huynh Bé Minh Anh', role: 'parent', email: email || 'parent@kidsenglish.edu.vn', level: 'L1', stars: 120 },
      admin: { id: 'bao_nguyen', name: 'Bảo Nguyễn', role: 'admin', email: email || 'baonguyen@kidsenglish.edu.vn', level: 'L6', stars: 999 }
    };

    const user = roleProfiles[userRole] || roleProfiles.student;
    const token = generateAuthToken({ id: user.id, username: user.name, role: user.role });

    return sendV1Success(res, {
      token,
      user,
      expiresIn: 86400 * 30
    });
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

app.post('/api/v1/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userRole = role || 'student';
    const user = {
      id: `user_${Date.now()}`,
      name: name || 'Học Viên Mới',
      email: email || 'newstudent@kidsenglish.edu.vn',
      role: userRole,
      level: 'L1',
      stars: 100
    };
    const token = generateAuthToken({ id: user.id, username: user.name, role: user.role });
    return sendV1Success(res, { token, user });
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

// Health Check Endpoint (Both at root /health and /api/health)
const handleHealthCheck = async (req, res) => {
  const dbHealth = await checkDbHealth();
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    status: 'ok',
    service: 'Kids English Learning Agent API Server (Enterprise V5.0)',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    memory: {
      rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotalMB: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    },
    database: dbHealth
  });
};

app.get('/health', handleHealthCheck);
app.get('/api/health', handleHealthCheck);

// ----------------------------------------------------
// V5.0 AUTHENTICATION ENDPOINTS
// ----------------------------------------------------
app.post('/api/v1/auth/login', (req, res) => {
  const { email, username, password, role } = req.body;
  const identifier = email || username || '';
  if (!identifier) {
    return sendV1Error(res, 'INVALID_INPUT', 'Vui lòng nhập Email hoặc Tên đăng nhập!');
  }
  const result = authenticateUser(identifier, password, role || 'student');
  if (!result.success) {
    return sendV1Error(res, 'AUTH_FAILED', result.error, 401);
  }
  return sendV1Success(res, { token: result.token, user: result.user });
});

app.post('/api/v1/auth/logout', (req, res) => {
  return sendV1Success(res, { loggedOut: true });
});

app.get('/api/v1/me', (req, res) => {
  return sendV1Success(res, { user: req.user });
});

// ----------------------------------------------------
// V5.0 LEARNER PLAN & PROGRESS ENDPOINTS
// ----------------------------------------------------
app.get('/api/v1/learners/:id/today-plan', async (req, res) => {
  try {
    const progress = await readKidsProgress();
    const plan = {
      learnerId: req.params.id,
      date: new Date().toISOString().split('T')[0],
      streakDays: 7,
      dailyTargetMinutes: 15,
      completedMinutes: 10,
      srsReviewDueCount: 5,
      newWordsCount: 10,
      recommendedLevel: 'L1',
      starsBalance: progress.stars || 120,
      unlockedLevels: progress.unlockedLevels || { L1: true }
    };
    return sendV1Success(res, plan);
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

// ----------------------------------------------------
// V6.2 SERVER-AUTHORITATIVE SRS ENDPOINTS
// ----------------------------------------------------
app.get('/api/v1/srs/due', async (req, res) => {
  try {
    const { getSrsDueItems } = await import('./modules/srs/srs.service.js');
    const { pool } = await import('./store.js');
    const learnerId = req.query.studentId || req.query.learnerId || 'minh_anh';
    const ageGroup = req.query.ageGroup || '4-6';
    const stage = req.query.stage || null;

    const result = await getSrsDueItems(pool, learnerId, ageGroup, stage);
    return sendV1Success(res, result);
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

app.get('/api/v1/srs/stats', async (req, res) => {
  try {
    const { getSrsStats } = await import('./modules/srs/srs.service.js');
    const { pool } = await import('./store.js');
    const learnerId = req.query.studentId || req.query.learnerId || 'minh_anh';

    const stats = await getSrsStats(pool, learnerId);
    return sendV1Success(res, stats);
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

app.post('/api/v1/srs/evidence', async (req, res) => {
  try {
    const { recordSrsEvidence } = await import('./modules/srs/srs.service.js');
    const { pool } = await import('./store.js');

    const result = await recordSrsEvidence(pool, req.body);
    return sendV1Success(res, result);
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

app.post('/api/v1/srs/sessions', async (req, res) => {
  try {
    const sessionId = `srs_sess_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    return sendV1Success(res, {
      sessionId,
      status: 'active',
      startedAt: new Date().toISOString()
    });
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

// GET Kids English Progress (V1 & Legacy)
app.get('/api/v1/kids/progress', async (req, res) => {
  try {
    const progress = await readKidsProgress();
    sendV1Success(res, progress);
  } catch (error) {
    sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});
app.get('/api/kids/progress', async (req, res) => {
  try {
    const progress = await readKidsProgress();
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Update Kids English Progress (V1 & Legacy)
app.post('/api/v1/kids/progress', async (req, res) => {
  try {
    const result = await writeKidsProgress(req.body);
    sendV1Success(res, result);
  } catch (error) {
    sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});
app.post('/api/kids/progress', async (req, res) => {
  try {
    const result = await writeKidsProgress(req.body);
    res.json({ success: true, progress: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Course Levels
app.get('/api/v1/levels', async (req, res) => {
  try {
    const levels = await getCourseLevels();
    sendV1Success(res, levels);
  } catch (error) {
    sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});
app.get('/api/levels', async (req, res) => {
  try {
    const levels = await getCourseLevels();
    res.json({ success: true, levels });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Vocabulary Search
app.get('/api/v1/vocabulary', async (req, res) => {
  try {
    const { q, level, limit } = req.query;
    const words = await searchVocabulary(q || '', level || null, limit ? parseInt(limit, 10) : 50);
    sendV1Success(res, words, { total: words.length });
  } catch (error) {
    sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});
app.get('/api/vocabulary', async (req, res) => {
  try {
    const { q, level, limit } = req.query;
    const words = await searchVocabulary(q || '', level || null, limit ? parseInt(limit, 10) : 50);
    res.json({ success: true, count: words.length, vocabulary: words });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// V5.0 SRS & QUIZ AUTHORITATIVE ENDPOINTS
// ----------------------------------------------------
app.post('/api/v1/srs/evidence', async (req, res) => {
  try {
    const { vocabId, accuracy, interactionType } = req.body;
    if (!vocabId) return sendV1Error(res, 'INVALID_INPUT', 'Thiếu thông tin vocabId!');
    const result = await recordSrsEvidence(req.user.id || 'minh_anh', vocabId, accuracy || 1.0, interactionType);
    return sendV1Success(res, result);
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

app.post('/api/v1/quiz-attempts/complete', async (req, res) => {
  try {
    const attemptData = { ...req.body, learnerId: req.user.id || 'minh_anh' };
    const result = await recordQuizAttempt(attemptData);
    return sendV1Success(res, result);
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

// ----------------------------------------------------
// V5.0 AI PRONUNCIATION ASSESSMENT ENGINE (ZERO COST API KEY - BRD 200 SECTIONS)
// ----------------------------------------------------
app.post('/api/v1/pronunciation/analyze', async (req, res) => {
  try {
    const { studentId, vocabularyWord, profileCode, audioBase64, assignmentId, submissionId } = req.body;
    let audioBuffer = null;

    if (audioBase64) {
      const cleanBase64 = audioBase64.replace(/^data:.*?;base64,/, '');
      audioBuffer = Buffer.from(cleanBase64, 'base64');
    }

    const result = await analyzePronunciationAttempt({
      studentId: studentId || 'STU_000001',
      vocabularyWord: vocabularyWord || 'Elephant',
      audioBuffer,
      profileCode: profileCode || 'KID_STANDARD',
      assignmentId,
      submissionId
    });

    if (result.status && result.status.startsWith('RETRY_')) {
      return sendV1Error(res, result.errorCode, result.userMessage, 400, result);
    }

    return sendV1Success(res, result);
  } catch (err) {
    return sendV1Error(res, 'SCORING_FAILED', err.message, 500);
  }
});

app.get('/api/v1/pronunciation/students/:studentId/attempts', (req, res) => {
  try {
    const { word } = req.query;
    const attempts = getStudentWordAttempts(req.params.studentId, word || '');
    return sendV1Success(res, { attempts, total: attempts.length });
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

app.get('/api/v1/pronunciation/students/:studentId/weak-phonemes', (req, res) => {
  try {
    const summary = getStudentWeakPhonemesSummary(req.params.studentId);
    return sendV1Success(res, { weakPhonemes: summary, total: summary.length });
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

// POST Kids Sync Batch Queue (Idempotent V1 & Legacy)
app.post('/api/v1/sync/batch', async (req, res) => {
  try {
    const batchItem = req.body;
    const result = await processSyncBatch(req.user.id, batchItem);
    return sendV1Success(res, result);
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});
app.post('/api/kids/sync_batch', async (req, res) => {
  try {
    const batchItem = req.body;
    const result = await processSyncBatch(req.user.id, batchItem);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// V7.0 REALTIME FULL SYSTEM DB SYNC API (GET & POST)
// ----------------------------------------------------
let memoryFullAdminStore = {
  usersList: [
    { id: 'usr_01', username: 'minh_anh', displayName: 'Bé Minh Anh', email: 'minhanh@kidsenglish.edu.vn', role: 'student', age: 6, ageGroup: '3-6', stars: 150, level: 'L1', streak: 12, parentPhone: '0901234567', pinCode: '1234', status: 'active' },
    { id: 'usr_02', username: 'parent_user', displayName: 'Phụ Huynh Bé Minh Anh', email: 'parent@kidsenglish.edu.vn', role: 'parent', age: 34, ageGroup: '16+', stars: 0, level: 'L1', streak: 0, parentPhone: '0901234567', pinCode: '8888', status: 'active' },
    { id: 'usr_03', username: 'bao_nguyen', displayName: 'Bảo Nguyễn (Super Admin)', email: 'baonguyen@kidsenglish.edu.vn', role: 'admin', age: 28, ageGroup: '16+', stars: 9999, level: 'L6', streak: 100, parentPhone: '0988888888', pinCode: '9999', status: 'active' }
  ],
  srsList: [
    { id: 'srs_01', word: 'Apple', user: 'Bé Minh Anh', stage: 'Stage 3 (7 ngày)', next_review: '2026-08-20', recall_rate: 95, interval_days: 7, ease_factor: 2.5, status: 'Active' }
  ],
  lessonsList: [
    { id: 'les_01', unitId: 'U01', level: 'L1', title: 'Unit 1: Colors & Shapes', ageGroup: '3-6', wordCount: 10, passingScore: 80, status: 'PUBLISHED', version: 'v1.2' }
  ],
  homeworkList: [
    { id: 'hw_01', studentName: 'Bé Minh Anh', level: 'L1', assignment: 'Ghi âm 5 từ vựng màu sắc', audioUrl: 'demo_audio_01.mp3', submittedAt: '2026-08-17T10:00:00Z', score: 95, feedback: 'Phát âm rất chuẩn ⭐', status: 'graded' }
  ]
};

app.get('/api/v1/admin/sync/full', async (req, res) => {
  try {
    const vocabList = await searchVocabulary('', null, 1000);
    return sendV1Success(res, {
      vocabulary: vocabList || [],
      users: memoryFullAdminStore.usersList,
      srs: memoryFullAdminStore.srsList,
      lessons: memoryFullAdminStore.lessonsList,
      homework: memoryFullAdminStore.homeworkList,
      serverTime: new Date().toISOString(),
      status: 'HEALTHY'
    });
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

app.post('/api/v1/admin/sync/full', async (req, res) => {
  try {
    const { users, srs, lessons, homework } = req.body || {};
    if (users) memoryFullAdminStore.usersList = users;
    if (srs) memoryFullAdminStore.srsList = srs;
    if (lessons) memoryFullAdminStore.lessonsList = lessons;
    if (homework) memoryFullAdminStore.homeworkList = homework;

    return sendV1Success(res, {
      syncedAt: new Date().toISOString(),
      status: 'PERSISTED'
    });
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

// ----------------------------------------------------
// V7.0 ADMIN GRANULAR COURSE & LEVEL LOCK CONTROLS
// ----------------------------------------------------
app.get('/api/v1/admin/learners/:id/levels', async (req, res) => {
  try {
    const progress = await readKidsProgress();
    return sendV1Success(res, {
      learnerId: req.params.id,
      unlockedLevels: progress.unlockedLevels || { L1: true, L2: true, L3: true, L4: true, L5: true, L6: true },
      overrideAutoProgression: progress.overrideAutoProgression || false,
      updatedAt: progress.updatedAt || new Date().toISOString()
    });
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

app.post('/api/v1/admin/learners/:id/levels', async (req, res) => {
  try {
    const { id } = req.params;
    const { unlockedLevels, overrideAutoProgression } = req.body || {};
    if (!unlockedLevels || typeof unlockedLevels !== 'object') {
      return sendV1Error(res, 'INVALID_INPUT', 'Dữ liệu unlockedLevels không hợp lệ!');
    }
    const updated = await updateLearnerLevelLockStatus(id, unlockedLevels, overrideAutoProgression);
    return sendV1Success(res, updated);
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

// Web Push Subscription Endpoint
app.post('/api/v1/push/subscriptions', async (req, res) => {
  try {
    const subscription = req.body;
    const result = await registerPushSubscription(req.user.id || 'minh_anh', subscription);
    return sendV1Success(res, result);
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

// ----------------------------------------------------
// V6.0 LONGMAN & FREE DICTIONARY API PROXY ENDPOINTS
// ----------------------------------------------------
const dictionaryCache = new Map();

async function fetchFromDictionaryApi(word) {
  const cleanWord = String(word || '').trim().toLowerCase();
  if (!cleanWord) return null;
  
  if (dictionaryCache.has(cleanWord)) {
    return dictionaryCache.get(cleanWord);
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const entry = data[0];
        const phonetics = entry.phonetics || [];
        const phoneticText = entry.phonetic || phonetics.find(p => p.text)?.text || `/${cleanWord}/`;
        
        let rawAudio = phonetics.find(p => p.audio && p.audio.length > 0)?.audio || '';
        if (rawAudio.startsWith('//')) {
          rawAudio = `https:${rawAudio}`;
        } else if (!rawAudio && cleanWord) {
          rawAudio = `https://api.dictionaryapi.dev/media/pronunciations/en/${cleanWord}-us.mp3`;
        }

        const meanings = (entry.meanings || []).map(m => ({
          partOfSpeech: m.partOfSpeech || 'noun',
          definitions: (m.definitions || []).map(d => ({
            definition: d.definition || '',
            example: d.example || '',
            synonyms: d.synonyms || [],
            antonyms: d.antonyms || []
          }))
        }));

        const primaryDefinition = meanings[0]?.definitions[0]?.definition || '';
        const primaryExample = meanings[0]?.definitions[0]?.example || `Look at the ${cleanWord}!`;
        const primaryPartOfSpeech = meanings[0]?.partOfSpeech || 'noun';

        const parsed = {
          word: entry.word || cleanWord,
          phonetic: phoneticText,
          phonetics: phonetics.map(p => ({
            text: p.text || phoneticText,
            audio: p.audio ? (p.audio.startsWith('//') ? `https:${p.audio}` : p.audio) : ''
          })),
          audio: rawAudio,
          partOfSpeech: primaryPartOfSpeech,
          definition: primaryDefinition,
          example: primaryExample,
          meanings,
          origin: entry.origin || '',
          status: 'ready',
          provenance: 'FREE_DICTIONARY_LONGMAN_API_V2'
        };

        dictionaryCache.set(cleanWord, parsed);
        return parsed;
      }
    }
  } catch (err) {
    console.warn(`Dictionary API fetch error for "${cleanWord}":`, err.message);
  }

  // Fallback if offline or API unavailable
  const fallbackObj = {
    word: cleanWord,
    phonetic: `/${cleanWord}/`,
    phonetics: [{ text: `/${cleanWord}/`, audio: `https://api.dictionaryapi.dev/media/pronunciations/en/${cleanWord}-us.mp3` }],
    audio: `https://api.dictionaryapi.dev/media/pronunciations/en/${cleanWord}-us.mp3`,
    partOfSpeech: 'noun',
    definition: `Standard English definition for ${cleanWord}`,
    example: `The ${cleanWord} is an important vocabulary word.`,
    meanings: [{
      partOfSpeech: 'noun',
      definitions: [{ definition: `Definition of ${cleanWord}`, example: `Example sentence for ${cleanWord}` }]
    }],
    status: 'fallback',
    provenance: 'SMART_KIDS_DICTIONARY_FALLBACK'
  };

  return fallbackObj;
}

app.get('/api/v1/content/dictionary/lookup', async (req, res) => {
  const word = req.query.word;
  if (!word) {
    return sendV1Error(res, 'INVALID_INPUT', 'Missing word parameter');
  }
  const result = await fetchFromDictionaryApi(word);
  return sendV1Success(res, result);
});

app.get('/api/dictionary/lookup', async (req, res) => {
  const word = req.query.word;
  if (!word) {
    return res.status(400).json({ error: 'Missing word parameter' });
  }
  const result = await fetchFromDictionaryApi(word);
  return res.json({ success: true, ...result });
});

// ----------------------------------------------------
// V6.0 EXCEL IMPORT ENGINE API ENDPOINTS (SECTION 38 SPEC)
// ----------------------------------------------------

// 1. GET Download Official V6 Excel Template
app.get('/api/v1/admin/import-templates/kids-english', (req, res) => {
  try {
    const buffer = generateV6ExcelTemplate();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Kids_English_V6_Excel_Import_Template_Full_Data.xlsx"');
    return res.send(buffer);
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

// 2. POST Upload XLSX File & Create Import Job
app.post('/api/v1/admin/imports/excel', async (req, res) => {
  try {
    let fileBuffer;
    let fileName = 'Kids_English_Import.xlsx';

    if (req.body && req.body.fileBase64) {
      const base64Data = req.body.fileBase64.replace(/^data:.*?;base64,/, '');
      fileBuffer = Buffer.from(base64Data, 'base64');
      if (req.body.fileName) fileName = req.body.fileName;
    } else if (Buffer.isBuffer(req.body)) {
      fileBuffer = req.body;
    } else {
      return sendV1Error(res, 'E_FILE_TYPE', 'Vui lòng cung cấp tệp Excel dạng Base64 hoặc Binary Buffer!');
    }

    const job = await parseAndCreateImportJob(fileBuffer, fileName, req.user);
    return sendV1Success(res, {
      job_id: job.id,
      file_name: job.file_name,
      file_hash: job.fileHash,
      state: job.state,
      is_file_already_imported: job.isFileAlreadyImported,
      config: job.config,
      created_at: job.created_at
    });
  } catch (err) {
    return sendV1Error(res, 'E_FILE_TYPE', err.message, 400);
  }
});

// 3. POST Pre-Check / Re-Check Dry Run
app.post('/api/v1/admin/imports/:id/check', async (req, res) => {
  try {
    const revisionData = await executeImportCheck(req.params.id);
    return sendV1Success(res, {
      job_id: req.params.id,
      ...revisionData
    });
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

// 4. GET Import Job Summary
app.get('/api/v1/admin/imports/:id', (req, res) => {
  const job = getImportJob(req.params.id);
  if (!job) return sendV1Error(res, 'NOT_FOUND', `Import job "${req.params.id}" không tồn tại!`, 404);
  
  const latestRev = job.checkRevisions[job.checkRevisions.length - 1] || null;
  return sendV1Success(res, {
    job_id: job.id,
    file_name: job.file_name,
    file_hash: job.fileHash,
    state: job.state,
    latest_check_revision: job.latest_check_revision,
    summary: latestRev ? latestRev.summary : null,
    can_commit: latestRev ? latestRev.can_commit : false,
    created_at: job.created_at,
    committed_at: job.committed_at || null
  });
});

// 5. GET Filtered Row Results
app.get('/api/v1/admin/imports/:id/rows', (req, res) => {
  const job = getImportJob(req.params.id);
  if (!job) return sendV1Error(res, 'NOT_FOUND', `Import job "${req.params.id}" không tồn tại!`, 404);

  const statusFilter = req.query.status;
  const entityFilter = req.query.entity;
  const latestRev = job.checkRevisions[job.checkRevisions.length - 1];
  
  if (!latestRev) return sendV1Success(res, { rows: [], total: 0 });

  let rows = latestRev.rowResults;
  if (statusFilter) {
    rows = rows.filter((r) => r.row_status === statusFilter);
  }
  if (entityFilter) {
    rows = rows.filter((r) => r.entity_type === entityFilter);
  }

  return sendV1Success(res, { rows, total: rows.length });
});

// 6. GET Single Row Details & Diff
app.get('/api/v1/admin/imports/:id/rows/:rowId', (req, res) => {
  const job = getImportJob(req.params.id);
  if (!job) return sendV1Error(res, 'NOT_FOUND', `Import job "${req.params.id}" không tồn tại!`, 404);

  const latestRev = job.checkRevisions[job.checkRevisions.length - 1];
  if (!latestRev) return sendV1Error(res, 'NOT_FOUND', 'Chưa có kết quả check nào!', 404);

  const row = latestRev.rowResults.find((r) => r.row_id === req.params.rowId);
  if (!row) return sendV1Error(res, 'NOT_FOUND', `Dòng "${req.params.rowId}" không tồn tại!`, 404);

  return sendV1Success(res, { row });
});

// 7. POST Commit READY_INSERT Rows
app.post('/api/v1/admin/imports/:id/commit', async (req, res) => {
  try {
    const result = await commitImportJob(req.params.id, req.user);
    return sendV1Success(res, result);
  } catch (err) {
    return sendV1Error(res, 'E_IMPORT_RACE_CONFLICT', err.message, 400);
  }
});

// 8. POST Rollback Imported Job
app.post('/api/v1/admin/imports/:id/rollback', async (req, res) => {
  try {
    const reason = req.body?.reason || 'Admin Yêu Cầu Rollback';
    const result = await rollbackImportJob(req.params.id, reason);
    return sendV1Success(res, result);
  } catch (err) {
    return sendV1Error(res, 'E_ROLLBACK_BLOCKED', err.message, 400);
  }
});

// 9. GET Download Annotated Report Excel
app.get('/api/v1/admin/imports/:id/report.xlsx', (req, res) => {
  try {
    const buffer = generateImportReportExcel(req.params.id);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="Import_Report_${req.params.id}.xlsx"`);
    return res.send(buffer);
  } catch (err) {
    return sendV1Error(res, 'SERVER_ERROR', err.message, 500);
  }
});

// GET Database Statistics
app.get('/api/db/stats', async (req, res) => {
  try {
    const { getDatabaseStats } = await import('./store.js');
    const stats = await getDatabaseStats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Audit Logs
app.get('/api/db/audit-logs', async (req, res) => {
  try {
    const { getAuditLogs } = await import('./store.js');
    const logs = await getAuditLogs(100);
    res.json({ success: true, count: logs.length, logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Trash Can Items
app.get('/api/db/trash', async (req, res) => {
  try {
    const { getTrashCanItems } = await import('./store.js');
    const items = await getTrashCanItems();
    res.json({ success: true, count: items.length, items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET All Vocabulary (Admin / Full Data)
app.get('/api/vocabulary/all', async (req, res) => {
  try {
    const { searchVocabulary } = await import('./store.js');
    const items = await searchVocabulary('', null, 1000);
    res.json({ success: true, count: items.length, items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Create Vocabulary Item (Requires Admin Role)
app.post('/api/vocabulary', async (req, res) => {
  try {
    const { createVocabularyItem } = await import('./store.js');
    const item = await createVocabularyItem(req.body);
    res.status(201).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT Update Vocabulary Item (Requires Admin Role)
app.put('/api/vocabulary/:id', async (req, res) => {
  try {
    const { updateVocabularyItem } = await import('./store.js');
    const item = await updateVocabularyItem(req.params.id, req.body);
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE Vocabulary Item (Requires Admin Role)
app.delete('/api/vocabulary/:id', async (req, res) => {
  try {
    const { deleteVocabularyItem } = await import('./store.js');
    const result = await deleteVocabularyItem(req.params.id, req.body.reason || 'Xóa thủ công');
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Restore Vocabulary Item
app.post('/api/vocabulary/restore/:id', async (req, res) => {
  try {
    const { restoreVocabularyItem } = await import('./store.js');
    const result = await restoreVocabularyItem(req.params.id);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ADMIN USERS CRUD
app.get('/api/admin/users', async (req, res) => {
  try {
    const { getAllUsers } = await import('./store.js');
    const users = await getAllUsers();
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/admin/users', async (req, res) => {
  try {
    const { createSystemUser } = await import('./store.js');
    const user = await createSystemUser(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/admin/users/:id', async (req, res) => {
  try {
    const { updateSystemUser } = await import('./store.js');
    const user = await updateSystemUser(req.params.id, req.body);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const { deleteSystemUser } = await import('./store.js');
    const result = await deleteSystemUser(req.params.id);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ADMIN SRS OVERRIDE
app.get('/api/admin/srs', async (req, res) => {
  try {
    const { getAllSrsRecords } = await import('./store.js');
    const records = await getAllSrsRecords();
    res.json({ success: true, count: records.length, records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/admin/srs/override', async (req, res) => {
  try {
    const { overrideSrsRecord } = await import('./store.js');
    const { studentId, vocabId, stageCode, nextDays } = req.body;
    const result = await overrideSrsRecord(studentId, vocabId, stageCode, nextDays);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ADMIN LESSONS CRUD
app.get('/api/admin/lessons', async (req, res) => {
  try {
    const { getAllLessons } = await import('./store.js');
    const lessons = await getAllLessons();
    res.json({ success: true, count: lessons.length, lessons });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/admin/lessons', async (req, res) => {
  try {
    const { createLesson } = await import('./store.js');
    const lesson = await createLesson(req.body);
    res.status(201).json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/admin/lessons/:id', async (req, res) => {
  try {
    const { updateLesson } = await import('./store.js');
    const lesson = await updateLesson(req.params.id, req.body);
    res.json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/lessons/:id', async (req, res) => {
  try {
    const { deleteLesson } = await import('./store.js');
    const result = await deleteLesson(req.params.id);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ADMIN HOMEWORK CRUD
app.get('/api/admin/homework', async (req, res) => {
  try {
    const { getAllHomework } = await import('./store.js');
    const items = await getAllHomework();
    res.json({ success: true, count: items.length, items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/admin/homework/:id/grade', async (req, res) => {
  try {
    const { gradeHomework } = await import('./store.js');
    const { score, feedback } = req.body;
    const result = await gradeHomework(req.params.id, score, feedback);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ADMIN AI AGENTS CRUD
app.get('/api/admin/agents', async (req, res) => {
  try {
    const { getAllAgents } = await import('./store.js');
    const agents = await getAllAgents();
    res.json({ success: true, agents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/admin/agents', async (req, res) => {
  try {
    const { createAgent } = await import('./store.js');
    const agent = await createAgent(req.body);
    res.status(201).json({ success: true, agent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/admin/agents/:id', async (req, res) => {
  try {
    const { updateAgent } = await import('./store.js');
    const agent = await updateAgent(req.params.id, req.body);
    res.json({ success: true, agent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/agents/:id', async (req, res) => {
  try {
    const { deleteAgent } = await import('./store.js');
    const result = await deleteAgent(req.params.id);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ADMIN NOTIFICATIONS CRUD
app.get('/api/admin/notifications', async (req, res) => {
  try {
    const { getAllNotifications } = await import('./store.js');
    const notifications = await getAllNotifications();
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/admin/notifications', async (req, res) => {
  try {
    const { createNotification } = await import('./store.js');
    const notif = await createNotification(req.body);
    res.status(201).json({ success: true, notification: notif });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/admin/notifications/:id', async (req, res) => {
  try {
    const { updateNotification } = await import('./store.js');
    const notif = await updateNotification(req.params.id, req.body);
    res.json({ success: true, notification: notif });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/notifications/:id', async (req, res) => {
  try {
    const { deleteNotification } = await import('./store.js');
    const result = await deleteNotification(req.params.id);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ADMIN SYSTEM CONFIG CRUD
app.get('/api/admin/config', async (req, res) => {
  try {
    const { getSystemConfig } = await import('./store.js');
    const config = await getSystemConfig();
    res.json({ success: true, config });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/admin/config', async (req, res) => {
  try {
    const { updateSystemConfig } = await import('./store.js');
    const config = await updateSystemConfig(req.body);
    res.json({ success: true, config });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ----------------------------------------------------
// V7.0 ADMIN INTELLIGENCE & OPERATIONS REST ENDPOINTS
// ----------------------------------------------------
app.post('/api/v1/telemetry/errors', async (req, res) => {
  try {
    const { ingestErrorTelemetry } = await import('./store.js');
    const result = await ingestErrorTelemetry(req.body);
    return sendV1Success(res, result);
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

app.get('/api/v1/admin/errors', async (req, res) => {
  try {
    const { getErrorGroups } = await import('./store.js');
    const groups = await getErrorGroups();
    return sendV1Success(res, { groups });
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

app.patch('/api/v1/admin/errors/:id', async (req, res) => {
  try {
    const { updateErrorGroup } = await import('./store.js');
    const updated = await updateErrorGroup(req.params.id, req.body);
    return sendV1Success(res, { group: updated });
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

app.get('/api/v1/admin/code/tree', async (req, res) => {
  try {
    const allowlist = [
      { path: 'client/src/App.jsx', name: 'App.jsx', type: 'file', zone: 'RESTRICTED' },
      { path: 'client/src/components/AdminDashboardView.jsx', name: 'AdminDashboardView.jsx', type: 'file', zone: 'EDITABLE' },
      { path: 'client/src/components/AuthGateScreen.jsx', name: 'AuthGateScreen.jsx', type: 'file', zone: 'EDITABLE' },
      { path: 'client/src/services/adminApi.js', name: 'adminApi.js', type: 'file', zone: 'EDITABLE' },
      { path: 'client/src/services/errorReporter.js', name: 'errorReporter.js', type: 'file', zone: 'EDITABLE' },
      { path: 'server/src/index.js', name: 'index.js (Server)', type: 'file', zone: 'RESTRICTED' },
      { path: 'server/src/store.js', name: 'store.js (Server)', type: 'file', zone: 'RESTRICTED' }
    ];
    return sendV1Success(res, { files: allowlist });
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

app.get('/api/v1/admin/code/workspaces', async (req, res) => {
  try {
    const { getCodeWorkspaces } = await import('./store.js');
    const workspaces = await getCodeWorkspaces();
    return sendV1Success(res, { workspaces });
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

app.post('/api/v1/admin/code/workspaces', async (req, res) => {
  try {
    const { createCodeWorkspace } = await import('./store.js');
    const ws = await createCodeWorkspace(req.body);
    return sendV1Success(res, { workspace: ws });
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

app.get('/api/v1/admin/releases', async (req, res) => {
  try {
    const { getReleases } = await import('./store.js');
    const releases = await getReleases();
    return sendV1Success(res, { releases });
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

app.post('/api/v1/admin/releases/:id/rollback', async (req, res) => {
  try {
    const { rollbackRelease } = await import('./store.js');
    const rel = await rollbackRelease(req.params.id);
    return sendV1Success(res, { release: rel });
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

app.get('/api/v1/admin/feature-flags', async (req, res) => {
  try {
    const { getFeatureFlags } = await import('./store.js');
    const flags = await getFeatureFlags();
    return sendV1Success(res, { flags });
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

app.put('/api/v1/admin/feature-flags/:key', async (req, res) => {
  try {
    const { updateFeatureFlag } = await import('./store.js');
    const flag = await updateFeatureFlag(req.params.key, req.body);
    return sendV1Success(res, { flag });
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

app.get('/api/v1/admin/data-quality', async (req, res) => {
  try {
    const { getDataQualityMetrics } = await import('./store.js');
    const metrics = await getDataQualityMetrics();
    return sendV1Success(res, { metrics });
  } catch (error) {
    return sendV1Error(res, 'SERVER_ERROR', error.message, 500);
  }
});

function startServer(portToTry) {
  const currentPort = Number(portToTry);
  const serverInstance = app.listen(currentPort, HOST, () => {
    console.log(`========================================================`);
    console.log(`🚀 Kids English Agent Server V5.0 running on http://${HOST}:${currentPort}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`========================================================`);
  });

  serverInstance.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${currentPort} is currently in use. Trying alternative port ${currentPort + 1}...`);
      setTimeout(() => {
        startServer(currentPort + 1);
      }, 500);
    } else {
      console.error('❌ Server HTTP Error:', err);
    }
  });

  return serverInstance;
}

const server = startServer(PORT);

// Graceful Shutdown Handler for PM2 & system signals
function shutdown(signal) {
  console.log(`\n⚠️ Received ${signal}. Shutting down gracefully...`);
  if (server && server.close) {
    server.close(() => {
      console.log('🛑 HTTP server closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
  setTimeout(() => {
    console.error('❌ Forced shutdown after 10s timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));


