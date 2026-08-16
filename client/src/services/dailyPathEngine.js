/**
 * DailyPathEngine - Personalization & Orchestration Engine for 5-Step Learning Path
 * Specs: TÀI LIỆU NGHIỆP VỤ CHI TIẾT – LỘ TRÌNH HỌC CÁ NHÂN HÓA 5 BƯỚC
 */

import { DBSyncEngine } from './dbSyncEngine.js';

const STORAGE_KEY_PREFIX = 'kids_daily_path_v6_';

export class DailyPathEngine {
  /**
   * Get current date string in YYYY-MM-DD format
   */
  static getTodayString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Generates or fetches persistent Daily Learning Path for specified user, date, and course
   */
  static getOrGenerateDailyPath({
    userId = 'minh_anh',
    courseId = 'L1',
    vocabDatabase = [],
    masteredCards = [],
    streakDays = 5,
    totalStars = 120
  }) {
    const today = this.getTodayString();
    const storageKey = `${STORAGE_KEY_PREFIX}${userId}_${today}_${courseId}`;

    // 1. Check local storage / DB cache for existing path today
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.date === today && parsed.steps && parsed.steps.length === 5) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('DailyPathEngine read cache error:', e);
    }

    // 2. Generate new dynamic path based on personalization rules
    // Calculate SRS due count
    const dueVocab = vocabDatabase.filter((word) => {
      if (!word.next_review_at) return false;
      return new Date(word.next_review_at) <= new Date();
    });
    const srsDueCount = dueVocab.length > 0 ? dueVocab.length : Math.min(8, Math.max(5, vocabDatabase.length - masteredCards.length));

    // Determine current lesson / unit
    const activeLevelVocab = vocabDatabase.filter((w) => w.level === courseId || courseId === 'all');
    const unmastered = activeLevelVocab.filter((w) => !masteredCards.includes(w.id || w.word));
    const currentTopicId = unmastered[0]?.category || 'L1-U01';
    const currentTopicName = unmastered[0]?.categoryName || 'Màu sắc (Colors)';

    // Determine weak phonics sound
    const weakPhonics = ['/æ/ (cat, apple)', '/θ/ (three, thank)', '/ð/ (mother, father)', '/r/ (red, rabbit)', '/l/ (lion, lemon)'];
    const selectedPhonics = weakPhonics[Math.floor(Math.random() * weakPhonics.length)];

    // Construct 5 Steps with Business Specification metadata
    const initialSteps = [
      {
        stepNumber: 1,
        activityType: 'srs_review',
        title: 'Ôn Từ Vựng Đã Học (SRS Due Review)',
        subtitle: `${srsDueCount} từ cần ôn lặp ngắt quãng hôm nay để tránh quên!`,
        estimatedMinutes: 3,
        tag: 'Smart SRS',
        icon: '🧠',
        status: 'READY', // Step 1 is always READY at start
        progressPercent: 0,
        metadata: {
          dueCount: srsDueCount,
          recommendedWords: dueVocab.slice(0, srsDueCount).map((w) => w.word || w.id)
        }
      },
      {
        stepNumber: 2,
        activityType: 'core_lesson',
        title: `Bài Học Mới Theo Lộ Trình ${courseId}`,
        subtitle: `Bài học: ${currentTopicName} • Nhìn ➔ Nghe ➔ Nói ➔ Quiz 11 bước`,
        estimatedMinutes: 5,
        tag: 'Core Lesson',
        icon: '🎯',
        status: 'READY', // Ready in Flexible mode
        progressPercent: 0,
        metadata: {
          topicId: currentTopicId,
          topicName: currentTopicName
        }
      },
      {
        stepNumber: 3,
        activityType: 'phonics_lab',
        title: 'Luyện Nói AI & Phonics Lab',
        subtitle: `Luyện âm trọng tâm ${selectedPhonics} chuẩn giọng Anh - Mỹ với AI Tutor`,
        estimatedMinutes: 3,
        tag: 'Skill Focus',
        icon: '🎙️',
        status: 'READY',
        progressPercent: 0,
        metadata: {
          phonicsSound: selectedPhonics,
          targetScore: 85
        }
      },
      {
        stepNumber: 4,
        activityType: 'game_center',
        title: 'Củng Cố Bằng 8 Mini Games',
        subtitle: 'Đập bóng từ vựng, Feed the Monster & Memory Match',
        estimatedMinutes: 3,
        tag: 'Game Center',
        icon: '👾',
        status: 'READY',
        progressPercent: 0,
        metadata: {
          gamesAvailable: 8
        }
      },
      {
        stepNumber: 5,
        activityType: 'daily_challenge',
        title: 'Thử Thách Hằng Ngày (Daily Challenge)',
        subtitle: 'Hoàn thành 3 bước học để nhận 50 Ngôi Sao Bonus & Thức ăn Thú cún!',
        estimatedMinutes: 1,
        tag: 'Reward Target',
        icon: '🎁',
        status: 'LOCKED', // Unlocks when 3 steps are complete
        progressPercent: 0,
        rewardClaimed: false,
        metadata: {
          rewardStars: 50,
          rewardXp: 100
        }
      }
    ];

    const newPath = {
      id: `dp_${userId}_${today}`,
      userId,
      date: today,
      courseId,
      estimatedMinutes: 15,
      actualMinutes: 0,
      totalSteps: 5,
      completedStepsCount: 0,
      status: 'READY',
      steps: initialSteps,
      createdAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null
    };

    // Save to storage
    this.saveDailyPath(storageKey, newPath);
    return newPath;
  }

  /**
   * Save Daily Path to LocalStorage and Sync Engine
   */
  static saveDailyPath(storageKey, pathObj) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(pathObj));
      DBSyncEngine.saveToLocalDB('daily_learning_path', pathObj);
    } catch (e) {
      console.error('DailyPathEngine save error:', e);
    }
  }

  /**
   * Update step status (READY, IN_PROGRESS, COMPLETED, SKIPPED)
   */
  static updateStepStatus({ userId = 'minh_anh', courseId = 'L1', stepNumber, status, progressPercent = null }) {
    const today = this.getTodayString();
    const storageKey = `${STORAGE_KEY_PREFIX}${userId}_${today}_${courseId}`;
    const pathObj = this.getOrGenerateDailyPath({ userId, courseId });

    if (!pathObj || !pathObj.steps) return pathObj;

    const stepIndex = pathObj.steps.findIndex((s) => s.stepNumber === stepNumber);
    if (stepIndex === -1) return pathObj;

    pathObj.steps[stepIndex].status = status;
    if (progressPercent !== null) {
      pathObj.steps[stepIndex].progressPercent = Math.min(100, Math.max(0, progressPercent));
    }
    if (status === 'COMPLETED') {
      pathObj.steps[stepIndex].progressPercent = 100;
      pathObj.steps[stepIndex].completedAt = new Date().toISOString();
    }

    // Recalculate overall completion
    const completedCount = pathObj.steps.filter((s) => s.status === 'COMPLETED').length;
    pathObj.completedStepsCount = completedCount;

    // Check if Daily Challenge (Step 5) should unlock (requires >= 3 steps completed)
    if (completedCount >= 3 && pathObj.steps[4].status === 'LOCKED') {
      pathObj.steps[4].status = 'READY';
    }

    if (completedCount === 5) {
      pathObj.status = 'COMPLETED';
      pathObj.completedAt = new Date().toISOString();
    } else if (completedCount > 0) {
      pathObj.status = 'IN_PROGRESS';
      if (!pathObj.startedAt) pathObj.startedAt = new Date().toISOString();
    }

    this.saveDailyPath(storageKey, pathObj);
    return pathObj;
  }

  /**
   * Claim reward for Step 5 with anti-duplicate check
   */
  static claimReward({ userId = 'minh_anh', courseId = 'L1' }) {
    const today = this.getTodayString();
    const storageKey = `${STORAGE_KEY_PREFIX}${userId}_${today}_${courseId}`;
    const pathObj = this.getOrGenerateDailyPath({ userId, courseId });

    if (!pathObj || !pathObj.steps) return { success: false, reason: 'PATH_NOT_FOUND' };

    const step5 = pathObj.steps[4];
    if (step5.rewardClaimed) {
      return { success: false, reason: 'ALREADY_CLAIMED' };
    }

    step5.rewardClaimed = true;
    step5.status = 'COMPLETED';
    step5.progressPercent = 100;

    const completedCount = pathObj.steps.filter((s) => s.status === 'COMPLETED').length;
    pathObj.completedStepsCount = completedCount;
    if (completedCount === 5) pathObj.status = 'COMPLETED';

    this.saveDailyPath(storageKey, pathObj);
    return {
      success: true,
      rewardStars: step5.metadata?.rewardStars || 50,
      rewardXp: step5.metadata?.rewardXp || 100
    };
  }

  /**
   * Reset path for testing / manual refresh
   */
  static resetDailyPath({ userId = 'minh_anh', courseId = 'L1' }) {
    const today = this.getTodayString();
    const storageKey = `${STORAGE_KEY_PREFIX}${userId}_${today}_${courseId}`;
    localStorage.removeItem(storageKey);
    return this.getOrGenerateDailyPath({ userId, courseId });
  }
}
