import React from 'react';
import { Zap, LogOut } from 'lucide-react';
import { ROUTE_MAP } from './PageLocationBar.jsx';

export function Header({
  activeTab,
  setActiveTab,
  currentActor,
  onSwitchActor,
  onLogout,
  onOpenAgentHub,
  onOpenMiniAppHub
}) {
  const isMinhAnh = currentActor === 'minh_anh';
  const currentRoute = ROUTE_MAP[activeTab] || ROUTE_MAP['intro'];

  return (
    <header className="w-full glass-panel rounded-2xl md:rounded-3xl p-3 sm:p-4 border border-white/10 bg-slate-950/30 backdrop-blur-md shadow-2xl transition-all duration-300 mb-4 select-none">
      <div className="flex items-center justify-between gap-3">
        
        {/* Brand Logo & Active Location Indicator */}
        <div 
          onClick={() => setActiveTab?.('intro')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 text-2xl shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-white/30 group-hover:scale-105 transition-all duration-300">
            🦄
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white font-heading">
                KIDS ENGLISH AGENT
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 text-[10px] font-black uppercase">
                V6.1
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1 text-pink-300 font-bold">
                {currentRoute.icon} {currentRoute.title}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 hidden sm:inline">
                Tác nhân: <strong className="text-white">{isMinhAnh ? 'Bé Minh Anh 👧' : 'Admin Ba Bảo Nguyên 👨‍💼'}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Cute Mini Apps Hub Launcher */}
          <button
            onClick={onOpenMiniAppHub}
            className="px-3.5 py-2 rounded-2xl text-xs font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)] border border-white/30 hover:scale-105 active:scale-95 transition flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
            title="Mở Mini App Hub Siêu Dễ Thương"
          >
            <span className="text-sm">📱</span>
            <span className="font-heading">MINI APPS</span>
          </button>

          {/* Admin Control Center Launchers */}
          {!isMinhAnh && (
            <>
              <button
                onClick={onOpenAgentHub}
                className="px-3.5 py-2 rounded-2xl text-xs font-black bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-105 transition flex items-center gap-1.5 cursor-pointer"
                title="Mở Menu Ẩn & Telemetry Tác Nhân Admin"
              >
                <Zap className="h-4 w-4 text-yellow-300 animate-bounce" />
                <span className="font-heading">⚡ MENU ẨN AGENT</span>
              </button>

              <button
                onClick={() => onSwitchActor?.('minh_anh')}
                className="px-3.5 py-2 rounded-2xl text-xs font-extrabold bg-slate-900 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-950 transition flex items-center gap-1.5 cursor-pointer"
                title="Xem giao diện Chế độ Học sinh"
              >
                <span>👧 Chế Độ Học Sinh</span>
              </button>
            </>
          )}

          {/* Secure Logout Button */}
          <button
            onClick={onLogout}
            className="px-3 py-2 rounded-2xl text-xs font-bold bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-rose-300 hover:border-rose-500/40 hover:bg-rose-950/50 transition cursor-pointer flex items-center gap-1.5"
            title="Đăng xuất an toàn khỏi hệ thống"
          >
            <LogOut className="h-4 w-4 text-slate-400 group-hover:text-rose-400" />
            <span className="hidden md:inline">Thoát</span>
          </button>
        </div>

      </div>
    </header>
  );
}
