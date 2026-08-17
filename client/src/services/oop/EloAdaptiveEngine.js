/**
 * Elo Adaptive Rating Engine
 * Dynamic difficulty matchmaking between Student skill rating (R_student) and Vocabulary difficulty rating (R_vocab)
 */
export class EloAdaptiveEngine {
  static K_FACTOR_STUDENT = 32;
  static K_FACTOR_VOCAB = 16;

  /**
   * Expected Probability of Student succeeding on Vocab word
   * E_A = 1 / (1 + 10 ^ ((Rating_Vocab - Rating_Student) / 400))
   */
  static calculateExpectedScore(studentRating, vocabRating) {
    return 1 / (1 + Math.pow(10, (vocabRating - studentRating) / 400));
  }

  /**
   * Update Ratings after Quiz Attempt
   * @param {number} studentRating Current Elo rating of student (e.g., 1200)
   * @param {number} vocabRating Current Elo difficulty of word (e.g., 1100)
   * @param {boolean} isCorrect Whether student answered correctly
   */
  static updateEloRatings(studentRating, vocabRating, isCorrect) {
    const expected = this.calculateExpectedScore(studentRating, vocabRating);
    const actual = isCorrect ? 1.0 : 0.0;

    const newStudentRating = Math.round(studentRating + this.K_FACTOR_STUDENT * (actual - expected));
    const newVocabRating = Math.round(vocabRating + this.K_FACTOR_VOCAB * (expected - actual));

    return {
      newStudentRating: Math.max(800, newStudentRating),
      newVocabRating: Math.max(600, newVocabRating),
      ratingDelta: newStudentRating - studentRating,
      expectedSuccessRate: Math.round(expected * 100)
    };
  }

  /**
   * Recommend Next Best Words for Student based on Elo Matchmaking
   */
  static recommendWords(studentRating, vocabList, limit = 5) {
    return vocabList
      .map(word => {
        const wordElo = word.eloRating || (word.difficulty === 'Easy' ? 900 : word.difficulty === 'Hard' ? 1400 : 1100);
        const expected = this.calculateExpectedScore(studentRating, wordElo);
        // Ideal learning zone: 65% - 85% success probability
        const suitability = 1 - Math.abs(expected - 0.75);
        return { ...word, wordElo, suitability };
      })
      .sort((a, b) => b.suitability - a.suitability)
      .slice(0, limit);
  }
}
