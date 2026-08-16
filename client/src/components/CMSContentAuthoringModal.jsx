import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Edit3, Trash2, CheckCircle2, ShieldCheck, Lock, Unlock, Database, Layers, BookOpen, Volume2, Sparkles, AlertTriangle, ArrowUpRight, History, Save, RotateCcw, Download, UploadCloud, RefreshCw, Search, Wrench } from 'lucide-react';
import { COURSE_LEVELS, VOCAB_CATEGORIES } from '../constants/kidsVocabularyDatabase';
import { DBSyncEngine } from '../services/dbSyncEngine';

export default function CMSContentAuthoringModal({
  isOpen,
  onClose,
  currentActor = 'bao_nguyen',
  vocabDatabase = [],
  saveVocabDatabase,
  addToast
}) {
  if (!isOpen) return null;

  const isAdmin = currentActor === 'bao_nguyen';

  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' | 'fast_creator' | 'vocab' | 'overrides' | 'backup' | 'audit'
  const [selectedLevel, setSelectedLevel] = useState('L1');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fast Creator State
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newIPA, setNewIPA] = useState('');
  const [newCategory, setNewCategory] = useState('Animals');
  const [newLevel, setNewLevel] = useState('L1');
  const [newEmoji, setNewEmoji] = useState('🌟');
  const [isFetchingAI, setIsFetchingAI] = useState(false);

  // Admin Override state (BR-LP-003)
  const [overrideUser, setOverrideUser] = useState('Bé Minh Anh');
  const [overrideTargetLevel, setOverrideTargetLevel] = useState('L2');
  const [overrideReason, setOverrideReason] = useState('Bé thi xuất sắc bài test L1, phụ huynh yêu cầu mở sớm L2');

  // Draft Lesson Builder state
  const [draftLessonTitle, setDraftLessonTitle] = useState('My First Animal Friends');
  const [draftTopicId, setDraftTopicId] = useState('L1-U06');
  const [draftActivityType, setDraftActivityType] = useState('FLASHCARD');

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('v3_event_logs') || '[]').slice(-50).reverse();
    } catch {
      return [];
    }
  });

  // Fast AI Dictionary Auto Fetcher (Datamuse & FreeDictionary API)
  const handleFetchAIDictionary = async () => {
    if (!newWord.trim()) {
      if (addToast) addToast('⚠️ Vui lòng nhập từ tiếng Anh trước khi tra AI!', 'warning');
      return;
    }

    setIsFetchingAI(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(newWord.trim().toLowerCase())}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data[0]) {
          const entry = data[0];
          const phonetic = entry.phonetic || (entry.phonetics && entry.phonetics[0] && entry.phonetics[0].text) || '';
          const meaningObj = entry.meanings && entry.meanings[0];
          const def = meaningObj && meaningObj.definitions && meaningObj.definitions[0] && meaningObj.definitions[0].definition;

          if (phonetic) setNewIPA(phonetic);
          if (def) setNewMeaning(def);

          if (addToast) addToast(`✨ AI Dictionary đã tra thành công từ "${newWord.trim()}"!`, 'success');
        }
      } else {
        if (addToast) addToast(`ℹ️ Không tìm thấy phiên âm tự động cho "${newWord}". Vui lòng tự nhập IPA!`, 'info');
      }
    } catch (err) {
      console.warn('Dictionary API error:', err);
      if (addToast) addToast('⚠️ Không thể kết nối FreeDictionary API. Vui lòng tự nhập IPA!', 'info');
    } finally {
      setIsFetchingAI(false);
    }
  };

  const handleAddVocabItem = (e) => {
    e.preventDefault();
    if (!newWord.trim() || !newMeaning.trim()) {
      if (addToast) addToast('⚠️ Vui lòng nhập đầy đủ Từ tiếng Anh và Nghĩa tiếng Việt!', 'warning');
      return;
    }

    const newItem = {
      id: `custom_${Date.now()}`,
      word: newWord.trim(),
      meaning: newMeaning.trim(),
      phonetics: newIPA.trim() || `/${newWord.toLowerCase()}/`,
      category: newCategory,
      level: newLevel,
      imageEmoji: newEmoji || '🌟',
      isCustom: true
    };

    const updated = [newItem, ...vocabDatabase];
    if (saveVocabDatabase) saveVocabDatabase(updated);

    DBSyncEngine.trackEvent('cms_add_vocab_word', { word: newWord, level: newLevel, actor: 'bao_nguyen' });

    setNewWord('');
    setNewMeaning('');
    setNewIPA('');
    if (addToast) addToast(`✅ Đã thêm từ vựng mới: "${newItem.word}" vào kho CSDL!`, 'success');
  };

  const handleAdminOverride = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      if (addToast) addToast('⚠️ Chỉ có Quản trị viên Lê Lương Bảo Nguyên mới có quyền Override!', 'error');
      return;
    }

    try {
      const overrides = JSON.parse(localStorage.getItem('kids_admin_level_overrides') || '{}');
      overrides[overrideTargetLevel] = true;
      localStorage.setItem('kids_admin_level_overrides', JSON.stringify(overrides));

      DBSyncEngine.trackEvent('admin_override_unlock', {
        actor: 'bao_nguyen',
        targetLevel: overrideTargetLevel,
        learner: overrideUser,
        reason: overrideReason
      });

      if (addToast) addToast(`🔓 ĐÃ MỞ KHÓA THÀNH CÔNG LEVEL ${overrideTargetLevel} CHO ${overrideUser}!`, 'success');
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateDraftLesson = () => {
    DBSyncEngine.trackEvent('cms_create_draft_lesson', {
      title: draftLessonTitle,
      topicId: draftTopicId,
      activityType: draftActivityType,
      status: 'DRAFT'
    });

    if (addToast) addToast(`📝 Đã tạo bản nháp bài học: "${draftLessonTitle}" (Trạng thái: DRAFT)`, 'success');
  };

  // Export JSON catalog
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vocabDatabase, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kids_english_vocab_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    if (addToast) addToast('📥 Đã xuất file sao lưu JSON kho từ vựng thành công!', 'success');
  };

  const filteredVocab = vocabDatabase.filter((v) => {
    const matchesSearch = v.word.toLowerCase().includes(searchQuery.toLowerCase()) || v.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || v.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn cursor-pointer" onClick={onClose}>
      <div className="relative w-full max-w-5xl max-h-[88vh] overflow-y-auto my-auto rounded-3xl border-2 border-purple-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-3 sm:p-5 md:p-6 space-y-3.5 text-white shadow-2xl custom-scrollbar flex flex-col justify-between cursor-default" onClick={(e) => e.stopPropagation()}>

        <div>
          {/* HEADER BAR */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 shadow-lg font-black flex items-center gap-1.5">
                <Wrench className="h-6 w-6 text-slate-950" />
                <span className="text-xl">🛠️</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-black uppercase tracking-wider">
                    CMS Authoring & Admin Studio V3.0
                  </span>
                  {isAdmin ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-black">
                      👨‍💼 Admin Ba Bảo Nguyên
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold">
                      👁️ View Only
                    </span>
                  )}
                </div>
                <h2 className="text-xl md:text-2xl font-black font-heading text-white">
                  HỆ QUẢN TRỊ NỘI DUNG VÀ MỞ KHÓA QUẢN TRỊ VIÊN
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* NAVIGATION TABS */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 pt-3">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'lessons'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Bài Học (Lessons)</span>
            </button>

            <button
              onClick={() => setActiveTab('fast_creator')}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'fast_creator'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>✨ Thêm Từ Nhanh (AI Dictionary)</span>
            </button>

            <button
              onClick={() => setActiveTab('vocab')}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'vocab'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Database className="h-4 w-4" />
              <span>Kho Từ Vựng ({vocabDatabase.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('overrides')}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'overrides'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Unlock className="h-4 w-4" />
              <span>Mở Khóa Cưỡng Chế (BR-LP-003)</span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'backup'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Download className="h-4 w-4" />
              <span>Sao Lưu JSON</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <History className="h-4 w-4" />
              <span>Audit Log System</span>
            </button>
          </div>

          {/* TAB 1: LESSON AUTHORING WORKFLOW */}
          {activeTab === 'lessons' && (
            <div className="space-y-5 animate-fadeIn pt-2">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-xs text-cyan-200 space-y-1">
                <span className="font-black text-cyan-300 font-heading block">
                  🔄 V3 Workflow Nội Dung: DRAFT ➔ IN_REVIEW ➔ APPROVED ➔ PUBLISHED ➔ ARCHIVED
                </span>
                <p>Mọi thay đổi nội dung được phiên bản hóa (versioning), không ảnh hưởng bài học đang diễn ra của bé!</p>
              </div>

              {/* CREATE DRAFT LESSON FORM */}
              <div className="p-5 rounded-3xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl">
                <h3 className="text-sm font-black text-white font-heading flex items-center gap-2">
                  <Plus className="h-4 w-4 text-cyan-400" />
                  <span>Tạo Bài Học Mới (Draft Authoring Studio):</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Tên Bài Học (Title):</label>
                    <input
                      type="text"
                      value={draftLessonTitle}
                      onChange={(e) => setDraftLessonTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Chủ Đề (Topic):</label>
                    <select
                      value={draftTopicId}
                      onChange={(e) => setDraftTopicId(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold cursor-pointer"
                    >
                      {VOCAB_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Dạng Hoạt Động (Activity):</label>
                    <select
                      value={draftActivityType}
                      onChange={(e) => setDraftActivityType(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold cursor-pointer"
                    >
                      <option value="FLASHCARD">🎴 Flashcard Nhìn & Nghe</option>
                      <option value="PRONUNCIATION">🎙️ Pronunciation & Mic AI</option>
                      <option value="PHONICS">🔤 Phonics & Sound Blending</option>
                      <option value="SPELLING">✏️ Spelling & Word Construction</option>
                      <option value="MATCHING">🧩 Matching Pair Game</option>
                      <option value="CONVERSATION">💬 Roleplay Conversation</option>
                      <option value="STORY">📖 Interactive Storybook</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleCreateDraftLesson}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow hover:scale-105 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Lưu Bản Nháp (Create Draft)</span>
                  </button>
                </div>
              </div>

              {/* EXISTING LESSONS LIST */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Danh Sách Chủ Đề Bài Học Trọng Tâm:
                </h3>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {VOCAB_CATEGORIES.slice(1, 11).map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span className="font-bold text-white">{cat.name}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/40">
                        PUBLISHED v3.0
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FAST VOCAB CREATOR WITH AI DICTIONARY */}
          {activeTab === 'fast_creator' && (
            <form onSubmit={handleAddVocabItem} className="space-y-4 animate-fadeIn pt-2">
              <div className="p-4 rounded-2xl bg-pink-950/40 border border-pink-500/40 text-xs text-pink-200 space-y-1">
                <span className="font-black text-pink-300 font-heading flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" /> Tra cứu phiên âm IPA tự động bằng FreeDictionary API
                </span>
                <p>Nhập từ Tiếng Anh và nhấn nút "Tra IPA AI" để hệ thống tự điền phiên âm chuẩn quốc tế!</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Từ Tiếng Anh (English Word):</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      placeholder="VD: Elephant"
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleFetchAIDictionary}
                      disabled={isFetchingAI}
                      className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xs shrink-0 flex items-center gap-1 cursor-pointer hover:scale-105 transition disabled:opacity-50"
                    >
                      {isFetchingAI ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      <span>Tra IPA AI</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Nghĩa Tiếng Việt (Vietnamese Meaning):</label>
                  <input
                    type="text"
                    value={newMeaning}
                    onChange={(e) => setNewMeaning(e.target.value)}
                    placeholder="VD: Con voi"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Phiên Âm IPA:</label>
                  <input
                    type="text"
                    value={newIPA}
                    onChange={(e) => setNewIPA(e.target.value)}
                    placeholder="VD: /ˈel.ɪ.fənt/"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono-code font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Biểu Tượng Emoji Minh Họa:</label>
                  <input
                    type="text"
                    value={newEmoji}
                    onChange={(e) => setNewEmoji(e.target.value)}
                    placeholder="VD: 🐘"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-center text-lg"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Chọn Chủ Đề (Category):</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold cursor-pointer"
                  >
                    {VOCAB_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Chọn Cấp Độ (Level L1 - L6):</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-bold cursor-pointer"
                  >
                    {COURSE_LEVELS.map(lvl => (
                      <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black text-xs shadow-lg hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>THÊM TỪ VỰNG VÀO DATABASE</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: VOCABULARY CMS DATABASE LIST */}
          {activeTab === 'vocab' && (
            <div className="space-y-3 text-xs animate-fadeIn pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <div className="relative w-full">
                    <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm từ hoặc nghĩa..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-bold text-xs"
                  >
                    <option value="all">Tất cả Cấp Độ</option>
                    {COURSE_LEVELS.map(l => (
                      <option key={l.id} value={l.id}>{l.id} - {l.name}</option>
                    ))}
                  </select>

                  <span className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-black">
                    Hiển thị {filteredVocab.length} / {vocabDatabase.length} từ
                  </span>
                </div>
              </div>

              <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 max-h-72 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] font-black sticky top-0">
                    <tr>
                      <th className="p-3">Ký Hiệu</th>
                      <th className="p-3">Từ Tiếng Anh</th>
                      <th className="p-3">Dịch Tiếng Việt</th>
                      <th className="p-3">Phiên Âm (IPA)</th>
                      <th className="p-3">Cấp Độ</th>
                      <th className="p-3">Chủ Đề</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                    {filteredVocab.slice(0, 40).map((v, i) => (
                      <tr key={v.id || i} className="hover:bg-slate-900/60 transition">
                        <td className="p-3 text-lg">{v.imageEmoji || '🌟'}</td>
                        <td className="p-3 font-bold text-cyan-300">{v.word}</td>
                        <td className="p-3">{v.meaning}</td>
                        <td className="p-3 text-slate-400 font-mono-code">{v.phonetics}</td>
                        <td className="p-3 text-amber-300 font-bold">{v.level}</td>
                        <td className="p-3">{v.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ADMIN OVERRIDE UNLOCK (BR-LP-003) */}
          {activeTab === 'overrides' && (
            <form onSubmit={handleAdminOverride} className="space-y-5 p-5 rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 shadow-xl animate-fadeIn pt-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Unlock className="h-5 w-5 text-amber-400" />
                  <h3 className="text-base font-black text-amber-300 font-heading">
                    MỞ KHÓA CƯỠNG CHẾ CẤP ĐỘ HỌC (ADMIN OVERRIDE ENGINE)
                  </h3>
                </div>
                <p className="text-xs text-slate-300">
                  Cho phép Quản trị viên mở khóa cưỡng chế Level cho bé mà không cần vượt qua đầy đủ điều kiện bài học. Mọi thao tác đều được ghi Audit Log phục vụ kiểm tra!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Tên Hồ Sơ Người Học:</label>
                  <input
                    type="text"
                    value={overrideUser}
                    onChange={(e) => setOverrideUser(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Chọn Cấp Độ Cần Mở Cưỡng Chế:</label>
                  <select
                    value={overrideTargetLevel}
                    onChange={(e) => setOverrideTargetLevel(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold cursor-pointer text-amber-300"
                  >
                    {COURSE_LEVELS.map(lvl => (
                      <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-slate-300 font-bold block mb-1">Lý Do Mở Khóa (Bắt Buộc Cho Audit Log):</label>
                  <textarea
                    rows={2}
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    placeholder="Nhập lý do cụ thể..."
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                >
                  <Unlock className="h-4 w-4" />
                  <span>XÁC NHẬN MỞ KHÓA CƯỠNG CHẾ</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: BACKUP & JSON EXPORTER */}
          {activeTab === 'backup' && (
            <div className="space-y-5 p-5 rounded-3xl border border-emerald-500/40 bg-slate-950 space-y-4 shadow-xl animate-fadeIn pt-2">
              <div className="flex items-center gap-2 text-emerald-300">
                <Download className="h-5 w-5" />
                <h3 className="text-base font-black font-heading">
                  SAO LƯU & XUẤT DỮ LIỆU CƠ SỞ DỮ LIỆU (JSON BACKUP)
                </h3>
              </div>

              <p className="text-xs text-slate-300">
                Xuất toàn bộ {vocabDatabase.length} từ vựng ra file JSON tiêu chuẩn để lưu trữ an toàn hoặc khôi phục dữ liệu trên thiết bị khác.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExportJSON}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>XUẤT FILE SAO LƯU (JSON BACKUP)</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-3 animate-fadeIn pt-2">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <History className="h-4 w-4 text-purple-400" />
                <span>Nhật Ký Audit Hệ Thống & Sự Kiện Quản Trị (V3 Audit Logs):</span>
              </h3>

              <div className="border border-slate-800 rounded-2xl p-4 bg-slate-950 max-h-72 overflow-y-auto custom-scrollbar font-mono-code text-[11px] space-y-2">
                {auditLogs.length === 0 ? (
                  <p className="text-slate-500 italic">Chưa có bản ghi audit log nào.</p>
                ) : (
                  auditLogs.map((log, idx) => (
                    <div key={log.id || idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between text-cyan-400 font-bold">
                        <span>[{log.eventName}]</span>
                        <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                      </div>
                      <p className="text-slate-300">{JSON.stringify(log.payload)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end border-t border-slate-800 pt-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition cursor-pointer"
          >
            Đóng CMS Studio
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
