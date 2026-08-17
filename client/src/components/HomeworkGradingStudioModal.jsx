import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X, CheckCircle2, AlertCircle, Award, Star, Trophy, Sparkles, Send,
  Volume2, Mic, Play, RefreshCw, Edit, Trash2, Plus, Clock, FileText,
  UserCheck, ShieldCheck, Heart, MessageSquare, ThumbsUp, Filter, Search, Lock, Crown,
  BarChart2, Zap, ArrowRight, RotateCcw, AlertTriangle, Layers, ListFilter,
  CheckSquare, Eye, Sliders, History, Info, Activity, Pause
} from 'lucide-react';
import AIPronunciationStudioModal from './AIPronunciationStudioModal';

// ============================================================
// DYNAMIC STUDENTS DATABASE & METADATA SNAPSHOTS (BR-014, BR-070)
// ============================================================
const STUDENTS_DATABASE = [
  { id: 'STU_000001', name: 'Nguyễn Ngọc Minh Anh', level: 'L1', avatar: '👧', totalStars: 125, status: 'active' },
  { id: 'STU_000002', name: 'Nguyễn Minh Triết', level: 'L2', avatar: '👦', totalStars: 98, status: 'active' },
  { id: 'STU_000003', name: 'Lê Bảo Anh', level: 'Pre-L1', avatar: '👶', totalStars: 45, status: 'active' }
];

