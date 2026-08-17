import React, { useState, useEffect } from 'react';
import { 
  Database, Users, Brain, Map, FileText, UploadCloud, History, 
  Plus, Edit, Trash2, Search, Filter, ShieldCheck, CheckCircle2, 
  RotateCw, Trash, RefreshCw, Key, LogOut, Eye, ArrowUpRight, 
  Sparkles, Layers, Activity, Settings, Zap, Award, Bot, Bell, Sliders,
  AlertTriangle, Code, Play, GitPullRequest, ShieldAlert, Cpu, Terminal, Check, X, Lock, Unlock,
  Download, FileSpreadsheet, PlayCircle, Volume2, UserCheck, Calendar, Star, HelpCircle, CheckSquare, Clock, BarChart3, HardDrive, Wifi, Server
} from 'lucide-react';
import { VOCABULARY_DATABASE, COURSE_LEVELS, VOCAB_CATEGORIES } from '../constants/kidsVocabularyDatabase.js';
import { FsrsMemoryEngine } from '../services/oop/FsrsMemoryEngine.js';
import { EloAdaptiveEngine } from '../services/oop/EloAdaptiveEngine.js';
import { PhoneticSimilarityEngine } from '../services/oop/PhoneticSimilarityEngine.js';
import { VocabEntity, UserEntity, SrsEntity } from '../services/oop/DomainModels.js';

