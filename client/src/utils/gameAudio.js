// Ultra-Rich Web Audio Synthesizer & Speech Synthesis Engine for Kids Memory Game
// Pure Web Audio API: 100% offline, zero-latency, cross-platform (Chrome, iOS Safari, Android, Edge, Firefox)

import { speakWord as nativeSpeakWord } from '../services/nativeSpeechEngine.js';

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Sound Settings Store
export const soundSettings = {
  sfx: true,
  voice: true,
  voiceGender: 'female', // 'female' | 'male'
  speechRate: 0.9,
  slowMode: false,
};

// Load saved settings
try {
  const saved = localStorage.getItem('kids_game_audio_settings');
  if (saved) {
    Object.assign(soundSettings, JSON.parse(saved));
  }
} catch (e) {}

export function saveSoundSettings() {
  try {
    localStorage.setItem('kids_game_audio_settings', JSON.stringify(soundSettings));
  } catch (e) {}
}

/**
 * 1. Card Flip Whoosh Sound (Tactile crisp card flick)
 */
export function playCardFlip() {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.12);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch (e) {
    console.warn('Audio flip error', e);
  }
}

/**
 * 2. Correct Match Chime (Sparkly magical major chord arpeggio)
 */
export function playMatchSound() {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // C5, E5, G5, C6 frequencies
    const notes = [523.25, 659.25, 783.99, 1046.5];

    notes.forEach((freq, idx) => {
      const noteTime = now + idx * 0.065;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.22, noteTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.46);

      // Shimmer sparkle overtone
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = 'triangle';
      chime.frequency.setValueAtTime(freq * 2, noteTime);

      chimeGain.gain.setValueAtTime(0, noteTime);
      chimeGain.gain.linearRampToValueAtTime(0.08, noteTime + 0.015);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);

      chime.connect(chimeGain);
      chimeGain.connect(ctx.destination);

      chime.start(noteTime);
      chime.stop(noteTime + 0.32);
    });
  } catch (e) {
    console.warn('Audio match error', e);
  }
}

/**
 * 3. Soft Gentle Mismatch Sound (Warm, encouraging double-tone)
 */
export function playMismatchSound() {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(329.63, now); // E4
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.17);

    // Second lower tone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const t2 = now + 0.11;

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(261.63, t2); // C4
    gain2.gain.setValueAtTime(0.14, t2);
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.2);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t2);
    osc2.stop(t2 + 0.21);
  } catch (e) {
    console.warn('Audio mismatch error', e);
  }
}

/**
 * 4. Combo Streak Sound (Harmonic bells rising with combo multiplier)
 */
export function playComboSound(streak = 1) {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const baseFreq = 440 * Math.pow(1.15, Math.min(streak, 8)); // Climbing pitch
    const pitches = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2];

    pitches.forEach((freq, idx) => {
      const t = now + idx * 0.05;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.36);
    });
  } catch (e) {
    console.warn('Audio combo error', e);
  }
}

/**
 * 5. Victory Fanfare (Triumphant grand fanfare + sparkle shower)
 */
export function playVictorySound() {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Fanfare sequence: C4, G4, C5, E5, G5, C6 (Held triumph chord)
    const notes = [
      { f: 261.63, t: 0, d: 0.15 },
      { f: 392.00, t: 0.14, d: 0.15 },
      { f: 523.25, t: 0.28, d: 0.18 },
      { f: 659.25, t: 0.44, d: 0.2 },
      { f: 783.99, t: 0.62, d: 0.25 },
      { f: 1046.50, t: 0.85, d: 0.9 }, // High C held
    ];

    notes.forEach(({ f, t, d }) => {
      const startTime = now + t;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = t >= 0.85 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(f, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + d + 0.02);
    });

    // Harmonizing brass chord on finale
    const finalChord = [523.25, 659.25, 783.99, 1046.50];
    finalChord.forEach(f => {
      const startTime = now + 0.85;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.92);
    });
  } catch (e) {
    console.warn('Audio victory error', e);
  }
}

/**
 * 6. Magical Hint Chime (Celestial sparkle glissando)
 */
export function playHintSound() {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const glissando = [880, 1174.66, 1396.91, 1760, 2093, 2637];

    glissando.forEach((freq, idx) => {
      const t = now + idx * 0.045;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.29);
    });
  } catch (e) {
    console.warn('Audio hint error', e);
  }
}

/**
 * 7. Card Deck Riffle Shuffle Sound
 */
export function playShuffleSound() {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const count = 12;

    for (let i = 0; i < count; i++) {
      const t = now + (i * 0.028);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freq = 220 + Math.random() * 260;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);
    }
  } catch (e) {
    console.warn('Audio shuffle error', e);
  }
}

/**
 * 8. Tactile UI Click Sound
 */
export function playClickSound() {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch (e) {
    console.warn('Audio click error', e);
  }
}

/**
 * 9. Countdown Timer Tick
 */
export function playTickSound() {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch (e) {
    console.warn('Audio tick error', e);
  }
}

/**
 * 10. Turn Change Chime (Friendly dual-tone chime notifying player's turn)
 */
export function playTurnChangeSound(isYourTurn = true) {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = isYourTurn ? [440, 659.25, 880] : [554.37, 440];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.01, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(isYourTurn ? 0.22 : 0.12, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.2);
    });
  } catch (e) {
    console.warn('Turn sound error', e);
  }
}

/**
 * 11. Emote Pop Sound (Bubbly pop effect for live emojis)
 */
export function playEmotePopSound() {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.11);
  } catch (e) {
    console.warn('Emote sound error', e);
  }
}

/**
 * 12. Turn Urgent Alert Sound (When countdown <= 3s)
 */
export function playTurnAlertSound() {
  if (!soundSettings.sfx) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.linearRampToValueAtTime(1100, now + 0.05);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {
    console.warn('Alert sound error', e);
  }
}

/**
 * Master Native Speech Engine
 * Pronounces English words clearly with 100% native accent, studio audio & granular speed controls
 */
export function speakWord(text, { slow = false, onEnd = null, onStart = null } = {}) {
  if (!soundSettings.voice) return;
  return nativeSpeakWord(text, {
    slow: slow || soundSettings.slowMode,
    rate: soundSettings.speechRate || undefined,
    onStart,
    onEnd
  });
}

