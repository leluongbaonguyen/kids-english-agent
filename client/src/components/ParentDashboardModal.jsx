import React, { useState } from 'react';
import { X, Award, ShieldCheck, BarChart3, Clock, Calendar, Star, Trophy, Download, Printer, CheckCircle2 } from 'lucide-react';

export default function ParentDashboardModal({
  isOpen,
  onClose,
  childName = 'Bé Minh Anh',
  totalXP = 420,
  totalStars = 36,
  streakDays = 5,
  masteredCount = 35,
  totalWords = 100,
  selectedLevel = 'L1'
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('analytics'); // analytics, certificate

  // Skill metrics
  const skills = [
    { name: '🎧 Nghe (Listening)', score: 85, color: 'bg-cyan-500' },
    { name: '🎤 Nói (Speaking)', score: 72, color: 'bg-pink-500' },
    { name: '📖 Đọc (Reading)', score: 76, color: 'bg-emerald-500' },
    { name: '✍️ Viết (Writing)', score: 64, color: 'bg-purple-500' },
    { name: '🧠 Từ Vựng (Vocabulary)', score: 88, color: 'bg-amber-500' },
    { name: '🔤 Ngữ Pháp (Grammar)', score: 61, color: 'bg-indigo-500' }
  ];

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[88vh] overflow-y-auto rounded-3xl border-2 border-cyan-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 space-y-4 text-white shadow-2xl custom-scrollbar">
        
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 text-3xl">
              👨‍👩‍👧‍👦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-cyan-500/20 border border-cyan-400 px-2.5 py-0.5 text-[10px] font-black text-cyan-300">
                  Dành Cho Phụ Huynh Ba Bảo Nguyên
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black font-heading text-white">
                BẢNG BÁO CÁO KẾT QUẢ & CHỨNG NHẬN CHO {childName.toUpperCase()}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-2xl border border-slate-800 bg-slate-950 p-1">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                  activeTab === 'analytics' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                📊 Báo Cáo Kỹ Năng
              </button>

              <button
                onClick={() => setActiveTab('certificate')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                  activeTab === 'certificate' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                🎓 Chứng Nhận Khóa Học
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* TAB 1: ANALYTICS & WEEKLY REPORT */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Quick KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" /> Thời gian học tuần
                </div>
                <div className="text-2xl font-black text-cyan-300 font-mono-code">82 phút</div>
              </div>

              <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" /> Chuỗi ngày liên tục
                </div>
                <div className="text-2xl font-black text-yellow-300 font-mono-code">🔥 {streakDays} ngày</div>
              </div>

              <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-emerald-400" /> Từ thành thạo
                </div>
                <div className="text-2xl font-black text-emerald-300 font-mono-code">{masteredCount}/{totalWords} từ</div>
              </div>

              <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5 text-indigo-400" /> Tổng sao đạt được
                </div>
                <div className="text-2xl font-black text-indigo-300 font-mono-code">⭐ {totalStars} sao</div>
              </div>
            </div>

            {/* SKILLS PROGRESS BARS */}
            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-4">
              <h3 className="text-sm font-black uppercase text-cyan-300 tracking-wider flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-cyan-400" />
                <span>Phân Tích 6 Kỹ Năng Ngôn Ngữ Của Bé:</span>
              </h3>

              <div className="space-y-3">
                {skills.map((s, idx) => (
                  <div key={idx} className="space-y-1 text-xs font-mono-code font-bold">
                    <div className="flex justify-between text-slate-300">
                      <span>{s.name}</span>
                      <span className="text-white">{s.score}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-900 rounded-full border border-slate-800 overflow-hidden">
                      <div className={`h-full ${s.color} transition-all duration-500`} style={{ width: `${s.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CERTIFICATE GENERATOR */}
        {activeTab === 'certificate' && (
          <div className="space-y-4 text-center animate-fadeIn">
            <div className="flex justify-end">
              <button
                onClick={handlePrintCertificate}
                className="px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 cursor-pointer hover:scale-105 transition"
              >
                <Printer className="h-4 w-4" /> In Bằng Chứng Nhận
              </button>
            </div>

            {/* PRINTABLE CERTIFICATE CARD */}
            <div className="p-8 rounded-3xl border-4 border-amber-400 bg-gradient-to-br from-amber-950 via-slate-950 to-amber-950 space-y-6 shadow-2xl text-center relative overflow-hidden">
              <div className="text-xs font-mono-code font-bold text-amber-400 uppercase tracking-widest">
                OFFICIAL CERTIFICATE OF COMPLETION • SYSTEM VERIFIED
              </div>

              <div className="text-5xl animate-bounce">🎓</div>

              <h1 className="text-3xl md:text-4xl font-black font-heading text-yellow-300 tracking-tight">
                CHỨNG NHẬN HOÀN THÀNH KHÓA HỌC
              </h1>

              <div className="text-sm text-slate-300">Trao tặng cho bé học viên xuất sắc:</div>

              <div className="text-3xl md:text-4xl font-black text-white font-heading underline decoration-amber-400">
                {childName.toUpperCase()}
              </div>

              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Đã hoàn thành xuất sắc toàn bộ 100 từ vựng và bài tập của <strong>{selectedLevel} - Tiếng Anh Trẻ Em Super Agent</strong> với tổng số điểm <strong>{totalXP} XP</strong> và <strong>{totalStars} ⭐</strong>!
              </p>

              <div className="flex justify-between items-center pt-6 border-t border-amber-500/30 text-xs font-mono-code font-bold text-amber-300">
                <div>Ngày cấp: {new Date().toLocaleDateString('vi-VN')}</div>
                <div>ID Chứng nhận: KEA-2026-MINHANH-88</div>
                <div>Chữ ký Ba Bảo Nguyên ✍️</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
