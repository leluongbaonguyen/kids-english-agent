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
  recordQuizAttempt
} from './store.js';

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

// Default development & production origins fallback
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

// Health Check Endpoint (Both at root /health and /api/health)
const handleHealthCheck = async (req, res) => {
  const dbHealth = await checkDbHealth();
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    status: 'ok',
    service: 'Kids English Learning Agent API Server (Enterprise DB 2.0)',
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

// GET Kids English Progress
app.get('/api/kids/progress', async (req, res) => {
  try {
    const progress = await readKidsProgress();
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Update Kids English Progress
app.post('/api/kids/progress', async (req, res) => {
  try {
    const updatedData = req.body;
    const result = await writeKidsProgress(updatedData);
    res.json({ success: true, progress: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Learner Profile
app.get('/api/learners/default', async (req, res) => {
  try {
    const learner = await getLearnerProfile('LEARNER_DEFAULT');
    res.json({ success: true, learner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Course Levels
app.get('/api/levels', async (req, res) => {
  try {
    const levels = await getCourseLevels();
    res.json({ success: true, levels });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Vocabulary Search/Filter
app.get('/api/vocabulary', async (req, res) => {
  try {
    const { q, level, limit } = req.query;
    const words = await searchVocabulary(q || '', level || null, limit ? parseInt(limit, 10) : 50);
    res.json({ success: true, count: words.length, vocabulary: words });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Record Quiz Attempt
app.post('/api/quizzes/attempt', async (req, res) => {
  try {
    const attemptData = req.body;
    const result = await recordQuizAttempt(attemptData);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Dictionary Proxy Endpoint for Kids
app.get('/api/dictionary/lookup', (req, res) => {
  const word = req.query.word;
  if (!word) {
    return res.status(400).json({ error: 'Missing word parameter' });
  }
  res.json({
    word: word.toLowerCase(),
    phonetic: `/${word.toLowerCase()}/`,
    status: 'ready'
  });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`========================================================`);
  console.log(`🚀 Kids English Agent Server running on http://${HOST}:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`========================================================`);
});

// Graceful Shutdown Handler for PM2 & system signals
function shutdown(signal) {
  console.log(`\n⚠️ Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('🛑 HTTP server closed.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('❌ Forced shutdown after 10s timeout');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
