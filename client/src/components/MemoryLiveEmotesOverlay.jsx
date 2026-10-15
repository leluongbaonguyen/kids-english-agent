import React, { useState } from 'react';
import { MessageCircle, Smile, X, Send } from 'lucide-react';
import { playEmotePopSound } from '../utils/gameAudio.js';

const QUICK_EMOJIS = ['🎉', '🤩', '👏', '😜', '😱', '🔥', '🏆', '❤️'];

const QUICK_PHRASES = [
  { id: 'good_job', en: 'Good job! 👏', vi: 'Bạn chơi siêu quá!' },
  { id: 'oops', en: 'Oops! 😜', vi: 'Suýt trúng rồi!' },
  { id: 'my_turn', en: 'My turn now! 🚀', vi: 'Đến lượt tớ nhé!' },
  { id: 'wow', en: 'Wow, so fast! ⚡', vi: 'Bạn nhớ siêu thật!' },
  { id: 'rematch', en: 'Rematch? 🔁', vi: 'Làm ván nữa không bạn?' },
  { id: 'nice_try', en: 'Nice try! 🌟', vi: 'Cố lên bạn ơi!' }
];

export default function MemoryLiveEmotesOverlay({
  activeFloatingItems = [], // [{ id, type: 'emoji' | 'chat', content, vi, senderRole, senderName }]
  onSendEmote,
  onSendChat,
  disabled = false
}) {
  const [showChatMenu, setShowChatMenu] = useState(false);

  const handleEmoteClick = (emoji) => {
    if (disabled) return;
    playEmotePopSound();
    onSendEmote?.(emoji);
  };

  const handlePhraseClick = (item) => {
    if (disabled) return;
    playEmotePopSound();
    onSendChat?.(item);
    setShowChatMenu(false);
  };

  return (
    <>
      {/* 1. FLOATING REACTION BUBBLES IN-FLIGHT */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {activeFloatingItems.map(item => {
          const isLeft = item.senderRole === 'p1' || item.senderRole === 'host';
          return (
            <div
              key={item.id}
              className={`absolute bottom-24 ${isLeft ? 'left-6 sm:left-12' : 'right-6 sm:right-12'} animate-float-up flex flex-col items-center gap-1`}
            >
              {item.type === 'emoji' ? (
                <div className="text-4xl sm:text-5xl filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transform hover:scale-125 transition-transform">
                  {item.content}
                </div>
              ) : (
                <div className="glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border-2 border-pink-400 bg-gradient-to-r from-purple-900/95 to-pink-900/95 text-white shadow-2xl flex flex-col items-center max-w-[200px] text-center">
                  <span className="text-xs sm:text-sm font-black font-heading leading-tight text-yellow-300">
                    {item.content}
                  </span>
                  {item.vi && (
                    <span className="text-[9px] sm:text-[10px] text-pink-200 font-medium">
                      {item.vi}
                    </span>
                  )}
                </div>
              )}
              <span className="text-[8.5px] font-bold text-white/80 bg-black/60 px-2 py-0.5 rounded-full font-mono-code shadow">
                {item.senderName || (isLeft ? 'Bé' : 'Đối thủ')}
              </span>
            </div>
          );
        })}
      </div>

      {/* 2. COMPACT EMOTE & CHAT BAR */}
      <div className="fixed bottom-3 right-3 sm:right-6 z-30 flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel bg-slate-950/90 border border-white/15 shadow-2xl">
        {/* Emoji Quick Buttons */}
        <div className="hidden xs:flex items-center gap-1">
          {QUICK_EMOJIS.slice(0, 5).map(emoji => (
            <button
              key={emoji}
              onClick={() => handleEmoteClick(emoji)}
              disabled={disabled}
              className="h-8 w-8 rounded-xl flex items-center justify-center text-lg hover:scale-125 active:scale-95 transition cursor-pointer hover:bg-white/10"
              title={`Thả cảm xúc ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* More Emojis & Chat Toggle */}
        <button
          onClick={() => setShowChatMenu(prev => !prev)}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
            showChatMenu
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400'
              : 'bg-slate-900 text-pink-300 border-pink-500/40 hover:bg-slate-800'
          }`}
          title="Mở menu câu chat nhanh song ngữ"
        >
          <MessageCircle className="h-3.5 w-3.5 text-pink-400" />
          <span className="hidden sm:inline">Tương Tác</span>
          <span className="xs:hidden">💬</span>
        </button>

        {/* Popup Chat & All Emojis Flyout */}
        {showChatMenu && (
          <div className="absolute bottom-12 right-0 w-72 rounded-2xl glass-panel bg-slate-950/95 border-2 border-pink-500/50 p-3 shadow-2xl space-y-2.5 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-xs">
              <span className="font-black text-white flex items-center gap-1">
                <Smile className="h-3.5 w-3.5 text-yellow-400" />
                <span>CẢM XÚC & LỜI NÓI VUI</span>
              </span>
              <button
                onClick={() => setShowChatMenu(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* All Emojis Grid */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900 rounded-xl">
              {QUICK_EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleEmoteClick(emoji)}
                  className="h-8 rounded-lg flex items-center justify-center text-xl hover:scale-125 transition cursor-pointer hover:bg-white/10"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Quick Bilingual Chat Phrases */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Câu nói song ngữ nhanh:
              </span>
              {QUICK_PHRASES.map(item => (
                <button
                  key={item.id}
                  onClick={() => handlePhraseClick(item)}
                  className="w-full text-left p-1.5 rounded-xl bg-slate-900/90 hover:bg-pink-950/80 hover:border-pink-500/50 border border-slate-800 transition cursor-pointer flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-white text-[11px] truncate">
                    {item.en}
                  </span>
                  <span className="text-[9.5px] text-pink-300 font-medium truncate ml-1">
                    {item.vi}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
