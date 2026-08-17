import React, { useState } from 'react';
import { 
  Lock, Unlock, Award, CheckCircle2, ChevronRight, Sparkles, 
  BookOpen, Layers, Gamepad2, Repeat, Database, Star, Flame, PlayCircle, ArrowRight, RotateCw, Trophy, Zap, ShieldCheck, Volume2, PartyPopper, Heart, MessageSquare
} from 'lucide-react';

export default function Detailed6LevelPathPage({ onNavigateTab, addToast, currentActor }) {
  // Load initial mastery progress from localStorage
  const [levelProgress, setLevelProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_6level_progress_v5');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      L1: { count: 0, total: 150, percent: 0, unlocked: true },
      L2: { count: 0, total: 150, percent: 0, unlocked: false },
      L3: { count: 0, total: 150, percent: 0, unlocked: false },
      L4: { count: 0, total: 150, percent: 0, unlocked: false },
      L5: { count: 0, total: 150, percent: 0, unlocked: false },
      L6: { count: 0, total: 150, percent: 0, unlocked: false }
    };
  });

  // Admin Level Overrides state from localStorage
  const [adminLevelOverrides, setAdminLevelOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_admin_level_overrides');
      return saved ? JSON.parse(saved) : { L1: true, L2: true, L3: true, L4: true, L5: true, L6: true };
    } catch {
      return { L1: true, L2: true, L3: true, L4: true, L5: true, L6: true };
    }
  });

  const handleToggleLevelLockAdmin = (lvlId) => {
    const nextState = !adminLevelOverrides[lvlId];
    const updatedOverrides = { ...adminLevelOverrides, [lvlId]: nextState };
    setAdminLevelOverrides(updatedOverrides);
    try {
      localStorage.setItem('kids_admin_level_overrides', JSON.stringify(updatedOverrides));
    } catch (e) {}

    setLevelProgress(prev => {
      const next = { ...prev };
      if (next[lvlId]) {
        next[lvlId] = { ...next[lvlId], unlocked: nextState };
      } else {
        next[lvlId] = { count: 0, total: 150, percent: 0, unlocked: nextState };
      }
      try {
        localStorage.setItem('kids_6level_progress_v5', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    addToast?.(`👨‍💼 Admin đã ${nextState ? 'MỞ KHÓA' : 'KHÓA'} Cấp độ ${lvlId}!`, nextState ? 'success' : 'warning');
  };

  // State for celebratory full-screen fireworks modal
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [unlockedLevelTitle, setUnlockedLevelTitle] = useState('');
  const [audioSpeed, setAudioSpeed] = useState(1.0);

  // Audio speech synthesis helper with Speed Control
  const playAudioFeedback = (text, customRate = null) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = customRate ?? audioSpeed;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Calculate master status based on progressive rules
  const levelsConfig = [
    {
      id: 'L1',
      badge: 'L1',
      emoji: '🐣',
      animClass: 'animate-float-up-down',
      glowDrop: 'drop-shadow-[0_0_20px_rgba(244,114,182,0.9)]',
      title: 'Cấp độ L1: Khởi Động (4–5 tuổi)',
      desc: 'Từ vựng cơ bản về Màu sắc, Số đếm, Động vật nuôi & Đồ vật thân thuộc.',
      totalWords: 150,
      color: 'from-pink-500 via-rose-500 to-pink-600',
      border: 'animate-rainbow-border border-pink-500/80 shadow-[0_0_30px_rgba(236,72,153,0.4)]',
      glow: 'shadow-pink-500/40'
    },
    {
      id: 'L2',
      badge: 'L2',
      emoji: '🦁',
      animClass: 'animate-pulse-glow',
      glowDrop: 'drop-shadow-[0_0_20px_rgba(245,158,11,0.9)]',
      title: 'Cấp độ L2: Cơ Bản (5–7 tuổi)',
      desc: 'Mở rộng từ vựng về Gia đình, Trường học, Thức ăn & Cảm xúc hàng ngày.',
      totalWords: 150,
      color: 'from-amber-500 via-orange-500 to-amber-600',
      border: 'border-amber-500/70 shadow-[0_0_30px_rgba(245,158,11,0.4)]',
      glow: 'shadow-amber-500/40'
    },
    {
      id: 'L3',
      badge: 'L3',
      emoji: '🚀',
      animClass: 'animate-float-up-down',
      glowDrop: 'drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]',
      title: 'Cấp độ L3: Mở Rộng (7–9 tuổi)',
      desc: 'Khám phá Động vật hoang dã, Phương tiện giao thông, Thời tiết & Nghề nghiệp.',
      totalWords: 150,
      color: 'from-emerald-500 via-teal-500 to-emerald-600',
      border: 'border-emerald-500/70 shadow-[0_0_30px_rgba(16,185,129,0.4)]',
      glow: 'shadow-emerald-500/40'
    },
    {
      id: 'L4',
      badge: 'L4',
      emoji: '👑',
      animClass: 'animate-pulse-glow',
      glowDrop: 'drop-shadow-[0_0_20px_rgba(6,182,212,0.9)]',
      title: 'Cấp độ L4: Nâng Cao Cho Bé (8–10 tuổi)',
      desc: 'Từ vựng chủ đề Khoa học nhí, Vũ trụ, Thể thao & Hoạt động ngoài trời.',
      totalWords: 150,
      color: 'from-cyan-500 via-blue-500 to-cyan-600',
      border: 'border-cyan-500/70 shadow-[0_0_30px_rgba(6,182,212,0.4)]',
      glow: 'shadow-cyan-500/40'
    },
    {
      id: 'L5',
      badge: 'L5',
      emoji: '🌟',
      animClass: 'animate-spin-slow',
      glowDrop: 'drop-shadow-[0_0_20px_rgba(168,85,247,0.9)]',
      title: 'Cấp độ L5: Tiên Phong (10–12 tuổi)',
      desc: 'Giao tiếp tình huống nâng cao, Thiên nhiên bảo tồn & Kỹ năng đời sống.',
      totalWords: 150,
      color: 'from-purple-500 via-indigo-500 to-purple-600',
      border: 'border-purple-500/70 shadow-[0_0_30px_rgba(168,85,247,0.4)]',
      glow: 'shadow-purple-500/40'
    },
    {
      id: 'L6',
      badge: 'L6',
      emoji: '🌎',
      animClass: 'animate-pulse-glow',
      glowDrop: 'drop-shadow-[0_0_20px_rgba(217,70,239,0.9)]',
      title: 'Cấp độ L6: Hội Nhập Quốc Tế (12+ tuổi)',
      desc: 'Tiếng Anh chuẩn CEFR Cambridge, Văn hóa các nước & Công nghệ tương lai.',
      totalWords: 150,
      color: 'from-fuchsia-500 via-pink-500 to-fuchsia-600',
      border: 'border-fuchsia-500/70 shadow-[0_0_30px_rgba(217,70,239,0.4)]',
      glow: 'shadow-fuchsia-500/40'
    }
  ];

  // Helper to handle admin progression simulation & fireworks celebration
  const handleSimulateProgress = (levelId, addCount) => {
    setLevelProgress(prev => {
      const nextState = { ...prev };
      const current = nextState[levelId];
      const newCount = Math.min(current.total, Math.max(0, current.count + addCount));
      const newPercent = Math.round((newCount / current.total) * 100);
      
      nextState[levelId] = {
        ...current,
        count: newCount,
        percent: newPercent
      };

      // Check progressive auto-unlock rule: L(n) unlocked if L(n-1) reaches 100%
      const keys = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
      for (let i = 1; i < keys.length; i++) {
        const prevKey = keys[i - 1];
        const currKey = keys[i];
        if (nextState[prevKey].percent >= 100) {
          if (!nextState[currKey].unlocked) {
            nextState[currKey].unlocked = true;
            setUnlockedLevelTitle(currKey);
            setShowCelebrationModal(true);
            playAudioFeedback(`Hoan hô Minh Anh! Cấp độ ${currKey} đã được mở khóa xuất sắc!`);
            addToast?.(`🎉 Chúc mừng! Cấp độ ${currKey} đã được MỞ KHÓA sau khi hoàn thành 100% ${prevKey}!`, 'success');
          }
        }
      }

      try {
        localStorage.setItem('kids_6level_progress_v5', JSON.stringify(nextState));
      } catch (e) {}
      return nextState;
    });
  };

  // 5 CORE FEATURE CARDS DEFINITION WITH ANIMATED ICONS
  const main5Pages = [
    {
      pageNo: 'TRANG 1',
      category: 'KHÓA HỌC',
      icon: '🖼️',
      iconAnim: 'animate-float-up-down group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]',
      title: '📖 Trang Khóa Học & Bảng Tranh',
      desc: 'Lộ trình 6 cấp độ CEFR (Basic ➡ Quốc tế) với 2000 từ vựng cốt lõi trình bày dạng 3D Poster minh họa siêu sinh động.',
      features: ['Phát âm TTS', 'Phóng to Zoom', 'Autoplay 30s'],
      stats: '18 Trang Tranh • 2000 Từ',
      btnText: 'Mở Trang Khóa Học ➔',
      targetTab: 'poster',
      gradient: 'from-pink-600/90 via-purple-700/90 to-pink-800/90',
      border: 'border-pink-500/60 shadow-[0_0_25px_rgba(236,72,153,0.35)]'
    },
    {
      pageNo: 'TRANG 2',
      category: 'THƯ VIỆN THẺ',
      icon: '📚',
      iconAnim: 'animate-pulse-glow group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300 drop-shadow-[0_0_20px_rgba(99,102,241,0.8)]',
      title: '📚 Trang Thư Viện Thẻ Từ Vựng',
      desc: 'Kho từ vựng 2000 thẻ với bộ lọc tìm kiếm thông minh, phát âm chậm 🐢, ví dụ câu Anh - Việt & mẹo ghi nhớ siêu đỉnh.',
      features: ['Lọc loại từ', 'Đánh dấu Đã Thuộc ⭐'],
      stats: 'Tổng 900 Từ Vựng',
      btnText: 'Mở Kho Từ Vựng ➔',
      targetTab: 'flashcards',
      gradient: 'from-indigo-600/90 via-blue-700/90 to-indigo-800/90',
      border: 'border-indigo-500/60 shadow-[0_0_25px_rgba(99,102,241,0.35)]'
    },
    {
      pageNo: 'TRANG 3',
      category: 'BÀI TẬP & GAME',
      icon: '🎮',
      iconAnim: 'animate-float-up-down group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]',
      title: '🎮 Trang Bài Tập & Trò Chơi',
      desc: 'Góc bài tập trắc nghiệm âm thanh, lật thẻ nhớ, AI chấm phát âm giọng nói và thi đấu tích điểm Sao ⭐ cho bé.',
      features: ['Pháo hoa mừng', 'Streak Engine 🔥'],
      stats: 'Tích Lũy ⭐ Ngôi Sao',
      btnText: 'Vào Luyện Tập ➔',
      targetTab: 'quiz',
      gradient: 'from-amber-600/90 via-yellow-600/90 to-amber-700/90',
      border: 'border-yellow-500/60 shadow-[0_0_25px_rgba(250,204,21,0.35)]'
    },
    {
      pageNo: 'TRANG 4',
      category: 'ÔN TẬP 5 BƯỚC',
      icon: '🔄',
      iconAnim: 'animate-spin-slow group-hover:rotate-180 transition-transform duration-700 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]',
      title: '🔄 Trang Chu Kỳ Ôn Tập Khoa Học',
      desc: 'Phương pháp lặp lại ngắt quãng Spaced Repetition 5 mốc (1 ngày, 3 ngày, 7 ngày, 14 ngày, 30 ngày) giúp nhớ lâu vĩnh viễn.',
      features: ['Ebbinghaus Curve', 'Tự động nhắc'],
      stats: 'Nhớ Từ Vựng Vĩnh Viễn',
      btnText: 'Vào Trang Ôn Tập ➔',
      targetTab: 'review_cycles',
      gradient: 'from-purple-600/90 via-fuchsia-700/90 to-purple-800/90',
      border: 'border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.35)]'
    },
    {
      pageNo: 'TRANG 5',
      category: 'CSDL & EXCEL',
      icon: '🗃️',
      iconAnim: 'animate-float-up-down group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]',
      title: '🗃️ Trang Quản Lý Dữ Liệu & Excel',
      desc: 'Quản trị toàn bộ cơ sở dữ liệu từ vựng: Thêm/Sửa/Xóa từ vựng, Nhập tệp Excel mẫu tự động, Khôi phục thùng rác & Reset tiến độ.',
      features: ['CRUD Data', 'Auto Calculation'],
      stats: 'Đặc quyền Ba Bảo Nguyên',
      btnText: 'Mở Trang Quản Lý ➔',
      targetTab: 'db_table',
      gradient: 'from-emerald-600/90 via-teal-700/90 to-emerald-800/90',
      border: 'border-emerald-500/60 shadow-[0_0_25px_rgba(52,211,153,0.35)]'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fadeIn pb-24 px-2 sm:px-4 relative">
      
      {/* ========================================================================= */}
      {/* CELEBRATION FIREWORKS OVERLAY MODAL */}
      {/* ========================================================================= */}
      {showCelebrationModal && (
        <div
          onClick={() => setShowCelebrationModal(false)}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl p-6 animate-fadeIn cursor-pointer"
        >
          {/* Floating celebratory icons burst */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {['🎆', '🎉', '✨', '⭐', '🏆', '🦄', '💖', '🎈', '🌟', '👑', '🎆', '🎉'].map((emoji, idx) => (
              <div
                key={idx}
                className="absolute text-5xl md:text-7xl animate-bounce"
                style={{
                  top: `${(idx * 17) % 85}%`,
                  left: `${(idx * 23) % 90}%`,
                  animationDuration: `${1 + (idx % 3) * 0.5}s`,
                  animationDelay: `${(idx % 4) * 0.2}s`,
                }}
              >
                {emoji}
              </div>
            ))}
          </div>

          <div className="relative z-10 max-w-lg text-center space-y-6 bg-gradient-to-br from-pink-950 via-purple-900 to-slate-950 p-8 rounded-3xl border-4 border-yellow-400 shadow-[0_0_80px_rgba(250,204,21,0.6)] animate-pulse-glow">
            <div className="text-7xl md:text-8xl animate-bounce">🎆 🏆 🦄</div>
            <h2 className="text-2xl md:text-4xl font-black font-heading text-yellow-300 drop-shadow-lg leading-tight">
              TRÀNG PHÁO HOA MỞ KHÓA CẤP ĐỘ {unlockedLevelTitle}! 🎉
            </h2>
            <p className="text-sm md:text-base text-pink-200 font-bold">
              Chúc mừng Bé Minh Anh đã đạt 100% tiến độ và MỞ KHÓA thành công Cấp độ tiếp theo! Ba Bảo Nguyên rất tự hào về con! 💖✨
            </p>
            <button
              onClick={() => setShowCelebrationModal(false)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-2xl hover:scale-105 active:scale-95 transition cursor-pointer border-2 border-yellow-200"
            >
              🌟 VÀO HỌC CẤP ĐỘ MỚI NGAY 🚀
            </button>
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* FLOATING ANIMATED AMBIENT PARTICLES (BACKGROUND FX) */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {['✨', '⭐', '🦄', '🏆', '👑', '🌟', '🚀', '💖', '🔥', '🎈', '✨', '⭐'].map((emoji, idx) => (
          <div
            key={idx}
            className="absolute text-xl sm:text-3xl opacity-25 animate-bounce select-none"
            style={{
              top: `${(idx * 13) % 85}%`,
              left: `${(idx * 19) % 92}%`,
              animationDuration: `${2.5 + (idx % 4) * 0.8}s`,
              animationDelay: `${(idx % 3) * 0.4}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* HEADER HERO BANNER WITH DYNAMIC GLOWING ICONS & SHIMMER WAVE */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-pink-500/70 bg-gradient-to-r from-slate-950 via-purple-950/90 to-slate-950 p-6 sm:p-10 shadow-[0_0_50px_rgba(236,72,153,0.35)] space-y-4 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:animate-shimmer-wave pointer-events-none-children">
        {/* Animated Background Orbs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-pink-500/30 border border-pink-400/70 text-pink-300 text-xs font-black tracking-wide shadow-xl backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-pink-300 animate-spin" />
              <span className="uppercase tracking-widest">HỆ THỐNG PHÂN CẤP CHUẨN QUỐC TẾ CEFR</span>
              <Flame className="h-4 w-4 text-amber-400 animate-bounce" />
            </div>
            
            <h1 
              onClick={() => playAudioFeedback("Lộ Trình 6 Cấp Độ Siêu Chi Tiết")}
              className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight flex items-center gap-3 cursor-pointer hover:text-pink-300 transition-colors"
            >
              <span>Lộ Trình 6 Cấp Độ Siêu Chi Tiết</span>
              <span className="text-3xl sm:text-4xl animate-bounce">🌈</span>
              <Volume2 className="h-6 w-6 text-pink-400 animate-pulse hidden sm:inline-block" />
            </h1>
            
            {/* Audio Speed Selection Pills */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-2 rounded-2xl border border-pink-500/40 w-fit flex-wrap">
              <span className="text-xs font-black text-amber-300 flex items-center gap-1">
                ⚡ Tốc độ phát âm:
              </span>
              {[
                { rate: 0.5, label: '0.5x 🐢' },
                { rate: 0.75, label: '0.75x 🐢' },
                { rate: 1.0, label: '1.0x ⚡' },
                { rate: 1.25, label: '1.25x 🚀' },
                { rate: 1.5, label: '1.5x 🏎️' }
              ].map((sp) => (
                <button
                  key={sp.rate}
                  onClick={() => {
                    setAudioSpeed(sp.rate);
                    playAudioFeedback(`Tốc độ đọc ${sp.rate}x`, sp.rate);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                    audioSpeed === sp.rate
                      ? 'bg-amber-400 text-slate-950 shadow scale-105 border border-amber-200'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed flex items-center gap-1.5 flex-wrap">
              <span className="p-1 px-2 rounded-lg bg-rose-500/20 border border-rose-500/50 text-rose-300 font-black inline-flex items-center gap-1 animate-pulse">
                <Lock className="h-3.5 w-3.5 text-rose-400" /> Khóa Toàn Bộ Dữ Liệu
              </span>
              <span>• Chỉ Mở Cấp Tiếp Theo Khi Đạt</span>
              <span className="text-emerald-400 font-black px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/50 animate-pulse">
                100% Tiến Độ
              </span>
              <span>(Từ 0% đến 100%)</span>
            </p>
          </div>

          {/* TOTAL PROGRESS METRIC BADGE WITH ANIMATED TROPHY */}
          <div className="bg-slate-950/90 border-2 border-pink-500/60 p-5 rounded-3xl flex flex-col items-center justify-center min-w-[200px] shadow-[0_0_35px_rgba(236,72,153,0.4)] relative overflow-hidden group">
            <div className="absolute top-2 right-2 text-pink-400/40 group-hover:scale-125 transition-transform">
              <Trophy className="h-8 w-8 animate-bounce" />
            </div>
            <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-yellow-400 animate-pulse" />
              <span>Tiến Độ Hệ Thống</span>
            </span>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-emerald-400 font-mono-code my-1 animate-pulse">
              {Math.round(Object.values(levelProgress).reduce((acc, curr) => acc + curr.percent, 0) / 6)}%
            </span>
            <span className="text-[11px] text-emerald-400 font-extrabold flex items-center gap-1 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/50">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 animate-bounce" /> 6 Cấp Độ • 900 Từ
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LỘ TRÌNH 6 CẤP ĐỘ PROGRESSIVE UNLOCK GRID */}
      {/* ========================================================================= */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-pink-500/30 to-purple-600/30 text-pink-400 border border-pink-500/50 shadow-lg animate-pulse">
              <Layers className="h-6 w-6 text-pink-300" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white flex items-center gap-2">
                <span>🌈 Tất Cả 6 Cấp Độ</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 font-bold uppercase tracking-wider">
                  Khóa Tự Động
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Yêu cầu hoàn thành 100% từ vựng để kích hoạt tự động mở cấp độ tiếp theo
              </p>
            </div>
          </div>
        </div>

        {/* 6 LEVEL CARDS GRID WITH DYNAMIC ANIMATED EMOJIS & SHIMMER WAVES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levelsConfig.map((lvl, index) => {
            const data = levelProgress[lvl.id] || { count: 0, total: 150, percent: 0, unlocked: index === 0 };
            const isUnlocked = adminLevelOverrides[lvl.id] !== undefined 
              ? adminLevelOverrides[lvl.id] 
              : (data.unlocked || index === 0);

            return (
              <div
                key={lvl.id}
                className={`relative rounded-3xl border-2 p-6 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-2xl group overflow-hidden ${
                  isUnlocked
                    ? `bg-slate-900/90 ${lvl.border} hover:scale-[1.03] ${lvl.glow}`
                    : 'bg-slate-950/70 border-slate-800 opacity-80 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                {/* Shimmer Light Streak Effect Across Unlocked Cards */}
                {isUnlocked && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-wave pointer-events-none"></div>
                )}

                {/* CARD TOP BADGE & LOCK STATUS */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`text-4xl p-2.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl ${lvl.animClass} ${lvl.glowDrop} group-hover:scale-125 transition-transform duration-300`}>
                      {lvl.emoji}
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r ${lvl.color} shadow-md`}>
                        {lvl.badge}
                      </span>
                      <div className="text-[11px] text-slate-400 font-bold mt-1 flex items-center gap-1">
                        <BookOpen className="h-3 w-3 text-cyan-400" />
                        <span>{lvl.totalWords} Từ Vựng</span>
                      </div>
                    </div>
                  </div>

                  {/* Lock Indicator Dynamic Icon with Admin Toggle Click */}
                  <div 
                    onClick={() => handleToggleLevelLockAdmin(lvl.id)}
                    title="👨‍💼 Ba Bảo Nguyên: Nhấn để Mở Khóa / Khóa Cưỡng Chế Cấp Độ Này"
                    className="cursor-pointer hover:scale-110 active:scale-95 transition"
                  >
                    {isUnlocked ? (
                      <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-black flex items-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.3)] animate-pulse">
                        <Unlock className="h-3.5 w-3.5 text-emerald-400 animate-bounce" />
                        <span>ĐÃ MỞ KHÓA 🔑</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-xl bg-rose-950/90 border border-rose-500/60 text-rose-300 text-xs font-black flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                        <Lock className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
                        <span>ĐANG KHÓA 🔒</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* TITLE & DESCRIPTION */}
                <div className="space-y-1.5 relative z-10">
                  <h3 
                    onClick={() => playAudioFeedback(lvl.title)}
                    className="text-base sm:text-lg font-black text-white font-heading group-hover:text-pink-300 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{lvl.title}</span>
                    <Volume2 className="h-3.5 w-3.5 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {lvl.desc}
                  </p>
                </div>

                {/* DYNAMIC GLOWING PROGRESS BAR & PERCENTAGE */}
                <div className="space-y-2 pt-3 border-t border-slate-800 relative z-10">
                  <div className="flex justify-between text-xs font-bold font-mono-code">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 animate-bounce" />
                      <span>Tiến Độ Thuộc:</span>
                    </span>
                    <span className={data.percent === 100 ? 'text-emerald-400 font-black animate-pulse' : 'text-amber-300 font-black'}>
                      {data.count}/{data.total} ({data.percent}%)
                    </span>
                  </div>

                  <div className="w-full h-3.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5 shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${lvl.color} animate-pulse`}
                      style={{ width: `${data.percent}%` }}
                    ></div>
                  </div>
                </div>

                {/* ACTION BUTTON WITH DYNAMIC ICON */}
                <div className="pt-2 flex items-center justify-between gap-2 text-xs relative z-10">
                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        playAudioFeedback(`Vào học cấp độ ${lvl.badge}`);
                        onNavigateTab?.('poster');
                        addToast?.(`🚀 Đang chuyển tới nội dung học tập ${lvl.badge}!`, 'info');
                      }}
                      className={`w-full py-2.5 rounded-2xl bg-gradient-to-r ${lvl.color} text-white font-black hover:scale-105 transition flex items-center justify-center gap-2 shadow-lg cursor-pointer border border-white/20`}
                    >
                      <PlayCircle className="h-4 w-4 animate-bounce" />
                      <span>Vào Học Cấp {lvl.badge}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <div
                      className="w-full py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-400 font-bold text-center text-xs flex items-center justify-center gap-1.5 shadow"
                    >
                      <Lock className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
                      <span>Cần Đạt 100% Cấp {levelsConfig[index - 1]?.badge} Hoặc Quyền Admin Mở Khóa</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: 5 TRANG GIAO DIỆN CHÍNH (5 CORE FEATURE GATEWAYS) */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-6 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-lg animate-pulse">
            <BookOpen className="h-6 w-6 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-heading text-white flex items-center gap-2">
              <span>📖 5 Trang Chức Năng Cốt Lõi Hệ Thống</span>
              <Sparkles className="h-5 w-5 text-amber-300 animate-spin" />
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Truy cập nhanh các cổng tính năng chính của Kids English Agent V5.0
            </p>
          </div>
        </div>

        {/* 5 GATEWAYS GRID WITH VIBRANT ANIMATED ICONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {main5Pages.map((page, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border-2 ${page.border} bg-slate-900/90 p-6 space-y-5 shadow-2xl flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 group overflow-hidden relative`}
            >
              {/* Shimmer Light Streak Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-wave pointer-events-none"></div>

              <div className="space-y-4 relative z-10">
                {/* CARD BADGE HEADER WITH DYNAMIC ICON */}
                <div className="flex items-center justify-between">
                  <div className={`text-4xl p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl ${page.iconAnim}`}>
                    {page.icon}
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="px-3 py-1 rounded-full bg-slate-950 text-pink-300 border border-pink-500/40 text-[10px] font-black uppercase tracking-wider shadow">
                      {page.pageNo}
                    </span>
                    <div className="text-[10px] text-amber-300 font-extrabold uppercase tracking-wider block">
                      {page.category}
                    </div>
                  </div>
                </div>

                {/* TITLE & DESCRIPTION */}
                <div className="space-y-1.5">
                  <h3 
                    onClick={() => playAudioFeedback(page.title)}
                    className="text-base sm:text-lg font-black text-white font-heading group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {page.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {page.desc}
                  </p>
                </div>

                {/* FEATURE BULLETS WITH ANIMATED CHECKMARK */}
                <div className="space-y-2 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Tính năng nổi bật:</div>
                  <div className="flex flex-wrap gap-2">
                    {page.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-bold text-slate-200 flex items-center gap-1.5 shadow"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-pink-400 animate-pulse" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* FOOTER STATS & CTA BUTTON WITH ANIMATED ARROW */}
              <div className="space-y-3 pt-4 border-t border-slate-800 relative z-10">
                <div className="text-xs font-mono-code font-extrabold text-amber-300 bg-amber-950/60 p-2.5 rounded-2xl border border-amber-500/30 text-center shadow-inner flex items-center justify-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 animate-bounce" />
                  <span>{page.stats}</span>
                </div>

                <button
                  onClick={() => {
                    playAudioFeedback(`Đang mở ${page.title}`);
                    onNavigateTab?.(page.targetTab);
                    addToast?.(`🚀 Đang mở ${page.title}...`, 'info');
                  }}
                  className={`w-full py-3 rounded-2xl bg-gradient-to-r ${page.gradient} text-white font-black text-xs shadow-xl hover:scale-105 transition flex items-center justify-center gap-2 cursor-pointer border border-white/20`}
                >
                  <span>{page.btnText}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