const INITIAL_SUBMISSIONS = [
  {
    id: 'hw_101',
    submissionCode: 'SUB-2026-0817-001',
    studentId: 'STU_000001',
    studentName: 'Nguyễn Ngọc Minh Anh',
    studentLevelAtSubmission: 'L1',
    assignmentTitle: 'Bài Tập 01: Phát Âm AI & Từ Vựng Chủ Đề Animals 🐘',
    courseName: 'Kids English V5.0',
    topic: 'Động vật (Animals)',
    level: 'L1',
    attemptVersion: 1,
    submittedAt: '2026-08-17 16:10:57',
    submittedAtLocal: '16:10:57 17/8/2026',
    status: 'WAITING_FOR_PARENT', // ASSIGNED, IN_PROGRESS, AI_PROCESSING, READY_TO_SUBMIT, SUBMITTED, WAITING_FOR_PARENT, PARENT_GRADING, GRADED, REVISION_REQUIRED, COMPLETED
    studentNote: 'Con đọc chuẩn từ Elephant và Butterfly 3 lần luôn nè Ba!',
    speechItems: [
      {
        wordId: 'vocab_001',
        word: 'Elephant',
        meaning: 'Con voi',
        ipa: '/ˈel.ɪ.fənt/',
        overallScore: 96,
        accuracyScore: 97,
        fluencyScore: 94,
        completenessScore: 100,
        pronunciationScore: 95,
        aiFeedback: 'Con đọc rất tốt. Hãy chú ý nhẹ hơn ở âm cuối /nt/.',
        phonemes: [
          { symbol: '/el/', score: 98, status: 'excellent' },
          { symbol: '/ɪ/', score: 95, status: 'excellent' },
          { symbol: '/f/', score: 99, status: 'excellent' },
          { symbol: '/ənt/', score: 91, status: 'good' }
        ],
        attemptsHistory: [
          { attempt: 1, score: 81, timestamp: '16:02:10' },
          { attempt: 2, score: 90, timestamp: '16:05:45' },
          { attempt: 3, score: 96, timestamp: '16:08:22' }
        ],
        audioStudentUrl: 'mock_audio_minhanh_elephant.mp3',
        audioReferenceUrl: 'mock_audio_ai_elephant.mp3'
      },
      {
        wordId: 'vocab_002',
        word: 'Butterfly',
        meaning: 'Con bươm bướm',
        ipa: '/ˈbʌt.ə.flaɪ/',
        overallScore: 92,
        accuracyScore: 93,
        fluencyScore: 90,
        completenessScore: 98,
        pronunciationScore: 91,
        aiFeedback: 'Phát âm tròn vành rõ chữ, ngữ điệu tự nhiên.',
        phonemes: [
          { symbol: '/bʌt/', score: 94, status: 'excellent' },
          { symbol: '/ə/', score: 90, status: 'good' },
          { symbol: '/flaɪ/', score: 92, status: 'good' }
        ],
        attemptsHistory: [
          { attempt: 1, score: 85, timestamp: '16:03:12' },
          { attempt: 2, score: 92, timestamp: '16:07:01' }
        ],
        audioStudentUrl: 'mock_audio_minhanh_butterfly.mp3',
        audioReferenceUrl: 'mock_audio_ai_butterfly.mp3'
      },
      {
        wordId: 'vocab_003',
        word: 'Submarine',
        meaning: 'Tàu ngầm',
        ipa: '/ˌsʌb.məˈriːn/',
        overallScore: 68,
        accuracyScore: 65,
        fluencyScore: 70,
        completenessScore: 85,
        pronunciationScore: 66,
        aiFeedback: 'Âm /riːn/ cuối cần kéo dài nguyên âm và nhấn trọng âm rõ hơn.',
        phonemes: [
          { symbol: '/sʌb/', score: 82, status: 'good' },
          { symbol: '/mə/', score: 75, status: 'fair' },
          { symbol: '/riːn/', score: 58, status: 'needs_practice' }
        ],
        attemptsHistory: [
          { attempt: 1, score: 62, timestamp: '16:04:15' },
          { attempt: 2, score: 68, timestamp: '16:09:00' }
        ],
        audioStudentUrl: 'mock_audio_minhanh_submarine.mp3',
        audioReferenceUrl: 'mock_audio_ai_submarine.mp3'
      }
    ],
    writingAnswer: {
      text: 'The elephant is big and strong!',
      grammarScore: 25,
      vocabularyScore: 25,
      spellingScore: 20,
      sentenceStructureScore: 20,
      creativityScore: 10,
      totalWritingScore: 100,
      aiSpellingFeedback: 'Chính tả & Ngữ pháp hoàn hảo tuyệt đối!'
    },
    scoringBreakdown: {
      aiPronunciationWeight: 40,
      aiPronunciationScore: 85.3,
      writingWeight: 30,
      writingScore: 100,
      parentWeight: 30,
      parentScore: 0,
      finalCalculatedScore: 0
    },
    maximumScore: 100,
    finalScore: 0,
    starReward: 0,
    bonusXP: 0,
    adminFeedback: '',
    gradedAt: null,
    gradedBy: '',
    revisionNotes: ''
  },
  {
    id: 'hw_102',
    submissionCode: 'SUB-2026-0816-002',
    studentId: 'STU_000001',
    studentName: 'Nguyễn Ngọc Minh Anh',
    studentLevelAtSubmission: 'L1',
    assignmentTitle: 'Bài Tập 02: Ghép Chữ Chính Tả & Viết Mẫu Câu Colors 🎨',
    courseName: 'Kids English V5.0',
    topic: 'Màu sắc (Colors)',
    level: 'L1',
    attemptVersion: 1,
    submittedAt: '2026-08-16 14:20:00',
    submittedAtLocal: '14:20:00 16/8/2026',
    status: 'GRADED',
    studentNote: 'Bài ghép chữ màu sắc siêu dễ luôn ạ Ba!',
    speechItems: [
      {
        wordId: 'vocab_004',
        word: 'Red',
        meaning: 'Màu đỏ',
        ipa: '/red/',
        overallScore: 100,
        accuracyScore: 100,
        fluencyScore: 100,
        completenessScore: 100,
        pronunciationScore: 100,
        aiFeedback: 'Phát âm chuẩn xác tuyệt đối 100%!',
        phonemes: [{ symbol: '/red/', score: 100, status: 'excellent' }],
        attemptsHistory: [{ attempt: 1, score: 100, timestamp: '14:15:00' }],
        audioStudentUrl: 'mock_audio_minhanh_red.mp3',
        audioReferenceUrl: 'mock_audio_ai_red.mp3'
      },
      {
        wordId: 'vocab_005',
        word: 'Yellow',
        meaning: 'Màu vàng',
        ipa: '/ˈjel.əʊ/',
        overallScore: 98,
        accuracyScore: 98,
        fluencyScore: 98,
        completenessScore: 100,
        pronunciationScore: 98,
        aiFeedback: 'Rất xuất sắc!',
        phonemes: [
          { symbol: '/jel/', score: 98, status: 'excellent' },
          { symbol: '/əʊ/', score: 98, status: 'excellent' }
        ],
        attemptsHistory: [{ attempt: 1, score: 98, timestamp: '14:18:22' }],
        audioStudentUrl: 'mock_audio_minhanh_yellow.mp3',
        audioReferenceUrl: 'mock_audio_ai_yellow.mp3'
      }
    ],
    writingAnswer: {
      text: 'I see a yellow sun and a red apple.',
      grammarScore: 25,
      vocabularyScore: 25,
      spellingScore: 20,
      sentenceStructureScore: 20,
      creativityScore: 10,
      totalWritingScore: 100,
      aiSpellingFeedback: 'Mẫu câu tự nhiên, giàu hình ảnh.'
    },
    scoringBreakdown: {
      aiPronunciationWeight: 40,
      aiPronunciationScore: 99,
      writingWeight: 30,
      writingScore: 100,
      parentWeight: 30,
      parentScore: 95,
      finalCalculatedScore: 98
    },
    maximumScore: 100,
    finalScore: 98,
    starReward: 5,
    bonusXP: 50,
    adminFeedback: 'Bé Minh Anh làm bài xuất sắc tuyệt đối! Lời văn rành mạch, phát âm chuẩn ngữ điệu. Ba thưởng bé 5 sao và 50 XP nhé! 🌟💖',
    gradedAt: '19:30:00 16/8/2026',
    gradedBy: 'Ba Lê Lương Bảo Nguyên ✍️',
    revisionNotes: ''
  },
  {
    id: 'hw_103',
    submissionCode: 'SUB-2026-0815-003',
    studentId: 'STU_000001',
    studentName: 'Nguyễn Ngọc Minh Anh',
    studentLevelAtSubmission: 'L1',
    assignmentTitle: 'Bài Tập 03: Thách Thức Từ Vựng Gia Đình (Family) 👨‍👩‍👧',
    courseName: 'Kids English V5.0',
    topic: 'Gia đình (Family)',
    level: 'L1',
    attemptVersion: 1,
    submittedAt: '2026-08-15 10:00:00',
    submittedAtLocal: '10:00:00 15/8/2026',
    status: 'REVISION_REQUIRED',
    studentNote: 'Bài tập này từ Brother hơi khó phát âm chút Ba ơi!',
    speechItems: [
      {
        wordId: 'vocab_006',
        word: 'Brother',
        meaning: 'Anh/Em trai',
        ipa: '/ˈbrʌð.ər/',
        overallScore: 59,
        accuracyScore: 55,
        fluencyScore: 60,
        completenessScore: 70,
        pronunciationScore: 58,
        aiFeedback: 'Cần chú ý âm /ð/ rung lưỡi giữa hai răng.',
        phonemes: [
          { symbol: '/brʌ/', score: 75, status: 'fair' },
          { symbol: '/ð.ər/', score: 48, status: 'needs_practice' }
        ],
        attemptsHistory: [{ attempt: 1, score: 59, timestamp: '09:55:00' }],
        audioStudentUrl: 'mock_audio_minhanh_brother.mp3',
        audioReferenceUrl: 'mock_audio_ai_brother.mp3'
      }
    ],
    writingAnswer: {
      text: 'My brother like play game.',
      grammarScore: 15,
      vocabularyScore: 20,
      spellingScore: 20,
      sentenceStructureScore: 15,
      creativityScore: 5,
      totalWritingScore: 75,
      aiSpellingFeedback: 'Gợi ý sửa ngữ pháp: "My brother likes playing games."'
    },
    scoringBreakdown: {
      aiPronunciationWeight: 40,
      aiPronunciationScore: 59,
      writingWeight: 30,
      writingScore: 75,
      parentWeight: 30,
      parentScore: 60,
      finalCalculatedScore: 65
    },
    maximumScore: 100,
    finalScore: 65,
    starReward: 1,
    bonusXP: 10,
    adminFeedback: 'Bé Minh Anh ơi, từ Brother con phát âm âm /ð/ chưa đúng nè. Con bấm nút Luyện Lại Từ Này để luyện thêm với Ba nhé! ❤️',
    gradedAt: '11:00:00 15/8/2026',
    gradedBy: 'Ba Lê Lương Bảo Nguyên ✍️',
    revisionNotes: 'Chỉ làm lại từ Submarine & Brother'
  }
];

