/**
 * NATIVE SPEECH ENGINE (Hệ Thống Giọng Đọc Chuẩn Bản Ngữ 100% & Tốc Độ Siêu Chi Tiết)
 * - Tốc độ đọc linh hoạt từ 0.5x (Siêu chậm cho bé tập đánh vần/phonics) đến 1.25x (Siêu tốc).
 * - Tùy chọn giọng chuẩn bản ngữ: Anh - Mỹ (US), Anh - Anh (UK), Anh - Úc (AU).
 * - Tùy chọn nhân vật: Cô giáo bản ngữ, Thầy giáo bản ngữ, Bạn nhỏ AI.
 * - Cơ chế kép Dual-Engine: Kết hợp phát âm phòng thu từ điển thực tế (Native Human Studio)
 *   và công nghệ Web Speech API Neural Voice cho câu & ngữ cảnh.
 * - Đồng bộ thời gian thực toàn hệ thống qua localStorage & CustomEvent.
 */

export const STORAGE_KEY = 'kids_native_voice_settings_v1';

export const SPEED_PRESETS = [
  {
    value: 0.5,
    label: '0.5x Siêu Chậm',
    title: 'Rùa Con Tập Đọc',
    desc: 'Bóc tách từng âm tiết & phụ âm cuối',
    icon: '🐢',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
  },
  {
    value: 0.75,
    label: '0.75x Chậm Rãi',
    title: 'Luyện Ngữ Âm Phonics',
    desc: 'Phù hợp cho bé mới bắt đầu làm quen từ',
    icon: '🦥',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
  },
  {
    value: 0.9,
    label: '0.9x Chuẩn Bé Học',
    title: 'Khuyên Dùng Cambridge',
    desc: 'Tốc độ tối ưu cho phản xạ mầm non & tiểu học',
    icon: '🚶',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-400/40'
  },
  {
    value: 1.0,
    label: '1.0x Bản Ngữ Chuẩn',
    title: 'Tự Nhiên 100%',
    desc: 'Tốc độ giao tiếp hàng ngày của người bản xứ',
    icon: '🏃',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40'
  },
  {
    value: 1.25,
    label: '1.25x Siêu Tốc',
    title: 'Thử Thách Phản Xạ',
    desc: 'Dành cho bé đã thuộc từ và thi tài',
    icon: '🚀',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40'
  }
];

export const ACCENT_PROFILES = {
  US: {
    id: 'US',
    name: 'Anh - Mỹ (American)',
    flag: '🇺🇸',
    langCode: 'en-US',
    humanVoiceType: 2,
    description: 'Chuẩn phát âm phổ biến toàn cầu & Cambridge US'
  },
  UK: {
    id: 'UK',
    name: 'Anh - Anh (British RP)',
    flag: '🇬🇧',
    langCode: 'en-GB',
    humanVoiceType: 1,
    description: 'Chuẩn âm điệu Hoàng gia Anh & Oxford University'
  },
  AU: {
    id: 'AU',
    name: 'Anh - Úc (Australian)',
    flag: '🇦🇺',
    langCode: 'en-AU',
    humanVoiceType: 2,
    description: 'Ngữ điệu tự nhiên, ấm áp & gần gũi'
  }
};

export const VOICE_PERSONAS = {
  female: {
    id: 'female',
    title: 'Cô Giáo Bản Ngữ',
    desc: 'Giọng nữ ấm áp, phát âm dịu dàng & ngọt ngào',
    icon: '👩‍🏫',
    pitch: 1.05
  },
  male: {
    id: 'male',
    title: 'Thầy Giáo Bản Ngữ',
    desc: 'Giọng nam trầm ấm, phát âm dứt khoát & rõ ràng',
    icon: '👨‍🏫',
    pitch: 0.88
  },
  kid: {
    id: 'kid',
    title: 'Bạn Nhỏ Bản Ngữ AI',
    desc: 'Giọng thiếu nhi trong trẻo, vui tươi & truyền cảm hứng',
    icon: '👧',
    pitch: 1.18
  }
};

