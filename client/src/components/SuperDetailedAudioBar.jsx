import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Volume2, VolumeX, Sparkles, RotateCcw, Settings2, Sliders,
  Check, Play, Pause, Zap, Compass, Info
} from 'lucide-react';
import {
  speakWord,
  stopSpeaking,
  getVoiceSettings,
  saveVoiceSettings,
  subscribeVoiceSettings,
  getSpeakingState,
  ACCENT_PROFILES,
  SPEED_PRESETS
} from '../services/nativeSpeechEngine.js';

/**
 * Helper: Smart Syllable Splitting for English words
 * Uses word structure, IPA dots, or vowel-cluster heuristic
 */
export function extractSyllables(word, ipa) {
  if (!word || typeof word !== 'string') return [];
  const clean = word.trim();

  // If IPA contains syllables separated by dots (e.g. /ˈbʌt.ə.flaɪ/ -> 3 syllables)
  let ipaChunks = [];
  if (ipa && typeof ipa === 'string') {
    const rawIpa = ipa.replace(/[/ˈˌ]/g, '').trim();
    if (rawIpa.includes('.')) {
      ipaChunks = rawIpa.split('.');
    }
  }

  // If compound word with space or hyphen
  if (clean.includes(' ')) {
    return clean.split(/\s+/).map((chunk, idx) => ({
      text: chunk,
      ipaChunk: ipaChunks[idx] || null
    }));
  }
  if (clean.includes('-')) {
    return clean.split('-').map((chunk, idx) => ({
      text: chunk,
      ipaChunk: ipaChunks[idx] || null
    }));
  }

  // English heuristic syllable pattern
  const lower = clean.toLowerCase();
  const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
  const matches = lower.match(syllableRegex);

  if (matches && matches.length > 1) {
    return matches.map((chunk, idx) => ({
      text: chunk,
      ipaChunk: ipaChunks[idx] || null
    }));
  }

  // Fallback for single or short syllable
  return [{ text: clean, ipaChunk: ipaChunks[0] || (ipa ? ipa.replace(/[/ˈˌ]/g, '') : null) }];
}

/**
 * SUPER DETAILED AUDIO PRONUNCIATION BAR (Thanh Phát Âm Bản Ngữ Siêu Chi Tiết)
 * @param {string} word - The vocabulary word to pronounce
 * @param {string} ipa - International Phonetic Alphabet string
 * @param {string} vietnamesePhonetic - Vietnamese phonetic pronunciation guide
 * @param {boolean} showSyllables - Whether to show clickable phonics syllables
 * @param {boolean} showStudioDrawer - Whether to show quick speed/accent switcher
 * @param {boolean} compact - Compact layout for tight cards or list rows
 * @param {function} onOpenStudio - Callback to open full NativeVoiceStudioModal
 * @param {string} className - Optional wrapper styling
 */
