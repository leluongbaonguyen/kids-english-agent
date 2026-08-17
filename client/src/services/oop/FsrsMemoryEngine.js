/**
 * FSRS (Free Spaced Repetition Scheduler) Engine
 * Implements State-of-the-Art DSR (Difficulty, Stability, Retrievability) Memory Model
 * Reference: Open Spaced Repetition (ts-fsrs)
 */
export class FsrsMemoryEngine {
  // FSRS Core Constants
  static DECAY_FACTOR = -0.5;
  static FACTOR_9 = 9;

  /**
   * Calculate Retrievability (Probability of recall at day t given Stability S)
   * R(t, S) = (1 + (9 * t) / S) ^ -1
   */
  static calculateRetrievability(daysElapsed, stability) {
    if (!stability || stability <= 0) return 0.9;
    const r = Math.pow(1 + (this.FACTOR_9 * daysElapsed) / stability, -1);
    return Math.min(1.0, Math.max(0.0, r));
  }

  /**
   * Compute Next SRS Memory State based on user Rating (1: Again, 2: Hard, 3: Good, 4: Easy)
   */
  static computeNextState(currentState, rating, reviewDate = new Date()) {
    const {
      difficulty = 5.0,
      stability = 1.0,
      repetition = 0,
      lastReview = new Date().toISOString()
    } = currentState || {};

    const lastDate = new Date(lastReview);
    const elapsedDays = Math.max(0, Math.floor((reviewDate - lastDate) / (1000 * 60 * 60 * 24)));
    const retrievability = this.calculateRetrievability(elapsedDays, stability);

    // 1. Next Difficulty D_new (Clamped 1.0 to 10.0)
    let dNew = difficulty - 0.8 + (0.28 * (4 - rating));
    dNew = Math.min(10.0, Math.max(1.0, dNew));

    // 2. Next Stability S_new
    let sNew = stability;
    if (rating === 1) { // Again (Forgot)
      sNew = Math.max(0.1, stability * 0.2);
    } else if (rating === 2) { // Hard
      sNew = stability * (1 + 0.15 * Math.exp(1 - retrievability));
    } else if (rating === 3) { // Good
      sNew = stability * (1 + 0.5 * Math.exp(1 - retrievability));
    } else if (rating === 4) { // Easy
      sNew = stability * (1 + 1.2 * Math.exp(1 - retrievability));
    }

    const nextIntervalDays = Math.max(1, Math.round(sNew * 1.5));
    const nextReviewDate = new Date(reviewDate.getTime() + nextIntervalDays * 24 * 60 * 60 * 1000);

    return {
      difficulty: Number(dNew.toFixed(2)),
      stability: Number(sNew.toFixed(2)),
      retrievability: Number((retrievability * 100).toFixed(1)),
      repetition: repetition + 1,
      intervalDays: nextIntervalDays,
      lastReview: reviewDate.toISOString(),
      nextReviewDate: nextReviewDate.toISOString().split('T')[0],
      status: retrievability < 0.85 ? 'Due Today' : (sNew > 30 ? 'Mastered' : 'Active')
    };
  }
}