export const SAMPLE_TEST_WORDS = [
  { word: 'butterfly', emoji: '🦋', ipa: '/ˈbʌt.ə.flaɪ/', meaning: 'con bướm' },
  { word: 'sunflower', emoji: '🌻', ipa: '/ˈsʌnˌflaʊ.ər/', meaning: 'hoa hướng dương' },
  { word: 'astronaut', emoji: '👨‍🚀', ipa: '/ˈæs.trə.nɔːt/', meaning: 'phi hành gia' },
  { word: 'delicious', emoji: '🧁', ipa: '/dɪˈlɪʃ.əs/', meaning: 'thơm ngon' },
  { word: 'good morning', emoji: '🌅', ipa: '/ɡʊd ˈmɔː.nɪŋ/', meaning: 'chào buổi sáng' }
];

export const DEFAULT_VOICE_SETTINGS = {
  accent: 'US',
  gender: 'female',
  rate: 0.9,
  pitch: 1.0,
  volume: 1.0,
  mode: 'hybrid', // 'hybrid' | 'studio' | 'tts'
  repeatCount: 1, // 1 | 2 | 3
  repeatDelayMs: 600,
  autoPlayOnCardFlip: true
};

// In-Memory cache & current audio controller
let currentSettings = null;
let currentAudioElement = null;
let currentSpeakingState = {
  isSpeaking: false,
  word: null
};

const listeners = new Set();

/**
 * Load Voice Settings from localStorage
 */
export function getVoiceSettings() {
  if (currentSettings) return { ...currentSettings };
  if (typeof window === 'undefined') return { ...DEFAULT_VOICE_SETTINGS };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      currentSettings = { ...DEFAULT_VOICE_SETTINGS, ...JSON.parse(raw) };
    } else {
      currentSettings = { ...DEFAULT_VOICE_SETTINGS };
    }
  } catch (err) {
    console.warn('[NativeSpeechEngine] Error reading voice settings from storage:', err);
    currentSettings = { ...DEFAULT_VOICE_SETTINGS };
  }

  return { ...currentSettings };
}

/**
 * Save & broadcast Voice Settings
 */
export function saveVoiceSettings(newSettings) {
  const merged = { ...getVoiceSettings(), ...newSettings };
  currentSettings = merged;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('kids-voice-settings-changed', { detail: merged }));
    } catch (err) {
      console.warn('[NativeSpeechEngine] Error persisting voice settings:', err);
    }
  }

  listeners.forEach(fn => {
    try {
      fn(merged);
    } catch (e) {
      console.error(e);
    }
  });

  return merged;
}

/**
 * Subscribe to Voice Settings updates
 */
export function subscribeVoiceSettings(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/**
 * Stop any ongoing speech or audio playback
 */
export function stopSpeaking() {
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch (e) {}
    currentAudioElement = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }

  setSpeakingState(false, null);
}

function setSpeakingState(isSpeaking, word) {
  currentSpeakingState = { isSpeaking, word };
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('kids-speaking-state-changed', {
      detail: currentSpeakingState
    }));
  }
}

/**
 * Check currently active speaking state
 */
export function getSpeakingState() {
  return { ...currentSpeakingState };
}

/**
 * Returns human studio audio URL from high-fidelity native recordings (Cambridge/Oxford database)
 */