export default function SuperDetailedAudioBar({
  word,
  ipa = '',
  vietnamesePhonetic = '',
  showSyllables = true,
  showStudioDrawer = true,
  compact = false,
  onOpenStudio = null,
  className = ''
}) {
  const [settings, setSettings] = useState(() => getVoiceSettings());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeMode, setActiveMode] = useState(null); // 'normal' | 'slow' | 'syllable' | null
  const [activeSyllable, setActiveSyllable] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sync settings when modified anywhere across the app
  useEffect(() => {
    const unsub = subscribeVoiceSettings((newSettings) => {
      setSettings(newSettings);
    });

    const handleSpeakingState = (e) => {
      const state = e.detail || getSpeakingState();
      if (state.isSpeaking && state.word && word && state.word.toLowerCase() === word.toLowerCase()) {
        setIsSpeaking(true);
      } else if (!state.isSpeaking) {
        setIsSpeaking(false);
        setActiveMode(null);
        setActiveSyllable(null);
      }
    };

    window.addEventListener('kids-speaking-state-changed', handleSpeakingState);
    return () => {
      unsub();
      window.removeEventListener('kids-speaking-state-changed', handleSpeakingState);
    };
  }, [word]);

  // Current Accent Profile
  const currentAccent = ACCENT_PROFILES[settings.accent] || ACCENT_PROFILES.US;

  // Syllables list
  const syllables = useMemo(() => {
    return extractSyllables(word, ipa);
  }, [word, ipa]);

  // Handler: Play Standard Native Pronunciation (Phát Âm Chuẩn 1.0x)
  const handlePlayNormal = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!word) return;

    if (isSpeaking && activeMode === 'normal') {
      stopSpeaking();
      setIsSpeaking(false);
      setActiveMode(null);
      return;
    }

    setActiveMode('normal');
    setIsSpeaking(true);

    speakWord(word, {
      rate: settings.rate || 1.0,
      slow: false,
      accent: settings.accent || 'US',
      onStart: () => {
        setIsSpeaking(true);
        setActiveMode('normal');
      },
      onEnd: () => {
        setIsSpeaking(false);
        setActiveMode(null);
      }
    });
  }, [word, isSpeaking, activeMode, settings]);

  // Handler: Play Slow Phonics Pronunciation (Nghe Chậm 0.75x)
  const handlePlaySlow = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!word) return;

    if (isSpeaking && activeMode === 'slow') {
      stopSpeaking();
      setIsSpeaking(false);
      setActiveMode(null);
      return;
    }

    setActiveMode('slow');
    setIsSpeaking(true);

    speakWord(word, {
      rate: 0.75,
      slow: true,
      accent: settings.accent || 'US',
      onStart: () => {
        setIsSpeaking(true);
        setActiveMode('slow');
      },
      onEnd: () => {
        setIsSpeaking(false);
        setActiveMode(null);
      }
    });
  }, [word, isSpeaking, activeMode, settings]);

  // Handler: Play Specific Syllable
  const handlePlaySyllable = useCallback((syllableText, index, e) => {
    if (e) e.stopPropagation();
    if (!syllableText) return;

    setActiveSyllable(index);
    setActiveMode('syllable');
    setIsSpeaking(true);

    speakWord(syllableText, {
      rate: 0.65,
      slow: true,
      accent: settings.accent || 'US',
      onStart: () => {
        setIsSpeaking(true);
        setActiveMode('syllable');
        setActiveSyllable(index);
      },
      onEnd: () => {
        setIsSpeaking(false);
        setActiveMode(null);
        setActiveSyllable(null);
      }
    });
  }, [settings]);

  // Handler: Change Accent
  const handleAccentChange = (accentKey) => {
    saveVoiceSettings({ accent: accentKey });
  };

  // Handler: Change Rate
  const handleRateChange = (newRate) => {
    saveVoiceSettings({ rate: newRate });
  };

  // Handler: Change Repeat Count
  const handleRepeatChange = (count) => {
    saveVoiceSettings({ repeatCount: count });
  };

  return (
    <div className={`w-full max-w-2xl mx-auto space-y-2.5 ${className}`}>
      {/* 1. HERO DUAL AUDIO BUTTONS (EXACT VISUAL ENHANCEMENT OF USER SCREENSHOT) */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
        {/* BUTTON 1: PHÁT ÂM CHUẨN (1.0x / NATIVE VOICE) */}
        <button
          type="button"
          onClick={handlePlayNormal}
          className={`group relative flex-1 max-w-[240px] flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-full text-white font-black text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer select-none overflow-hidden border ${
            isSpeaking && activeMode === 'normal'
              ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 border-cyan-300 glow-neon-cyan-active scale-[1.02]'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 border-t-white/30 border-blue-400/40 shadow-[0_6px_22px_rgba(37,99,235,0.45)] hover:shadow-[0_8px_28px_rgba(6,182,212,0.65)] hover:scale-[1.03] active:scale-[0.97]'
          }`}
          title="Bấm để nghe phát âm chuẩn Cambridge & Oxford của người bản xứ (1.0x)"
        >
          {/* Subtle Glass Shimmer Sweep */}
          <div className="shimmer-sweep" />

          {/* Left Icon: Speaker or Equalizer */}
          <div className="relative shrink-0 flex items-center justify-center">
            {isSpeaking && activeMode === 'normal' ? (
              <div className="flex items-end gap-0.5 h-4 w-4">
                <span className="w-1 bg-cyan-200 rounded-full animate-soundwave-1" />
                <span className="w-1 bg-white rounded-full animate-soundwave-2" />
                <span className="w-1 bg-cyan-300 rounded-full animate-soundwave-3" />
                <span className="w-1 bg-white rounded-full animate-soundwave-4" />
              </div>
            ) : (
              <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-200 group-hover:scale-110 transition-transform" />
            )}
          </div>

          {/* Button Text & Dynamic Speed */}
          <div className="flex items-center gap-1.5 truncate">
            <span className="drop-shadow-sm font-heading font-black">
              Phát Âm Chuẩn
            </span>
            <span className="text-[11px] sm:text-xs opacity-90 font-mono-code font-bold bg-white/20 px-1.5 py-0.5 rounded-full border border-white/20">
              {settings.rate ? `${settings.rate}x` : '1.0x'}
            </span>
          </div>

          {/* Small Accent Tag */}
          <span className="text-[11px] shrink-0" title={`Chất giọng: ${currentAccent.name}`}>
            {currentAccent.flag}
          </span>
        </button>

        {/* BUTTON 2: NGHE CHẬM (0.75x / SLOW PHONICS MODE) */}
        <button
          type="button"
          onClick={handlePlaySlow}
          className={`group relative flex-1 max-w-[240px] flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-full text-white font-black text-xs sm:text-sm tracking-wide transition-all duration-300 cursor-pointer select-none overflow-hidden border ${
            isSpeaking && activeMode === 'slow'
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 border-amber-300 glow-neon-amber-active scale-[1.02]'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 border-t-white/30 border-amber-400/40 shadow-[0_6px_22px_rgba(245,158,11,0.45)] hover:shadow-[0_8px_28px_rgba(245,158,11,0.65)] hover:scale-[1.03] active:scale-[0.97]'
          }`}
          title="Bấm để nghe phát âm siêu chậm rãi 0.75x bóc tách âm tiết cho bé dễ bắt chước"
        >
          {/* Subtle Glass Shimmer Sweep */}
          <div className="shimmer-sweep" />

          {/* Left Icon: Cute Animated Turtle */}
          <div className="relative shrink-0 flex items-center justify-center">
            {isSpeaking && activeMode === 'slow' ? (
              <div className="flex items-end gap-0.5 h-4 w-4">
                <span className="w-1 bg-amber-200 rounded-full animate-soundwave-1" />
                <span className="w-1 bg-yellow-100 rounded-full animate-soundwave-3" />
                <span className="w-1 bg-amber-300 rounded-full animate-soundwave-2" />
                <span className="w-1 bg-yellow-200 rounded-full animate-soundwave-5" />
              </div>
            ) : (
              <span className="text-base sm:text-lg animate-turtle-bob select-none">
                🐢
              </span>
            )}
          </div>

          {/* Button Text & Dynamic Speed */}
          <div className="flex items-center gap-1.5 truncate">
            <span className="drop-shadow-sm font-heading font-black">
              Nghe Chậm
            </span>
            <span className="text-[11px] sm:text-xs opacity-90 font-mono-code font-bold bg-white/20 px-1.5 py-0.5 rounded-full border border-white/20">
              0.75x
            </span>
          </div>

          {/* Phonics Tag */}
          <span className="hidden sm:inline-block text-[10px] font-bold bg-amber-950/50 text-amber-200 px-1.5 py-0.5 rounded-md border border-amber-300/30">
            Phonics
          </span>
        </button>

        {/* Quick Studio Drawer Toggle */}
        {showStudioDrawer && (
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={`shrink-0 p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer shadow-md ${
              drawerOpen
                ? 'bg-purple-600 text-white border-purple-400 rotate-90 scale-105'
                : 'bg-slate-900/80 hover:bg-slate-800 text-purple-300 hover:text-purple-200 border-purple-500/30 hover:border-purple-400'
            }`}
            title="Mở bảng tùy chỉnh tốc độ, giọng đọc bản ngữ & bóc tách âm tiết chi tiết"
          >
            <Settings2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 2. REAL-TIME PLAYING STATUS PILL (ACTIVE WHEN SPEAKING) */}
      {isSpeaking && (
        <div className="flex items-center justify-between px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-xs shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="font-bold text-cyan-200 text-[11px] sm:text-xs">
              {activeMode === 'slow'
                ? `🐢 Đang bóc tách âm siêu chậm 0.75x cho bé: "${word}"`
                : activeMode === 'syllable'
                ? `✨ Đang phát âm tiết chi tiết: "${syllables[activeSyllable]?.text || word}"`
                : `🔊 Đang phát âm chuẩn bản ngữ ${currentAccent.name} (${settings.rate || 1.0}x): "${word}"`}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              stopSpeaking();
              setIsSpeaking(false);
              setActiveMode(null);
              setActiveSyllable(null);
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-[10px] font-black transition cursor-pointer"
            title="Dừng phát âm ngay"
          >
            <VolumeX className="h-3 w-3" />
            <span>Dừng</span>
          </button>
        </div>
      )}

      {/* 3. INTERACTIVE SYLLABLE BREAKDOWN (BÓC TÁCH TỪNG ÂM TIẾT TRỰC QUAN) */}
      {showSyllables && syllables.length > 0 && !compact && (
        <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800/80 shadow-md space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-bold flex items-center gap-1 text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Bóc Tách Từng Âm Tiết Phonics Cho Bé (Bấm vào từng âm để nghe):</span>
            </span>
            {vietnamesePhonetic && (
              <span className="text-[10px] text-pink-300 bg-pink-950/60 px-2 py-0.5 rounded-full border border-pink-500/30">
                Đọc: {vietnamesePhonetic}
              </span>
            )}
          </div>

          {/* Syllable Clickable Pills */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-0.5">
            {syllables.map((syl, sIdx) => {
              const isSylActive = activeSyllable === sIdx && isSpeaking;
              return (
                <button
                  key={sIdx}
                  type="button"
                  onClick={(e) => handlePlaySyllable(syl.text, sIdx, e)}
                  className={`group relative flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-black transition-all cursor-pointer shadow-sm ${
                    isSylActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-300 text-white scale-110 shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                      : 'bg-slate-950/70 hover:bg-slate-800/90 border-slate-700/80 hover:border-cyan-400 text-cyan-200 hover:text-white'
                  }`}
                  title={`Bấm để nghe riêng âm tiết "${syl.text}" (${syl.ipaChunk || ''})`}
                >
                  <span className="font-heading">{syl.text}</span>
                  {syl.ipaChunk && (
                    <span className="text-[10px] opacity-75 font-mono-code font-normal">
                      /{syl.ipaChunk}/
                    </span>
                  )}
                  {isSylActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  ) : (
                    <Volume2 className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 text-cyan-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. EXPANDABLE STUDIO CONSOLE DRAWER (BẢNG ĐIỀU KHIỂN SIÊU CHI TIẾT) */}
      {showStudioDrawer && drawerOpen && (
        <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/95 border border-purple-500/40 shadow-2xl space-y-3 animate-fadeIn text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5 font-black text-purple-300">
              <Sliders className="h-4 w-4 text-purple-400" />
              <span>Phòng Thu Âm Bản Ngữ Cambridge & Oxford Siêu Chi Tiết</span>
            </div>
            {onOpenStudio && (
              <button
                type="button"
                onClick={onOpenStudio}
                className="text-[10px] text-cyan-300 hover:text-cyan-200 underline font-bold"
              >
                Cài đặt nâng cao →
              </button>
            )}
          </div>

          {/* Row A: Accent Selection */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-300">
              1. Giọng Đọc Chuẩn Quốc Tế:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {Object.values(ACCENT_PROFILES).map((acc) => {
                const isSelected = (settings.accent || 'US') === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleAccentChange(acc.id)}
                    className={`p-2 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-0.5 ${
                      isSelected
                        ? 'bg-purple-900/60 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-base">{acc.flag}</span>
                    <span className="font-bold text-[11px] truncate w-full">{acc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row B: Granular Speed Presets */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-300">
              2. Tùy Chọn Tốc Độ Đọc Chuẩn:
            </span>
            <div className="grid grid-cols-5 gap-1">
              {SPEED_PRESETS.map((sp) => {
                const isSelected = (settings.rate || 1.0) === sp.value;
                return (
                  <button
                    key={sp.value}
                    type="button"
                    onClick={() => handleRateChange(sp.value)}
                    className={`p-1.5 rounded-xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-900/70 border-cyan-400 text-white font-black shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200 font-medium'
                    }`}
                  >
                    <div className="text-xs">{sp.icon}</div>
                    <div className="text-[10px] font-mono-code font-bold">{sp.value}x</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row C: Repeat Loop Count */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-300">
            <span className="font-bold">3. Lặp Lại Khi Bấm:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((num) => {
                const isSelected = (settings.repeatCount || 1) === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleRepeatChange(num)}
                    className={`px-2.5 py-1 rounded-lg border font-bold text-[10px] transition cursor-pointer ${
                      isSelected
                        ? 'bg-pink-600 border-pink-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {num} Lần
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
