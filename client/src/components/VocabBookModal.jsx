import React, { useState } from 'react';
import { X, Volume2, Star, Sparkles, Filter, Search, RotateCw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function VocabBookModal({
  isOpen,
  onClose,
  vocabList = [],
  voiceGender = 'female',
  masteredCards = [],
  addToast
}) {
  if (!isOpen) return null;

  const [activeStateFilter, setActiveStateFilter] = useState('all'); // all, mastered, weak, review, new
  const [searchQuery, setSearchQuery] = useState('');

  const playAudio = (text, slow = false) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = slow ? 0.6 : (voiceGender === 'male' ? 0.85 : 0.88);
    window.speechSynthesis.speak(u);
  };

  const filteredVocab = vocabList.filter((item) => {
    if (!item) return false;
    const matchesSearch = item.word?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.meaning?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isMastered = masteredCards.includes(item.id || item.word);
    if (activeStateFilter === 'mastered') return matchesSearch && isMastered;
    if (activeStateFilter === 'weak') return matchesSearch && !isMastered;
    return matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[88vh] overflow-y-auto rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 space-y-4 text-white shadow-2xl custom-scrollbar">
        
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 text-3xl">
              📖
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black font-heading text-white">
                SỔ TỪ VỰNG THÔNG MINH (MY VOCABULARY BOOK • 7 TRẠNG THÁI)
              </h2>
              <p className="text-xs text-slate-300">Quản lý từ mới, từ đã nhớ, từ yếu & tự động đưa từ yếu vào chu kỳ ôn tập!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* SEARCH BAR & 7 MASTERY STATE FILTERS */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm từ vựng hoặc nghĩa tiếng Việt..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-700 bg-slate-950 text-xs text-white focus:border-emerald-400 focus:outline-none"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
            {[
              { id: 'all', label: '🌈 Tất Cả (' + vocabList.length + ')' },
              { id: 'mastered', label: '👑 Mastered (' + masteredCards.length + ')' },
              { id: 'weak', label: '⚠️ Từ Yếu / Cần Ôn' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveStateFilter(f.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black shrink-0 transition ${
                  activeStateFilter === f.id
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* VOCABULARY CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto custom-scrollbar p-1">
          {filteredVocab.map((w) => {
            const isMastered = masteredCards.includes(w.id || w.word);

            return (
              <div
                key={w.id || w.word}
                className="p-4 rounded-3xl border border-slate-800 bg-slate-900/90 space-y-2 hover:border-emerald-400 transition shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{w.image || '✨'}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                    isMastered
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-950 text-amber-300 border-amber-500/40'
                  }`}>
                    {isMastered ? '👑 Mastered' : '📖 Learning'}
                  </span>
                </div>

                <div>
                  <div className="text-lg font-black text-white font-heading">{w.word}</div>
                  <div className="text-xs font-mono-code text-cyan-300 font-bold">{w.ipa}</div>
                  <div className="text-xs text-amber-300 font-bold">"{w.meaning}"</div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex justify-between gap-1">
                  <button
                    onClick={() => playAudio(w.word)}
                    className="flex-1 py-1.5 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-black flex items-center justify-center gap-1 hover:bg-cyan-600/30"
                  >
                    <Volume2 className="h-3 w-3" /> Nghe Thường
                  </button>

                  <button
                    onClick={() => playAudio(w.word, true)}
                    className="flex-1 py-1.5 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-black flex items-center justify-center gap-1 hover:bg-indigo-600/30"
                  >
                    <span>🐢</span> Nghe Chậm
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
