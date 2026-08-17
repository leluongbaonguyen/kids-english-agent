/**
 * Phonetic & String Similarity Engine using Dynamic Programming (Levenshtein Distance)
 * Measures phonetic similarity between spoken attempt / typed attempt and target IPA / Word
 */
export class PhoneticSimilarityEngine {
  /**
   * Compute Levenshtein Distance Matrix O(M * N)
   */
  static computeLevenshteinDistance(str1, str2) {
    const s1 = (str1 || '').toLowerCase().trim();
    const s2 = (str2 || '').toLowerCase().trim();

    const m = s1.length;
    const n = s2.length;

    if (m === 0) return n;
    if (n === 0) return m;

    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,      // Deletion
          dp[i][j - 1] + 1,      // Insertion
          dp[i - 1][j - 1] + cost // Substitution
        );
      }
    }

    return dp[m][n];
  }

  /**
   * Calculate Phonetic Match Percentage (0% to 100%)
   */
  static calculateSimilarityPercentage(target, attempt) {
    const s1 = (target || '').toLowerCase().trim();
    const s2 = (attempt || '').toLowerCase().trim();

    if (!s1 || !s2) return 0;
    if (s1 === s2) return 100;

    const maxLen = Math.max(s1.length, s2.length);
    const distance = this.computeLevenshteinDistance(s1, s2);
    const score = ((maxLen - distance) / maxLen) * 100;

    return Math.max(0, Math.round(score));
  }

  /**
   * Provide Detailed Feedback Breakdown
   */
  static analyzeAttempt(targetWord, studentAttempt) {
    const matchScore = this.calculateSimilarityPercentage(targetWord, studentAttempt);
    let grade = 'NEEDS_PRACTICE';
    let feedback = 'Hãy lắng nghe kĩ mẫu âm và thử lại nhé!';

    if (matchScore >= 90) {
      grade = 'EXCELLENT';
      feedback = 'Xuất sắc! Phát âm rất chuẩn giọng bản ngữ ⭐⭐⭐';
    } else if (matchScore >= 75) {
      grade = 'GOOD';
      feedback = 'Tốt! Âm chuẩn khoảng 80%, chú ý phát âm rõ âm đuôi hơn.';
    }

    return {
      targetWord,
      studentAttempt,
      matchScore,
      grade,
      feedback
    };
  }
}