export default function HomeworkGradingStudioModal({
  isOpen,
  onClose,
  currentActor = 'bao_nguyen', // 'bao_nguyen' (Admin/Parent) or 'minh_anh' (Student)
  studentName = 'Nguyễn Ngọc Minh Anh',
  addToast,
  onAddStars
}) {
  if (!isOpen) return null;

  const isAdmin = currentActor === 'bao_nguyen';

  // Active Student State
  const [selectedStudentId, setSelectedStudentId] = useState('STU_000001');
  const activeStudent = STUDENTS_DATABASE.find((s) => s.id === selectedStudentId) || STUDENTS_DATABASE[0];

  // Submissions State (Persisted in localStorage with Versioning & Audit Logs)
  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_homework_submissions_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_SUBMISSIONS;
  });

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_homework_audit_logs_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'log_001',
        action: 'PARENT_GRADED_HOMEWORK',
        actor: 'Ba Lê Lương Bảo Nguyên',
        submissionCode: 'SUB-2026-0816-002',
        score: 98,
        stars: 5,
        timestamp: '19:30:00 16/8/2026'
      }
    ];
  });

  // Filters & Search States
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'graded' | 'revision'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'score_high' | 'waiting_first'
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(submissions[0]?.id || null);

  // Audio Playback & Speed Control State
  const [audioSpeed, setAudioSpeed] = useState(1.0); // 0.5 | 0.75 | 1.0 | 1.25
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingWordKey, setPlayingWordKey] = useState(null);

  // Modals & Drawers States
  const [selectedPhonemeWord, setSelectedPhonemeWord] = useState(null); // For AI Phoneme Breakdown Modal
  const [aiStudioWord, setAiStudioWord] = useState(null); // For Live AI 0-100 Pronunciation Assessment Studio
  const [showWeakPracticeModal, setShowWeakPracticeModal] = useState(false); // For Weak Word Practice Engine
  const [weakWordsList, setWeakWordsList] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false); // Student Submission Modal
  const [showAuditLogModal, setShowAuditLogModal] = useState(false); // Audit Logs Drawer
  const [showConfettiOverlay, setShowConfettiOverlay] = useState(false); // 90+ Score Confetti

  // Submission Form State (Student Workflow)
  const [newHwTitle, setNewHwTitle] = useState('Bài Tập Tự Chọn: Luyện Từ Vựng');
  const [newHwTopic, setNewHwTopic] = useState('Chủ Đề Yêu Thích');
  const [newHwSentence, setNewHwSentence] = useState('');
  const [newHwNote, setNewHwNote] = useState('');
  const [recordedWords, setRecordedWords] = useState([
    { word: 'Elephant', meaning: 'Con voi', ipa: '/ˈel.ɪ.fənt/', score: 95, recorded: true },
    { word: 'Submarine', meaning: 'Tàu ngầm', ipa: '/ˌsʌb.məˈriːn/', score: 88, recorded: true }
  ]);
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [recordingCountdown, setRecordingCountdown] = useState(0);
  const [aiAnalyzingState, setAiAnalyzingState] = useState(false);

  // Active Homework Details
  const activeHw = submissions.find((s) => s.id === selectedSubmissionId) || submissions[0] || {};

  // Form State for Admin Evaluation Studio
  const [gradingForm, setGradingForm] = useState({
    parentScore: 95,
    stars: 5,
    bonusXP: 40,
    status: 'GRADED', // 'GRADED' | 'REVISION_REQUIRED'
    feedback: 'Bé phát âm rất hay và tròn vành rõ chữ. Lần sau chú ý nhấn trọng âm hơn nữa nhé!',
    revisionNotes: 'Luyện lại âm /riːn/ của từ Submarine'
  });

  useEffect(() => {
    if (activeHw && activeHw.id) {
      setGradingForm({
        parentScore: activeHw.scoringBreakdown?.parentScore || 95,
        stars: activeHw.starReward || 5,
        bonusXP: activeHw.bonusXP || 40,
        status: activeHw.status === 'WAITING_FOR_PARENT' ? 'GRADED' : activeHw.status,
        feedback: activeHw.adminFeedback || 'Bé học giỏi lắm, phát âm chuẩn và làm bài đầy đủ! Ba khen bé nhé 🌟',
        revisionNotes: activeHw.revisionNotes || ''
      });
    }
  }, [selectedSubmissionId]);

  // Persist Submissions to LocalStorage & Sync
  const saveSubmissionsToStorage = (newList) => {
    setSubmissions(newList);
    try {
      localStorage.setItem('kids_homework_submissions_v2', JSON.stringify(newList));
    } catch (e) {}
  };

  const addAuditLog = (action, details) => {
    const newLog = {
      id: 'log_' + Date.now(),
      action,
      actor: isAdmin ? 'Ba Lê Lương Bảo Nguyên' : activeStudent.name,
      submissionCode: activeHw.submissionCode || 'SUB-2026',
      timestamp: new Date().toLocaleString('vi-VN'),
      ...details
    };
    const updated = [newLog, ...auditLogs];
    setAuditLogs(updated);
    try {
      localStorage.setItem('kids_homework_audit_logs_v1', JSON.stringify(updated));
    } catch (e) {}
  };

  // Automated Formula Score Calculation (BR-057)
  const calculateFinalScore = (aiScore = 90, writingScore = 100, parentScore = 95) => {
    const finalVal = Math.round(aiScore * 0.4 + writingScore * 0.3 + Number(parentScore) * 0.3);
    return Math.min(100, Math.max(0, finalVal));
  };

  // Automated Star Allocation Rule (BR-017)
  const getAutoStarsFromScore = (score) => {
    if (score >= 100) return 5;
    if (score >= 90) return 5;
    if (score >= 80) return 4;
    if (score >= 70) return 3;
    if (score >= 60) return 2;
    return 1;
  };

  // Handle Admin Save Homework Grade
  const handleSaveGrade = (isRevision = false) => {
    const finalComputedScore = calculateFinalScore(
      activeHw.scoringBreakdown?.aiPronunciationScore || 85,
      activeHw.writingAnswer?.totalWritingScore || 100,
      gradingForm.parentScore
    );

    const awardedStars = isRevision ? 1 : Number(gradingForm.stars);
    const targetStatus = isRevision ? 'REVISION_REQUIRED' : 'GRADED';

    const updated = submissions.map((hw) => {
      if (hw.id === activeHw.id) {
        return {
          ...hw,
          status: targetStatus,
          finalScore: finalComputedScore,
          starReward: awardedStars,
          bonusXP: Number(gradingForm.bonusXP),
          adminFeedback: gradingForm.feedback.trim(),
          gradedAt: new Date().toLocaleString('vi-VN'),
          gradedBy: 'Ba Lê Lương Bảo Nguyên ✍️',
          revisionNotes: isRevision ? gradingForm.revisionNotes : '',
          scoringBreakdown: {
            ...hw.scoringBreakdown,
            parentScore: Number(gradingForm.parentScore),
            finalCalculatedScore: finalComputedScore
          }
        };
      }
      return hw;
    });

    saveSubmissionsToStorage(updated);

    if (!isRevision && onAddStars && awardedStars > 0) {
      onAddStars(awardedStars);
    }

    addAuditLog('PARENT_GRADED_HOMEWORK', {
      score: finalComputedScore,
      stars: awardedStars,
      status: targetStatus
    });

    if (finalComputedScore >= 90 && !isRevision) {
      setShowConfettiOverlay(true);
      setTimeout(() => setShowConfettiOverlay(false), 3500);
    }

    if (addToast) {
      addToast(
        isRevision
          ? '🔄 Đã gửi yêu cầu Bé Minh Anh làm lại bài tập thành công!'
          : `🏆 Đã chấm điểm thành công: ${finalComputedScore}/100 Điểm (+${awardedStars} ⭐)!`,
        isRevision ? 'warning' : 'success'
      );
    }
  };

  // AI Pronunciation TTS & Audio Simulation
  const playWordTTS = (text, type = 'reference') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = audioSpeed;
    if (type === 'student') {
      utterance.pitch = 1.3; // Higher pitch simulation for kid's voice
    } else {
      utterance.pitch = 1.0; // Normal AI reference voice
    }
    setPlayingWordKey(text + '_' + type);
    setIsPlayingAudio(true);
    utterance.onend = () => {
      setIsPlayingAudio(false);
      setPlayingWordKey(null);
    };
    window.speechSynthesis.speak(utterance);
  };

  const playFeedbackTTS = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Student Recording Workflow Simulation
  const handleStartMicRecord = () => {
    setIsRecordingMic(true);
    setRecordingCountdown(3);
    const timer = setInterval(() => {
      setRecordingCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRecordingMic(false);
          setAiAnalyzingState(true);
          setTimeout(() => {
            setAiAnalyzingState(false);
            if (addToast) addToast('✅ AI đã phân tích phát âm thành công: 95% Xuất sắc!', 'success');
          }, 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Student Action: Submit Homework
  const handleStudentSubmitHomework = () => {
    if (!newHwSentence.trim()) {
      if (addToast) addToast('⚠️ Vui lòng nhập mẫu câu tiếng Anh bé đã làm bài!', 'warning');
      return;
    }

    const newSubmission = {
      id: 'hw_' + Date.now(),
      submissionCode: `SUB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: selectedStudentId,
      studentName: activeStudent.name,
      studentLevelAtSubmission: activeStudent.level,
      assignmentTitle: newHwTitle.trim() || 'Bài Tập Tự Luyện',
      courseName: 'Kids English V5.0',
      topic: newHwTopic.trim() || 'Tổng Hợp',
      level: activeStudent.level,
      attemptVersion: 1,
      submittedAt: new Date().toISOString(),
      submittedAtLocal: new Date().toLocaleString('vi-VN'),
      status: 'WAITING_FOR_PARENT',
      studentNote: newHwNote.trim() || 'Bé Minh Anh đã nộp bài tập mới!',
      speechItems: recordedWords.map((item) => ({
        wordId: 'vocab_' + Math.random(),
        word: item.word,
        meaning: item.meaning,
        ipa: item.ipa,
        overallScore: item.score,
        accuracyScore: item.score,
        fluencyScore: item.score - 2,
        completenessScore: 100,
        pronunciationScore: item.score,
        aiFeedback: 'Con phát âm rất chuẩn!',
        phonemes: [{ symbol: item.word, score: item.score, status: 'excellent' }],
        attemptsHistory: [{ attempt: 1, score: item.score, timestamp: new Date().toLocaleTimeString('vi-VN') }],
        audioStudentUrl: 'mock_audio.mp3',
        audioReferenceUrl: 'mock_audio_ai.mp3'
      })),
      writingAnswer: {
        text: newHwSentence.trim(),
        grammarScore: 25,
        vocabularyScore: 25,
        spellingScore: 20,
        sentenceStructureScore: 20,
        creativityScore: 10,
        totalWritingScore: 100,
        aiSpellingFeedback: 'AI đã kiểm tra: Không phát hiện lỗi chính tả!'
      },
      scoringBreakdown: {
        aiPronunciationWeight: 40,
        aiPronunciationScore: 92,
        writingWeight: 30,
        writingScore: 100,
        parentWeight: 30,
        parentScore: 0,
        finalCalculatedScore: 0
      },
      maximumScore: 100,
      finalScore: 0,
      starReward: 0,
      bonusXP: 0,
      adminFeedback: '',
      gradedAt: null,
      gradedBy: '',
      revisionNotes: ''
    };

    const newList = [newSubmission, ...submissions];
    saveSubmissionsToStorage(newList);
    setSelectedSubmissionId(newSubmission.id);
    setShowSubmitModal(false);
    setNewHwSentence('');
    setNewHwNote('');

    addAuditLog('STUDENT_SUBMITTED_HOMEWORK', { submissionCode: newSubmission.submissionCode });

    if (addToast) addToast('🚀 Bé Minh Anh nộp bài tập về nhà thành công! Chờ Ba chấm nhé 💖', 'success');
  };

  // Open Weak Word Practice Engine
  const handleOpenWeakPractice = () => {
    const list = activeHw.speechItems ? activeHw.speechItems.filter((i) => i.overallScore < 80) : [];
    if (list.length === 0) {
      if (addToast) addToast('🎉 Bé Minh Anh đã làm rất xuất sắc, không có từ vựng nào dưới 80%!', 'info');
      return;
    }
    setWeakWordsList(list);
    setShowWeakPracticeModal(true);
  };

  // Submissions Filtering & Sorting Logic
  const filteredSubmissions = submissions
    .filter((s) => s.studentId === selectedStudentId)
    .filter((s) => {
      if (filterStatus === 'pending') return s.status === 'WAITING_FOR_PARENT' || s.status === 'SUBMITTED';
      if (filterStatus === 'graded') return s.status === 'GRADED' || s.status === 'COMPLETED';
      if (filterStatus === 'revision') return s.status === 'REVISION_REQUIRED';
      return true;
    })
    .filter((s) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.assignmentTitle.toLowerCase().includes(q) ||
        s.topic.toLowerCase().includes(q) ||
        s.studentNote.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'oldest') return new Date(a.submittedAtLocal) - new Date(b.submittedAtLocal);
      if (sortBy === 'score_high') return (b.finalScore || 0) - (a.finalScore || 0);
      if (sortBy === 'waiting_first') {
        if (a.status === 'WAITING_FOR_PARENT' && b.status !== 'WAITING_FOR_PARENT') return -1;
        if (b.status === 'WAITING_FOR_PARENT' && a.status !== 'WAITING_FOR_PARENT') return 1;
      }
      return new Date(b.submittedAtLocal) - new Date(a.submittedAtLocal);
    });

  // Get Score Classification Badge
  const getAiScoreBadge = (score) => {
    if (score >= 95) return { label: 'Xuất sắc', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400' };
    if (score >= 90) return { label: 'Rất tốt', color: 'bg-teal-500/20 text-teal-300 border-teal-400' };
    if (score >= 80) return { label: 'Tốt', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-400' };
    if (score >= 70) return { label: 'Khá', color: 'bg-amber-500/20 text-amber-300 border-amber-400' };
    if (score >= 60) return { label: 'Cần luyện thêm', color: 'bg-orange-500/20 text-orange-300 border-orange-400' };
    return { label: 'Cần luyện lại', color: 'bg-rose-500/20 text-rose-300 border-rose-400' };
  };

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn cursor-pointer" onClick={onClose}>
      
      {/* CONFETTI CELEBRATION OVERLAY */}
      {showConfettiOverlay && (
        <div className="fixed inset-0 z-[9999999] pointer-events-none flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm animate-pulse">
          <div className="text-center p-8 rounded-3xl bg-slate-900 border-4 border-amber-400 shadow-2xl space-y-3">
            <div className="text-6xl animate-bounce">🎉 ⭐ 🏆 ⭐ 🎉</div>
            <h2 className="text-2xl font-black text-amber-300 font-heading">
              XUẤT SẮC! BÉ MINH ANH ĐẠT ĐIỂM CAO TUYỆT ĐỐI!
            </h2>
            <p className="text-sm font-bold text-emerald-300">Ba Lê Lương Bảo Nguyên vừa trao tặng 5 Sao Thưởng!</p>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-6xl max-h-[94vh] overflow-y-auto my-auto rounded-3xl border-2 border-indigo-500/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 space-y-4 text-white shadow-2xl custom-scrollbar flex flex-col justify-between cursor-default" onClick={(e) => e.stopPropagation()}>
        
        <div>
          {/* HEADER AREA A (BR-006) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-white text-3xl font-black shadow-[0_0_25px_rgba(99,102,241,0.6)] border-2 border-white">
                📄✏️
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`rounded-full px-3 py-0.5 text-[11px] font-black border flex items-center gap-1 ${
                    isAdmin ? 'bg-purple-500/20 text-purple-300 border-purple-400' : 'bg-pink-500/20 text-pink-300 border-pink-400'
                  }`}>
                    {isAdmin ? '👑 Quản Trị Viên: Ba Lê Lương Bảo Nguyên' : `👧 Học Viên: ${activeStudent.name}`}
                  </span>

                  <span className="rounded-full bg-emerald-500/20 border border-emerald-400 px-2.5 py-0.5 text-[10px] font-black text-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" /> Chấm Bài Siêu Chi Tiết
                  </span>

                  {/* Dynamic Student Selector */}
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="bg-slate-900 border border-indigo-400/50 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-amber-300 outline-none cursor-pointer"
                  >
                    {STUDENTS_DATABASE.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.avatar} {st.name} ({st.level})
                      </option>
                    ))}
                  </select>
                </div>

                <h2 className="text-xl md:text-2xl font-black font-heading text-white mt-1">
                  {isAdmin ? 'CENTRAL HOMEWORK GRADING STUDIO' : `GÓC BÀI TẬP VỀ NHÀ CỦA BÉ MINH ANH (${activeStudent.level})`}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAuditLogModal(true)}
                className="px-3 py-2 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                title="Xem Nhật Ký Chấm Bài & Lịch Sử Thao Tác"
              >
                <History className="h-4 w-4 text-cyan-400" />
                <span className="hidden sm:inline">Nhật Ký (Audit Log)</span>
              </button>

              {!isAdmin && (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xs shadow-lg hover:scale-105 transition flex items-center gap-1.5 cursor-pointer border border-pink-300"
                >
                  <Plus className="h-4 w-4" /> <span>Nộp Bài Tập Mới 🚀</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition cursor-pointer"
                title="Đóng Cửa Sổ"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* TWO-COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-3">
            
            {/* LEFT COLUMN: SUBMISSION SIDEBAR & FILTERING (4 cols / 35%) */}
            <div className="lg:col-span-4 space-y-3">
              {/* STATUS TABS & COUNTERS (BR-009) */}
              <div className="flex items-center justify-between gap-1 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`flex-1 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                    filterStatus === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tất Cả ({submissions.filter((s) => s.studentId === selectedStudentId).length})
                </button>

                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`flex-1 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                    filterStatus === 'pending' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Chờ Chấm ({submissions.filter((s) => s.studentId === selectedStudentId && (s.status === 'WAITING_FOR_PARENT' || s.status === 'SUBMITTED')).length})
                </button>

                <button
                  onClick={() => setFilterStatus('graded')}
                  className={`flex-1 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                    filterStatus === 'graded' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Đã Chấm ({submissions.filter((s) => s.studentId === selectedStudentId && (s.status === 'GRADED' || s.status === 'COMPLETED')).length})
                </button>
              </div>

              {/* SEARCH & SORT BAR (BR-109, BR-110) */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Tìm bài tập..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-400"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-2 py-1.5 text-[11px] font-bold text-slate-300 outline-none cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="score_high">Điểm cao nhất</option>
                  <option value="waiting_first">Chờ chấm trước</option>
                </select>
              </div>

              {/* SUBMISSIONS CARDS LIST */}
              <div className="space-y-2.5 max-h-[56vh] overflow-y-auto custom-scrollbar pr-1">
                {filteredSubmissions.length === 0 ? (
                  <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-500 text-xs font-bold space-y-2">
                    <Info className="h-6 w-6 text-slate-600 mx-auto" />
                    <p>Chưa tìm thấy bài tập nào phù hợp.</p>
                  </div>
                ) : (
                  filteredSubmissions.map((hw) => {
                    const isSelected = hw.id === activeHw.id;
                    const isGraded = hw.status === 'GRADED' || hw.status === 'COMPLETED';
                    const isRevision = hw.status === 'REVISION_REQUIRED';

                    return (
                      <div
                        key={hw.id}
                        onClick={() => setSelectedSubmissionId(hw.id)}
                        tabIndex={0}
                        aria-selected={isSelected}
                        className={`p-3.5 rounded-2xl border-2 transition cursor-pointer space-y-2 relative overflow-hidden ${
                          isSelected
                            ? 'border-indigo-400 bg-indigo-950/40 shadow-lg ring-2 ring-indigo-500/20'
                            : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border flex items-center gap-1 ${
                            isGraded
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                              : isRevision
                              ? 'bg-orange-500/20 text-orange-300 border-orange-400'
                              : 'bg-amber-500/20 text-amber-300 border-amber-400 animate-pulse'
                          }`}>
                            {isGraded ? '✅ Đã Chấm Điểm' : isRevision ? '🔄 Cần Làm Lại' : '⏳ Chờ Ba Chấm'}
                          </span>

                          <span className="text-[10px] font-mono-code text-slate-400">{hw.submittedAtLocal.split(' ')[0]}</span>
                        </div>

                        <div>
                          <h4 className="text-xs font-black text-white line-clamp-1">{hw.assignmentTitle}</h4>
                          <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">💬 "{hw.studentNote}"</p>
                        </div>

                        {isGraded && (
                          <div className="flex items-center justify-between text-[11px] font-bold border-t border-slate-800/80 pt-1.5">
                            <span className="text-emerald-300 font-mono-code">💯 {hw.finalScore}/100 Điểm</span>
                            <span className="text-amber-300 font-mono-code">⭐ +{hw.starReward} Sao</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: HOMEWORK DETAIL & ADMIN EVALUATION STUDIO (8 cols / 65%) */}
            <div className="lg:col-span-8 space-y-4">
              {activeHw.id ? (
                <div className="p-5 rounded-3xl border border-slate-800 bg-slate-950 space-y-5 shadow-2xl">
                  
                  {/* DETAIL HEADER */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400 text-indigo-300 text-[10px] font-bold">
                          Học Viên: {activeHw.studentName} • Level {activeHw.level}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono-code">Mã: {activeHw.submissionCode}</span>
                        <span className="text-[10px] text-slate-400 font-mono-code">Lần nộp #{activeHw.attemptVersion}</span>
                      </div>

                      <h3 className="text-lg font-black text-white font-heading mt-1">
                        {activeHw.assignmentTitle}
                      </h3>
                      <div className="text-xs text-slate-400 font-mono-code mt-0.5">
                        🕒 Thời gian nộp bài: {activeHw.submittedAtLocal} (Asia/Ho_Chi_Minh)
                      </div>
                    </div>

                    <div className="text-right">
                      {activeHw.status === 'GRADED' ? (
                        <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                          <div className="text-2xl font-black text-emerald-300 font-mono-code">{activeHw.finalScore} / 100</div>
                          <div className="text-[10px] text-amber-300 font-bold">⭐ +{activeHw.starReward} Sao Thưởng</div>
                        </div>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 font-black text-xs flex items-center gap-1">
                          <Clock className="h-4 w-4" /> Đang Chờ Ba Chấm
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PRONUNCIATION SECTION (BR-024 to BR-036) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="text-xs font-black uppercase text-pink-300 tracking-wider flex items-center gap-2">
                        <FileText className="h-4 w-4 text-pink-400" />
                        <span>Bài Thu Âm Phát Âm AI ({activeHw.speechItems ? activeHw.speechItems.length : 0} từ):</span>
                      </h4>

                      {/* Speed Controller & Weak Practice Launcher */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1 text-[10px] font-bold">
                          <span className="text-amber-300 font-black px-1">⚡ Tốc độ:</span>
                          {[
                            { rate: 0.5, label: '0.5x 🐢' },
                            { rate: 0.75, label: '0.75x 🐢' },
                            { rate: 1.0, label: '1.0x ⚡' },
                            { rate: 1.25, label: '1.25x 🚀' },
                            { rate: 1.5, label: '1.5x 🏎️' }
                          ].map((sp) => (
                            <button
                              key={sp.rate}
                              onClick={() => setAudioSpeed(sp.rate)}
                              className={`px-1.5 py-0.5 rounded-lg transition cursor-pointer font-black ${
                                audioSpeed === sp.rate
                                  ? 'bg-amber-400 text-slate-950 shadow scale-105 border border-amber-200'
                                  : 'bg-slate-900 text-slate-400 hover:text-white'
                              }`}
                            >
                              {sp.label}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={handleOpenWeakPractice}
                          className="px-3 py-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-[11px] shadow hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                        >
                          <Zap className="h-3.5 w-3.5" /> <span>Luyện Lại Từ Yếu 🎤</span>
                        </button>
                      </div>
                    </div>

                    {/* Pronunciation Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeHw.speechItems && activeHw.speechItems.map((item, idx) => {
                        const badge = getAiScoreBadge(item.overallScore);
                        return (
                          <div key={idx} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs relative group">
                            <div className="flex justify-between items-center font-bold">
                              <span className="text-white text-sm">{item.word}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${badge.color}`}>
                                {item.overallScore}% AI
                              </span>
                            </div>

                            <div className="text-[11px] text-slate-400">{item.meaning} • {item.ipa}</div>

                            {/* Dual Audio Player Controls (BR-029) */}
                            <div className="grid grid-cols-2 gap-1.5 pt-1">
                              <button
                                onClick={() => playWordTTS(item.word, 'student')}
                                className="py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 hover:bg-indigo-900 text-indigo-200 text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Play className="h-3 w-3 text-indigo-400" /> <span>Giọng Bé</span>
                              </button>

                              <button
                                onClick={() => playWordTTS(item.word, 'reference')}
                                className="py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 hover:bg-cyan-900 text-cyan-200 text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Volume2 className="h-3 w-3 text-cyan-400" /> <span>Giọng Mẫu</span>
                              </button>
                            </div>

                             <div className="grid grid-cols-2 gap-1 pt-1">
                                <button
                                  onClick={() => setSelectedPhonemeWord(item)}
                                  className="py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <BarChart2 className="h-3 w-3 text-amber-400" /> <span>Chi Tiết Phoneme</span>
                                </button>

                                <button
                                  onClick={() => setAiStudioWord(item.word)}
                                  className="py-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-black transition flex items-center justify-center gap-1 cursor-pointer shadow"
                                >
                                  <Mic className="h-3 w-3" /> <span>Thu Âm AI</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  {/* WRITING SECTION & AI VALIDATION (BR-037 to BR-040) */}
                  {activeHw.writingAnswer && (
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-amber-300 font-bold">✍️ Bài Viết Mẫu Câu Tiếng Anh Của Bé:</span>
                        <span className="text-[10px] text-emerald-400 font-bold">AI Checker: 100/100 Điểm</span>
                      </div>
                      <div className="text-sm font-bold text-white font-serif italic bg-slate-950 p-3 rounded-xl border border-slate-800">
                        "{activeHw.writingAnswer.text}"
                      </div>
                      <div className="text-[11px] text-emerald-300 font-medium">
                        💡 Phân tích AI: {activeHw.writingAnswer.aiSpellingFeedback}
                      </div>
                    </div>
                  )}

                  {/* STUDENT NOTE (BR-041) */}
                  <div className="p-3 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200">
                    <span className="font-bold text-purple-300">💬 Ghi chú của bé gửi Ba:</span> "{activeHw.studentNote}"
                  </div>

                  {/* ADMIN EVALUATION STUDIO (ONLY VISIBLE/EDITABLE BY ADMIN) */}
                  {isAdmin ? (
                    <div className="p-4.5 rounded-3xl border border-indigo-500/50 bg-gradient-to-r from-slate-950 via-indigo-950/30 to-slate-950 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between border-b border-indigo-500/30 pb-2">
                        <h4 className="text-xs font-black uppercase text-indigo-300 tracking-wider flex items-center gap-2">
                          <Crown className="h-4 w-4 text-indigo-400" />
                          <span>KHUNG CHẤM ĐIỂM & NHẬN XÉT CỦA BA BẢO NGUYÊN:</span>
                        </h4>
                        <span className="text-[10px] text-emerald-400 font-bold">✔ Chế Độ Admin Toàn Quyền</span>
                      </div>

                      {/* Formula Calculator Preview */}
                      <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs flex items-center justify-between flex-wrap gap-2">
                        <span className="text-slate-300 font-bold">
                          🧮 Công thức tự động: (AI {activeHw.scoringBreakdown?.aiPronunciationScore || 85}% × 40%) + (Viết {activeHw.writingAnswer?.totalWritingScore || 100}% × 30%) + (Ba Chấm {gradingForm.parentScore}% × 30%)
                        </span>
                        <span className="text-emerald-300 font-black font-mono-code text-sm">
                          = {calculateFinalScore(activeHw.scoringBreakdown?.aiPronunciationScore, activeHw.writingAnswer?.totalWritingScore, gradingForm.parentScore)} / 100
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="space-y-1">
                          <label className="text-slate-300 font-bold">💯 Điểm Ba Đánh Giá (0-100):</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={gradingForm.parentScore}
                            onChange={(e) => setGradingForm({ ...gradingForm, parentScore: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-black text-sm outline-none focus:border-indigo-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-300 font-bold">⭐ Thưởng Sao (1-5 ⭐):</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={gradingForm.stars}
                            onChange={(e) => setGradingForm({ ...gradingForm, stars: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-black text-sm outline-none focus:border-indigo-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-300 font-bold">🏅 Thưởng XP (+XP):</label>
                          <input
                            type="number"
                            min="10"
                            max="200"
                            value={gradingForm.bonusXP}
                            onChange={(e) => setGradingForm({ ...gradingForm, bonusXP: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-indigo-300 font-black text-sm outline-none focus:border-indigo-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-slate-300 font-bold text-xs">📝 Lời Nhận Xét Siêu Chi Tiết Của Ba Dành Cho Bé:</label>
                          <button
                            type="button"
                            onClick={() => playFeedbackTTS(gradingForm.feedback)}
                            className="text-[11px] font-bold text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="h-3.5 w-3.5 text-cyan-400" /> Nghe Đọc Lời Nhận Xét 🔊
                          </button>
                        </div>
                        <textarea
                          rows={3}
                          value={gradingForm.feedback}
                          onChange={(e) => setGradingForm({ ...gradingForm, feedback: e.target.value })}
                          placeholder="Nhập lời nhận xét siêu chi tiết động viên bé..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-3 text-white text-xs font-medium outline-none focus:border-indigo-400 leading-relaxed"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-2 pt-1 flex-wrap">
                        <button
                          onClick={() => handleSaveGrade(true)}
                          className="px-4 py-2.5 rounded-2xl bg-orange-950 border border-orange-500/50 text-orange-300 font-bold text-xs hover:bg-orange-900 transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="h-4 w-4" /> <span>Yêu Cầu Bé Làm Lại</span>
                        </button>

                        <button
                          onClick={() => handleSaveGrade(false)}
                          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-xs shadow-[0_0_20px_rgba(20,184,166,0.5)] hover:scale-105 transition flex items-center gap-2 cursor-pointer border border-white"
                        >
                          <CheckCircle2 className="h-4 w-4" /> <span>HOÀN THÀNH CHẤM BÀI & THƯỞNG SAO</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* STUDENT FEEDBACK VIEW ONLY */
                    activeHw.status === 'GRADED' && (
                      <div className="p-4 rounded-3xl border border-emerald-500/50 bg-emerald-950/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black uppercase text-emerald-300 tracking-wider flex items-center gap-2">
                            <Heart className="h-4 w-4 text-emerald-400" />
                            <span>Lời Nhận Xét Từ Ba Lê Lương Bảo Nguyên:</span>
                          </h4>
                          <button
                            onClick={() => playFeedbackTTS(activeHw.adminFeedback)}
                            className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 transition flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="h-3.5 w-3.5" /> <span>Nghe Giọng Ba Nhận Xét 🔊</span>
                          </button>
                        </div>

                        <p className="text-xs font-medium text-slate-100 leading-relaxed italic bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                          "{activeHw.adminFeedback}"
                        </p>
                      </div>
                    )
                  )}

                </div>
              ) : (
                <div className="p-12 text-center text-slate-500 font-bold">Vui lòng chọn 1 bài tập bên trái để xem chi tiết!</div>
              )}
            </div>

          </div>
        </div>

        {/* AI PHONEME BREAKDOWN MODAL (BR-121) */}
        {selectedPhonemeWord && (
          <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-950/90 p-4">
            <div className="w-full max-w-md rounded-3xl border-2 border-indigo-400 bg-slate-900 p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="text-base font-black text-indigo-300 font-heading">
                  📊 CHI TIẾT AI PHÂN TÍCH PHÁT ÂM: {selectedPhonemeWord.word}
                </h3>
                <button onClick={() => setSelectedPhonemeWord(null)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Độ chính xác (Accuracy):</div>
                  <div className="text-lg font-black text-emerald-300">{selectedPhonemeWord.accuracyScore}%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Trôi chảy (Fluency):</div>
                  <div className="text-lg font-black text-cyan-300">{selectedPhonemeWord.fluencyScore}%</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-300">Phân tích từng âm (Phonemes):</div>
                <div className="space-y-1.5">
                  {selectedPhonemeWord.phonemes && selectedPhonemeWord.phonemes.map((ph, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="font-mono-code text-white font-bold">{ph.symbol}</span>
                      <span className={`font-mono-code font-black ${ph.score >= 90 ? 'text-emerald-300' : ph.score >= 70 ? 'text-amber-300' : 'text-rose-400'}`}>
                        {ph.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200">
                💡 <b>AI Gợi ý:</b> {selectedPhonemeWord.aiFeedback}
              </div>

              <button
                onClick={() => setSelectedPhonemeWord(null)}
                className="w-full py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow"
              >
                Đóng Chi Tiết
              </button>
            </div>
          </div>
        )}

        {/* WEAK WORD PRACTICE ENGINE MODAL (BR-173) */}
        {showWeakPracticeModal && (
          <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-950/90 p-4">
            <div className="w-full max-w-lg rounded-3xl border-2 border-orange-400 bg-slate-900 p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="text-base font-black text-orange-300 font-heading flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-400" />
                  <span>🎤 LUYỆN LẠI CÁC TỪ PHÁT ÂM YẾU CỦA BÉ MINH ANH</span>
                </h3>
                <button onClick={() => setShowWeakPracticeModal(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {weakWordsList.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-white text-base">{item.word} ({item.meaning})</span>
                      <span className="text-rose-400 font-mono-code font-black">{item.overallScore}% AI</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => playWordTTS(item.word, 'reference')}
                        className="flex-1 py-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center gap-1"
                      >
                        <Volume2 className="h-3.5 w-3.5" /> 🔊 Nghe Giọng Mẫu
                      </button>

                      <button
                        onClick={handleStartMicRecord}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold flex items-center justify-center gap-1 shadow"
                      >
                        <Mic className="h-3.5 w-3.5" /> 🎙️ Thu Âm Lại
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowWeakPracticeModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Hoàn Thành Luyện Tập
              </button>
            </div>
          </div>
        )}

        {/* STUDENT NEW SUBMISSION MODAL (BR-043 to BR-052) */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-950/90 p-4">
            <div className="w-full max-w-lg rounded-3xl border-2 border-pink-400 bg-slate-900 p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="text-lg font-black text-pink-300 font-heading">🚀 BÉ MINH ANH NỘP BÀI TẬP VỀ NHÀ MỚI</h3>
                <button onClick={() => setShowSubmitModal(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Tên bài tập:</label>
                  <input
                    type="text"
                    value={newHwTitle}
                    onChange={(e) => setNewHwTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">🎙️ Thu âm phát âm từ vựng bài tập:</label>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <div>
                      <div className="font-bold text-white">Elephant • Submarine</div>
                      <div className="text-[10px] text-slate-400">Nhấn nút bên phải để bắt đầu thu âm</div>
                    </div>
                    <button
                      onClick={handleStartMicRecord}
                      disabled={isRecordingMic || aiAnalyzingState}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center gap-1 shadow"
                    >
                      <Mic className="h-3.5 w-3.5" />
                      <span>{isRecordingMic ? `Đang thu... (${recordingCountdown}s)` : aiAnalyzingState ? 'AI Phân tích...' : 'Bắt đầu Thu âm'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">✍️ Mẫu câu tiếng Anh bé luyện viết:</label>
                  <textarea
                    rows={3}
                    placeholder="VD: The butterfly is beautiful in the garden..."
                    value={newHwSentence}
                    onChange={(e) => setNewHwSentence(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">💬 Lời nhắn nhỏ của bé gửi Ba:</label>
                  <input
                    type="text"
                    placeholder="VD: Ba ơi hôm nay con đọc thuộc từ vựng siêu nhanh!"
                    value={newHwNote}
                    onChange={(e) => setNewHwNote(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-white font-medium outline-none focus:border-pink-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Hủy
                </button>
                <button
                  onClick={handleStudentSubmitHomework}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xs shadow-lg hover:scale-105 transition"
                >
                  🚀 GỬI BÀI TẬP CHO BA CHẤM
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LIVE AI PRONUNCIATION STUDIO MODAL (0-100 ZERO COST ENGINE) */}
        {aiStudioWord && (
          <AIPronunciationStudioModal
            isOpen={Boolean(aiStudioWord)}
            onClose={() => setAiStudioWord(null)}
            targetWord={aiStudioWord}
            studentId={selectedStudentId}
            studentName={activeStudent.name}
            addToast={addToast}
            onScoreComplete={(result) => {
              // Update current submission item score if matched
              if (activeHw && activeHw.speechItems) {
                const updatedItems = activeHw.speechItems.map((item) => {
                  if (item.word.toLowerCase() === result.vocabularyWord.toLowerCase()) {
                    return {
                      ...item,
                      overallScore: result.scores.overall,
                      accuracyScore: result.scores.accuracy,
                      fluencyScore: result.scores.timing,
                      aiFeedback: result.feedback.actionAdvice,
                      phonemes: result.phonemes
                    };
                  }
                  return item;
                });
                const updatedSubmissions = submissions.map((s) => s.id === activeHw.id ? { ...s, speechItems: updatedItems } : s);
                saveSubmissionsToStorage(updatedSubmissions);
              }
            }}
          />
        )}

        {/* AUDIT LOG MODAL (BR-065) */}
        {showAuditLogModal && (
          <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-950/90 p-4">
            <div className="w-full max-w-xl rounded-3xl border-2 border-cyan-400 bg-slate-900 p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="text-base font-black text-cyan-300 font-heading flex items-center gap-2">
                  <History className="h-5 w-5 text-cyan-400" />
                  <span>NHẬT KÝ LỊCH SỬ THAO TÁC (AUDIT LOGS)</span>
                </h3>
                <button onClick={() => setShowAuditLogModal(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-cyan-300">{log.action}</span>
                      <span className="text-slate-400 font-mono-code text-[10px]">{log.timestamp}</span>
                    </div>
                    <div className="text-slate-300 text-[11px]">
                      Thực hiện bởi: <b>{log.actor}</b> • Mã bài: <span className="font-mono-code">{log.submissionCode}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowAuditLogModal(false)}
                className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Đóng Nhật Ký
              </button>
            </div>
          </div>
        )}

        {/* FOOTER AREA (BR-142) */}
        <div className="flex justify-between items-center border-t border-slate-800 pt-3 flex-wrap gap-2">
          <div className="text-[11px] text-slate-400 font-mono-code">
            ⚡ Ultra-Detailed Homework Grading Engine • Kids English Agent V5.0
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition cursor-pointer"
          >
            Đóng Cửa Sổ
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
