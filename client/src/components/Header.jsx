import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Star, ShieldCheck, UserCheck, Maximize2, Minimize2, Home, BookOpen, 
  Gamepad2, RotateCw, FileText, UploadCloud, Archive, History, FileCheck, Bot, Menu, X, Lock,
  Calendar, Wrench, User
} from 'lucide-react';

export function Header({ 
  currentActor, 
  onSwitchActor, 
  isFullscreen, 
  onToggleFullscreen,
  activeTab = 'home',
  setActiveTab,
  onOpenLongman,
  onOpenAiModal,
  onOpenUserProfile,
  onOpenTodayPlan,
  onOpenCMS,
  posterPagesCount = 12,
  vocabCount = 600,
  trashCanCount = 0,
  auditLogsCount = 0,
  qaScore = 100
}) {
  const isMinhAnh = currentActor === 'minh_anh';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mainMenuItems = [
    { id: 'home', label: 'Trang Chủ', icon: Home, badge: null, color: 'from-pink-500 via-purple-500 to-indigo-600', isAction: false },
    { id: 'daily_path', label: '🎯 Lộ Trình 5 Bước', icon: Calendar, badge: '15 MIN', color: 'from-amber-500 via-orange-500 to-pink-500', isAction: false },
    { id: 'poster', label: `Khóa Học (${posterPagesCount} Trang)`, icon: Sparkles, badge: null, color: 'from-pink-600 via-purple-600 to-indigo-600', isAction: false },
    { id: 'flashcards', label: `Thư Viện Thẻ (${vocabCount} Từ)`, icon: BookOpen, badge: null, color: 'from-cyan-600 to-blue-600', isAction: false },
    { id: 'quiz', label: 'Bài Tập & Game ⏰', icon: Gamepad2, badge: 'HOT', color: 'from-pink-600 to-purple-600', isAction: false },
    { id: 'review_cycles', label: 'Chu Kỳ Ôn Tập', icon: RotateCw, badge: null, color: 'from-amber-600 via-orange-600 to-amber-700', isAction: false },
    { id: 'longman', label: 'Tra Từ Điển Longman', icon: BookOpen, badge: 'AI', color: 'from-cyan-600 via-indigo-600 to-purple-600', isAction: true, onClick: onOpenLongman },
    { id: 'ai_assistant', label: 'AI Nhắc Học', icon: Bot, badge: 'PRO', color: 'from-amber-600 via-pink-600 to-purple-600', isAction: true, onClick: onOpenAiModal },
  ];

  const adminMenuItems = [
    { id: 'db_table', label: 'CSDL & Excel', icon: FileText, color: 'from-cyan-600 via-blue-600 to-indigo-600' },
    { id: 'import_wizard', label: 'Wizard Nhập Dữ Liệu', icon: UploadCloud, color: 'from-emerald-600 via-teal-600 to-cyan-600' },
    { id: 'trash_can', label: `Thùng Rác (${trashCanCount})`, icon: Archive, color: 'from-rose-600 to-red-700' },
    { id: 'audit_log', label: `Audit Log (${auditLogsCount})`, icon: History, color: 'from-purple-600 to-indigo-700' },
    { id: 'qa_checklist', label: `QA Checklist (${qaScore}%)`, icon: FileCheck, color: 'from-teal-600 to-emerald-600' },
  ];

  const handleTabClick = (item) => {
    setMobileMenuOpen(false);
    if (item.isAction && item.onClick) {
      item.onClick();
    } else if (setActiveTab) {
      setActiveTab(item.id);
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl md:rounded-3xl p-2.5 sm:p-3 md:p-4 border border-pink-500/30 shadow-2xl gpu-accelerated touch-manipulation">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-xl sm:text-2xl shadow-lg border-2 border-pink-300 animate-wiggle">
            🦄
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300 font-heading flex items-center gap-1 truncate">
              <span className="hidden sm:inline">KIDS ENGLISH AGENT</span>
              <span className="sm:hidden">KIDS ENGLISH</span>
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-300 animate-pulse shrink-0" />
            </h1>
            <p className="text-[10px] sm:text-[11px] text-pink-200/80 font-bold flex items-center gap-1 truncate">
              <span className="truncate max-w-[110px] sm:max-w-none">Bé Minh Anh</span>
              <span className="px-1.5 py-0.2 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40 text-[8px] sm:text-[9px] font-black shrink-0 flex items-center gap-0.5">
                <Star className="h-2.5 w-2.5 text-yellow-300 fill-current" /> Lvl Up
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Today Plan Trigger */}
          <button
            onClick={onOpenTodayPlan}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs transition border border-amber-400/60 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 hover:scale-105 shadow-md cursor-pointer touch-manipulation"
            title="Mở Kế Hoạch Học Tập Hôm Nay (15 phút cá nhân hóa)"
          >
            <Calendar className="h-3.5 w-3.5 text-slate-950 shrink-0" />
            <span className="hidden md:inline">Today Plan</span>
          </button>

          {/* CMS Admin Studio Trigger */}
          {!isMinhAnh && (
            <button
              onClick={onOpenCMS}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs transition border border-cyan-400/60 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:scale-105 shadow-md cursor-pointer touch-manipulation"
              title="Mở Hệ Quản Trị Nội Dung CMS & Overrides"
            >
              <Wrench className="h-3.5 w-3.5 text-cyan-200 shrink-0" />
              <span className="hidden md:inline">CMS Studio</span>
            </button>
          )}

          {/* User Profile & Auth Modal Trigger */}
          <button
            onClick={onOpenUserProfile}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs transition border-2 border-amber-400 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-amber-300 hover:scale-105 shadow-lg cursor-pointer touch-manipulation"
            title="Mở Trang cá nhân & Quản lý Đăng ký / Đăng nhập"
          >
            <User className="h-3.5 w-3.5 text-amber-300 shrink-0" />
            <span className="hidden sm:inline">Hồ Sơ & TK</span>
          </button>

          {/* Actor Switcher Badge */}
          <button
            onClick={() => onSwitchActor(isMinhAnh ? 'bao_nguyen' : 'minh_anh')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs transition border-2 shadow-lg cursor-pointer touch-manipulation ${
              isMinhAnh
                ? 'bg-pink-950/80 border-pink-400 text-pink-200 hover:bg-pink-900'
                : 'bg-purple-950/90 border-purple-400 text-purple-200 hover:bg-purple-900'
            }`}
            title={isMinhAnh ? 'Bấm để chuyển sang quyền Admin Ba Bảo Nguyên' : 'Chuyển sang Tác nhân Học sinh Bé Minh Anh'}
          >
            {isMinhAnh ? (
              <>
                <UserCheck className="h-3.5 w-3.5 text-pink-400 shrink-0" />
                <span className="hidden sm:inline">👧 Bé Minh Anh (Chỉ Học)</span>
                <span className="sm:hidden">👧 Minh Anh</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                <span className="hidden sm:inline">👨‍💼 Ba Bảo Nguyên (Admin)</span>
                <span className="sm:hidden">👨‍💼 Admin</span>
              </>
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition cursor-pointer touch-manipulation"
            title={isFullscreen ? 'Thoát toàn màn hình' : 'Mở toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-pink-950/80 border border-pink-400 text-pink-300 hover:bg-pink-900 transition cursor-pointer touch-manipulation"
            title="Mở Menu chính"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MENU CHÍNH (MAIN NAVIGATION MENU BAR - DESKTOP) */}
      {/* ========================================================================= */}
      <nav className="hidden xl:flex flex-wrap items-center justify-center gap-1.5 mt-3 pt-3 border-t border-slate-800/80 w-full max-w-full">
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} className="relative">
              {item.id === 'review_cycles' && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-sm sm:text-base animate-bounce pointer-events-none z-10 select-none drop-shadow-md">
                  🦄
                </div>
              )}
              <button
                onClick={() => handleTabClick(item)}
                className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg border border-white/30 scale-[1.03]`
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider ${
                    isActive ? 'bg-white/25 text-white' : 'bg-pink-500/20 text-pink-300 border border-pink-400/40'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            </div>
          );
        })}

        {/* Admin Section Tabs */}
        {!isMinhAnh && (
          <div className="flex items-center gap-1.5 pl-2 ml-1 border-l border-purple-500/40">
            {adminMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  className={`py-2 px-3 rounded-xl text-xs font-black transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg border border-purple-300 scale-[1.03]`
                      : 'text-purple-300/80 hover:text-purple-200 hover:bg-purple-950/60 border border-transparent'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* ========================================================================= */}
      {/* MENU CHÍNH (MOBILE & TABLET DRAWER) */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs xl:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 xl:hidden mt-3 pt-3 border-t border-slate-800 animate-fadeIn space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-pink-400 px-2 flex items-center justify-between">
              <span>📌 MENU CHÍNH HỌC TẬP</span>
              <span className="text-slate-400">Bé Minh Anh 👧</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item)}
                    className={`p-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-md border border-white/30`
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-pink-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {!isMinhAnh && (
              <div className="pt-2 border-t border-purple-500/30 space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-widest text-purple-400 px-2">
                  👨‍💼 ADMIN STUDIO (BA BẢO NGUYÊN)
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {adminMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item)}
                        className={`p-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
                          isActive
                            ? `bg-gradient-to-r ${item.color} text-white shadow-md border border-purple-300`
                            : 'bg-purple-950/60 text-purple-200 hover:bg-purple-900 border border-purple-900'
                        }`}
                      >
                        <Icon className="h-4 w-4 text-purple-300" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
