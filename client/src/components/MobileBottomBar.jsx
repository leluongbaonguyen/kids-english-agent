import React from 'react';
import { Home, Sparkles, BookOpen, Gamepad2, Bot } from 'lucide-react';

export function MobileBottomBar({ activeTab, setActiveTab, onOpenAiModal }) {
  const tabs = [
    { id: 'home', label: 'Trang Chủ', icon: Home, color: 'text-pink-400' },
    { id: 'poster', label: 'Khóa Học', icon: Sparkles, color: 'text-yellow-300' },
    { id: 'flashcards', label: 'Thẻ Từ', icon: BookOpen, color: 'text-cyan-400' },
    { id: 'quiz', label: 'Bài Tập', icon: Gamepad2, color: 'text-purple-400' },
    { id: 'ai', label: 'AI Trợ Lý', icon: Bot, color: 'text-amber-400', isAction: true, onClick: onOpenAiModal },
  ];

  return (
    <div className="no-print xl:hidden fixed bottom-0 left-0 right-0 z-[45] bg-slate-950/95 backdrop-blur-2xl border-t border-pink-500/30 px-2 py-1.5 pb-safe shadow-[0_-5px_25px_rgba(0,0,0,0.8)] gpu-accelerated">
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
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 cursor-pointer touch-manipulation ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500/25 to-purple-500/25 text-white scale-105 border border-pink-400/40 shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-pink-300 animate-pulse' : tab.color}`} />
              <span className={`text-[10px] font-black tracking-tight mt-0.5 ${isActive ? 'text-pink-200' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
