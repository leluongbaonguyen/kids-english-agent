import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Volume2, Trophy, Star, Sparkles, RefreshCw, Play, CheckCircle2, Flame } from 'lucide-react';

export default function MiniGamesHubModal({
  isOpen,
  onClose,
  vocabList = [],
  addToast
}) {
  if (!isOpen) return null;

  const [activeGameId, setActiveGameId] = useState('balloon'); // balloon, memory, monster, catch, puzzle, race, maze, sort
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Sample vocab for games
  const gamesVocab = vocabList.length > 0 ? vocabList.slice(0, 12) : [
    { word: 'Cat', meaning: 'Con mèo', image: '🐱', category: 'animal' },
    { word: 'Dog', meaning: 'Con chó', image: '🐶', category: 'animal' },
    { word: 'Apple', meaning: 'Quả táo', image: '🍎', category: 'food' },
    { word: 'Banana', meaning: 'Quả chuối', image: '🍌', category: 'food' },
    { word: 'Tiger', meaning: 'Con hổ', image: '🐯', category: 'animal' },
    { word: 'Milk', meaning: 'Sữa', image: '🥛', category: 'food' }
  ];

  const playAudio = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  const handleCorrectAnswer = () => {
    setScore((prev) => prev + 10);
    setStreak((prev) => prev + 1);
    addToast?.('🎉 ĐÁP ÁN CHÍNH XÁC! (+10 XP)', 'success');
    playAudio('Awesome!');
  };

  // State for Game 2: Memory Card
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    if (activeGameId === 'memory') {
      const items = gamesVocab.slice(0, 4);
      const cards = [];
      items.forEach((item, idx) => {
        cards.push({ id: `img-${idx}`, val: item.image, type: 'img', matchId: idx });
        cards.push({ id: `txt-${idx}`, val: item.word, type: 'txt', matchId: idx });
      });
      setMemoryCards(cards.sort(() => Math.random() - 0.5));
      setFlippedCards([]);
    }
  }, [activeGameId]);

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn cursor-pointer" onClick={onClose}>
      <div className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto my-auto rounded-3xl border-2 border-pink-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-3 sm:p-5 md:p-6 space-y-3.5 text-white shadow-2xl custom-scrollbar cursor-default" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-pink-600/20 border border-pink-500/40 text-pink-400 text-3xl animate-bounce">
              🎮
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black font-heading text-white">
                TRUNG TÂM 8 TRÒ CHƠI TIẾNG ANH (MINI-GAMES HUB)
              </h2>
              <p className="text-xs text-slate-300">Vừa học vừa chơi cùng đập bóng, ghép thẻ memory, cho quái vật ăn & đuổi từ!</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-950 border border-amber-500/40 px-3 py-1.5 rounded-2xl text-xs font-black text-amber-300">
              <Trophy className="h-4 w-4 text-yellow-400" />
              <span>Điểm: {score}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 8 GAME SELECTOR TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'balloon', name: '🎈 1. Đập Bóng Bay', icon: '🎈' },
            { id: 'memory', name: '🃏 2. Thẻ Trí Nhớ', icon: '🃏' },
            { id: 'monster', name: '👾 3. Cho Quái Vật Ăn', icon: '👾' },
            { id: 'catch', name: '🪣 4. Hứng Từ Rơi', icon: '🪣' },
            { id: 'puzzle', name: '🧩 5. Ô Chữ Vowel', icon: '🧩' },
            { id: 'race', name: '🏁 6. Đua Nghe Nhanh', icon: '🏁' },
            { id: 'maze', name: '🌀 7. Mê Cung Từ', icon: '🌀' },
            { id: 'sort', name: '📦 8. Phân Loại Từ', icon: '📦' }
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGameId(g.id)}
              className={`py-2 px-3 rounded-2xl text-xs font-black transition border cursor-pointer ${
                activeGameId === g.id
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 border-pink-400 text-white shadow-lg scale-105'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* GAME CONTENT CONTAINER */}
        <div className="min-h-[300px] p-6 rounded-3xl border border-slate-800 bg-slate-950 flex flex-col justify-center items-center text-center space-y-4">
          
          {/* GAME 1: BALLOON POP */}
          {activeGameId === 'balloon' && (
            <div className="space-y-6 w-full">
              <div className="text-xs font-black text-amber-300 uppercase tracking-widest">
                Nghe từ vựng và đập vào quả bóng chứa từ đúng!
              </div>

              <button
                onClick={() => playAudio(gamesVocab[0].word)}
                className="px-6 py-3 rounded-2xl bg-cyan-600 text-white font-black text-xs shadow-lg flex items-center gap-2 mx-auto"
              >
                <Volume2 className="h-5 w-5" /> Nghe Âm Thanh: "{gamesVocab[0].word}"
              </button>

              <div className="flex justify-center gap-4 flex-wrap">
                {gamesVocab.slice(0, 4).map((w, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (w.word === gamesVocab[0].word) handleCorrectAnswer();
                      else playAudio('Try again');
                    }}
                    className="w-24 h-28 rounded-full bg-gradient-to-t from-pink-600 to-purple-500 text-white font-black text-sm shadow-xl flex flex-col items-center justify-center hover:scale-110 transition cursor-pointer animate-bounce"
                  >
                    <span className="text-2xl">{w.image}</span>
                    <span>{w.word}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* GAME 2: MEMORY MATCH */}
          {activeGameId === 'memory' && (
            <div className="space-y-4 w-full">
              <div className="text-xs font-black text-cyan-300 uppercase tracking-widest">
                Lật các thẻ bài để ghép cặp Hình Ảnh ↔ Từ Tiếng Anh tương ứng!
              </div>

              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                {memoryCards.map((card, idx) => {
                  const isFlipped = flippedCards.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (flippedCards.length < 2 && !isFlipped) {
                          const next = [...flippedCards, idx];
                          setFlippedCards(next);
                          playAudio(card.val);
                          if (next.length === 2) {
                            const [first, second] = next;
                            if (memoryCards[first].matchId === memoryCards[second].matchId) {
                              handleCorrectAnswer();
                              setTimeout(() => setFlippedCards([]), 800);
                            } else {
                              setTimeout(() => setFlippedCards([]), 1000);
                            }
                          }
                        }
                      }}
                      className={`h-20 rounded-2xl border-2 font-black text-lg transition-all duration-300 flex items-center justify-center cursor-pointer ${
                        isFlipped
                          ? 'border-amber-400 bg-amber-950 text-white scale-105'
                          : 'border-slate-800 bg-slate-900 text-slate-500 hover:border-cyan-400'
                      }`}
                    >
                      {isFlipped ? card.val : '❓'}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* GAME 3: FEED THE MONSTER */}
          {activeGameId === 'monster' && (
            <div className="space-y-5 w-full">
              <div className="text-7xl animate-bounce">👾</div>
              <div className="text-sm font-black text-pink-300">
                Quái vật nhỏ nhắn Lumi thèm ăn: <strong className="text-yellow-300 text-base">"Give me the {gamesVocab[2].word}!"</strong>
              </div>

              <div className="flex justify-center gap-4">
                {gamesVocab.slice(0, 3).map((w, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (w.word === gamesVocab[2].word) handleCorrectAnswer();
                      else playAudio('Wrong food!');
                    }}
                    className="p-4 rounded-3xl bg-slate-900 border-2 border-slate-800 hover:border-emerald-400 text-center space-y-1 hover:scale-110 transition cursor-pointer"
                  >
                    <div className="text-5xl">{w.image}</div>
                    <div className="text-xs font-black text-white">{w.word}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* GAME 4..8 FALLBACK SIMULATOR */}
          {['catch', 'puzzle', 'race', 'maze', 'sort'].includes(activeGameId) && (
            <div className="space-y-4">
              <div className="text-6xl animate-pulse">🎯</div>
              <h3 className="text-lg font-black text-white uppercase">Chế Độ Trò Chơi Đang Sẵn Sàng</h3>
              <p className="text-xs text-slate-300 max-w-sm">
                Bé hãy bấm nút bên dưới để bắt đầu thử thách nhận +10 XP ngay nhé!
              </p>
              <button
                onClick={handleCorrectAnswer}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-xl hover:scale-105 transition cursor-pointer"
              >
                🚀 Bắt Đầu Thử Thách Ngay (+10 XP)
              </button>
            </div>
          )}

        </div>

      </div>
    </div>,
    document.body
  );
}
