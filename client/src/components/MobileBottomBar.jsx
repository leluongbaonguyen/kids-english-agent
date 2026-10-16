import React from 'react';
import { BookOpen, Layers, Gamepad2, Compass, Sparkles, Target, Palette, Lock } from 'lucide-react';
import { scrollToTop } from '../utils/scrollHelper.js';
import { useChildLock } from '../contexts/ChildLockContext.jsx';

export function MobileBottomBar({ activeTab, setActiveTab }) {
  const { isChildLocked, requestUnlock } = useChildLock();

  const tabs = [
    {
      id: 'intro',
      label: 'Giới Thiệu',
      mainIcon: Sparkles,
      subIcon: Sparkles,
      gradient: 'from-pink-500 via-rose-500 to-amber-400',
      activeShadow: 'shadow-[0_0_20px_rgba(236,72,153,0.7)]',
      glowColor: 'text-pink-300',
      borderColor: 'border-pink-400/50'
    },
    {
      id: 'flashcards',
      label: '1,260 Từ Vựng',
      mainIcon: BookOpen,
      subIcon: Layers,
      gradient: 'from-cyan-400 via-teal-500 to-blue-600',
      activeShadow: 'shadow-[0_0_20px_rgba(6,182,212,0.7)]',
      glowColor: 'text-cyan-300',
      borderColor: 'border-cyan-400/50'
    },
    {
      id: 'poster',
      label: 'Khóa Học',
      mainIcon: Palette,
      subIcon: Sparkles,
      gradient: 'from-purple-500 via-indigo-500 to-purple-600',
      activeShadow: 'shadow-[0_0_20px_rgba(168,85,247,0.7)]',
      glowColor: 'text-purple-300',
      borderColor: 'border-purple-400/50'
    },
    {
      id: 'games',
      label: 'Bài Tập & Game',
      mainIcon: Gamepad2,
      subIcon: Target,
      gradient: 'from-emerald-400 via-teal-500 to-emerald-600',
      activeShadow: 'shadow-[0_0_20px_rgba(16,185,129,0.7)]',
      glowColor: 'text-emerald-300',
      borderColor: 'border-emerald-400/50'
    },
    {
      id: 'detailed_path',
      label: 'Lộ Trình 6 Cấp',
      mainIcon: Compass,
      subIcon: Sparkles,
      gradient: 'from-amber-400 via-orange-500 to-yellow-500',
      activeShadow: 'shadow-[0_0_20px_rgba(245,158,11,0.7)]',
      glowColor: 'text-amber-300',
      borderColor: 'border-amber-400/50'
    }
  ];

  return (
    <div className="no-print xl:hidden fixed bottom-0 left-0 right-0 z-[45] bg-slate-950/90 backdrop-blur-2xl border-t border-white/15 px-1 sm:px-2 py-1.5 pb-[calc(env(safe-area-inset-bottom,0px)+6px)] shadow-[0_-10px_35px_rgba(0,0,0,0.9)] gpu-accelerated select-none">
      <div className="flex items-center justify-around w-full max-w-lg mx-auto gap-0.5 sm:gap-1">
        {tabs.map((tab) => {
          const MainIcon = tab.mainIcon;
          const SubIcon = tab.subIcon;
          const isActive = activeTab === tab.id || (tab.id === 'games' && activeTab === 'memory_game');

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (isChildLocked && !isActive) {
                  requestUnlock(() => {
                    if (tab.isAction && tab.onClick) {
                      tab.onClick();
                    } else if (setActiveTab) {
                      setActiveTab(tab.id);
                    }
                    scrollToTop(true);
                  }, `Bé muốn chuyển sang mục "${tab.label}"`);
                  return;
                }
                if (tab.isAction && tab.onClick) {
                  tab.onClick();
                } else if (setActiveTab) {
                  setActiveTab(tab.id);
                }
                scrollToTop(true);
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 rounded-2xl transition-all duration-200 cursor-pointer touch-manipulation active:scale-90 group ${
                isActive
                  ? 'scale-105 -translate-y-0.5'
                  : 'hover:scale-102 opacity-75 hover:opacity-100'
              }`}
            >
              {/* Flat Clean Icon Container Badge */}
              <div
                className={`relative flex items-center justify-center h-10 w-10 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-tr ${tab.gradient} border border-white/50`
                    : 'bg-slate-900 border border-white/10 group-hover:border-white/30'
                }`}
              >
                {/* Main Icon */}
                <MainIcon
                  className={`h-5 w-5 transition-all duration-200 ${
                    isActive ? 'text-white icon-bounce-playful' : `${tab.glowColor} group-hover:scale-110`
                  }`}
                />

                {/* Sub Micro-Icon Badge (Top Right) */}
                <SubIcon
                  className={`absolute -top-1 -right-1 h-3 w-3 p-0.5 rounded-full ${
                    isActive
                      ? 'bg-amber-300 text-slate-950 animate-bounce shadow-md'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                />

                {/* Lock Indicator icon overlay if locked and not active */}
                {isChildLocked && !isActive && (
                  <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shadow-md">
                    <Lock className="h-2 w-2" />
                  </span>
                )}
              </div>

              {/* Label below with active glow indicator */}
              <span
                className={`text-[9px] sm:text-[10px] font-black mt-0.5 transition-colors duration-200 truncate max-w-[65px] ${
                  isActive
                    ? 'text-white font-heading font-black'
                    : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
