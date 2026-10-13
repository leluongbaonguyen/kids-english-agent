import React from 'react';
import { LogOut, Sparkles, UserCheck } from 'lucide-react';
import { ROUTE_MAP } from './PageLocationBar.jsx';

export function Header({
  activeTab,
  setActiveTab,
  currentActor,
  onSwitchActor,
  onLogout
}) {
  const isMinhAnh = currentActor === 'minh_anh';
  const currentRoute = ROUTE_MAP[activeTab] || ROUTE_MAP['flashcards'];

  return (
    <header className="w-full rounded-2xl md:rounded-3xl p-2.5 sm:p-3 border border-white/15 bg-slate-950/70 backdrop-blur-xl shadow-2xl transition-all duration-300 mb-2 sm:mb-4 select-none">
      <div className="flex items-center justify-between gap-2">
        
        {/* Brand Logo & Active Location Indicator */}
        <div 
          onClick={() => setActiveTab?.('intro')} 
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group min-w-0"
          title="Xem Trang Giới Thiệu V6.1"
        >
          <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 text-xl sm:text-2xl shadow-[0_0_20px_rgba(236,72,153,0.5)] border-2 border-white/40 group-hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 inset-x-0 h-1 bg-white/40 rounded-t-xl" />
            <span>🦄</span>
            <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-yellow-300 animate-spin" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs sm:text-base font-black tracking-tight text-white font-heading truncate">
                KIDS ENGLISH AGENT
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40 text-[9px] font-black uppercase shrink-0 shadow-sm">
                V6.1
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-300 font-medium truncate">
              <span className="flex items-center gap-1 text-pink-300 font-bold truncate">
                {currentRoute.icon} {currentRoute.title}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          
          {/* Quick Nav to Intro Landing Page */}
          <button
            onClick={() => setActiveTab?.('intro')}
            className="px-2.5 py-1.5 rounded-xl text-[11px] font-black bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-pink-400/40 text-pink-200 hover:text-white hover:bg-pink-600/30 transition flex items-center gap-1 cursor-pointer shadow-sm"
            title="Xem Trang Giới Thiệu Toàn Hệ Thống"
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
            <span className="hidden sm:inline">Giới Thiệu V6.1</span>
            <span className="sm:hidden">Intro</span>
          </button>
          
          {/* Admin Control Center Launchers */}
          {!isMinhAnh && (
            <button
              onClick={() => onSwitchActor?.('minh_anh')}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold bg-slate-900 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-950 transition flex items-center gap-1 cursor-pointer"
              title="Chế độ Học sinh"
            >
              <UserCheck className="h-3.5 w-3.5 text-pink-400" />
              <span className="hidden sm:inline">Học Sinh</span>
            </button>
          )}

          {/* Secure Logout Button */}
          <button
            onClick={onLogout}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-[11px] font-bold bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-rose-300 transition cursor-pointer flex items-center gap-1"
            title="Đăng xuất"
          >
            <LogOut className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden md:inline">Thoát</span>
          </button>
        </div>

      </div>
    </header>
  );
}

