/**
 * Server-Authoritative SRS Evidence & Mastery Calculation Engine (V5.0)
 * Evaluates learning accuracy, computes interval days, updates status, and stores evidence.
 */

export async function computeSrsUpdate(pool, learnerId, vocabId, accuracy, interactionType = 'flashcard') {
  const now = new Date();
  const accNum = typeof accuracy === 'number' ? accuracy : 1.0;
  
  if (pool) {
    try {
      const existing = await pool.query(
        `SELECT * FROM learner_word_progress WHERE learner_id = $1 AND vocabulary_id = $2`,
        [learnerId, vocabId]
      );

      let correctCount = 0;
      let incorrectCount = 0;
      let reviewCount = 0;
      let status = 'learning';
      let masteryScore = 0;

      if (existing.rows.length > 0) {
        const row = existing.rows[0];
        correctCount = row.correct_count + (accNum >= 0.8 ? 1 : 0);
        incorrectCount = row.incorrect_count + (accNum < 0.8 ? 1 : 0);
        reviewCount = row.review_count + 1;
      } else {
        correctCount = accNum >= 0.8 ? 1 : 0;
        incorrectCount = accNum < 0.8 ? 1 : 0;
        reviewCount = 1;
      }

      const totalAttempts = correctCount + incorrectCount;
      const accRate = totalAttempts > 0 ? correctCount / totalAttempts : 0;

      let intervalDays = 1;
      if (accRate >= 0.9 && totalAttempts >= 5) {
        status = 'mastered';
        intervalDays = 14;
        masteryScore = 100;
      } else if (accRate >= 0.7 && totalAttempts >= 3) {
        status = 'review';
        intervalDays = 7;
        masteryScore = 80;
      } else if (incorrectCount > correctCount) {
        status = 'learning';
        intervalDays = 1;
        masteryScore = 30;
      } else {
        status = 'learning';
        intervalDays = 3;
        masteryScore = 50;
      }

      const nextReviewAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

      await pool.query(
        `INSERT INTO learner_word_progress 
           (learner_id, vocabulary_id, status, correct_count, incorrect_count, review_count, last_reviewed_at, next_review_at, mastery_score)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, $8)
         ON CONFLICT (learner_id, vocabulary_id)
         DO UPDATE SET 
           status = EXCLUDED.status, 
           correct_count = EXCLUDED.correct_count, 
           incorrect_count = EXCLUDED.incorrect_count,
           review_count = EXCLUDED.review_count, 
           last_reviewed_at = NOW(), 
           next_review_at = EXCLUDED.next_review_at,
           mastery_score = EXCLUDED.mastery_score, 
           updated_at = NOW()`,
        [learnerId, vocabId, status, correctCount, incorrectCount, reviewCount, nextReviewAt.toISOString(), masteryScore]
      );

      return {
        vocabId,
        status,
        masteryScore,
        correctCount,
        incorrectCount,
        reviewCount,
        nextReviewAt: nextReviewAt.toISOString()
      };
    } catch (err) {
      console.warn('SRS Evidence Postgres computation error:', err.message);
    }
  }

  const isPass = accNum >= 0.8;
  return {
    vocabId,
    status: isPass ? 'review' : 'learning',
    masteryScore: isPass ? 80 : 40,
    nextReviewAt: new Date(now.getTime() + 86400000).toISOString()
  };
}