export default function AdminDashboardView({
  currentActor,
  currentUser,
  onSwitchActor,
  onLogout,
  addToast,
  onOpenStudentPreview
}) {
  const [activeTab, setActiveTab] = useState('overview');

  // Master State Repositories
  const [vocabList, setVocabList] = useState([]);
  const [usersList, setUsersList] = useState([
    { id: 'usr_01', username: 'minh_anh', displayName: 'Bé Minh Anh', email: 'minhanh@kidsenglish.edu.vn', role: 'student', age: 6, ageGroup: '3-6', stars: 150, level: 'L1', streak: 12, parentPhone: '0901234567', pinCode: '1234', status: 'active' },
    { id: 'usr_02', username: 'parent_user', displayName: 'Phụ Huynh Bé Minh Anh', email: 'parent@kidsenglish.edu.vn', role: 'parent', age: 34, ageGroup: '16+', stars: 0, level: 'L1', streak: 0, parentPhone: '0901234567', pinCode: '8888', status: 'active' },
    { id: 'usr_03', username: 'bao_nguyen', displayName: 'Bảo Nguyễn (Super Admin)', email: 'baonguyen@kidsenglish.edu.vn', role: 'admin', age: 28, ageGroup: '16+', stars: 9999, level: 'L6', streak: 100, parentPhone: '0988888888', pinCode: '9999', status: 'active' },
    { id: 'usr_04', username: 'gia_bao', displayName: 'Bé Gia Bảo', email: 'giabao@kidsenglish.edu.vn', role: 'student', age: 9, ageGroup: '7-10', stars: 320, level: 'L3', streak: 24, parentPhone: '0912345678', pinCode: '4321', status: 'active' },
    { id: 'usr_05', username: 'teacher_ha', displayName: 'Cô Thu Hà (Giảng Viên)', email: 'thuha@kidsenglish.edu.vn', role: 'teacher', age: 29, ageGroup: '16+', stars: 500, level: 'L6', streak: 45, parentPhone: '0933333333', pinCode: '5555', status: 'active' }
  ]);

  const [srsList, setSrsList] = useState([
    { id: 'srs_01', word: 'Apple', user: 'Bé Minh Anh', stage: 'Stage 3 (7 ngày)', next_review: '2026-08-20', recall_rate: 95, interval_days: 7, ease_factor: 2.5, status: 'Active' },
    { id: 'srs_02', word: 'Cat', user: 'Bé Minh Anh', stage: 'Stage 1 (1 ngày)', next_review: '2026-08-18', recall_rate: 80, interval_days: 1, ease_factor: 2.1, status: 'Due Today' },
    { id: 'srs_03', word: 'Elephant', user: 'Bé Gia Bảo', stage: 'Stage 4 (14 ngày)', next_review: '2026-08-25', recall_rate: 98, interval_days: 14, ease_factor: 2.7, status: 'Mastered' },
    { id: 'srs_04', word: 'Computer', user: 'Bé Gia Bảo', stage: 'Stage 2 (3 ngày)', next_review: '2026-08-19', recall_rate: 88, interval_days: 3, ease_factor: 2.3, status: 'Active' }
  ]);

  const [lessonsList, setLessonsList] = useState([
    { id: 'les_01', unitId: 'U01', level: 'L1', title: 'Unit 1: Colors & Shapes', ageGroup: '3-6', wordCount: 10, passingScore: 80, status: 'PUBLISHED', version: 'v1.2' },
    { id: 'les_02', unitId: 'U02', level: 'L1', title: 'Unit 2: Animals & Pets', ageGroup: '3-6', wordCount: 12, passingScore: 80, status: 'PUBLISHED', version: 'v1.0' },
    { id: 'les_03', unitId: 'U16', level: 'L2', title: 'Unit 16: Family & Friends', ageGroup: '5-7', wordCount: 15, passingScore: 85, status: 'PUBLISHED', version: 'v1.1' },
    { id: 'les_04', unitId: 'U31', level: 'L3', title: 'Unit 31: Nature & Science', ageGroup: '7-10', wordCount: 15, passingScore: 85, status: 'PUBLISHED', version: 'v1.0' },
    { id: 'les_05', unitId: 'U46', level: 'L4', title: 'Unit 46: Space Exploration', ageGroup: '11-15', wordCount: 20, passingScore: 90, status: 'DRAFT', version: 'v0.9' }
  ]);

  const [homeworkList, setHomeworkList] = useState([
    { id: 'hw_01', studentName: 'Bé Minh Anh', level: 'L1', assignment: 'Ghi âm 5 từ vựng màu sắc (Red, Blue, Green...)', audioUrl: 'demo_audio_01.mp3', submittedAt: '2026-08-17T10:00:00Z', score: 95, feedback: 'Phát âm rất chuẩn giọng bản ngữ! Bé cố gắng phát huy nhé ⭐', status: 'graded' },
    { id: 'hw_02', studentName: 'Bé Gia Bảo', level: 'L3', assignment: 'Đọc đoạn văn ngắn chủ đề Nature', audioUrl: 'demo_audio_02.mp3', submittedAt: '2026-08-17T14:30:00Z', score: 85, feedback: 'Cần nhấn ngữ điệu câu hỏi rõ hơn một chút.', status: 'graded' },
    { id: 'hw_03', studentName: 'Bé Minh Anh', level: 'L1', assignment: 'Phát âm từ vựng Con Thỏ (Rabbit)', audioUrl: 'demo_audio_03.mp3', submittedAt: '2026-08-18T08:15:00Z', score: 0, feedback: '', status: 'pending' }
  ]);

  const [agentsList, setAgentsList] = useState([
    { id: 'agent_tts', name: 'Giáo Viên Mỹ Spacy', role: 'Phát Âm & Luyện Giọng IPA', gender: 'Female', status: 'active', speed: 0.85, pitch: 1.0 },
    { id: 'agent_srs', name: 'Trợ Lý Trí Nhớ SRS V6.2', role: 'Tính Toán Thuật Toán Quên', gender: 'Robot', status: 'active', speed: 1.0, pitch: 1.0 },
    { id: 'agent_story', name: 'AI Storyteller Kể Chuyện', role: 'Kể Chuyện Tiếng Anh Thiếu Nhi', gender: 'Female', status: 'active', speed: 0.9, pitch: 1.05 }
  ]);

  const [ageGroupEngine, setAgeGroupEngine] = useState([
    { id: 'ag_1', code: '3-6', label: 'Mầm Non (3–6 tuổi)', icon: '👶', focus: 'Hình ảnh sống động, âm thanh vui nhộn, từ đơn giản 1-2 âm tiết', wordTarget: 200 },
    { id: 'ag_2', code: '7-10', label: 'Tiểu Học (7–10 tuổi)', icon: '🦁', focus: 'Phiên âm IPA, câu ngắn giao tiếp, phản xạ hỏi đáp', wordTarget: 350 },
    { id: 'ag_3', code: '11-15', label: 'THCS (11–15 tuổi)', icon: '🚀', focus: 'Đọc hiểu, ngữ pháp học thuật cơ bản, nghe chép chính tả', wordTarget: 250 },
    { id: 'ag_4', code: '16+', label: 'Người Lớn / Chuyên Sâu (16+)', icon: '🎓', focus: 'Luyện giao tiếp phản xạ cao cấp, IELTS/TOEFL vocabulary', wordTarget: 100 }
  ]);

  const [featureFlags, setFeatureFlags] = useState([
    { id: 'ff_1', key: 'ENABLE_IOS_PUSH', name: 'Thông Báo Push iOS / PWA', rollout: 100, enabled: true },
    { id: 'ff_2', key: 'ENABLE_AI_STORYTELLER', name: 'AI Kể Chuyện Tiếng Anh 3D', rollout: 80, enabled: true },
    { id: 'ff_3', key: 'ENABLE_OFFLINE_SYNC', name: 'Đồng Bộ Hóa Khi Offline', rollout: 100, enabled: true }
  ]);

  const [releasesList, setReleasesList] = useState([
    { id: 'rel_v7', version: 'V7.0.0-STABLE', change_set: 'Smart Error Center, Live Code Studio, Age Engine', approved_by: 'Bảo Nguyễn', status: 'ACTIVE' },
    { id: 'rel_v6', version: 'V6.2.0-STABLE', change_set: 'SRS Cycle Manager, Excel Importer V6', approved_by: 'Bảo Nguyễn', status: 'ARCHIVED' }
  ]);

  const [codeFiles, setCodeFiles] = useState([
    { path: 'server/src/index.js', name: 'server/src/index.js', risk: 'R1' },
    { path: 'client/src/App.jsx', name: 'client/src/App.jsx', risk: 'R0' },
    { path: 'client/src/components/AdminDashboardView.jsx', name: 'client/src/components/AdminDashboardView.jsx', risk: 'R0' },
    { path: 'server/src/modules/vocab/vocab.controller.js', name: 'server/src/modules/vocab/vocab.controller.js', risk: 'R1' }
  ]);

  const [errorGroups, setErrorGroups] = useState([
    { group_id: 'err_404_aud', error_code: 'ERR_AUDIO_FALLBACK', severity: 'P2', occurrence_count: 3, message: 'Audio TTS fallback to browser SpeechSynthesis API', facts: ['File mp3 missing on CDN', 'Fallback triggered successfully'], proposal: 'Pre-generate mp3 asset for word "Elephant"' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 'log_1', action: 'VOCAB.CREATE', entityType: 'VOCABULARY', entityId: 'v_apple', actor: 'Bảo Nguyễn', createdAt: '2026-08-18T01:05:00Z' },
    { id: 'log_2', action: 'USER.LOCK_TOGGLE', entityType: 'USER', entityId: 'usr_01', actor: 'Bảo Nguyễn', createdAt: '2026-08-18T01:00:00Z' },
    { id: 'log_3', action: 'SRS.RECALCULATE', entityType: 'SRS', entityId: 'ALL', actor: 'System Auto', createdAt: '2026-08-18T00:30:00Z' }
  ]);

  const [selectedFile, setSelectedFile] = useState(codeFiles[0]);
  const [fileContent, setFileContent] = useState(`// server/src/index.js\n// V7.0 Production Server Entrypoint\nconst express = require('express');\nconst app = express();\n\napp.use('/api/v1/admin', adminRouter);\napp.listen(3000, () => console.log('V7.0 Admin API Live'));`);
  const [selectedError, setSelectedError] = useState(errorGroups[0]);

  const [sysConfig, setSysConfig] = useState({ 
    theme3D: 'galaxy3d', bgOpacity: 0.85, musicVolume: 0.5, soundEffectsEnabled: true, maxDailyWords: 10,
    autoSpeakOnCard: true, srsThreshold: 0.8, strictFailClosedAuth: true, offlineSyncInterval: 30
  });

  const [trashList, setTrashList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTrashModal, setShowTrashModal] = useState(false);

  // Modals & Editing State
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  // Granular Forms State
  const [formDataVocab, setFormDataVocab] = useState({ word: '', ipa: '', vietnamesePhonetic: '', meaning: '', level: 'L1', category: 'L1-U01', ageGroup: '3-6', image: '🔴', example: '', example_vi: '', difficulty: 'Medium' });
  const [formDataUser, setFormDataUser] = useState({ username: '', email: '', role: 'student', displayName: '', age: 6, ageGroup: '3-6', stars: 100, level: 'L1', streak: 0, parentPhone: '', pinCode: '1234', status: 'active' });
  const [formDataSrs, setFormDataSrs] = useState({ word: '', user: 'Bé Minh Anh', stage: 'Stage 3 (7 ngày)', next_review: '2026-08-20', recall_rate: 90, interval_days: 7, ease_factor: 2.5, status: 'Active' });
  const [formDataLesson, setFormDataLesson] = useState({ unitId: 'U01', level: 'L1', title: '', ageGroup: '3-6', wordCount: 10, passingScore: 80, status: 'PUBLISHED', version: 'v1.0' });
  const [formDataHomework, setFormDataHomework] = useState({ studentName: '', level: 'L1', assignment: '', audioUrl: '', score: 95, feedback: '', status: 'graded' });
  const [formDataAgeGroup, setFormDataAgeGroup] = useState({ code: '', label: '', icon: '👶', focus: '', wordTarget: 200 });
  const [formDataAgent, setFormDataAgent] = useState({ name: '', role: '', gender: 'Female', speed: 0.9, pitch: 1.0, status: 'active' });
  const [formDataFlag, setFormDataFlag] = useState({ key: '', name: '', rollout: 100, enabled: true });
  const [formDataRelease, setFormDataRelease] = useState({ version: '', change_set: '', approved_by: 'Bảo Nguyễn', status: 'ACTIVE' });
  const [showDevTools, setShowDevTools] = useState(false);

  // Granular Course Level Lock Overrides State & Handlers
  const [levelOverrides, setLevelOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_admin_level_overrides');
      return saved ? JSON.parse(saved) : { L1: true, L2: true, L3: true, L4: true, L5: true, L6: true };
    } catch {
      return { L1: true, L2: true, L3: true, L4: true, L5: true, L6: true };
    }
  });
  const [selectedLearnerForLock, setSelectedLearnerForLock] = useState('usr_01');
  const [overrideAutoProgression, setOverrideAutoProgression] = useState(false);

  const handleToggleLevelLock = (lvlId) => {
    const updated = { ...levelOverrides, [lvlId]: !levelOverrides[lvlId] };
    setLevelOverrides(updated);
    try {
      localStorage.setItem('kids_admin_level_overrides', JSON.stringify(updated));
    } catch (e) {}

    fetch(`/api/v1/admin/learners/${selectedLearnerForLock}/levels`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unlockedLevels: updated, overrideAutoProgression })
    }).catch(err => console.warn('Level sync error:', err.message));

    if (addToast) {
      addToast(`🔑 Đã ${updated[lvlId] ? 'MỞ KHÓA' : 'KHÓA'} Cấp độ ${lvlId} cho học viên!`, updated[lvlId] ? 'success' : 'warning');
    }
  };

  const handleBulkUnlockAllLevels = () => {
    const allUnlocked = { L1: true, L2: true, L3: true, L4: true, L5: true, L6: true };
    setLevelOverrides(allUnlocked);
    try {
      localStorage.setItem('kids_admin_level_overrides', JSON.stringify(allUnlocked));
    } catch (e) {}
    fetch(`/api/v1/admin/learners/${selectedLearnerForLock}/levels`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unlockedLevels: allUnlocked, overrideAutoProgression: true })
    }).catch(err => console.warn('Level sync error:', err.message));
    if (addToast) addToast('🔓 Đã MỞ KHÓA CƯỠNG CHẾ TOÀN BỘ 6 CẤP ĐỘ (L1-L6)!', 'success');
  };

  const handleBulkResetAutoLocks = () => {
    const defaultLocks = { L1: true, L2: false, L3: false, L4: false, L5: false, L6: false };
    setLevelOverrides(defaultLocks);
    setOverrideAutoProgression(false);
    try {
      localStorage.setItem('kids_admin_level_overrides', JSON.stringify(defaultLocks));
    } catch (e) {}
    fetch(`/api/v1/admin/learners/${selectedLearnerForLock}/levels`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unlockedLevels: defaultLocks, overrideAutoProgression: false })
    }).catch(err => console.warn('Level sync error:', err.message));
    if (addToast) addToast('🔒 Đã kích hoạt Khóa Tự Động Theo Tiến Độ (Chỉ mở L1)!', 'info');
  };

  const handleAdminQuickFillLevel = (lvlId) => {
    try {
      const savedProgress = localStorage.getItem('kids_6level_progress_v5');
      const progressObj = savedProgress ? JSON.parse(savedProgress) : {};
      progressObj[lvlId] = { count: 150, total: 150, percent: 100, unlocked: true };
      localStorage.setItem('kids_6level_progress_v5', JSON.stringify(progressObj));
      if (addToast) addToast(`⚡ Admin: Đã nạp 100% hoàn thành cho Cấp độ ${lvlId}!`, 'success');
    } catch (e) {
      if (addToast) addToast('Lỗi khi nạp tiến độ level', 'error');
    }
  };

  const handleAdminResetLevelProgress = (lvlId) => {
    if (window.confirm(`⚠️ Ba Bảo Nguyên: Bạn có chắc muốn đặt lại 0% tiến độ cho Cấp độ ${lvlId}?`)) {
      try {
        const savedProgress = localStorage.getItem('kids_6level_progress_v5');
        const progressObj = savedProgress ? JSON.parse(savedProgress) : {};
        progressObj[lvlId] = { count: 0, total: 150, percent: 0, unlocked: lvlId === 'L1' };
        localStorage.setItem('kids_6level_progress_v5', JSON.stringify(progressObj));
        if (addToast) addToast(`🔄 Admin: Đã đặt lại 0% tiến độ cho Cấp độ ${lvlId}`, 'info');
      } catch (e) {
        if (addToast) addToast('Lỗi khi reset tiến độ level', 'error');
      }
    }
  };

  // Real-time Database Sync Engine (5s Live Polling + Initial Mount)
  const [lastSyncTime, setLastSyncTime] = useState(new Date().toLocaleTimeString());
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const fetchSystemData = async () => {
      setIsSyncing(true);
      try {
        const syncRes = await fetch('/api/v1/admin/sync/full');
        if (syncRes.ok) {
          const res = await syncRes.json();
          const data = res.data || res;
          if (data.vocabulary && data.vocabulary.length > 0) setVocabList(data.vocabulary);
          if (data.users && data.users.length > 0) setUsersList(data.users);
          if (data.srs && data.srs.length > 0) setSrsList(data.srs);
          if (data.lessons && data.lessons.length > 0) setLessonsList(data.lessons);
          if (data.homework && data.homework.length > 0) setHomeworkList(data.homework);
        }
      } catch (err) {
        console.warn('Sync background fetch warning:', err.message);
      } finally {
        setIsSyncing(false);
        setLastSyncTime(new Date().toLocaleTimeString());
      }
    };

    fetchSystemData();
    const interval = setInterval(fetchSystemData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Universal CRUD Handlers
  const handleSaveVocab = (e) => {
    e.preventDefault();
    if (editingItem) {
      setVocabList(vocabList.map(v => v.id === editingItem.id ? { ...v, ...formDataVocab } : v));
      if (addToast) addToast(`✅ Đã chỉnh sửa từ vựng "${formDataVocab.word}"!`, 'success');
    } else {
      setVocabList([{ id: `v_${Date.now()}`, ...formDataVocab }, ...vocabList]);
      if (addToast) addToast(`✅ Đã thêm từ vựng mới!`, 'success');
    }
    setModalType(null);
  };
  const handleDeleteVocab = (item) => {
    if (!window.confirm(`Xóa từ vựng "${item.word}"?`)) return;
    setVocabList(vocabList.filter(v => v.id !== item.id));
    setTrashList([{ id: item.id, type: 'VOCAB', name: item.word, deletedAt: new Date().toLocaleTimeString() }, ...trashList]);
    if (addToast) addToast(`🗑️ Đã chuyển từ vựng vào Thùng Rác!`, 'warning');
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editingItem) {
      setUsersList(usersList.map(u => u.id === editingItem.id ? { ...u, ...formDataUser } : u));
      if (addToast) addToast(`✅ Đã chỉnh sửa người dùng "${formDataUser.username}"!`, 'success');
    } else {
      setUsersList([{ id: `usr_${Date.now()}`, ...formDataUser }, ...usersList]);
      if (addToast) addToast(`✅ Đã tạo người dùng mới!`, 'success');
    }
    setModalType(null);
  };
  const handleDeleteUser = (usr) => {
    if (!window.confirm(`Xóa người dùng "${usr.username}"?`)) return;
    setUsersList(usersList.filter(v => v.id !== usr.id));
    setTrashList([{ id: usr.id, type: 'USER', name: usr.username, deletedAt: new Date().toLocaleTimeString() }, ...trashList]);
    if (addToast) addToast(`🗑️ Đã xóa người dùng!`, 'error');
  };

  const handleSaveAgeGroup = (e) => {
    e.preventDefault();
    if (editingItem) {
      setAgeGroupEngine(ageGroupEngine.map(ag => ag.id === editingItem.id ? { ...ag, ...formDataAgeGroup } : ag));
      if (addToast) addToast(`👶 Đã chỉnh sửa nhóm độ tuổi!`, 'success');
    } else {
      setAgeGroupEngine([...ageGroupEngine, { id: `ag_${Date.now()}`, ...formDataAgeGroup }]);
      if (addToast) addToast(`👶 Đã thêm nhóm độ tuổi mới!`, 'success');
    }
    setModalType(null);
  };
  const handleDeleteAgeGroup = (ag) => {
    if (!window.confirm(`Xóa nhóm độ tuổi "${ag.label}"?`)) return;
    setAgeGroupEngine(ageGroupEngine.filter(a => a.id !== ag.id));
    if (addToast) addToast(`🗑️ Đã xóa nhóm độ tuổi!`, 'warning');
  };

  const handleSaveSrs = (e) => {
    e.preventDefault();
    if (editingItem) {
      setSrsList(srsList.map(s => s.id === editingItem.id ? { ...s, ...formDataSrs } : s));
      if (addToast) addToast(`🧠 Đã chỉnh sửa mốc SRS!`, 'success');
    } else {
      setSrsList([{ id: `srs_${Date.now()}`, ...formDataSrs }, ...srsList]);
      if (addToast) addToast(`🧠 Đã tạo mốc SRS mới!`, 'success');
    }
    setModalType(null);
  };

  const handleSaveLesson = (e) => {
    e.preventDefault();
    if (editingItem) {
      setLessonsList(lessonsList.map(l => l.id === editingItem.id ? { ...l, ...formDataLesson } : l));
      if (addToast) addToast(`📚 Đã chỉnh sửa Unit bài học!`, 'success');
    } else {
      setLessonsList([{ id: `les_${Date.now()}`, ...formDataLesson }, ...lessonsList]);
      if (addToast) addToast(`📚 Đã tạo Unit mới!`, 'success');
    }
    setModalType(null);
  };

  const handleSaveHomework = (e) => {
    e.preventDefault();
    if (editingItem) {
      setHomeworkList(homeworkList.map(h => h.id === editingItem.id ? { ...h, ...formDataHomework } : h));
      if (addToast) addToast(`📝 Đã chấm/sửa bài tập!`, 'success');
    } else {
      setHomeworkList([{ id: `hw_${Date.now()}`, ...formDataHomework, submittedAt: new Date().toISOString() }, ...homeworkList]);
      if (addToast) addToast(`📝 Đã giao bài tập mới!`, 'success');
    }
    setModalType(null);
  };

  const handleSaveFlag = (e) => {
    e.preventDefault();
    if (editingItem) {
      setFeatureFlags(featureFlags.map(f => f.id === editingItem.id ? { ...f, ...formDataFlag } : f));
      if (addToast) addToast(`🚩 Đã sửa Feature Flag!`, 'success');
    } else {
      setFeatureFlags([...featureFlags, { id: `ff_${Date.now()}`, ...formDataFlag }]);
      if (addToast) addToast(`🚩 Đã tạo Feature Flag mới!`, 'success');
    }
    setModalType(null);
  };

  const handleSaveAgent = (e) => {
    e.preventDefault();
    if (editingItem) {
      setAgentsList(agentsList.map(a => a.id === editingItem.id ? { ...a, ...formDataAgent } : a));
      if (addToast) addToast(`🤖 Đã sửa AI Agent!`, 'success');
    } else {
      setAgentsList([...agentsList, { id: `agent_${Date.now()}`, ...formDataAgent }]);
      if (addToast) addToast(`🤖 Đã tạo AI Agent mới!`, 'success');
    }
    setModalType(null);
  };

  const handleSaveRelease = (e) => {
    e.preventDefault();
    if (editingItem) {
      setReleasesList(releasesList.map(r => r.id === editingItem.id ? { ...r, ...formDataRelease } : r));
      if (addToast) addToast(`🚀 Đã sửa bản Release!`, 'success');
    } else {
      setReleasesList([{ id: `rel_${Date.now()}`, ...formDataRelease }, ...releasesList]);
      if (addToast) addToast(`🚀 Đã tạo Release mới!`, 'success');
    }
    setModalType(null);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ vocabulary: vocabList, users: usersList, srs: srsList, lessons: lessonsList, ageEngine: ageGroupEngine, flags: featureFlags, agents: agentsList }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kids_english_full_db_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    if (addToast) addToast('📥 Đã xuất toàn bộ CSDL hệ thống thành công (JSON)!', 'success');
  };

  const filteredVocab = vocabList.filter(item => (item.word || '').toLowerCase().includes(searchQuery.toLowerCase()) || (item.meaning || '').toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full min-h-screen bg-transparent text-slate-100 font-sans flex flex-col relative z-10">
      
      {/* HEADER (ULTRA-TRANSLUCENT) */}
      <header className="sticky top-0 z-50 bg-slate-950/40 border-b border-purple-500/20 px-6 py-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 text-white font-black text-2xl shadow-lg border border-amber-300">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-600/30 text-rose-300 border border-rose-500/40 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
                PRODUCTION ENV
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-mono-code font-bold">
                API/DB: 100% HEALTHY
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[9px] font-mono-code font-bold flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-cyan-400 animate-pulse'}`}></span>
                REALTIME SYNC: {lastSyncTime}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40 text-[9px] font-mono-code font-bold">
                V7.0-REALTIME-LIVE
              </span>
            </div>
            <h1 className="text-base font-black text-white tracking-wide font-heading">
              KIDS ENGLISH AGENT • ADMIN CONTROL CENTER V7.0
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleExportData} className="px-3.5 py-2 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-200 text-xs font-bold hover:bg-purple-900/60 transition flex items-center gap-1.5 cursor-pointer shadow backdrop-blur-md">
            <Download className="h-4 w-4 text-purple-300" />
            <span>Xuất DB (JSON)</span>
          </button>
          <button onClick={onOpenStudentPreview} className="px-3.5 py-2 rounded-xl bg-indigo-950/50 border border-indigo-500/40 text-indigo-200 text-xs font-bold hover:bg-indigo-900/60 transition flex items-center gap-1.5 cursor-pointer shadow backdrop-blur-md">
            <Eye className="h-4 w-4 text-cyan-300" />
            <span>Chế Độ Học Sinh</span>
          </button>
          <button onClick={() => setShowTrashModal(true)} className="px-3.5 py-2 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs font-bold hover:bg-rose-900/60 transition flex items-center gap-1.5 cursor-pointer backdrop-blur-md">
            <Trash className="h-4 w-4 text-rose-400" />
            <span>Thùng Rác ({trashList.length})</span>
          </button>
          <button onClick={onLogout} className="px-3.5 py-2 rounded-xl bg-slate-900/50 border border-slate-700 text-slate-300 text-xs font-bold hover:bg-rose-900/60 hover:text-white transition flex items-center gap-1.5 cursor-pointer backdrop-blur-md">
            <LogOut className="h-4 w-4 text-rose-400" />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </header>

      {/* METRICS COUNTERS STRIP (CORE BUSINESS METRICS ONLY - ULTRA-TRANSLUCENT) */}
      <div className="bg-slate-950/20 border-b border-purple-500/20 px-6 py-2.5 grid grid-cols-2 sm:grid-cols-6 gap-2 backdrop-blur-md">
        <div className="p-2 rounded-xl bg-slate-950/30 border border-purple-500/40 text-center shadow backdrop-blur-md">
          <span className="text-[9px] font-black text-purple-300 uppercase block">📚Từ Vựng</span>
          <span className="text-base font-black font-mono-code text-white">{vocabList.length}</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/30 border border-cyan-500/40 text-center shadow backdrop-blur-md">
          <span className="text-[9px] font-black text-cyan-300 uppercase block">👥 Người Dùng</span>
          <span className="text-base font-black font-mono-code text-cyan-300">{usersList.length}</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/30 border border-emerald-500/40 text-center shadow backdrop-blur-md">
          <span className="text-[9px] font-black text-emerald-300 uppercase block">🛡️ Cấp Độ L1–L6</span>
          <span className="text-base font-black font-mono-code text-emerald-300">6 Levels</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/30 border border-amber-500/40 text-center shadow backdrop-blur-md">
          <span className="text-[9px] font-black text-amber-300 uppercase block">🗺️ Units Giáo Trình</span>
          <span className="text-base font-black font-mono-code text-amber-300">{lessonsList.length}</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/30 border border-pink-500/40 text-center shadow backdrop-blur-md">
          <span className="text-[9px] font-black text-pink-300 uppercase block">📝 Bài Tập Về Nhà</span>
          <span className="text-base font-black font-mono-code text-pink-300">{homeworkList.length}</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/30 border border-indigo-500/40 text-center shadow backdrop-blur-md">
          <span className="text-[9px] font-black text-indigo-300 uppercase block">🧠 Ôn Tập SRS</span>
          <span className="text-base font-black font-mono-code text-indigo-300">{srsList.length}</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* SIDEBAR TABS (ULTRA-TRANSLUCENT) */}
        <aside className="w-full md:w-64 bg-slate-950/30 backdrop-blur-md border-r border-purple-500/20 p-3 space-y-1 shrink-0 overflow-y-auto custom-scrollbar flex flex-col justify-between">
          <div className="space-y-1">
            <div className="text-[10px] font-black text-purple-400 uppercase tracking-wider px-2 mb-1">
              DANH MỤC QUẢN TRỊ ADMIN V7.0
            </div>

            {[
              { key: 'overview', label: '📊 Tổng Quan System', icon: Activity, count: 'Live' },
              { key: 'level_controls', label: '🛡️ Quản Lý Khóa Cấp Độ', icon: ShieldCheck, count: '6 Levels' },
              { key: 'vocabulary', label: '📚 Quản Lý Từ Vựng', icon: Database, count: vocabList.length },
              { key: 'users', label: '👥 Học Viên & Phụ Huynh', icon: Users, count: usersList.length },
              { key: 'lessons', label: '🗺️ Giáo Trình & Bài Học', icon: Map, count: lessonsList.length },
              { key: 'homework', label: '📝 Chấm Bài Tập Về Nhà', icon: FileText, count: homeworkList.length },
              { key: 'srs', label: '🧠 Cấu Hình Ôn Tập SRS', icon: Brain, count: srsList.length },
              { key: 'age_engine', label: '🎯 Phân Loại Độ Tuổi', icon: Award, count: ageGroupEngine.length },
              ...(showDevTools ? [
                { key: 'errors', label: '🚨 Smart Error Center', icon: AlertTriangle, count: errorGroups.length },
                { key: 'code', label: '💻 Live Code Studio', icon: Code, count: codeFiles.length },
                { key: 'flags', label: '🚩 Feature Flags', icon: Zap, count: featureFlags.length },
                { key: 'releases', label: '📜 Releases & Rollback', icon: GitPullRequest, count: releasesList.length },
                { key: 'agents', label: '🤖 AI Agents Persona', icon: Bot, count: agentsList.length },
                { key: 'config', label: '⚙️ Cấu Hình Technical', icon: Sliders, count: 'Config' }
              ] : [])
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full p-2.5 rounded-xl text-xs font-black transition flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border border-purple-400'
                      : 'bg-slate-950/60 text-slate-400 border border-slate-800/80 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-4 w-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full font-mono-code text-[9px] ${
                    isActive ? 'bg-purple-950 text-yellow-300 border border-purple-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => setShowDevTools(!showDevTools)}
              className="w-full py-1.5 px-2 rounded-xl bg-slate-950 text-slate-400 hover:text-slate-200 text-[10px] font-bold border border-slate-800 transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sliders className="h-3 w-3 text-slate-400" />
              <span>{showDevTools ? 'Ẩn Công Cụ Dev Kỹ Thuật' : 'Hiện Công Cụ Dev Kỹ Thuật'}</span>
            </button>
          </div>
        </aside>

        {/* WORKSPACE AREA */}
        <main className="flex-1 p-5 overflow-y-auto custom-scrollbar space-y-4">
          
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 flex items-center justify-between shadow-xl">
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-400 animate-spin" />
                    BẢNG ĐIỀU HÀNH TỔNG QUAN TỰ CHẨN ĐOÁN V7.0
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">Hệ thống phân quyền Super Admin cho phép THÊM, SỬA, XÓA từng chi tiết nhỏ nhất trong CSDL.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono-code font-bold text-xs">
                  SLA Health: 99.98%
                </span>
              </div>

              {/* CARDS METRICS */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between text-xs text-emerald-300 font-black">
                    <span>SERVER UPTIME</span>
                    <Server className="h-4 w-4" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono-code">99.98%</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[99.98%]"></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2">
                  <div className="flex items-center justify-between text-xs text-cyan-300 font-black">
                    <span>QUERY LATENCY</span>
                    <Wifi className="h-4 w-4" />
                  </div>
                  <div className="text-2xl font-black text-cyan-300 font-mono-code">12ms</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[92%]"></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-2">
                  <div className="flex items-center justify-between text-xs text-purple-300 font-black">
                    <span>ACTIVE WORKERS</span>
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div className="text-2xl font-black text-purple-300 font-mono-code">4 Threads</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full w-[75%]"></div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-black">
                    <span>STORAGE USAGE</span>
                    <HardDrive className="h-4 w-4" />
                  </div>
                  <div className="text-2xl font-black text-amber-300 font-mono-code">4.2 GB / 50 GB</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[8.4%]"></div>
                  </div>
                </div>
              </div>

              {/* RECENT AUDIT LOGS */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-3">
                <div className="text-xs font-black text-purple-300 uppercase">📜 Nhật Ký Hoạt Động Gần Đây (Audit Trail)</div>
                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono-code">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 font-bold">{log.action}</span>
                        <span className="text-slate-300">{log.entityId}</span>
                      </div>
                      <div className="text-slate-500 text-[10px]">{log.actor} • {new Date(log.createdAt).toLocaleTimeString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COURSE & LEVEL LOCK CONTROLS (L1 - L6) */}
          {activeTab === 'level_controls' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-purple-400 animate-pulse" />
                    BẢNG QUẢN LÝ VÀ CHỈNH SỬA KHÓA TỪNG CẤP ĐỘ (L1–L6)
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Super Admin có thể mở cưỡng chế (Unlock) hoặc tái khóa (Lock) từng cấp độ học tập của học viên, tùy chỉnh quy tắc tự động chuyển cấp.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 font-bold">Học Viên:</span>
                    <select
                      value={selectedLearnerForLock}
                      onChange={(e) => setSelectedLearnerForLock(e.target.value)}
                      className="bg-transparent text-cyan-300 font-bold cursor-pointer focus:outline-none"
                    >
                      <option value="usr_01">Bé Minh Anh (usr_01)</option>
                      <option value="usr_04">Bé Gia Bảo (usr_04)</option>
                      <option value="global">Toàn Bộ Học Viên (Global Default)</option>
                    </select>
                  </div>

                  <button
                    onClick={handleBulkUnlockAllLevels}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Unlock className="h-3.5 w-3.5" />
                    <span>Mở Khóa Tất Cả 6 Cấp</span>
                  </button>

                  <button
                    onClick={handleBulkResetAutoLocks}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-black text-xs border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Lock className="h-3.5 w-3.5 text-rose-400" />
                    <span>Khóa Theo Lộ Trình (Chỉ mở L1)</span>
                  </button>
                </div>
              </div>

              {/* OVERRIDE AUTO-PROGRESSION TOGGLE BAR */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-purple-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-400 animate-bounce" />
                  <div>
                    <span className="font-black text-white">Chế Độ Bỏ Qua Ràng Buộc Khóa Tự Động (Bypass Auto-Progression Constraints):</span>
                    <span className="text-slate-400 ml-2">Cho phép học viên truy cập bất kỳ cấp độ nào mà không cần đạt 100% cấp trước.</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const nextVal = !overrideAutoProgression;
                    setOverrideAutoProgression(nextVal);
                    if (addToast) addToast(`⚡ Đã ${nextVal ? 'BẬT' : 'TẮT'} chế độ bỏ qua ràng buộc chuyển cấp!`, nextVal ? 'warning' : 'info');
                  }}
                  className={`px-4 py-1.5 rounded-xl font-black text-xs transition cursor-pointer ${
                    overrideAutoProgression
                      ? 'bg-amber-500 text-slate-950 shadow-lg animate-pulse'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {overrideAutoProgression ? '⚡ ĐANG BẬT OVERRIDE' : '🔒 ĐANG TẮT OVERRIDE'}
                </button>
              </div>

              {/* 6 LEVEL CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'L1', title: 'Cấp độ L1: Khởi Động', age: '3–6 tuổi', words: 150, color: 'border-pink-500/50 bg-pink-950/20', icon: '🐣' },
                  { id: 'L2', title: 'Cấp độ L2: Cơ Bản', age: '5–7 tuổi', words: 150, color: 'border-amber-500/50 bg-amber-950/20', icon: '🦁' },
                  { id: 'L3', title: 'Cấp độ L3: Mở Rộng', age: '7–9 tuổi', words: 150, color: 'border-emerald-500/50 bg-emerald-950/20', icon: '🚀' },
                  { id: 'L4', title: 'Cấp độ L4: Nâng Cao', age: '8–10 tuổi', words: 150, color: 'border-cyan-500/50 bg-cyan-950/20', icon: '👑' },
                  { id: 'L5', title: 'Cấp độ L5: Tiên Phong', age: '10–12 tuổi', words: 150, color: 'border-purple-500/50 bg-purple-950/20', icon: '🌟' },
                  { id: 'L6', title: 'Cấp độ L6: Quốc Tế', age: '12+ tuổi', words: 150, color: 'border-fuchsia-500/50 bg-fuchsia-950/20', icon: '🌎' },
                ].map((lvl) => {
                  const isUnlocked = !!levelOverrides[lvl.id];
                  return (
                    <div key={lvl.id} className={`p-5 rounded-2xl bg-slate-950 border-2 ${lvl.color} space-y-4 shadow-xl flex flex-col justify-between`}>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-3xl">{lvl.icon}</span>
                          <div>
                            <div className="font-black text-white text-sm">{lvl.title}</div>
                            <div className="text-[11px] text-slate-400 font-mono-code">{lvl.age} • {lvl.words} Từ Vựng</div>
                          </div>
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                          isUnlocked
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-400/50'
                        }`}>
                          {isUnlocked ? <Unlock className="h-3 w-3 text-emerald-400" /> : <Lock className="h-3 w-3 text-rose-400" />}
                          {isUnlocked ? 'MỞ KHÓA' : 'ĐANG KHÓA'}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-bold">Trạng Thái Admin:</span>
                          <span className={isUnlocked ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                            {isUnlocked ? '🔓 Cho phép truy cập' : '🔒 Đã khóa truy cập'}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col gap-2">
                        <button
                          onClick={() => handleToggleLevelLock(lvl.id)}
                          className={`w-full py-2.5 rounded-xl font-black text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow ${
                            isUnlocked
                              ? 'bg-rose-600 hover:bg-rose-500 text-white'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {isUnlocked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                          <span>{isUnlocked ? `Khóa Cấp ${lvl.id}` : `Mở Khóa Cấp ${lvl.id}`}</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAdminQuickFillLevel(lvl.id)}
                            className="flex-1 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-[11px] border border-amber-500/30 transition cursor-pointer flex items-center justify-center gap-1"
                            title="⚡ Admin: Nạp 100% hoàn thành cho cấp độ này"
                          >
                            <Zap className="h-3 w-3 text-amber-400" />
                            <span>Nạp 100%</span>
                          </button>

                          <button
                            onClick={() => handleAdminResetLevelProgress(lvl.id)}
                            className="flex-1 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-[11px] border border-slate-700 transition cursor-pointer flex items-center justify-center gap-1"
                            title="🔄 Admin: Reset tiến độ về 0%"
                          >
                            <RotateCw className="h-3 w-3 text-slate-400" />
                            <span>Reset 0%</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VOCABULARY */}
          {activeTab === 'vocabulary' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30">
                <div className="flex items-center gap-3 flex-1 min-w-[250px]">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm từ vựng theo tên tiếng Anh hoặc nghĩa tiếng Việt..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingItem(null);
                    setFormDataVocab({ word: '', ipa: '', vietnamesePhonetic: '', meaning: '', level: 'L1', category: 'L1-U01', ageGroup: '3-6', image: '🔴', example: '', example_vi: '', difficulty: 'Medium' });
                    setModalType('vocab');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-black text-xs shadow hover:scale-105 transition cursor-pointer flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Thêm Từ Vựng Mới</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-purple-500/30 bg-slate-950">
                <table className="w-full text-left text-xs text-slate-200">
                  <thead className="bg-slate-900 text-purple-300 uppercase text-[10px] font-black border-b border-purple-500/30">
                    <tr>
                      <th className="p-3">Icon</th>
                      <th className="p-3">Từ Tiếng Anh</th>
                      <th className="p-3">IPA / Việt Bồi</th>
                      <th className="p-3">Nghĩa Tiếng Việt</th>
                      <th className="p-3">Level / Độ Tuổi</th>
                      <th className="p-3 text-right">Thao Tác Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-medium">
                    {filteredVocab.slice(0, 50).map((item) => (
                      <tr key={item.id} className="hover:bg-purple-950/30 transition">
                        <td className="p-3 text-2xl">{item.image || item.imageEmoji || '📖'}</td>
                        <td className="p-3 font-black text-white">{item.word}</td>
                        <td className="p-3 font-mono-code text-cyan-300">{item.ipa || `/${item.word}/`}</td>
                        <td className="p-3 text-amber-300 font-bold">{item.meaning || item.meaning_vi}</td>
                        <td className="p-3 font-mono-code text-purple-300">{item.level || 'L1'} • {item.ageGroup || '3-6'}</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setFormDataVocab({ ...formDataVocab, ...item });
                              setModalType('vocab');
                            }}
                            className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 cursor-pointer"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteVocab(item)}
                            className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30">
                <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2">
                  <Users className="h-4 w-4 text-cyan-400" />
                  QUẢN LÝ TÀI KHOẢN NGƯỜI DÙNG & PHỤ HUYNH
                </h3>
                <button onClick={() => { setEditingItem(null); setFormDataUser({ username: '', email: '', role: 'student', displayName: '', age: 6, ageGroup: '3-6', stars: 100, level: 'L1', streak: 0, parentPhone: '', pinCode: '1234', status: 'active' }); setModalType('user'); }} className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-black text-xs shadow hover:bg-cyan-500 cursor-pointer flex items-center gap-1.5">
                  <Plus className="h-4 w-4" /> Tạo Người Dùng Mới
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-cyan-500/30 bg-slate-950">
                <table className="w-full text-left text-xs text-slate-200">
                  <thead className="bg-slate-900 text-cyan-300 uppercase text-[10px] font-black border-b border-cyan-500/30">
                    <tr>
                      <th className="p-3">Tên Hiển Thị</th>
                      <th className="p-3">Username / Email</th>
                      <th className="p-3">Vai Trò</th>
                      <th className="p-3 font-mono-code text-yellow-300">Sao ⭐</th>
                      <th className="p-3">SĐT Phụ Huynh / PIN</th>
                      <th className="p-3 text-right">Thao Tác Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {usersList.map((usr) => (
                      <tr key={usr.id} className="hover:bg-cyan-950/30 transition">
                        <td className="p-3 font-black text-white">{usr.displayName || usr.username}</td>
                        <td className="p-3 font-mono-code text-slate-300">@{usr.username} ({usr.email || 'No email'})</td>
                        <td className="p-3 font-bold text-amber-300 uppercase">{usr.role}</td>
                        <td className="p-3 font-mono-code text-yellow-300 font-bold">{usr.stars} ⭐</td>
                        <td className="p-3 font-mono-code text-slate-400">{usr.parentPhone || '—'} / PIN: {usr.pinCode || '1234'}</td>
                        <td className="p-3 text-right space-x-2">
                          <button onClick={() => { setSelectedLearnerForLock(usr.id); setActiveTab('level_controls'); }} className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 cursor-pointer" title="🔑 Quản Lý Khóa Cấp Độ Học Viên"><ShieldCheck className="h-3.5 w-3.5" /></button>
                          <button onClick={() => { setEditingItem(usr); setFormDataUser({ ...usr }); setModalType('user'); }} className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 cursor-pointer"><Edit className="h-3.5 w-3.5" /></button>
                          <button onClick={() => handleDeleteUser(usr)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* AGE ENGINE */}
          {activeTab === 'age_engine' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30">
                <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-400" />
                  CẤU HÌNH ĐỘ TUỔI MỞ RỘNG (3–6, 7–10, 11–15, 16+)
                </h3>
                <button onClick={() => { setEditingItem(null); setFormDataAgeGroup({ code: '', label: '', icon: '👶', focus: '', wordTarget: 200 }); setModalType('age_group'); }} className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow hover:bg-amber-400 cursor-pointer flex items-center gap-1.5">
                  <Plus className="h-4 w-4" /> Thêm Nhóm Tuổi Mới
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ageGroupEngine.map((ag) => (
                  <div key={ag.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{ag.icon}</span>
                        <h4 className="text-sm font-black text-white">{ag.label} ({ag.code})</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditingItem(ag); setFormDataAgeGroup({ ...ag }); setModalType('age_group'); }} className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 cursor-pointer"><Edit className="h-3.5 w-3.5" /></button>
                        <button onClick={() => handleDeleteAgeGroup(ag)} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">{ag.focus}</p>
                    <div className="text-[11px] font-mono-code text-amber-300 font-bold">Target: {ag.wordTarget} từ vựng</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SRS */}
          {activeTab === 'srs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30">
                <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-amber-400" />
                  SRS MASTERY CONTROL & THUẬT TOÁN FSRS DSR MODEL
                </h3>
                <button onClick={() => { setEditingItem(null); setFormDataSrs({ word: '', user: 'Bé Minh Anh', stage: 'Stage 1 (1 ngày)', next_review: '2026-08-20', recall_rate: 90, interval_days: 1, ease_factor: 2.5, status: 'Active' }); setModalType('srs'); }} className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow hover:bg-amber-400 cursor-pointer flex items-center gap-1.5">
                  <Plus className="h-4 w-4" /> Thêm Mốc SRS Mới
                </button>
              </div>

              {/* FSRS MATHEMATICAL SIMULATOR */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-black text-amber-300 uppercase flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    BỘ MÔ PHỎNG THUẬT TOÁN FSRS (FREE SPACED REPETITION SCHEDULER)
                  </span>
                  <span className="text-[10px] font-mono-code text-slate-400">R(t,S) = (1 + 9t/S)^-1</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { rating: 1, label: '1 - Again (Quên)', color: 'bg-rose-600 hover:bg-rose-500' },
                    { rating: 2, label: '2 - Hard (Khó)', color: 'bg-amber-600 hover:bg-amber-500' },
                    { rating: 3, label: '3 - Good (Tốt)', color: 'bg-indigo-600 hover:bg-indigo-500' },
                    { rating: 4, label: '4 - Easy (Dễ)', color: 'bg-emerald-600 hover:bg-emerald-500' }
                  ].map(btn => (
                    <button
                      key={btn.rating}
                      onClick={() => {
                        const sampleState = { stability: 2.5, difficulty: 4.8, repetition: 2 };
                        const result = FsrsMemoryEngine.computeNextState(sampleState, btn.rating);
                        if (addToast) addToast(`🧠 FSRS Rating ${btn.rating}: Retrievability ${result.retrievability}% • Next Interval: ${result.intervalDays}d`, 'success');
                      }}
                      className={`p-2.5 rounded-xl text-white font-bold text-xs shadow cursor-pointer transition ${btn.color}`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-amber-500/30 bg-slate-950">
                <table className="w-full text-left text-xs text-slate-200">
                  <thead className="bg-slate-900 text-amber-300 uppercase text-[10px] font-black border-b border-amber-500/30">
                    <tr>
                      <th className="p-3">Từ Vựng</th>
                      <th className="p-3">Học Viên</th>
                      <th className="p-3">Stage Ôn Tập</th>
                      <th className="p-3">Tỷ Lệ Nhớ %</th>
                      <th className="p-3">Hệ Số EF / Khoảng Ngày</th>
                      <th className="p-3 text-right">Thao Tác Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {srsList.map((s) => (
                      <tr key={s.id} className="hover:bg-amber-950/20 transition">
                        <td className="p-3 font-black text-white">{s.word}</td>
                        <td className="p-3 font-bold text-cyan-300">{s.user}</td>
                        <td className="p-3 font-mono-code text-purple-300">{s.stage}</td>
                        <td className="p-3 font-mono-code text-emerald-300 font-bold">{s.recall_rate}%</td>
                        <td className="p-3 font-mono-code text-slate-400">EF: {s.ease_factor} • {s.interval_days}d</td>
                        <td className="p-3 text-right space-x-2">
                          <button onClick={() => { setEditingItem(s); setFormDataSrs({ ...s }); setModalType('srs'); }} className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 cursor-pointer"><Edit className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setSrsList(srsList.filter(item => item.id !== s.id))} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* LESSONS */}
          {activeTab === 'lessons' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30">
                <h3 className="text-sm font-black text-purple-300 flex items-center gap-2">
                  <Map className="h-4 w-4 text-purple-400" />
                  GIÁO TRÌNH VÀ 90 UNITS BÀI HỌC
                </h3>
                <button onClick={() => { setEditingItem(null); setFormDataLesson({ unitId: 'U01', level: 'L1', title: '', ageGroup: '3-6', wordCount: 10, passingScore: 80, status: 'PUBLISHED', version: 'v1.0' }); setModalType('lesson'); }} className="px-4 py-2 rounded-xl bg-purple-600 text-white font-black text-xs shadow hover:bg-purple-500 cursor-pointer flex items-center gap-1.5">
                  <Plus className="h-4 w-4" /> Tạo Unit Mới
                </button>
              </div>

              <div className="space-y-3">
                {lessonsList.map((les) => (
                  <div key={les.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-white">{les.title} ({les.unitId})</div>
                      <div className="text-xs text-slate-400 font-mono-code">{les.level} • {les.ageGroup} tuổi • Số từ: {les.wordCount} • Passing Score: {les.passingScore}% • Version: {les.version}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditingItem(les); setFormDataLesson({ ...les }); setModalType('lesson'); }} className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 cursor-pointer"><Edit className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setLessonsList(lessonsList.filter(l => l.id !== les.id))} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HOMEWORK */}
          {activeTab === 'homework' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30">
                <h3 className="text-sm font-black text-indigo-300 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-400" />
                  CHẤM BÀI TẬP VỀ NHÀ HỌC VIÊN
                </h3>
                <button onClick={() => { setEditingItem(null); setFormDataHomework({ studentName: '', level: 'L1', assignment: '', audioUrl: '', score: 95, feedback: '', status: 'graded' }); setModalType('homework'); }} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs shadow hover:bg-indigo-500 cursor-pointer flex items-center gap-1.5">
                  <Plus className="h-4 w-4" /> Giao Bài Tập Mới
                </button>
              </div>

              <div className="space-y-3">
                {homeworkList.map((hw) => (
                  <div key={hw.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-white">{hw.studentName} ({hw.level})</div>
                      <div className="text-xs text-cyan-300 font-bold">{hw.assignment}</div>
                      <div className="text-[11px] text-slate-400 italic">"{hw.feedback || 'Chưa có nhận xét'}"</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black text-yellow-300 font-mono-code">{hw.score} Điểm</span>
                      <button onClick={() => { setEditingItem(hw); setFormDataHomework({ ...hw }); setModalType('homework'); }} className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 cursor-pointer"><Edit className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setHomeworkList(homeworkList.filter(h => h.id !== hw.id))} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SMART ERROR CENTER */}
          {activeTab === 'errors' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/40 flex items-center justify-between">
                <h3 className="text-sm font-black text-rose-300 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-rose-400" /> SMART ERROR CENTER V7.0</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 text-[10px] font-mono-code">{errorGroups.length} Lỗi Thu Thập</span>
              </div>
              <div className="space-y-2">
                {errorGroups.map((err) => (
                  <div key={err.group_id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-black text-white">{err.error_code} ({err.severity})</div>
                      <div className="text-slate-400 text-[11px]">{err.message}</div>
                    </div>
                    <button onClick={() => addToast(`🛠️ Đã tạo Fix Workspace cho ${err.error_code}!`, 'success')} className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs cursor-pointer shadow">Auto Fix Workspace</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LIVE CODE STUDIO */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/40 flex items-center justify-between">
                <h3 className="text-sm font-black text-indigo-300 flex items-center gap-2"><Code className="h-4 w-4 text-indigo-400" /> LIVE CODE STUDIO V7.0</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 text-[10px] font-mono-code">{codeFiles.length} Allowlist Files</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  {codeFiles.map((file) => (
                    <button key={file.path} onClick={() => { setSelectedFile(file); setFileContent(`// ${file.path}\n// V7.0 Live Code Studio Editor`); }} className={`w-full p-2.5 rounded-xl text-left text-xs font-mono-code cursor-pointer ${selectedFile?.path === file.path ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-950 text-slate-300'}`}>
                      {file.name}
                    </button>
                  ))}
                </div>
                <div className="lg:col-span-9 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono-code text-cyan-300 font-bold">📄 {selectedFile?.path}</span>
                    <button onClick={() => addToast('🚀 Đã Apply workspace!', 'success')} className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs cursor-pointer shadow">Apply Workspace</button>
                  </div>
                  <textarea rows="12" value={fileContent} onChange={(e) => setFileContent(e.target.value)} className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono-code text-xs text-slate-200 focus:outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* FEATURE FLAGS */}
          {activeTab === 'flags' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40">
                <h3 className="text-sm font-black text-emerald-300 flex items-center gap-2"><Zap className="h-4 w-4 text-emerald-400" /> FEATURE FLAGS & ROLLOUT SYSTEM</h3>
                <button onClick={() => { setEditingItem(null); setFormDataFlag({ key: '', name: '', rollout: 100, enabled: true }); setModalType('flag'); }} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs shadow hover:bg-emerald-500 cursor-pointer flex items-center gap-1.5">
                  <Plus className="h-4 w-4" /> Tạo Flag Mới
                </button>
              </div>
              <div className="space-y-3">
                {featureFlags.map((flag) => (
                  <div key={flag.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-white">{flag.name}</div>
                      <div className="text-xs font-mono-code text-slate-400">{flag.key} • Rollout: {flag.rollout}%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditingItem(flag); setFormDataFlag({ ...flag }); setModalType('flag'); }} className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 cursor-pointer"><Edit className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setFeatureFlags(featureFlags.filter(f => f.id !== flag.id))} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RELEASES */}
          {activeTab === 'releases' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-purple-500/40">
                <h3 className="text-sm font-black text-purple-300 flex items-center gap-2"><GitPullRequest className="h-4 w-4 text-purple-400" /> QUẢN LÝ RELEASES & 1-CLICK INSTANT ROLLBACK</h3>
                <button onClick={() => { setEditingItem(null); setFormDataRelease({ version: '', change_set: '', approved_by: 'Bảo Nguyễn', status: 'ACTIVE' }); setModalType('release'); }} className="px-4 py-2 rounded-xl bg-purple-600 text-white font-black text-xs shadow hover:bg-purple-500 cursor-pointer flex items-center gap-1.5">
                  <Plus className="h-4 w-4" /> Tạo Release Mới
                </button>
              </div>
              <div className="space-y-3">
                {releasesList.map((rel) => (
                  <div key={rel.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-white">{rel.version} ({rel.status})</div>
                      <div className="text-xs text-purple-300 font-bold">{rel.change_set}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditingItem(rel); setFormDataRelease({ ...rel }); setModalType('release'); }} className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 cursor-pointer"><Edit className="h-3.5 w-3.5" /></button>
                      <button onClick={() => addToast(`⏪ Đã Instant Rollback về phiên bản ${rel.version}!`, 'warning')} className="px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-xs shadow hover:bg-rose-500 cursor-pointer">
                        ⏪ Rollback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI AGENTS */}
          {activeTab === 'agents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30">
                <h3 className="text-sm font-black text-purple-300 flex items-center gap-2"><Bot className="h-4 w-4 text-purple-400" /> CẤU HÌNH AI AGENTS & GIỌNG ĐỌC TTS</h3>
                <button onClick={() => { setEditingItem(null); setFormDataAgent({ name: '', role: '', gender: 'Female', speed: 0.9, pitch: 1.0, status: 'active' }); setModalType('agent'); }} className="px-4 py-2 rounded-xl bg-purple-600 text-white font-black text-xs shadow hover:bg-purple-500 cursor-pointer flex items-center gap-1.5">
                  <Plus className="h-4 w-4" /> Tạo Agent Mới
                </button>
              </div>
              <div className="space-y-3">
                {agentsList.map((ag) => (
                  <div key={ag.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-white">{ag.name}</div>
                      <div className="text-xs text-amber-300 font-bold">{ag.role}</div>
                      <div className="text-[11px] text-slate-400 font-mono-code">Tốc độ: {ag.speed}x • Pitch: {ag.pitch}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditingItem(ag); setFormDataAgent({ ...ag }); setModalType('agent'); }} className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 cursor-pointer"><Edit className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setAgentsList(agentsList.filter(a => a.id !== ag.id))} className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GLOBAL CONFIG */}
          {activeTab === 'config' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30">
                <h3 className="text-sm font-black text-purple-300 flex items-center gap-2"><Sliders className="h-4 w-4 text-purple-400" /> CẤU HÌNH GLOBAL TOÀN HỆ THỐNG</h3>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 max-w-xl">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Giao Diện Background 3D</label>
                  <select value={sysConfig.theme3D} onChange={(e) => setSysConfig({ ...sysConfig, theme3D: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white cursor-pointer">
                    <option value="galaxy3d">Galaxy Starfield 3D</option>
                    <option value="cyberpunk">Cyberpunk Neon</option>
                    <option value="nature">Nature Magic</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Độ Ẩn/Hiện Nền 3D (Background Opacity: {sysConfig.bgOpacity})</label>
                  <input type="range" min="0.1" max="1" step="0.05" value={sysConfig.bgOpacity} onChange={(e) => setSysConfig({ ...sysConfig, bgOpacity: parseFloat(e.target.value) })} className="w-full cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Số Từ Vựng Tối Đa Học Mỗi Ngày (Max Daily Words)</label>
                  <input type="number" min="1" max="50" value={sysConfig.maxDailyWords} onChange={(e) => setSysConfig({ ...sysConfig, maxDailyWords: Number(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-300 font-mono-code" />
                </div>
                <button onClick={() => addToast('⚙️ Đã lưu cấu hình Global thành công!', 'success')} className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-black text-xs shadow-lg hover:bg-purple-500 cursor-pointer">
                  Lưu Cấu Hình Global
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ULTRA-DETAILED MODAL VOCAB */}
      {modalType === 'vocab' && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/90 p-4">
          <form onSubmit={handleSaveVocab} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl border-2 border-purple-500/60 bg-slate-900 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-purple-300">{editingItem ? '✏️ Chỉnh Sửa Chi Tiết Từ Vựng' : '➕ Thêm Từ Vựng Mới'}</h3>
              <button type="button" onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Từ Tiếng Anh *</label>
                <input type="text" required value={formDataVocab.word} onChange={(e) => setFormDataVocab({ ...formDataVocab, word: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Nghĩa Tiếng Việt *</label>
                <input type="text" required value={formDataVocab.meaning} onChange={(e) => setFormDataVocab({ ...formDataVocab, meaning: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Phiên Âm IPA</label>
                <input type="text" value={formDataVocab.ipa} onChange={(e) => setFormDataVocab({ ...formDataVocab, ipa: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono-code" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Phiên Âm Việt Bồi</label>
                <input type="text" value={formDataVocab.vietnamesePhonetic} onChange={(e) => setFormDataVocab({ ...formDataVocab, vietnamesePhonetic: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Trình Độ (Level)</label>
                <select value={formDataVocab.level} onChange={(e) => setFormDataVocab({ ...formDataVocab, level: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white cursor-pointer font-bold">
                  {COURSE_LEVELS.map(lvl => <option key={lvl.id} value={lvl.id}>{lvl.id} - {lvl.name}</option>)}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Nhóm Độ Tuổi</label>
                <select value={formDataVocab.ageGroup} onChange={(e) => setFormDataVocab({ ...formDataVocab, ageGroup: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white cursor-pointer font-bold">
                  <option value="3-6">3–6 tuổi (Mầm non)</option>
                  <option value="7-10">7–10 tuổi (Tiểu học)</option>
                  <option value="11-15">11–15 tuổi (THCS)</option>
                  <option value="16+">16+ (Chuyên sâu)</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Icon / Emoji</label>
                <input type="text" value={formDataVocab.image} onChange={(e) => setFormDataVocab({ ...formDataVocab, image: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-2xl text-center" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Độ Khó (Difficulty)</label>
                <select value={formDataVocab.difficulty} onChange={(e) => setFormDataVocab({ ...formDataVocab, difficulty: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white cursor-pointer font-bold">
                  <option value="Easy">Dễ (Easy)</option>
                  <option value="Medium">Trung bình (Medium)</option>
                  <option value="Hard">Khó (Hard)</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="font-bold text-slate-300 block mb-1">Ví Dụ Tiếng Anh (Example Sentence)</label>
                <input type="text" value={formDataVocab.example} onChange={(e) => setFormDataVocab({ ...formDataVocab, example: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium" />
              </div>
              <div className="col-span-2">
                <label className="font-bold text-slate-300 block mb-1">Dịch Ví Dụ Tiếng Việt</label>
                <input type="text" value={formDataVocab.example_vi} onChange={(e) => setFormDataVocab({ ...formDataVocab, example_vi: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 italic" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Hủy</button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-purple-600 text-white font-black text-xs cursor-pointer shadow">Lưu Chi Tiết</button>
            </div>
          </form>
        </div>
      )}

      {/* ULTRA-DETAILED MODAL USER */}
      {modalType === 'user' && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/90 p-4">
          <form onSubmit={handleSaveUser} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl border-2 border-cyan-500/60 bg-slate-900 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-cyan-300">{editingItem ? '✏️ Chỉnh Sửa Chi Tiết Người Dùng' : '➕ Tạo Tài Khoản Người Dùng Mới'}</h3>
              <button type="button" onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Username *</label>
                <input type="text" required value={formDataUser.username} onChange={(e) => setFormDataUser({ ...formDataUser, username: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tên Hiển Thị</label>
                <input type="text" value={formDataUser.displayName} onChange={(e) => setFormDataUser({ ...formDataUser, displayName: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Email Liên Hệ</label>
                <input type="email" value={formDataUser.email} onChange={(e) => setFormDataUser({ ...formDataUser, email: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono-code" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Vai Trò (Role)</label>
                <select value={formDataUser.role} onChange={(e) => setFormDataUser({ ...formDataUser, role: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-bold cursor-pointer uppercase">
                  <option value="student">Student (Học Sinh)</option>
                  <option value="parent">Parent (Phụ Huynh)</option>
                  <option value="teacher">Teacher (Giáo Viên)</option>
                  <option value="admin">Super Admin</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Số Sao (Stars ⭐)</label>
                <input type="number" min="0" value={formDataUser.stars} onChange={(e) => setFormDataUser({ ...formDataUser, stars: Number(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-yellow-300 font-mono-code font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Chuỗi Ngày Học (Streak 🔥)</label>
                <input type="number" min="0" value={formDataUser.streak} onChange={(e) => setFormDataUser({ ...formDataUser, streak: Number(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-orange-400 font-mono-code font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Số Điện Thoại Phụ Huynh</label>
                <input type="text" value={formDataUser.parentPhone} onChange={(e) => setFormDataUser({ ...formDataUser, parentPhone: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono-code" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Mã PIN Bảo Mặt Phụ Huynh</label>
                <input type="text" value={formDataUser.pinCode} onChange={(e) => setFormDataUser({ ...formDataUser, pinCode: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-rose-300 font-mono-code font-bold" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Hủy</button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-cyan-600 text-white font-black text-xs cursor-pointer shadow">Lưu Chi Tiết Người Dùng</button>
            </div>
          </form>
        </div>
      )}

      {/* ULTRA-DETAILED MODAL SRS */}
      {modalType === 'srs' && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/90 p-4">
          <form onSubmit={handleSaveSrs} className="w-full max-w-lg rounded-3xl border-2 border-amber-500/60 bg-slate-900 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-amber-300">{editingItem ? '✏️ Chỉnh Sửa Mốc Ghi Nhớ SRS' : '➕ Thêm Mốc SRS Mới'}</h3>
              <button type="button" onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Từ Vựng *</label>
                <input type="text" required value={formDataSrs.word} onChange={(e) => setFormDataSrs({ ...formDataSrs, word: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tên Học Viên</label>
                <input type="text" value={formDataSrs.user} onChange={(e) => setFormDataSrs({ ...formDataSrs, user: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Giai Đoạn (Stage)</label>
                <input type="text" value={formDataSrs.stage} onChange={(e) => setFormDataSrs({ ...formDataSrs, stage: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 font-mono-code" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tỷ Lệ Ghi Nhớ (%)</label>
                <input type="number" min="0" max="100" value={formDataSrs.recall_rate} onChange={(e) => setFormDataSrs({ ...formDataSrs, recall_rate: Number(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono-code font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Khoảng Cách Ngày (Interval)</label>
                <input type="number" min="1" value={formDataSrs.interval_days} onChange={(e) => setFormDataSrs({ ...formDataSrs, interval_days: Number(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono-code" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Hệ Số Easiness Factor (EF)</label>
                <input type="number" step="0.1" min="1.3" max="3.0" value={formDataSrs.ease_factor} onChange={(e) => setFormDataSrs({ ...formDataSrs, ease_factor: parseFloat(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono-code" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Hủy</button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs cursor-pointer shadow">Lưu Chi Tiết SRS</button>
            </div>
          </form>
        </div>
      )}

      {/* ULTRA-DETAILED MODAL LESSON */}
      {modalType === 'lesson' && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/90 p-4">
          <form onSubmit={handleSaveLesson} className="w-full max-w-lg rounded-3xl border-2 border-purple-500/60 bg-slate-900 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-purple-300">{editingItem ? '✏️ Sửa Chi Tiết Unit Bài Học' : '➕ Tạo Unit Mới'}</h3>
              <button type="button" onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Mã Unit *</label>
                <input type="text" required value={formDataLesson.unitId} onChange={(e) => setFormDataLesson({ ...formDataLesson, unitId: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tiêu Đề Unit *</label>
                <input type="text" required value={formDataLesson.title} onChange={(e) => setFormDataLesson({ ...formDataLesson, title: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Trình Độ (Level)</label>
                <select value={formDataLesson.level} onChange={(e) => setFormDataLesson({ ...formDataLesson, level: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold cursor-pointer">
                  {COURSE_LEVELS.map(l => <option key={l.id} value={l.id}>{l.id} - {l.name}</option>)}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Điểm Đạt Passing Score (%)</label>
                <input type="number" min="50" max="100" value={formDataLesson.passingScore} onChange={(e) => setFormDataLesson({ ...formDataLesson, passingScore: Number(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-yellow-300 font-mono-code font-bold" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Hủy</button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-purple-600 text-white font-black text-xs cursor-pointer shadow">Lưu Chi Tiết Bài Học</button>
            </div>
          </form>
        </div>
      )}

      {/* ULTRA-DETAILED MODAL HOMEWORK */}
      {modalType === 'homework' && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/90 p-4">
          <form onSubmit={handleSaveHomework} className="w-full max-w-lg rounded-3xl border-2 border-indigo-500/60 bg-slate-900 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-indigo-300">{editingItem ? '✏️ Chấm / Sửa Chi Tiết Bài Tập' : '➕ Giao Bài Tập Mới'}</h3>
              <button type="button" onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tên Học Viên *</label>
                <input type="text" required value={formDataHomework.studentName} onChange={(e) => setFormDataHomework({ ...formDataHomework, studentName: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Đề Bài *</label>
                <input type="text" required value={formDataHomework.assignment} onChange={(e) => setFormDataHomework({ ...formDataHomework, assignment: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Điểm Chấm (0 - 100 Điểm)</label>
                <input type="number" min="0" max="100" value={formDataHomework.score} onChange={(e) => setFormDataHomework({ ...formDataHomework, score: Number(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-yellow-300 font-mono-code font-bold text-base" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Nhận Xét Sư Phạm Chi Tiết</label>
                <textarea rows="3" value={formDataHomework.feedback} onChange={(e) => setFormDataHomework({ ...formDataHomework, feedback: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Hủy</button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs cursor-pointer shadow">Lưu Bài Tập</button>
            </div>
          </form>
        </div>
      )}

      {/* ULTRA-DETAILED MODAL FLAG */}
      {modalType === 'flag' && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/90 p-4">
          <form onSubmit={handleSaveFlag} className="w-full max-w-md rounded-3xl border-2 border-emerald-500/60 bg-slate-900 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-emerald-300">{editingItem ? '✏️ Sửa Feature Flag' : '➕ Tạo Feature Flag Mới'}</h3>
              <button type="button" onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Mã Key Hệ Thống *</label>
                <input type="text" required value={formDataFlag.key} onChange={(e) => setFormDataFlag({ ...formDataFlag, key: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tên Tính Năng *</label>
                <input type="text" required value={formDataFlag.name} onChange={(e) => setFormDataFlag({ ...formDataFlag, name: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tỷ Lệ Rollout (%)</label>
                <input type="number" min="0" max="100" value={formDataFlag.rollout} onChange={(e) => setFormDataFlag({ ...formDataFlag, rollout: Number(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-yellow-300 font-mono-code font-bold" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Hủy</button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs cursor-pointer shadow">Lưu Feature Flag</button>
            </div>
          </form>
        </div>
      )}

      {/* ULTRA-DETAILED MODAL AGENT */}
      {modalType === 'agent' && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/90 p-4">
          <form onSubmit={handleSaveAgent} className="w-full max-w-md rounded-3xl border-2 border-purple-500/60 bg-slate-900 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-purple-300">{editingItem ? '✏️ Sửa AI Agent' : '➕ Tạo AI Agent Mới'}</h3>
              <button type="button" onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Tên Agent *</label>
                <input type="text" required value={formDataAgent.name} onChange={(e) => setFormDataAgent({ ...formDataAgent, name: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Nhiệm Vụ / Vai Trò *</label>
                <input type="text" required value={formDataAgent.role} onChange={(e) => setFormDataAgent({ ...formDataAgent, role: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Tốc Độ Đọc (Speed)</label>
                  <input type="number" step="0.05" min="0.5" max="1.5" value={formDataAgent.speed} onChange={(e) => setFormDataAgent({ ...formDataAgent, speed: parseFloat(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono-code font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Cao Độ (Pitch)</label>
                  <input type="number" step="0.05" min="0.5" max="1.5" value={formDataAgent.pitch} onChange={(e) => setFormDataAgent({ ...formDataAgent, pitch: parseFloat(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono-code font-bold" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Hủy</button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-purple-600 text-white font-black text-xs cursor-pointer shadow">Lưu AI Agent</button>
            </div>
          </form>
        </div>
      )}

      {/* ULTRA-DETAILED MODAL RELEASE */}
      {modalType === 'release' && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/90 p-4">
          <form onSubmit={handleSaveRelease} className="w-full max-w-md rounded-3xl border-2 border-purple-500/60 bg-slate-900 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-purple-300">{editingItem ? '✏️ Sửa Bản Release' : '➕ Tạo Release Mới'}</h3>
              <button type="button" onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Mã Phiên Bản (Version) *</label>
                <input type="text" required value={formDataRelease.version} onChange={(e) => setFormDataRelease({ ...formDataRelease, version: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Nội Dung Biến Động (Change Set) *</label>
                <textarea rows="3" required value={formDataRelease.change_set} onChange={(e) => setFormDataRelease({ ...formDataRelease, change_set: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 font-medium" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer">Hủy</button>
              <button type="submit" className="px-6 py-2 rounded-xl bg-purple-600 text-white font-black text-xs cursor-pointer shadow">Lưu Release</button>
            </div>
          </form>
        </div>
      )}

      {/* TRASH CAN MODAL */}
      {showTrashModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/90 p-4">
          <div className="w-full max-w-xl rounded-3xl border-2 border-rose-500/60 bg-slate-900 p-6 space-y-4 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-rose-300 flex items-center gap-2">
                <Trash className="h-5 w-5 text-rose-400" />
                THÙNG RÁC HỆ THỐNG ({trashList.length} Mục)
              </h3>
              <button onClick={() => setShowTrashModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {trashList.length > 0 ? trashList.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono-code">{item.type} • {item.deletedAt}</div>
                  </div>
                  <button onClick={() => { setTrashList(trashList.filter((_, i) => i !== idx)); if (addToast) addToast(`🔄 Đã khôi phục mục!`, 'success'); }} className="px-3 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold cursor-pointer">Khôi Phục</button>
                </div>
              )) : <div className="py-8 text-center text-xs text-slate-500">Thùng rác trống.</div>}
            </div>
            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button onClick={() => setShowTrashModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer">Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-2 flex items-center justify-between text-[10px] font-mono-code text-slate-400">
        <span>V7.0 INTELLIGENCE ENGINE • FULL CRUD MODAL MATRIX ACTIVE</span>
        <span className="text-emerald-400">STATUS: 100% OPERATIONAL & INTERACTIVE</span>
      </footer>

    </div>
  );
}
