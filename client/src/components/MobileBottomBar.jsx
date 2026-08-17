import React from 'react';
import { Home, Target, Sparkles, BookOpen, Gamepad2, Bot, Grid } from 'lucide-react';

export function MobileBottomBar({ activeTab, setActiveTab, onOpenAiModal, onOpenMiniAppHub }) {
  const tabs = [
    { id: 'home', label: 'Trang Chủ', emoji: '🏠', icon: Home, color: 'text-pink-400' },
    { id: 'daily_path', label: 'Lộ Trình', emoji: '🗺️', icon: Target, color: 'text-amber-400' },
    { id: 'mini_apps', label: 'Mini Apps', emoji: '📱', icon: Grid, color: 'text-purple-400', isAction: true, onClick: onOpenMiniAppHub },
    { id: 'flashcards', label: 'Thẻ Từ', emoji: '📚', icon: BookOpen, color: 'text-cyan-400' },
    { id: 'ai', label: 'AI Trợ Lý', emoji: '🤖', icon: Bot, color: 'text-emerald-400', isAction: true, onClick: onOpenAiModal },
  ];

  return (
    <div className="no-print xl:hidden fixed bottom-0 left-0 right-0 z-[45] bg-slate-950/40 backdrop-blur-md border-t border-pink-500/30 px-2 py-1.5 pb-safe shadow-[0_-5px_25px_rgba(0,0,0,0.5)] gpu-accelerated">
      <div className="flex items-center justify-around w-full max-w-lg sm:max-w-xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.isAction && tab.onClick) {
                  tab.onClick();
                } else if (setActiveTab) {
                  setActiveTab(tab.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 cursor-pointer touch-manipulation ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black scale-105 border border-white/40 shadow-[0_0_18px_rgba(244,114,182,0.7)]'
                  : 'text-slate-300 hover:text-white bg-slate-900/40 border border-white/10'
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="text-xs">{tab.emoji}</span>
                <Icon className={`h-4 w-4 ${isActive ? 'text-white animate-pulse' : tab.color}`} />
              </div>
              <span className={`text-[10px] font-black tracking-tight mt-0.5 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
