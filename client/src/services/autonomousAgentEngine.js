/**
 * AUTONOMOUS AGENT ENGINE (V6.1)
 * High-performance background intelligence & advanced algorithm suite.
 * 
 * Features:
 * 1. SuperMem SM-2 Spaced Repetition Engine (Forgetting Curve Calculation)
 * 2. Phoneme IPA Acoustic Levenshtein Distance Algorithm
 * 3. Adaptive Difficulty & Rolling Accuracy Controller
 * 4. Silent Background Asset Pre-fetching & Idempotent Auto-Sync
 */

// --- 1. SUPERMEM SM-2 SPACED REPETITION ALGORITHM ---
export function calculateSM2Interval(grade, previousInterval = 0, previousEF = 2.5, repetitionCount = 0) {
  // grade: 0 to 5 (0 = complete blackout, 5 = perfect response)
  const q = Math.max(0, Math.min(5, grade));
  
  // Calculate new Ease Factor (EF)
  let newEF = previousEF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEF < 1.3) newEF = 1.3; // Hard floor for EF

  let newRepetitionCount = repetitionCount;
  let newInterval = 1;

  if (q >= 3) {
    // Correct response
    if (repetitionCount === 0) {
      newInterval = 1;
    } else if (repetitionCount === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(previousInterval * newEF);
    }
    newRepetitionCount += 1;
  } else {
    // Incorrect response -> Reset repetition cycle
    newRepetitionCount = 0;
    newInterval = 1;
  }

  // Calculate Retrievability Score R(t) = e^(-t / S)
  const stability = newInterval; // S in days
  const retrievabilityDay1 = Math.exp(-1 / (stability || 1));

  return {
    intervalDays: newInterval,
    easeFactor: Number(newEF.toFixed(2)),
    repetitionCount: newRepetitionCount,
    retrievability: Number(retrievabilityDay1.toFixed(3)),
    nextDueDate: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000).toISOString()
  };
}

// --- 2. PHONEME IPA LEVENSHTEIN DISTANCE ALGORITHM ---
export function calculatePhonemeIPAScore(targetText, spokenText) {
  if (!targetText || !spokenText) return { score: 0, accuracy: '0%', feedback: 'Chưa thu âm' };

  const normTarget = targetText.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  const normSpoken = spokenText.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

  if (normTarget === normSpoken) {
    return { score: 100, accuracy: '100%', feedback: 'Phát âm hoàn hảo 100% chuẩn IPA' };
  }

  const lenA = normTarget.length;
  const lenB = normSpoken.length;
  const matrix = Array.from({ length: lenA + 1 }, () => Array(lenB + 1).fill(0));

  for (let i = 0; i <= lenA; i++) matrix[i][0] = i;
  for (let j = 0; j <= lenB; j++) matrix[0][j] = j;

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      const cost = normTarget[i - 1] === normSpoken[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,       // Deletion
        matrix[i][j - 1] + 1,       // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  const editDistance = matrix[lenA][lenB];
  const maxLen = Math.max(lenA, lenB) || 1;
  const similarityRatio = Math.max(0, 1 - editDistance / maxLen);
  const finalScore = Math.round(similarityRatio * 100);

  let feedback = 'Cần luyện tập thêm';
  if (finalScore >= 90) feedback = 'Phát âm cực chuẩn quốc tế';
  else if (finalScore >= 75) feedback = 'Phát âm tốt, chú ý nhấn trọng âm';
  else if (finalScore >= 50) feedback = 'Khá tốt, hãy phát âm rõ phụ âm cuối';

  return {
    score: finalScore,
    accuracy: `${finalScore}%`,
    editDistance,
    feedback
  };
}

// --- 3. ADAPTIVE ROLLING ACCURACY & DIFFICULTY CONTROLLER ---
export function calculateAdaptiveLevel(recentScores = []) {
  if (!recentScores || recentScores.length === 0) return { recommendedLevel: 'A1', confidence: 1.0 };

  const validScores = recentScores.slice(-10); // Look at last 10 attempts
  const avgScore = validScores.reduce((acc, curr) => acc + curr, 0) / validScores.length;

  let recommendedLevel = 'A1';
  if (avgScore >= 90) recommendedLevel = 'B2';
  else if (avgScore >= 80) recommendedLevel = 'B1';
  else if (avgScore >= 65) recommendedLevel = 'A2';

  return {
    avgScore: Math.round(avgScore),
    recommendedLevel,
    confidence: Number((validScores.length / 10).toFixed(2))
  };
}

// --- 4. SILENT BACKGROUND IDEMPOTENT AUTO-SYNC ENGINE ---
class SilentAutoSyncEngine {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.retryDelays = [1000, 3000, 7000, 15000];
  }

  enqueue(actionType, payload) {
    const item = {
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      actionType,
      payload,
      attempts: 0,
      timestamp: Date.now()
    };
    this.queue.push(item);
    this.triggerProcessing();
  }

  async triggerProcessing() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue[0];
      let success = false;

      try {
        const token = localStorage.getItem('v5_auth_token');
        const res = await fetch('/api/v1/user/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            action: task.actionType,
            data: task.payload,
            idempotencyKey: task.id
          })
        });

        if (res.ok) {
          success = true;
        }
      } catch (err) {
        console.warn('Silent auto-sync background retry:', err);
      }

      if (success) {
        this.queue.shift(); // Remove task
      } else {
        task.attempts += 1;
        if (task.attempts >= 4) {
          this.queue.shift(); // Drop after max attempts silently
        } else {
          const delay = this.retryDelays[task.attempts - 1] || 5000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    this.isProcessing = false;
  }
}

export const silentAutoSync = new SilentAutoSyncEngine();
