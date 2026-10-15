import React, { useState, useEffect } from 'react';
import { LogOut, Sparkles, UserCheck, Volume2 } from 'lucide-react';
import { ROUTE_MAP } from './PageLocationBar.jsx';
import { NativeVoiceStudioModal } from './NativeVoiceStudioModal.jsx';
import { getVoiceSettings, subscribeVoiceSettings } from '../services/nativeSpeechEngine.js';
import { scrollToTop } from '../utils/scrollHelper.js';

export function Header({
  activeTab,
  setActiveTab,
  currentActor,
  onSwitchActor,
  onLogout,
  addToast
}) {
  const isMinhAnh = currentActor === 'minh_anh';
  const currentRoute = ROUTE_MAP[activeTab] || ROUTE_MAP['flashcards'];
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState(getVoiceSettings);

  useEffect(() => {
    const unsub = subscribeVoiceSettings(setVoiceSettings);
    return unsub;
  }, []);

  return (
    <>
      <header className="w-full rounded-2xl md:rounded-3xl p-2 sm:p-3 border border-white/15 bg-slate-950/80 backdrop-blur-xl shadow-2xl transition-all duration-300 mb-2 sm:mb-4 select-none">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          
          {/* Brand Logo & Active Location Indicator */}
          <div 
            onClick={() => {
              setActiveTab?.('intro');
              scrollToTop(true);
            }} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0"
            title="Xem Trang Giới Thiệu V6.1"
          >
            <div className="relative flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 text-lg sm:text-2xl border border-white/40 group-hover:scale-105 transition-all duration-200 shadow-md">
              <span className="vocab-emoji">🦄</span>
              <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-300 animate-spin" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <h1 className="text-[11px] sm:text-base font-black tracking-tight text-white font-heading truncate">
                  KIDS ENGLISH
                </h1>
                <span className="px-1 py-0.2 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40 text-[8px] sm:text-[9px] font-black uppercase shrink-0">
                  V6.1
                </span>
              </div>
              <div className="flex items-center gap-1 text-[9px] sm:text-xs text-slate-300 font-medium truncate">
                <span className="flex items-center gap-1 text-pink-300 font-bold truncate">
                  {currentRoute.icon} {currentRoute.title}
                </span>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            
            {/* Quick Button: Native Voice & Speed Studio */}
            <button
              onClick={() => setIsVoiceStudioOpen(true)}
              className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl text-[10px] sm:text-[11px] font-black bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900 border border-indigo-400/50 text-indigo-200 hover:text-white hover:border-pink-400 transition flex items-center gap-1 cursor-pointer shadow-sm active:scale-95 group"
              title="Cài đặt tốc độ đọc & giọng chuẩn bản ngữ 100% toàn hệ thống"
            >
              <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-pink-400 group-hover:scale-110 transition-transform animate-pulse" />
              <span className="hidden sm:inline">Giọng Bản Ngữ ({voiceSettings.rate.toFixed(2)}x • {voiceSettings.accent})</span>
              <span className="sm:hidden font-mono-code font-bold">{voiceSettings.rate.toFixed(1)}x • {voiceSettings.accent}</span>
            </button>

            {/* Quick Nav to Memory Card Flip Game */}
            <button
              onClick={() => {
                setActiveTab?.('memory_game');
                scrollToTop(true);
              }}
              className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl text-[10px] sm:text-[11px] font-black transition flex items-center gap-1 cursor-pointer shadow-sm border active:scale-95 ${
                activeTab === 'memory_game'
                  ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white border-yellow-300 scale-105 shadow-[0_0_15px_rgba(236,72,153,0.6)]'
                  : 'bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-purple-400/40 text-pink-200 hover:text-white hover:bg-pink-600/30'
              }`}
              title="Chơi Siêu Game Lật Thẻ Trí Nhớ 1,260 Từ Vựng"
            >
              <span className="text-xs sm:text-sm vocab-emoji">🃏</span>
              <span className="hidden sm:inline">Game Lật Thẻ</span>
              <span className="sm:hidden">Lật Thẻ</span>
            </button>

            {/* Quick Nav to Intro Landing Page (Desktop only, mobile has bottom bar) */}
            <button
              onClick={() => {
                setActiveTab?.('intro');
                scrollToTop(true);
              }}
              className="hidden md:inline-flex px-2.5 py-1.5 rounded-xl text-[11px] font-black bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-pink-400/40 text-pink-200 hover:text-white hover:bg-pink-600/30 transition items-center gap-1 cursor-pointer shadow-sm active:scale-95"
              title="Xem Trang Giới Thiệu Toàn Hệ Thống"
            >
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              <span>Giới Thiệu V6.1</span>
            </button>
            
            {/* Admin Switcher */}
            {!isMinhAnh && (
              <button
                onClick={() => onSwitchActor?.('minh_anh')}
                className="hidden sm:inline-flex px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold bg-slate-900 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-950 transition items-center gap-1 cursor-pointer"
                title="Chế độ Học sinh"
              >
                <UserCheck className="h-3.5 w-3.5 text-pink-400" />
                <span>Học Sinh</span>
              </button>
            )}

            {/* Secure Logout Button */}
            <button
              onClick={onLogout}
              className="p-1 sm:px-2.5 sm:py-1.5 rounded-xl text-[11px] font-bold bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-rose-300 transition cursor-pointer flex items-center gap-1 active:scale-95"
              title="Đăng xuất"
            >
              <LogOut className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden md:inline">Thoát</span>
            </button>
          </div>

        </div>
      </header>

      {/* Global Native Voice Studio Modal */}
      <NativeVoiceStudioModal
        isOpen={isVoiceStudioOpen}
        onClose={() => setIsVoiceStudioOpen(false)}
        addToast={addToast}
      />
    </>
  );
}

