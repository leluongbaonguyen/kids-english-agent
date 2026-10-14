import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Volume2,
  X,
  Sparkles,
  Sliders,
  Check,
  Radio,
  RotateCcw,
  Zap,
  BookmarkCheck,
  Globe,
  UserCheck,
  Play
} from 'lucide-react';
import {
  getVoiceSettings,
  saveVoiceSettings,
  speakWord,
  stopSpeaking,
  getSpeakingState,
  SPEED_PRESETS,
  ACCENT_PROFILES,
  VOICE_PERSONAS,
  SAMPLE_TEST_WORDS
} from '../services/nativeSpeechEngine.js';

export function NativeVoiceStudioModal({ isOpen, onClose, addToast }) {
  const [settings, setSettings] = useState(getVoiceSettings);
  const [testInput, setTestInput] = useState('butterfly');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingWord, setSpeakingWord] = useState(null);

  // Load current settings when modal opens & lock body scroll
  useEffect(() => {
    if (isOpen) {
      setSettings(getVoiceSettings());
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Subscribe to speaking state
  useEffect(() => {
    const handleStateChange = (e) => {
      if (e.detail) {
        setIsSpeaking(e.detail.isSpeaking);
        setSpeakingWord(e.detail.word);
      }
    };
    window.addEventListener('kids-speaking-state-changed', handleStateChange);
    return () => {
      window.removeEventListener('kids-speaking-state-changed', handleStateChange);
    };
  }, []);

  if (!isOpen) return null;

  // Handle immediate update & preview
  const updateSetting = (key, val) => {
    const next = { ...settings, [key]: val };
    setSettings(next);
    saveVoiceSettings(next);
  };

  const handleTestVoice = (wordToSpeak = testInput) => {
    const target = wordToSpeak || testInput || 'butterfly';
    speakWord(target, {
      ...settings,
      onStart: () => {
        setIsSpeaking(true);
        setSpeakingWord(target);
      },
      onEnd: () => {
        setIsSpeaking(false);
        setSpeakingWord(null);
      }
    });
  };

  const handleSaveAndApply = () => {
    saveVoiceSettings(settings);
    if (addToast) {
      addToast(
        `🎉 Đã lưu & áp dụng Giọng Chuẩn ${ACCENT_PROFILES[settings.accent]?.name} (${settings.rate}x) cho toàn bộ hệ thống!`,
        'success'
      );
    }
    onClose();
  };

  const handleResetDefaults = () => {
    const def = {
      accent: 'US',
      gender: 'female',
      rate: 0.9,
      pitch: 1.0,
      volume: 1.0,
      mode: 'hybrid',
      repeatCount: 1,
      repeatDelayMs: 600,
      autoPlayOnCardFlip: true
    };
    setSettings(def);
    saveVoiceSettings(def);
    if (addToast) {
      addToast('🔄 Đã khôi phục cài đặt giọng đọc gốc chuẩn Cambridge 0.9x!', 'info');
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-2 xs:p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none overflow-y-auto"
      style={{ margin: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] sm:max-h-[85vh] my-auto flex flex-col rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-400/50 shadow-[0_0_60px_rgba(99,102,241,0.45)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ================= MODAL HEADER ================= */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-white/10 bg-slate-900/95 shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 text-white shadow-lg border border-white/20">
              <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white font-heading tracking-tight">
                  Studio Giọng Đọc & Tốc Độ Siêu Chi Tiết
                </h2>
                <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[9px] font-black uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Chuẩn 100%
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-indigo-200/80 font-medium">
                Phát âm chuẩn Cambridge & Oxford • Điều chỉnh tốc độ bóc tách âm cho bé
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            title="Đóng cửa sổ"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ================= MODAL SCROLLABLE BODY ================= */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6 text-slate-200 custom-scrollbar overscroll-contain">

          {/* 1. TỐC ĐỘ ĐỌC SIÊU CHI TIẾT (5 PRESETS + FINE TUNER SLIDER) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-pink-400" />
                1. Tốc Độ Đọc Siêu Chi Tiết:
                <span className="text-pink-300 font-mono-code font-extrabold text-sm sm:text-base ml-1">
                  {settings.rate.toFixed(2)}x
                </span>
              </label>
              <span className="text-[10px] text-slate-400 font-medium">
                {settings.rate <= 0.6
                  ? '🐢 Bóc tách từng âm'
                  : settings.rate <= 0.85
                  ? '🦥 Chậm rãi cho bé'
                  : settings.rate <= 1.05
                  ? '🚶 Chuẩn tự nhiên'
                  : '🚀 Thần tốc'}
              </span>
            </div>

            {/* 5 Quick Speed Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
              {SPEED_PRESETS.map((p) => {
                const isSelected = Math.abs(settings.rate - p.value) < 0.04;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => {
                      updateSetting('rate', p.value);
                      handleTestVoice();
                    }}
                    className={`p-2 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-pink-500/25 to-purple-600/30 border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.35)] scale-102'
                        : 'bg-slate-900/80 hover:bg-slate-800/80 border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl">{p.icon}</span>
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-pink-400 stroke-[3]" />
                      )}
                    </div>
                    <div className="mt-1">
                      <div className="text-[11px] sm:text-xs font-black text-white font-mono-code">
                        {p.label}
                      </div>
                      <div className="text-[9px] text-slate-400 leading-tight mt-0.5 truncate">
                        {p.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fine Tuning Smooth Slider (0.4x -> 1.5x) */}
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 font-mono-code shrink-0">0.4x</span>
              <input
                type="range"
                min="0.4"
                max="1.5"
                step="0.05"
                value={settings.rate}
                onChange={(e) => updateSetting('rate', parseFloat(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <span className="text-xs font-bold text-slate-400 font-mono-code shrink-0">1.5x</span>
              <span className="px-2 py-0.5 rounded-lg bg-pink-500/20 text-pink-300 font-mono-code text-xs font-black border border-pink-500/30 shrink-0">
                {settings.rate.toFixed(2)}x
              </span>
            </div>
          </div>

          {/* 2. CHỌN CHẤT GIỌNG CHUẨN BẢN NGỮ (US / UK / AU) */}
          <div className="space-y-2.5">
            <label className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-cyan-400" />
              2. Chất Giọng Chuẩn Bản Ngữ 100%:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.values(ACCENT_PROFILES).map((acc) => {
                const isSelected = settings.accent === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      updateSetting('accent', acc.id);
                      handleTestVoice();
                    }}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-950/80 via-slate-900 to-indigo-950 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.35)] scale-102'
                        : 'bg-slate-900/70 hover:bg-slate-850 border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{acc.flag}</span>
                      {isSelected ? (
                        <span className="px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 text-[9px] font-black uppercase">
                          Đang chọn
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500">○</span>
                      )}
                    </div>
                    <div className="mt-1.5">
                      <div className="text-xs sm:text-sm font-extrabold text-white">
                        {acc.name}
                      </div>
                      <div className="text-[9.5px] text-slate-400 mt-0.5 leading-snug">
                        {acc.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. CHỌN NHÂN VẬT ĐỌC (CÔ GIÁO / THẦY GIÁO / BẠN NHỎ) */}
          <div className="space-y-2.5">
            <label className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-amber-400" />
              3. Nhân Vật Giọng Đọc Thân Thiện Cho Bé:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.values(VOICE_PERSONAS).map((vp) => {
                const isSelected = settings.gender === vp.id;
                return (
                  <button
                    key={vp.id}
                    type="button"
                    onClick={() => {
                      updateSetting('gender', vp.id);
                      handleTestVoice();
                    }}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-950/80 via-slate-900 to-indigo-950 border-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.35)] scale-102'
                        : 'bg-slate-900/70 hover:bg-slate-850 border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{vp.icon}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-amber-400 stroke-[3]" />
                      )}
                    </div>
                    <div className="mt-1.5">
                      <div className="text-xs sm:text-sm font-extrabold text-white">
                        {vp.title}
                      </div>
                      <div className="text-[9.5px] text-slate-400 mt-0.5 leading-snug">
                        {vp.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. CHẾ ĐỘ NGUỒN ÂM THANH & LẶP LẠI (DUAL ENGINE & SHADOWING) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Engine Mode */}
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <div className="text-[11px] font-black text-indigo-300 uppercase tracking-wide flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-indigo-400" />
                Cơ Chế Phát Âm Chuẩn:
              </div>
              <div className="space-y-1.5">
                <label
                  onClick={() => updateSetting('mode', 'hybrid')}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition ${
                    settings.mode === 'hybrid'
                      ? 'bg-indigo-600/30 border-indigo-400 text-white font-bold'
                      : 'bg-slate-800/40 border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-base">🌟</span>
                  <div className="min-w-0">
                    <div>Thu Âm Phòng Thu Thực Tế (Khuyên Dùng)</div>
                    <div className="text-[9px] text-slate-400">100% Studio Cambridge + AI dự phòng</div>
                  </div>
                </label>

                <label
                  onClick={() => updateSetting('mode', 'tts')}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition ${
                    settings.mode === 'tts'
                      ? 'bg-indigo-600/30 border-indigo-400 text-white font-bold'
                      : 'bg-slate-800/40 border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-base">🤖</span>
                  <div className="min-w-0">
                    <div>AI Natural Speech (Web Speech API)</div>
                    <div className="text-[9px] text-slate-400">Giọng đọc tổng hợp trực tiếp trên máy</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Repeat / Shadowing Count */}
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <div className="text-[11px] font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
                Số Lần Phát Âm (Luyện Shadowing):
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => updateSetting('repeatCount', num)}
                    className={`py-2 px-1 rounded-xl border text-center transition ${
                      settings.repeatCount === num
                        ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-extrabold shadow-sm'
                        : 'bg-slate-800/50 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-sm font-black font-mono-code">{num} Lần</div>
                    <div className="text-[8.5px] text-slate-400">
                      {num === 1 ? 'Đơn lẻ' : num === 2 ? 'Lặp lại' : 'Shadowing'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5. KHU VỰC THỬ GIỌNG TỨC THÌ (INTERACTIVE TESTER) */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 border border-indigo-500/40 shadow-inner space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                Thử Giọng Đọc Ngay Tại Đây:
              </span>
              {isSpeaking && (
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-black animate-pulse border border-pink-500/30">
                  <Volume2 className="h-3 w-3 animate-bounce" /> Đang phát âm...
                </span>
              )}
            </div>

            {/* Quick Test Word Pills */}
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_TEST_WORDS.map((w) => (
                <button
                  key={w.word}
                  type="button"
                  onClick={() => {
                    setTestInput(w.word);
                    handleTestVoice(w.word);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition flex items-center gap-1 ${
                    testInput === w.word
                      ? 'bg-pink-600 border-white text-white shadow-md'
                      : 'bg-slate-800/80 hover:bg-slate-700 border-white/10 text-slate-200'
                  }`}
                >
                  <span>{w.emoji}</span>
                  <span className="capitalize">{w.word}</span>
                </button>
              ))}
            </div>

            {/* Input & Big Play Button */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Nhập từ hoặc câu tiếng Anh cần nghe..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm font-medium focus:outline-none focus:border-pink-400"
              />
              <button
                type="button"
                onClick={() => handleTestVoice()}
                className={`px-4 py-2 rounded-xl font-black text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95 shrink-0 ${
                  isSpeaking
                    ? 'bg-pink-600 text-white animate-pulse'
                    : 'bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white'
                }`}
              >
                <Play className="h-4 w-4 fill-current" />
                <span>{isSpeaking ? 'Đang Đọc...' : 'Nghe Thử'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* ================= MODAL FOOTER ================= */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-t border-white/10 bg-slate-900/95 shrink-0 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-1.5"
            title="Khôi phục mặc định"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Mặc Định (0.9x US)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSaveAndApply}
              className="px-4 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] transition flex items-center gap-1.5 active:scale-95"
            >
              <BookmarkCheck className="h-4 w-4" />
              <span>Lưu & Áp Dụng Toàn Hệ Thống</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}

export default NativeVoiceStudioModal;
