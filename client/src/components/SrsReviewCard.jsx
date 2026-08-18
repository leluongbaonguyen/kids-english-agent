import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, Play, Sparkles, CheckCircle2, RotateCw, HelpCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { calculatePhonemeIPAScore } from '../services/autonomousAgentEngine';

export default function SrsReviewCard({
  item,
  onCompleteItem,
  onRequeueItem,
  itemIndex = 0,
  totalItems = 5
}) {
  // Card Step Flow State: 1 = RECALL, 2 = LISTEN_READ, 3 = REPEAT_VOICE, 4 = SENTENCE, 5 = RATING
  const [step, setStep] = useState(1);
  const [revealed, setRevealed] = useState(false);
  
  // Voice Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceResult, setVoiceResult] = useState(null);
  const [isSimulatedVoice, setIsSimulatedVoice] = useState(false);

  // Audio Playback
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    // Reset state on item change
    setStep(1);
    setRevealed(false);
    setVoiceResult(null);
    setIsSimulatedVoice(false);
  }, [item?.vocabId]);

  if (!item) return null;

  const playAudio = (slow = false) => {
    setIsPlayingAudio(true);
    try {
      const textToSpeak = item.word || '';
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'en-US';
        utterance.rate = slow ? 0.65 : 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsPlayingAudio(false);
      }
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    setVoiceResult(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          setIsRecording(false);
          const transcript = event.results[0][0].transcript;
          const scoreObj = calculatePhonemeIPAScore(item.word, transcript);
          setVoiceResult({
            transcript,
            score: scoreObj.score,
            accuracy: scoreObj.accuracy,
            feedback: scoreObj.feedback,
            isSimulated: false
          });
          setIsSimulatedVoice(false);
        };

        recognition.onerror = () => {
          setIsRecording(false);
          // Fallback simulation
          triggerSimulatedMic();
        };

        recognition.start();
      } catch {
        setIsRecording(false);
        triggerSimulatedMic();
      }
    } else {
      setIsRecording(false);
      triggerSimulatedMic();
    }
  };

  const triggerSimulatedMic = () => {
    setIsSimulatedVoice(true);
    const scoreObj = calculatePhonemeIPAScore(item.word, item.word);
    setVoiceResult({
      transcript: item.word,
      score: 85,
      accuracy: '85%',
      feedback: 'Thu âm mô phỏng (Demo Mic Browser)',
      isSimulated: true
    });
  };

  const handleRatingSubmit = (rating) => {
    const evidenceData = {
      vocabId: item.vocabId,
      rating, // AGAIN | HARD | GOOD | EASY
      accuracy: rating === 'AGAIN' ? 0.4 : (rating === 'HARD' ? 0.7 : (rating === 'GOOD' ? 0.9 : 1.0)),
      pronunciationScore: voiceResult ? voiceResult.score : 85,
      isSimulatedVoice
    };

    if (rating === 'AGAIN') {
      if (onRequeueItem) onRequeueItem(item);
    }

    if (onCompleteItem) {
      onCompleteItem(item, evidenceData);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl sm:rounded-3xl border border-purple-500/40 bg-gradient-to-br from-slate-950 via-purple-950/90 to-slate-950 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-2xl backdrop-blur-2xl text-white font-sans transition-all duration-300">
      
      {/* Top Header: Step Indicator & Card Counter */}
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40 text-[11px] sm:text-xs font-black uppercase tracking-wider">
            Mốc: {item.stageCode || 'D1'}
          </span>
          {item.overdueDays > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/40 text-[10px] sm:text-[11px] font-bold">
              🔥 Quá hạn {item.overdueDays} ngày
            </span>
          )}
        </div>

        <div className="text-xs font-black text-slate-300">
          Thẻ <span className="text-purple-400 font-mono-code text-sm">{itemIndex + 1}</span> / {totalItems}
        </div>
      </div>

      {/* STEP 1: RECALL PROMPT (Covered word/meaning) */}
      <div className="text-center space-y-3 py-1">
        <div className="text-5xl sm:text-7xl md:text-8xl select-none animate-float-up-down drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]">
          {item.imageEmoji || item.image || item.emoji || ({
            red: '🔴', blue: '🔵', yellow: '🟡', green: '🟢', orange: '🟠', purple: '🟣', pink: '🌸', black: '🖤', white: '⚪', brown: '🟤'
          })[(item.word || '').toLowerCase()] || '📖'}
        </div>

        {!revealed ? (
          <div className="space-y-3">
            <div className="p-3 sm:p-4 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-medium">
              💡 Gợi ý chủ đề: <strong className="text-yellow-300 font-bold">{item.vietnamesePhonetic || 'Đọc & Đoán Từ Vựng'}</strong>
            </div>

            <button
              onClick={() => {
                setRevealed(true);
                setStep(2);
              }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 text-white font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2 mx-auto"
            >
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300 animate-spin" />
              <span>Con Nhớ Rồi! Lật Xem Đáp Án</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2.5 animate-fadeIn">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-200">
              {item.word}
            </h2>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-mono-code font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-xl border border-cyan-400/40">
                {item.ipa}
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-pink-300">
                ({item.meaning})
              </span>
            </div>
          </div>
        )}
      </div>

      {/* REVEALED CONTENT: STEPS 2, 3, 4, 5 */}
      {revealed && (
        <div className="space-y-6 border-t border-purple-500/30 pt-4 animate-fadeIn">
          
          {/* Audio Controls (Listen Normal & 0.7x Slow) */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => playAudio(false)}
              className="px-4 py-2.5 rounded-2xl bg-purple-900/80 border border-purple-400/50 text-purple-200 font-bold text-xs hover:bg-purple-800 transition flex items-center gap-2 shadow"
            >
              <Volume2 className={`h-4 w-4 text-purple-300 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              <span>Nghe Chuẩn (1.0x)</span>
            </button>

            <button
              onClick={() => playAudio(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-700 transition flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4 text-amber-400" />
              <span>Nghe Chậm (0.65x)</span>
            </button>
          </div>

          {/* Step 3: Speech Pronunciation Evaluation */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-3 text-center">
            <div className="flex items-center justify-between text-xs font-black text-purple-300">
              <span>🎙️ Luyện Phát Âm Ngữ Âm IPA chuẩn</span>
              {isSimulatedVoice && (
                <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Demo Mic Browser
                </span>
              )}
            </div>

            <button
              onClick={startVoiceRecording}
              disabled={isRecording}
              className={`w-full py-3 rounded-2xl font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:scale-102 shadow-lg'
              }`}
            >
              <Mic className={`h-4 w-4 ${isRecording ? 'animate-bounce' : ''}`} />
              <span>{isRecording ? 'Đang Lắng Nghe Bé Đọc...' : 'Bấm Mic Để Đọc Từ Này'}</span>
            </button>

            {voiceResult && (
              <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-400/40 text-xs space-y-1 animate-fadeIn">
                <div className="flex items-center justify-between font-extrabold text-white">
                  <span>Điểm phát âm: <strong className="text-yellow-300 font-mono-code">{voiceResult.score}%</strong></span>
                  <span className="text-emerald-400 font-bold">{voiceResult.feedback}</span>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Example Sentence */}
          {item.exampleSentence && (
            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-xs space-y-1">
              <span className="text-[10px] font-black text-purple-300 uppercase tracking-wider block">
                💬 Câu Ví Dụ Mẫu:
              </span>
              <p className="text-slate-200 font-medium italic leading-relaxed">
                "{item.exampleSentence}"
              </p>
            </div>
          )}

          {/* STEP 5: SELF-RATING BUTTONS (AGAIN, HARD, GOOD, EASY) */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-black text-slate-300 block text-center uppercase tracking-wider">
              ⭐ Tự Đánh Giá Mức Độ Nhớ Từ Vựng Này:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleRatingSubmit('AGAIN')}
                className="p-3 rounded-2xl bg-rose-950/80 border-2 border-rose-500/60 hover:bg-rose-900 text-rose-200 text-xs font-black transition flex flex-col items-center gap-1 shadow-md cursor-pointer hover:scale-105"
              >
                <span className="text-2xl">😵</span>
                <span>Quên Rồi</span>
                <span className="text-[9px] text-rose-400 font-normal">Ôn lại ngay</span>
              </button>

              <button
                onClick={() => handleRatingSubmit('HARD')}
                className="p-3 rounded-2xl bg-amber-950/80 border-2 border-amber-500/60 hover:bg-amber-900 text-amber-200 text-xs font-black transition flex flex-col items-center gap-1 shadow-md cursor-pointer hover:scale-105"
              >
                <span className="text-2xl">😅</span>
                <span>Hơi Khó</span>
                <span className="text-[9px] text-amber-400 font-normal">Giữ mốc</span>
              </button>

              <button
                onClick={() => handleRatingSubmit('GOOD')}
                className="p-3 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500/60 hover:bg-emerald-900 text-emerald-200 text-xs font-black transition flex flex-col items-center gap-1 shadow-md cursor-pointer hover:scale-105"
              >
                <span className="text-2xl">😊</span>
                <span>Nhớ Rồi</span>
                <span className="text-[9px] text-emerald-400 font-normal">+1 Mốc SRS</span>
              </button>

              <button
                onClick={() => handleRatingSubmit('EASY')}
                className="p-3 rounded-2xl bg-cyan-950/80 border-2 border-cyan-500/60 hover:bg-cyan-900 text-cyan-200 text-xs font-black transition flex flex-col items-center gap-1 shadow-md cursor-pointer hover:scale-105"
              >
                <span className="text-2xl">🤩</span>
                <span>Rất Dễ</span>
                <span className="text-[9px] text-cyan-400 font-normal">Bonus +⭐</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
