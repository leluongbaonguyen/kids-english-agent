import React, { useState } from 'react';
import { X, Plus, Edit3, Trash2, CheckCircle2, ShieldCheck, Lock, Unlock, Database, Layers, BookOpen, Volume2, Sparkles, AlertTriangle, ArrowUpRight, History, Save, RotateCcw } from 'lucide-react';
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

  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' | 'vocab' | 'overrides' | 'audit'
  const [selectedLevel, setSelectedLevel] = useState('L1');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

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

      // Track event & audit log
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

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/90 backdrop-blur-2xl p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[85vh] md:max-h-[88vh] overflow-y-auto rounded-3xl border-2 border-cyan-500/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 space-y-4 text-white shadow-2xl custom-scrollbar">

        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 text-2xl shadow-lg font-black">
              🛠️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-black uppercase tracking-wider">
                  V3 CMS Content Authoring & Admin Studio
                </span>
                {isAdmin ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-black">
                    👨‍💼 Admin Mode
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
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 ${
              activeTab === 'lessons'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Quản Lý Bài Học (Lessons)</span>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 ${
              activeTab === 'vocab'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Database className="h-4 w-4" />
            <span>Kho Từ Vựng 900 Từ (CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab('overrides')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 ${
              activeTab === 'overrides'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Unlock className="h-4 w-4" />
            <span>Mở Khóa Cưỡng Chế (BR-LP-003)</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <History className="h-4 w-4" />
            <span>Audit Log Hệ Thống</span>
          </button>
        </div>

        {/* TAB 1: LESSON AUTHORING WORKFLOW */}
        {activeTab === 'lessons' && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-xs text-cyan-200 space-y-1">
              <span className="font-black text-cyan-300 font-heading block">
                🔄 V3 Workflow Nội Dung: DRAFT ➔ IN_REVIEW ➔ APPROVED ➔ PUBLISHED ➔ ARCHIVED
              </span>
              <p>Mọi thay đổi nội dung được phiên bản hóa (versioning), không ảnh hưởng bài học đang diễn ra của bé!</p>
            </div>

            {/* CREATE DRAFT LESSON FORM */}
            <div className="p-5 rounded-3xl border border-slate-800 bg-slate-900 space-y-4 shadow-xl">
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
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Chủ Đề (Topic):</label>
                  <select
                    value={draftTopicId}
                    onChange={(e) => setDraftTopicId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold cursor-pointer"
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
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold cursor-pointer"
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
                Danh Sách Bài Học Hiện Có Theo Cấp Độ (600+ Lessons):
              </h3>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {VOCAB_CATEGORIES.slice(1, 11).map((cat, idx) => (
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

        {/* TAB 2: VOCABULARY CMS DATABASE */}
        {activeTab === 'vocab' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-bold">Hiển thị {vocabDatabase.length} từ vựng từ Database:</span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-black">
                CEFR Standard: Pre-A1 ➔ B2
              </span>
            </div>

            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 max-h-80 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] font-black sticky top-0">
                  <tr>
                    <th className="p-3">Từ Tiếng Anh</th>
                    <th className="p-3">Dịch Tiếng Việt</th>
                    <th className="p-3">Phiên Âm (IPA)</th>
                    <th className="p-3">Chủ Đề</th>
                    <th className="p-3 text-right">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
                  {vocabDatabase.slice(0, 30).map((v, i) => (
                    <tr key={v.id || i} className="hover:bg-slate-900/60 transition">
                      <td className="p-3 font-bold text-cyan-300">{v.word}</td>
                      <td className="p-3">{v.meaning}</td>
                      <td className="p-3 text-slate-400 font-mono-code">{v.phonetics}</td>
                      <td className="p-3">{v.category}</td>
                      <td className="p-3 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ADMIN OVERRIDE UNLOCK (BR-LP-003) */}
        {activeTab === 'overrides' && (
          <form onSubmit={handleAdminOverride} className="space-y-5 p-5 rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 shadow-xl">
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

        {/* TAB 4: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <History className="h-4 w-4 text-purple-400" />
              <span>Nhật Ký Audit Hệ Thống & Sự Kiện Học Tập (V3 Audit Logs):</span>
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

        {/* FOOTER */}
        <div className="flex justify-end border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition"
          >
            Đóng Studio
          </button>
        </div>

      </div>
    </div>
  );
}
