import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Volume2, Mic, Star, Sparkles, CheckCircle2, RotateCw, Play, Pause,
  ChevronRight, HelpCircle, Trophy, Flame, Heart, ArrowRight, ShieldCheck,
  Smile, Frown, Meh, Award, RefreshCw, Wand2
} from 'lucide-react';

import { OnlineVocabFetcher } from '../services/onlineVocabFetcher';

export default function LessonRunnerModal({
  isOpen,
  onClose,
  topicObj,
  levelId = 'L1',
  vocabList = [],
  voiceGender = 'female',
  onCompleteLesson,
  addToast
}) {
  if (!isOpen || !topicObj) return null;

  // Active step in the 11-step lesson flow
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [earnedXp, setEarnedXp] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

  // Dynamic online fetched words state
  const [dynamicVocab, setDynamicVocab] = useState([]);
  const [isFetchingOnline, setIsFetchingOnline] = useState(false);

  // Active target vocabulary words for this lesson
  const activeVocabSource = dynamicVocab.length > 0 ? dynamicVocab : (vocabList.length > 0 ? vocabList : []);
  const lessonWords = activeVocabSource.length > 0 ? activeVocabSource.slice(0, 10) : [
    { id: 'w1', word: 'Cat', meaning: 'Con mèo', ipa: '/kæt/', image: '🐱', example: 'This is a cat.', hint: 'Động vật kêu meo meo' },
    { id: 'w2', word: 'Dog', meaning: 'Con chó', ipa: '/dɒɡ/', image: '🐶', example: 'The dog is happy.', hint: 'Động vật trung thành' },
    { id: 'w3', word: 'Apple', meaning: 'Quả táo', ipa: '/ˈæp.əl/', image: '🍎', example: 'I like red apples.', hint: 'Trái cây màu đỏ' },
    { id: 'w4', word: 'Sun', meaning: 'Mặt trời', ipa: '/sʌn/', image: '☀️', example: 'The sun is bright.', hint: 'Tỏa sáng ban ngày' },
    { id: 'w5', word: 'Star', meaning: 'Ngôi sao', ipa: '/stɑːr/', image: '⭐', example: 'Twinkle twinkle little star.', hint: 'Lấp lánh trên trời' }
  ];

  const currentWord = lessonWords[currentStepIndex % lessonWords.length] || lessonWords[0];

  // Tự động truy cập mạng tìm bài tập & từ vựng mới
  const handleFetchOnlineVocab = async () => {
    setIsFetchingOnline(true);
    addToast?.('🌐 Hệ thống đang tự động truy cập mạng tìm bài tập & từ vựng mới...', 'info');
    const newWords = await OnlineVocabFetcher.fetchOnlineVocab(topicObj?.name || 'animals', 8);
    if (newWords && newWords.length > 0) {
      setDynamicVocab(newWords);
      addToast?.(`✅ Đã nạp thành công ${newWords.length} từ vựng mới từ Internet!`, 'success');
    }
    setIsFetchingOnline(false);
  };

  // Speech synthesis helper
  const playAudio = (text, slow = false) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = slow ? 0.6 : (voiceGender === 'male' ? 0.85 : 0.88);
    u.pitch = voiceGender === 'male' ? 0.85 : 1.05;
    window.speechSynthesis.speak(u);
  };

  // State for Step 1: Flashcard flip
  const [isFlipped, setIsFlipped] = useState(false);
  const [wordRatings, setWordRatings] = useState({}); // { wordId: 'mastered' | 'remembered' | 'familiar' | 'weak' }

  // State for Step 2: Canvas Tracing
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [traceCompleted, setTraceCompleted] = useState(false);

  // State for Step 3: Quiz options
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // State for Step 4: AI Speech Coach
  const [isRecording, setIsRecording] = useState(false);
  const [speechResult, setSpeechResult] = useState('');
  const [speechScore, setSpeechScore] = useState(null); // 'excellent' | 'good' | 'retry'

  // State for Step 5: Spelling
  const [spellingInput, setSpellingInput] = useState([]);
  const [spellingTiles, setSpellingTiles] = useState([]);

  // State for Step 6: Sentence Builder
  const [sentenceInput, setSentenceInput] = useState([]);
  const [sentenceTiles, setSentenceTiles] = useState([]);

  // State for Step 7: Mini Conversation
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: `Hello! What is this animal? 🐱`, word: 'cat' }
  ]);

  // State for Step 8: Story Karaoke
  const [karaokeActiveIndex, setKaraokeActiveIndex] = useState(-1);
  const [isPlayingKaraoke, setIsPlayingKaraoke] = useState(false);

  // State for Hints (3-tier hint system)
  const [hintTier, setHintTier] = useState(0); // 0 = none, 1 = replay audio, 2 = eliminate 2 options, 3 = highlight answer
  const [eliminatedOptions, setEliminatedOptions] = useState([]);

  // Initialize Spelling & Sentence tiles on word change
  useEffect(() => {
    if (currentWord) {
      // Spelling tiles
      const w = currentWord.word.toUpperCase();
      const letters = w.split('');
      const shuffled = [...letters].sort(() => Math.random() - 0.5);
      setSpellingTiles(shuffled);
      setSpellingInput([]);

      // Sentence tiles
      const targetSentence = currentWord.example || `This is a ${currentWord.word.toLowerCase()}.`;
      const words = targetSentence.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').split(' ');
      const shuffledWords = [...words].sort(() => Math.random() - 0.5);
      setSentenceTiles(shuffledWords);
      setSentenceInput([]);

      setQuizSelected(null);
      setQuizAnswered(false);
      setHintTier(0);
      setEliminatedOptions([]);
      setIsFlipped(false);
      setSpeechResult('');
      setSpeechScore(null);
    }
  }, [currentStepIndex, currentWord]);

  // Canvas drawing handlers for Phonics tracing
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    setTraceCompleted(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTraceCompleted(false);
  };

  // AI Speech Recognition trigger
  const handleSpeechRecord = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Fallback simulation
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setSpeechResult(currentWord.word);
        setSpeechScore('excellent');
        setEarnedXp((prev) => prev + 2);
        playAudio(`Great job! You said ${currentWord.word}`);
      }, 1500);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => setIsRecording(true);
      rec.onend = () => setIsRecording(false);
      rec.onerror = () => {
        setIsRecording(false);
        setSpeechScore('retry');
      };

      rec.onresult = (e) => {
        const transcript = e.results[0][0].transcript.toLowerCase().trim();
        setSpeechResult(transcript);
        if (transcript.includes(currentWord.word.toLowerCase())) {
          setSpeechScore('excellent');
          setEarnedXp((prev) => prev + 3);
          playAudio('Awesome pronunciation!');
        } else {
          setSpeechScore('retry');
        }
      };

      rec.start();
    } catch (err) {
      setIsRecording(false);
    }
  };

  // 3-Tier Hint Trigger
  const handleUseHint = () => {
    if (hintTier === 0) {
      setHintTier(1);
      playAudio(currentWord.word, true);
      addToast?.('💡 Gợi ý 1: Đã phát lại âm thanh chậm!', 'info');
    } else if (hintTier === 1) {
      setHintTier(2);
      // Eliminate 2 wrong options for quiz
      const wrongs = lessonWords.filter((w) => w.word !== currentWord.word).slice(0, 2).map((w) => w.word);
      setEliminatedOptions(wrongs);
      addToast?.('💡 Gợi ý 2: Đã loại bỏ 2 phương án sai!', 'info');
    } else {
      setHintTier(3);
      addToast?.(`💡 Gợi ý 3: Đáp án đúng là "${currentWord.word}"!`, 'info');
    }
  };

  // Next step transition
  const handleNextStep = () => {
    if (currentStepIndex < 10) {
      setCurrentStepIndex((prev) => prev + 1);
      setEarnedXp((prev) => prev + 5);
      setEarnedStars((prev) => prev + 1);
    } else {
      // Finished all 11 steps!
      onCompleteLesson?.({
        topicId: topicObj.id,
        xp: earnedXp + 20,
        stars: earnedStars + 3,
        ratings: wordRatings
      });
    }
  };

  const stepsList = [
    { title: '1. Khám Phá Từ Mới', icon: '🌟' },
    { title: '2. Thẻ Flashcard 2 Mặt', icon: '🃏' },
    { title: '3. Luyện Phonics & Tô Chữ', icon: '✍️' },
    { title: '4. Nghe & Nhận Diện Hình', icon: '🎧' },
    { title: '5. Chấm Âm AI Speech', icon: '🎤' },
    { title: '6. Ghép Chữ Thành Từ', icon: '🧩' },
    { title: '7. Ghép Câu Ngữ Cảnh', icon: '📝' },
    { title: '8. Hội Thoại Mini Role-Play', icon: '💬' },
    { title: '9. Đọc Truyện Karaoke', icon: '📖' },
    { title: '10. Thử Thách Mini Game', icon: '🎮' },
    { title: '11. Tổng Kết Thành Quả', icon: '🏆' }
  ];

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn cursor-pointer" onClick={onClose}>
      <div className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto my-auto rounded-3xl border-2 border-pink-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-3 sm:p-5 md:p-6 space-y-3.5 text-white shadow-2xl custom-scrollbar cursor-default" onClick={(e) => e.stopPropagation()}>

        {/* ========================================================================= */}
        {/* FULLSCREEN LESSON HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-rose-950 border border-rose-500/50 text-rose-300 hover:bg-rose-900 transition cursor-pointer"
              title="Thoát bài học"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest">{levelId} • {topicObj.name || topicObj.title}</span>
                <span className="rounded-full bg-amber-500/20 border border-amber-400 px-2 py-0.5 text-[10px] font-mono-code text-amber-300">
                  {stepsList[currentStepIndex]?.title}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-heading tracking-tight text-white flex items-center gap-2">
                <span>{stepsList[currentStepIndex]?.icon}</span>
                <span>{topicObj.name} • Mốc {currentStepIndex + 1}/11</span>
              </h2>
            </div>
          </div>

          {/* Right Header Stats: Lives, Stars, XP & Hint button */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Lives */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-2xl text-xs font-black text-rose-400">
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>{lives} mạng</span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 bg-amber-950 border border-amber-500/40 px-3 py-1.5 rounded-2xl text-xs font-black text-yellow-300">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>+{earnedStars} ⭐</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1 bg-indigo-950 border border-indigo-500/40 px-3 py-1.5 rounded-2xl text-xs font-black text-indigo-300">
              <Trophy className="h-4 w-4 text-indigo-400" />
              <span>+{earnedXp} XP</span>
            </div>

            {/* Online Content Fetch Button */}
            <button
              onClick={handleFetchOnlineVocab}
              disabled={isFetchingOnline}
              className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1.5 rounded-2xl text-xs font-black hover:scale-105 transition cursor-pointer shadow-md disabled:opacity-50"
              title="Tự động tìm kiếm bài tập & từ vựng mới từ Internet"
            >
              <Sparkles className="h-4 w-4 text-yellow-300 animate-spin" />
              <span>{isFetchingOnline ? 'Đang Tải...' : '🌐 Tìm Từ Mới Online'}</span>
            </button>

            {/* 3-Tier Hint Button */}
            <button
              onClick={handleUseHint}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 px-3 py-1.5 rounded-2xl text-xs font-black hover:scale-105 transition cursor-pointer shadow-md"
              title="Bấm để nhận gợi ý bài học"
            >
              <Wand2 className="h-4 w-4 text-slate-950" />
              <span>Gợi ý {hintTier > 0 ? `(${hintTier}/3)` : ''}</span>
            </button>
          </div>
        </div>

        {/* PROGRESS BAR ACROSS 11 STEPS */}
        <div className="w-full bg-slate-950 rounded-full border border-slate-800 h-3 overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
            style={{ width: `${((currentStepIndex + 1) / 11) * 100}%` }}
          ></div>
        </div>

        {/* ========================================================================= */}
        {/* DYNAMIC ACTIVITY BODY (11 STEPS) */}
        {/* ========================================================================= */}
        <div className="my-auto py-4">

          {/* STEP 0: WARMUP & DISCOVER */}
          {currentStepIndex === 0 && (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400 text-xs font-black text-amber-300">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Bước 1: Khám Phá Từ Vựng Mới Nào Bé Ơi!</span>
              </div>

              <div className="relative max-w-sm mx-auto p-6 rounded-3xl border-2 border-cyan-400/50 bg-slate-900 shadow-2xl space-y-4">
                <div className="text-8xl animate-bounce drop-shadow-2xl">{currentWord.image}</div>
                <h3 className="text-3xl font-black font-heading text-white tracking-tight">{currentWord.word}</h3>
                <p className="text-sm font-mono-code text-cyan-300 font-bold">{currentWord.ipa}</p>
                <p className="text-lg font-black text-amber-300">"{currentWord.meaning}"</p>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
                  "{currentWord.example}"
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => playAudio(currentWord.word)}
                    className="px-5 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs transition flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Volume2 className="h-4 w-4" /> Nghe Âm Thường
                  </button>

                  <button
                    onClick={() => playAudio(currentWord.word, true)}
                    className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>🐢</span> Nghe Chậm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: 2-SIDED FLASHCARD */}
          {currentStepIndex === 1 && (
            <div className="text-center space-y-5 animate-fadeIn">
              <div className="text-xs font-black text-pink-300 uppercase tracking-widest">
                Bước 2: Lật Mặt Thẻ Flashcard & Đánh Giá Mức Độ Ghi Nhớ (7 Trạng Thái)
              </div>

              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`max-w-md mx-auto min-h-[280px] rounded-3xl border-2 p-6 cursor-pointer transition-all duration-500 transform backdrop-blur-xl flex flex-col justify-between shadow-2xl ${
                  isFlipped
                    ? 'border-amber-400 bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900'
                    : 'border-cyan-400 bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900'
                }`}
              >
                {!isFlipped ? (
                  <div className="my-auto space-y-4">
                    <div className="text-8xl animate-pulse">{currentWord.image}</div>
                    <div className="text-xs font-bold text-slate-400">Bấm vào thẻ để xem đáp án tiếng Việt!</div>
                    <button
                      onClick={(e) => { e.stopPropagation(); playAudio(currentWord.word); }}
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400 text-xs font-black mx-auto flex items-center gap-1.5"
                    >
                      <Volume2 className="h-4 w-4" /> Phát âm từ
                    </button>
                  </div>
                ) : (
                  <div className="my-auto space-y-3">
                    <div className="text-4xl font-black font-heading text-yellow-300">{currentWord.word.toUpperCase()}</div>
                    <div className="text-sm font-mono-code text-cyan-300">{currentWord.ipa}</div>
                    <div className="text-xl font-extrabold text-white">"{currentWord.meaning}"</div>
                    <p className="text-xs text-slate-300 italic font-medium">"{currentWord.example}"</p>
                  </div>
                )}
              </div>

              {/* 4 Self-Rating Mastery Buttons */}
              <div className="max-w-md mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <button
                  onClick={() => setWordRatings({ ...wordRatings, [currentWord.id]: 'weak' })}
                  className="p-2 rounded-2xl bg-rose-950 border border-rose-500/50 text-rose-300 text-xs font-black hover:bg-rose-900 flex flex-col items-center gap-1"
                >
                  <Frown className="h-4 w-4 text-rose-400" />
                  <span>😟 Chưa nhớ</span>
                </button>

                <button
                  onClick={() => setWordRatings({ ...wordRatings, [currentWord.id]: 'familiar' })}
                  className="p-2 rounded-2xl bg-amber-950 border border-amber-500/50 text-amber-300 text-xs font-black hover:bg-amber-900 flex flex-col items-center gap-1"
                >
                  <Meh className="h-4 w-4 text-amber-400" />
                  <span>🙂 Hơi nhớ</span>
                </button>

                <button
                  onClick={() => setWordRatings({ ...wordRatings, [currentWord.id]: 'remembered' })}
                  className="p-2 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-black hover:bg-emerald-900 flex flex-col items-center gap-1"
                >
                  <Smile className="h-4 w-4 text-emerald-400" />
                  <span>😄 Nhớ rồi</span>
                </button>

                <button
                  onClick={() => setWordRatings({ ...wordRatings, [currentWord.id]: 'mastered' })}
                  className="p-2 rounded-2xl bg-purple-950 border border-purple-500/50 text-purple-300 text-xs font-black hover:bg-purple-900 flex flex-col items-center gap-1"
                >
                  <Award className="h-4 w-4 text-purple-400" />
                  <span>👑 Rất dễ</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PHONICS & LETTER TRACING */}
          {currentStepIndex === 2 && (
            <div className="text-center space-y-4 animate-fadeIn">
              <div className="text-xs font-black text-amber-300 uppercase tracking-widest">
                Bước 3: Luyện Phonics & Tô Chữ Cái Đầu "{currentWord.word.charAt(0).toUpperCase()}"
              </div>

              <div className="max-w-md mx-auto p-4 rounded-3xl border border-slate-800 bg-slate-950 space-y-3">
                <div className="text-xs text-slate-300">
                  Dùng ngón tay hoặc chuột vẽ tô theo chữ cái <strong className="text-yellow-300 text-lg font-black">{currentWord.word.charAt(0).toUpperCase()}</strong> nhé!
                </div>

                <div className="relative w-64 h-64 mx-auto border-2 border-dashed border-amber-400/60 rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden">
                  <span className="absolute text-9xl font-black text-slate-700 select-none pointer-events-none font-heading">
                    {currentWord.word.charAt(0).toUpperCase()}
                  </span>

                  <canvas
                    ref={canvasRef}
                    width={256}
                    height={256}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="relative z-10 cursor-crosshair touch-none"
                  />
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={clearCanvas}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                  >
                    🔄 Vẽ lại
                  </button>

                  <button
                    onClick={() => playAudio(`Letter ${currentWord.word.charAt(0)}, sound ${currentWord.word.charAt(0).toLowerCase()}, for ${currentWord.word}`)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-black flex items-center gap-1"
                  >
                    <Volume2 className="h-4 w-4" /> Nghe âm Phonics
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LISTENING & IMAGE RECOGNITION QUIZ */}
          {currentStepIndex === 3 && (
            <div className="text-center space-y-5 animate-fadeIn">
              <div className="text-xs font-black text-cyan-300 uppercase tracking-widest">
                Bước 4: Phản Xạ Nghe Âm Thanh & Chọn Đúng Từ Vựng
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => playAudio(currentWord.word)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition cursor-pointer"
                >
                  <Volume2 className="h-5 w-5 text-yellow-300 animate-pulse" />
                  <span>Nghe Từ Vựng (Bấm Nghe Lại)</span>
                </button>
              </div>

              <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
                {lessonWords.slice(0, 4).map((wOption) => {
                  const isEliminated = eliminatedOptions.includes(wOption.word);
                  if (isEliminated) return null;

                  return (
                    <button
                      key={wOption.id}
                      onClick={() => {
                        setQuizSelected(wOption.word);
                        setQuizAnswered(true);
                        if (wOption.word === currentWord.word) {
                          playAudio('Correct! Excellent!');
                          setEarnedXp((prev) => prev + 5);
                          setEarnedStars((prev) => prev + 1);
                          addToast?.('🎉 ĐÁP ÁN CHÍNH XÁC! Tự động chuyển bài học tiếp theo...', 'success');
                          setTimeout(() => {
                            handleNextStep();
                          }, 800);
                        } else {
                          playAudio('Oops, try again!');
                          setLives((l) => Math.max(1, l - 1));
                          addToast?.('❌ Chưa đúng! Bé hãy thử chọn lại nhé!', 'warning');
                        }
                      }}
                      className={`p-4 rounded-3xl border-2 text-center transition-all duration-300 space-y-2 cursor-pointer shadow-lg ${
                        quizAnswered && wOption.word === currentWord.word
                          ? 'border-emerald-400 bg-emerald-950/80 ring-4 ring-emerald-500/50 scale-105'
                          : quizSelected === wOption.word && wOption.word !== currentWord.word
                          ? 'border-rose-500 bg-rose-950/80'
                          : 'border-slate-800 bg-slate-900 hover:border-cyan-400 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-6xl">{wOption.image}</div>
                      <div className="font-extrabold text-sm text-white">{wOption.word}</div>
                      <div className="text-xs text-amber-300 font-medium">"{wOption.meaning}"</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: AI SPEECH COACH */}
          {currentStepIndex === 4 && (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="text-xs font-black text-purple-300 uppercase tracking-widest">
                Bước 5: Luyện Nói Phát Âm Chuẩn Cùng Chấm Điểm AI
              </div>

              <div className="max-w-md mx-auto p-6 rounded-3xl border-2 border-purple-500/40 bg-slate-900 space-y-4 shadow-2xl">
                <div className="text-7xl animate-pulse">{currentWord.image}</div>
                <h3 className="text-3xl font-black font-heading text-white">{currentWord.word}</h3>
                <p className="text-xs font-mono-code text-purple-300">{currentWord.ipa}</p>

                <div className="pt-2 flex justify-center">
                  <button
                    onClick={handleSpeechRecord}
                    className={`px-8 py-4 rounded-3xl font-black text-sm transition-all duration-300 flex items-center gap-3 shadow-xl cursor-pointer ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse border-2 border-rose-300'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105'
                    }`}
                  >
                    <Mic className="h-6 w-6" />
                    <span>{isRecording ? 'Đang Thu Âm (Bé Hãy Nói)...' : '🎤 Bấm Nói Ngay'}</span>
                  </button>
                </div>

                {speechResult && (
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-xs text-slate-400">Giọng nói nhận diện được:</div>
                    <div className="text-base font-extrabold text-cyan-300 font-mono-code">"{speechResult}"</div>
                  </div>
                )}

                {speechScore === 'excellent' && (
                  <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-sm font-black flex items-center justify-center gap-2 animate-bounce">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span>🌟 Tuyệt Vời! Bé Phát Âm Rất Chuẩn! (+3 XP)</span>
                  </div>
                )}

                {speechScore === 'retry' && (
                  <div className="p-4 rounded-2xl bg-amber-950 border border-amber-500/50 text-amber-300 text-sm font-black flex items-center justify-center gap-2">
                    <RotateCw className="h-5 w-5 text-amber-400" />
                    <span>👍 Gần Đúng Rồi! Bé Bấm Nói Lại Một Lần Nữa Nhé!</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: SPELLING */}
          {currentStepIndex === 5 && (
            <div className="text-center space-y-5 animate-fadeIn">
              <div className="text-xs font-black text-teal-300 uppercase tracking-widest">
                Bước 6: Trò Chơi Ghép Chữ Cái Thành Từ Vựng
              </div>

              <div className="max-w-md mx-auto p-6 rounded-3xl border border-slate-800 bg-slate-900 space-y-5 shadow-2xl">
                <div className="text-6xl">{currentWord.image}</div>
                <div className="text-sm font-extrabold text-amber-300">"{currentWord.meaning}"</div>

                {/* Target Letter Slot Boxes */}
                <div className="flex justify-center gap-2">
                  {currentWord.word.split('').map((char, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-14 rounded-2xl border-2 border-dashed border-teal-400 bg-slate-950 flex items-center justify-center text-2xl font-black font-mono-code text-cyan-300 shadow-inner"
                    >
                      {spellingInput[idx] || '_'}
                    </div>
                  ))}
                </div>

                {/* Available Scrambled Letter Tiles */}
                <div className="flex justify-center gap-2 flex-wrap pt-2">
                  {spellingTiles.map((char, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (spellingInput.length < currentWord.word.length) {
                          const next = [...spellingInput, char];
                          setSpellingInput(next);
                          playAudio(char);

                          if (next.length === currentWord.word.length) {
                            if (next.join('').toUpperCase() === currentWord.word.toUpperCase()) {
                              playAudio('Awesome spelling!');
                              setEarnedXp((prev) => prev + 5);
                              setEarnedStars((prev) => prev + 1);
                              addToast?.('🎉 ĐÁP ÁN CHÍNH XÁC! Tự động chuyển bài tiếp theo...', 'success');
                              setTimeout(() => handleNextStep(), 800);
                            } else {
                              playAudio('Oops, try spelling again!');
                              setLives((l) => Math.max(1, l - 1));
                              addToast?.('❌ Chưa chính xác! Hệ thống xóa làm lại...', 'warning');
                              setTimeout(() => setSpellingInput([]), 600);
                            }
                          }
                        }
                      }}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-black text-xl shadow-lg hover:scale-110 transition cursor-pointer"
                    >
                      {char}
                    </button>
                  ))}
                </div>

                {spellingInput.length > 0 && (
                  <button
                    onClick={() => setSpellingInput([])}
                    className="text-xs text-rose-400 underline font-bold"
                  >
                    🔄 Xóa ghép lại
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: SENTENCE BUILDER */}
          {currentStepIndex === 6 && (
            <div className="text-center space-y-5 animate-fadeIn">
              <div className="text-xs font-black text-emerald-300 uppercase tracking-widest">
                Bước 7: Sắp Xếp Từ Ghép Thành Câu Hoàn Chỉnh
              </div>

              <div className="max-w-lg mx-auto p-6 rounded-3xl border border-slate-800 bg-slate-900 space-y-4 shadow-2xl">
                <div className="text-sm font-bold text-slate-300">
                  Hãy xếp các từ bên dưới thành câu ví dụ chuẩn:
                </div>

                {/* Assembled Sentence Box */}
                <div className="min-h-[60px] p-3 rounded-2xl border-2 border-emerald-500/50 bg-slate-950 flex flex-wrap items-center justify-center gap-2">
                  {sentenceInput.length === 0 ? (
                    <span className="text-xs text-slate-500 font-mono-code">Bấm vào các từ bên dưới để ghép câu...</span>
                  ) : (
                    sentenceInput.map((w, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-sm shadow">
                        {w}
                      </span>
                    ))
                  )}
                </div>

                {/* Scrambled Word Blocks */}
                <div className="flex justify-center gap-2 flex-wrap pt-2">
                  {sentenceTiles.map((wBlock, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSentenceInput([...sentenceInput, wBlock]);
                        playAudio(wBlock);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-emerald-300 font-extrabold text-sm hover:bg-slate-700 shadow cursor-pointer"
                    >
                      {wBlock}
                    </button>
                  ))}
                </div>

                {sentenceInput.length > 0 && (
                  <button
                    onClick={() => setSentenceInput([])}
                    className="text-xs text-rose-400 underline font-bold"
                  >
                    🔄 Xóa xếp lại câu
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 7: MINI CONVERSATION & ROLE PLAY */}
          {currentStepIndex === 7 && (
            <div className="text-center space-y-5 animate-fadeIn">
              <div className="text-xs font-black text-cyan-300 uppercase tracking-widest">
                Bước 8: Hội Thoại Mini Role-Play Cùng Nhân Vật Mascot Lumi
              </div>

              <div className="max-w-md mx-auto p-5 rounded-3xl border border-slate-800 bg-slate-950 space-y-4 shadow-2xl">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <div className="text-4xl">🦄</div>
                  <div className="text-left">
                    <div className="text-xs font-black text-cyan-300">Lumi Mascot</div>
                    <div className="text-[10px] text-slate-400">Bạn đồng hành Tiếng Anh</div>
                  </div>
                </div>

                {/* Dialogue History */}
                <div className="space-y-3 text-left">
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`p-3 rounded-2xl text-xs font-bold leading-relaxed max-w-[80%] ${
                        msg.sender === 'user'
                          ? 'bg-cyan-600 text-white rounded-tr-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suggested User Dialogue Responses */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      setChatHistory([
                        ...chatHistory,
                        { sender: 'user', text: `It is a ${currentWord.word.toLowerCase()}! 🐱` },
                        { sender: 'ai', text: `Awesome! You are very smart! 🌟` }
                      ]);
                      playAudio(`It is a ${currentWord.word}`);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-300 text-xs font-black hover:bg-cyan-900 transition text-left cursor-pointer"
                  >
                    💬 "It is a {currentWord.word.toLowerCase()}!"
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: STORY MODE & KARAOKE READING */}
          {currentStepIndex === 8 && (
            <div className="text-center space-y-5 animate-fadeIn">
              <div className="text-xs font-black text-yellow-300 uppercase tracking-widest">
                Bước 9: Đọc Truyện Karaoke Theo Từng Từ Vựng
              </div>

              <div className="max-w-lg mx-auto p-6 rounded-3xl border-2 border-yellow-400/50 bg-slate-950 space-y-5 shadow-2xl">
                <div className="text-6xl animate-pulse">📖</div>
                <h4 className="text-lg font-black text-amber-300">Truyện Ngắn: The Little {currentWord.word}</h4>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-base font-extrabold text-white leading-loose tracking-wide font-heading">
                  Once upon a time, there was a little <span className="text-yellow-300 underline font-black">{currentWord.word}</span>. It loved to run and play under the sun.
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => playAudio(`Once upon a time, there was a little ${currentWord.word}. It loved to run and play under the sun.`)}
                    className="px-5 py-2.5 rounded-2xl bg-yellow-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="h-4 w-4" /> Bật Đọc Karaoke
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: MINI GAME CHALLENGE */}
          {currentStepIndex === 9 && (
            <div className="text-center space-y-5 animate-fadeIn">
              <div className="text-xs font-black text-pink-300 uppercase tracking-widest">
                Bước 10: Thử Thách Trò Chơi Đập Bóng Búp Bê
              </div>

              <div className="max-w-md mx-auto p-6 rounded-3xl border border-slate-800 bg-slate-900 space-y-4 shadow-2xl">
                <div className="text-xs text-slate-300 font-bold">
                  Bé hãy bấm vào quả bóng bay chứa từ đúng với phát âm <strong className="text-cyan-300">"{currentWord.word}"</strong> nhé!
                </div>

                <div className="flex justify-center gap-4 py-4">
                  {lessonWords.slice(0, 3).map((w, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playAudio(w.word);
                        if (w.word === currentWord.word) {
                          addToast?.('🎈 Đập bóng thành công! (+10 XP)', 'success');
                          setEarnedXp((prev) => prev + 10);
                        }
                      }}
                      className="w-24 h-28 rounded-full bg-gradient-to-t from-pink-600 to-purple-500 text-white font-black text-sm shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition cursor-pointer animate-bounce"
                    >
                      <span className="text-2xl">{w.image}</span>
                      <span>{w.word}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: TOPIC TEST & FINAL VICTORY SCREEN */}
          {currentStepIndex === 10 && (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="text-6xl animate-bounce">🎉</div>
              <h2 className="text-3xl font-black font-heading text-yellow-300 tracking-tight">
                XUẤT SẮC BÉ ƠI! HOÀN THÀNH BÀI HỌC!
              </h2>

              <div className="max-w-md mx-auto p-6 rounded-3xl border-2 border-emerald-400 bg-slate-900 space-y-4 shadow-2xl">
                <div className="flex justify-center gap-2 text-4xl">
                  ⭐⭐⭐
                </div>

                <div className="grid grid-cols-2 gap-3 text-left pt-2">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">Tổng điểm XP</div>
                    <div className="text-xl font-black text-indigo-300 font-mono-code">+{earnedXp + 20} XP</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">Tổng Sao Thu Độc</div>
                    <div className="text-xl font-black text-yellow-300 font-mono-code">+{earnedStars + 3} ⭐</div>
                  </div>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm shadow-xl hover:scale-105 transition cursor-pointer"
                >
                  🚀 Nhận Thưởng & Hoàn Thành
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* FOOTER ACTIONS & STEP NAVIGATION */}
        {/* ========================================================================= */}
        {currentStepIndex < 10 && (
          <div className="flex items-center justify-between border-t border-slate-800 pt-3">
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className="px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 disabled:opacity-30 hover:bg-slate-800 cursor-pointer"
            >
              ◀ Bước Trước
            </button>

            <div className="text-xs font-mono-code font-bold text-slate-400">
              Bước <strong className="text-cyan-300">{currentStepIndex + 1}</strong> / 11
            </div>

            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black hover:scale-105 transition shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <span>Bước Tiếp Theo</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
