import React from 'react';
import { X, Sparkles, Star, Award, Heart, Shield, ArrowRight } from 'lucide-react';

export default function CuteMiniAppLauncherModal({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  onOpenAiModal,
  onOpenHomework,
  onOpenUserProfile,
  onOpenCMS
}) {
  if (!isOpen) return null;

  const miniApps = [
    {
      id: 'daily_path',
      name: 'Lộ Trình Học 6 Cấp',
      badge: 'Level 1-6',
      icon: '🗺️',
      color: 'from-amber-400 via-orange-400 to-pink-500',
      bgGlow: 'shadow-[0_0_20px_rgba(251,146,60,0.4)]',
      desc: 'Chinh phục 6 mốc thử thách tiếng Anh',
      action: () => { setActiveTab?.('daily_path'); onClose(); }
    },
    {
      id: 'flashcards',
      name: 'Thẻ Từ 900+ IPA',
      badge: '900+ Từ',
      icon: '📚',
      color: 'from-pink-400 via-purple-400 to-indigo-500',
      bgGlow: 'shadow-[0_0_20px_rgba(244,114,182,0.4)]',
      desc: 'Học từ vựng thẻ ghi nhớ kèm âm thanh chuẩn',
      action: () => { setActiveTab?.('flashcards'); onClose(); }
    },
    {
      id: 'mini_games',
      name: 'Mini Game Hub',
      badge: 'Game Trí Tuệ',
      icon: '🎮',
      color: 'from-cyan-400 via-blue-500 to-indigo-600',
      bgGlow: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]',
      desc: 'Ghép từ, lật hình & nối tranh vui nhộn',
      action: () => { setActiveTab?.('games'); onClose(); }
    },
    {
      id: 'ai_mascot',
      name: 'Trợ Lý AI Trò Chuyện',
      badge: 'AI Linh Vật',
      icon: '🤖',
      color: 'from-emerald-400 via-teal-500 to-cyan-600',
      bgGlow: 'shadow-[0_0_20px_rgba(52,211,153,0.4)]',
      desc: 'Luyện nói phản xạ Tiếng Anh cùng AI',
      action: () => { onOpenAiModal?.(); onClose(); }
    },
    {
      id: 'homework',
      name: 'Chấm Bài Tập',
      badge: 'Nộp Bài',
      icon: '📝',
      color: 'from-purple-400 via-pink-500 to-rose-500',
      bgGlow: 'shadow-[0_0_20px_rgba(192,132,252,0.4)]',
      desc: 'Gửi bài tập nói & đọc để cô giáo chấm điểm',
      action: () => { onOpenHomework?.(); onClose(); }
    },
    {
      id: 'pet_custom',
      name: 'Nuôi Thú Cưng AI',
      badge: 'Mascot Pet',
      icon: '🐱',
      color: 'from-yellow-400 via-amber-500 to-orange-500',
      bgGlow: 'shadow-[0_0_20px_rgba(250,204,21,0.4)]',
      desc: 'Trang trí thú cưng & nhận quà thưởng học tập',
      action: () => { onOpenUserProfile?.(); onClose(); }
    }
  ];

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-xl rounded-3xl bg-slate-950/40 backdrop-blur-2xl border-2 border-pink-400/40 p-6 space-y-6 shadow-[0_0_50px_rgba(244,114,182,0.3)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cute Ambient Backlight */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-pink-500/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-cyan-500/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-500 text-3xl shadow-lg border border-white/30 animate-bounce">
              🦄
            </div>
            <div>
              <h2 className="text-lg font-black font-heading tracking-wide text-white flex items-center gap-2">
                <span>📱 MINI APP HUB SIÊU DỄ THƯƠNG</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40 font-extrabold uppercase">
                  FOR KIDS
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Chọn Mini App yêu thích để bắt đầu cuộc phiêu lưu tiếng Anh!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer border border-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* MINI APPS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 relative z-10">
          {miniApps.map((app) => (
            <button
              key={app.id}
              onClick={app.action}
              className={`p-4 rounded-3xl bg-slate-950/40 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 text-left flex flex-col justify-between space-y-2 group cursor-pointer ${app.bgGlow}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                  {app.icon}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-pink-200 border border-white/20 text-[9px] font-black">
                  {app.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-black text-white font-heading group-hover:text-pink-300 transition-colors">
                  {app.name}
                </h3>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {app.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* FOOTER */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 relative z-10 font-mono-code">
          <span className="flex items-center gap-1.5 text-pink-300 font-bold">
            <Sparkles className="h-4 w-4 text-amber-300 animate-spin" />
            Học vui mỗi ngày • Nhận điểm thưởng 🌟
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xs hover:opacity-90 transition cursor-pointer shadow"
          >
            Đóng Mini App
          </button>
        </div>
      </div>
    </div>
  );
}