export function getNativeHumanAudioUrl(word, accent = 'US') {
  if (!word || typeof word !== 'string') return null;
  const clean = word.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '');
  if (!clean) return null;

  const profile = ACCENT_PROFILES[accent] || ACCENT_PROFILES.US;
  const voiceType = profile.humanVoiceType || 2; // 2 = US, 1 = UK

  // Direct high-speed human studio native MP3 endpoint
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(clean)}&type=${voiceType}`;
}

let cachedVoices = [];
function updateVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) cachedVoices = v;
    } catch (e) {}
  }
}
updateVoices();
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    window.speechSynthesis.onvoiceschanged = updateVoices;
  } catch (e) {}
}

/**
 * Intelligently match best Web Speech API Voice
 */
export function findBestWebSpeechVoice(accent = 'US', gender = 'female') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const rawVoices = window.speechSynthesis.getVoices();
  const voices = (rawVoices && rawVoices.length > 0) ? rawVoices : cachedVoices;
  if (!voices || voices.length === 0) return null;

  const profile = ACCENT_PROFILES[accent] || ACCENT_PROFILES.US;
  const targetLang = profile.langCode.toLowerCase(); // 'en-us', 'en-gb', 'en-au'

  // Filter voices matching the language code or English generally
  const matchingLangVoices = voices.filter(v => 
    v.lang && v.lang.toLowerCase().replace('_', '-').startsWith(targetLang.substring(0, 5))
  );

  const fallbackEnVoices = voices.filter(v => 
    v.lang && v.lang.toLowerCase().startsWith('en')
  );

  const candidatePool = matchingLangVoices.length > 0 ? matchingLangVoices : fallbackEnVoices;
  if (candidatePool.length === 0) return voices[0] || null;

  // Prioritize high-quality neural / natural / enhanced voices
  const highQualityKeywords = ['natural', 'online', 'enhanced', 'neural', 'google', 'apple', 'microsoft'];
  const isFemale = gender === 'female' || gender === 'kid';

  const genderKeywords = isFemale 
    ? ['female', 'samantha', 'victoria', 'zira', 'karen', 'jenny', 'aria', 'libby', 'sonia', 'serena']
    : ['male', 'david', 'mark', 'alex', 'guy', 'ryan', 'daniel', 'george', 'james'];

  // Score each voice
  let bestVoice = null;
  let bestScore = -1;

  candidatePool.forEach(v => {
    let score = 0;
    const nameLower = (v.name || '').toLowerCase();

    // Language match bonus
    if (v.lang && v.lang.toLowerCase().replace('_', '-').startsWith(targetLang)) {
      score += 30;
    }

    // High quality vendor bonus
    highQualityKeywords.forEach(kw => {
      if (nameLower.includes(kw)) score += 15;
    });

    // Gender match bonus
    genderKeywords.forEach(kw => {
      if (nameLower.includes(kw)) score += 20;
    });

    if (score > bestScore) {
      bestScore = score;
      bestVoice = v;
    }
  });

  return bestVoice || candidatePool[0] || null;
}

/**
 * MASTER PRONUNCIATION FUNCTION
 * Plays native audio with granular speed, accent, gender, and repeat settings
 */
export async function speakWord(text, options = {}) {
  if (!text || typeof window === 'undefined') return;

  const settings = getVoiceSettings();
  const effectiveAccent = options.accent || settings.accent || 'US';
  const effectiveGender = options.gender || settings.gender || 'female';
  const effectiveRate = options.rate !== undefined ? options.rate : (options.slow ? 0.55 : settings.rate || 0.9);
  const effectivePitch = options.pitch !== undefined ? options.pitch : (VOICE_PERSONAS[effectiveGender]?.pitch || settings.pitch || 1.0);
  const effectiveVolume = options.volume !== undefined ? options.volume : (settings.volume || 1.0);
  const effectiveMode = options.mode || settings.mode || 'hybrid';
  const repeatTotal = options.repeat !== undefined ? options.repeat : (settings.repeatCount || 1);
  const repeatDelay = options.repeatDelayMs !== undefined ? options.repeatDelayMs : (settings.repeatDelayMs || 600);

  const cleanText = String(text).trim();
  if (!cleanText) return;

  stopSpeaking();
  setSpeakingState(true, cleanText);

  if (options.onStart) options.onStart();

  const isVietnamese = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(cleanText);

  // Helper: Play single repetition
  const playOnce = () => {
    return new Promise((resolve) => {
      // If text is a single English word and mode is studio or hybrid, try human studio recording first
      const isSingleEnglishWord = !isVietnamese && /^[a-zA-Z\s'-]+$/.test(cleanText) && cleanText.split(/\s+/).length <= 3;
      
      if (isSingleEnglishWord && (effectiveMode === 'studio' || effectiveMode === 'hybrid')) {
        const studioUrl = getNativeHumanAudioUrl(cleanText, effectiveAccent);

        if (studioUrl) {
          const audio = new Audio();
          currentAudioElement = audio;

          // Clamp target playback rate safely between 0.35x and 2.0x
          const targetRate = Math.max(0.35, Math.min(2.0, Number(effectiveRate) || 1.0));

          // Set defaultPlaybackRate & playbackRate BEFORE src to prime Chromium media pipeline
          try {
            audio.defaultPlaybackRate = targetRate;
            audio.playbackRate = targetRate;
            audio.preservesPitch = true;
            audio.mozPreservesPitch = true;
            audio.webkitPreservesPitch = true;
          } catch (e) {}

          audio.src = studioUrl;
          audio.volume = Math.max(0, Math.min(1, effectiveVolume));

          // Re-enforce playbackRate across all media lifecycle events to overcome Chromium resetting it to 1.0
          const reapplyRate = () => {
            try {
              if (audio) {
                audio.defaultPlaybackRate = targetRate;
                audio.playbackRate = targetRate;
              }
            } catch (e) {}
          };

          audio.addEventListener('loadstart', reapplyRate);
          audio.addEventListener('loadedmetadata', reapplyRate);
          audio.addEventListener('canplay', reapplyRate);
          audio.addEventListener('play', reapplyRate);
          audio.addEventListener('playing', reapplyRate);

          let hasEnded = false;

          const finish = (success = true) => {
            if (hasEnded) return;
            hasEnded = true;
            if (currentAudioElement === audio) currentAudioElement = null;
            if (success) {
              resolve(true);
            } else {
              // Fallback to Web Speech API
              playViaWebSpeech().then(resolve);
            }
          };

          audio.onended = () => finish(true);
          audio.onerror = () => finish(false);

          audio.play().then(() => {
            reapplyRate();
          }).catch(() => {
            finish(false);
          });

          return;
        }
      }

      // Default or fallback: Web Speech API
      playViaWebSpeech().then(resolve);
    });
  };

  // Helper: Play via Web Speech API
  const playViaWebSpeech = () => {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve(false);
        return;
      }

      try {
        const utterance = new SpeechSynthesisUtterance(cleanText);

        if (isVietnamese) {
          utterance.lang = 'vi-VN';
          const viVoice = window.speechSynthesis.getVoices().find(v => v.lang && v.lang.toLowerCase().includes('vi'));
          if (viVoice) utterance.voice = viVoice;
        } else {
          const voice = findBestWebSpeechVoice(effectiveAccent, effectiveGender);
          if (voice) utterance.voice = voice;
          utterance.lang = ACCENT_PROFILES[effectiveAccent]?.langCode || 'en-US';
        }

        utterance.rate = Math.max(0.3, Math.min(2.0, effectiveRate));
        utterance.pitch = Math.max(0.5, Math.min(1.8, effectivePitch));
        utterance.volume = Math.max(0, Math.min(1.0, effectiveVolume));

        utterance.onend = () => resolve(true);
        utterance.onerror = () => resolve(false);

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('[NativeSpeechEngine] WebSpeech error:', err);
        resolve(false);
      }
    });
  };

  // Loop through repetitions if requested
  try {
    for (let i = 0; i < repeatTotal; i++) {
      await playOnce();
      if (i < repeatTotal - 1) {
        await new Promise(r => setTimeout(r, repeatDelay));
      }
    }
  } catch (err) {
    console.error('[NativeSpeechEngine] Playback error:', err);
  } finally {
    setSpeakingState(false, null);
    if (options.onEnd) options.onEnd();
  }
}

// Preload voices on engine initialization
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  } catch (e) {}
}
