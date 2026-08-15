/**
 * Quiz Attempt & Level Progression Assessment Module (V5.0)
 * Handles transactional storing of quiz attempts, individual answers, star transactions, and level unlocks.
 */

export async function recordQuizAttemptTx(pool, attemptData) {
  if (!pool) {
    return {
      success: true,
      local: true,
      attemptId: `local_quiz_${Date.now()}`,
      earnedStars: attemptData.earnedStars || 10,
      unlockedNext: attemptData.passed || false
    };
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const learnerId = attemptData.learnerId || '00000000-0000-0000-0000-000000000000';
    const attemptRes = await client.query(
      `INSERT INTO quiz_attempts 
         (learner_id, level_code, quiz_type, mode, total_questions, correct_answers, score_percent, passed, completed_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING id`,
      [
        learnerId,
        attemptData.levelCode || 'L1',
        attemptData.quizType || 'practice',
        attemptData.mode || 'standard',
        attemptData.totalQuestions || 0,
        attemptData.correctAnswers || 0,
        attemptData.scorePercent || 0,
        attemptData.passed || false
      ]
    );

    const attemptId = attemptRes.rows[0].id;

    if (Array.isArray(attemptData.answers)) {
      for (let i = 0; i < attemptData.answers.length; i++) {
        const a = attemptData.answers[i];
        await client.query(
          `INSERT INTO quiz_answers 
             (attempt_id, question_number, vocabulary_id, question_type, selected_answer, correct_answer, is_correct, response_ms)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            attemptId,
            i + 1,
            a.vocabularyId || null,
            a.questionType || 'multiple_choice',
            a.selectedAnswer || '',
            a.correctAnswer || '',
            a.isCorrect || false,
            a.responseMs || 0
          ]
        );
      }
    }

    // Award Stars Transaction (Idempotent Ledger Entry)
    if (attemptData.earnedStars && attemptData.earnedStars > 0) {
      await client.query(
        `INSERT INTO star_transactions (learner_id, amount, reason, source_type, source_id)
         VALUES ($1, $2, $3, 'QUIZ', $4)`,
        [learnerId, attemptData.earnedStars, 'Hoàn thành bài tập Quiz tiếng Anh', attemptId]
      );
    }

    // Level Unlock Logic if passed >= 80%
    if (attemptData.passed && attemptData.levelCode) {
      const nextLevelMap = { L1: 'L2', L2: 'L3', L3: 'L4', L4: 'L5', L5: 'L6' };
      const nextLevel = nextLevelMap[attemptData.levelCode];
      if (nextLevel) {
        await client.query(
          `INSERT INTO learner_level_progress (learner_id, level_code, is_unlocked, unlocked_at)
           VALUES ($1, $2, true, NOW())
           ON CONFLICT (learner_id, level_code)
           DO UPDATE SET is_unlocked = true, unlocked_at = NOW()`,
          [learnerId, nextLevel]
        );
      }
    }

    await client.query('COMMIT');
    return {
      success: true,
      attemptId,
      earnedStars: attemptData.earnedStars || 0,
      unlockedNext: attemptData.passed || false
    };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error recording quiz attempt transaction:', err);
    throw err;
  } finally {
    client.release();
  }
}
