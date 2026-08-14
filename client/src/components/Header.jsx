import React from 'react';
import { Sparkles, Star, ShieldCheck, UserCheck, Maximize2, Minimize2, Award } from 'lucide-react';

export function Header({ currentActor, onSwitchActor, isFullscreen, onToggleFullscreen }) {
  const isMinhAnh = currentActor === 'minh_anh';

  return (
    <header className="glass-panel sticky top-2 z-40 rounded-3xl p-4 md:px-6 flex items-center justify-between gap-4 border border-pink-500/30 shadow-2xl">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-2xl shadow-lg border-2 border-pink-300 animate-wiggle">
          🦄
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300 font-heading flex items-center gap-2">
            <span>KIDS ENGLISH LEARNING AGENT</span>
            <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
          </h1>
          <p className="text-xs text-pink-200/80 font-bold flex items-center gap-1.5">
            <span>Không gian học Tiếng Anh vui nhộn dành cho bé</span>
            <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40 text-[10px] font-black">
              Nguyễn Ngọc Minh Anh 👧
            </span>
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Actor Switcher Badge */}
        <button
          onClick={() => onSwitchActor(isMinhAnh ? 'bao_nguyen' : 'minh_anh')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-black text-xs transition border-2 shadow-lg cursor-pointer ${
            isMinhAnh
              ? 'bg-pink-950/80 border-pink-400 text-pink-200 hover:bg-pink-900'
              : 'bg-purple-950/90 border-purple-400 text-purple-200 hover:bg-purple-900'
          }`}
          title={isMinhAnh ? 'Bấm để chuyển sang quyền Admin Ba Bảo Nguyên' : 'Chuyển sang Tác nhân Học sinh Bé Minh Anh'}
        >
          {isMinhAnh ? (
            <>
              <UserCheck className="h-4 w-4 text-pink-400" />
              <span>👧 Bé Minh Anh (Chỉ Học)</span>
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4 text-purple-400" />
              <span>👨‍💼 Ba Bảo Nguyên (Admin)</span>
            </>
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="p-2.5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition cursor-pointer"
          title={isFullscreen ? 'Thoát toàn màn hình' : 'Mở toàn màn hình'}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
