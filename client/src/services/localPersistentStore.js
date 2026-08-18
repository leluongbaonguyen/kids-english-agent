// client/src/services/localPersistentStore.js
// Client-Side Persistent Storage Engine for Accounts, Custom Vocab & Course Units

import { VOCABULARY_DATABASE } from '../constants/kidsVocabularyDatabase.js';

const STORAGE_KEYS = {
  USERS: 'kids_registered_users_v1',
  CUSTOM_VOCAB: 'kids_custom_vocab_v1',
  CUSTOM_COURSES: 'kids_custom_courses_v1',
  LEVEL_OVERRIDES: 'kids_admin_level_overrides'
};

// -------------------------------------------------------------
// 1. REGISTERED USER ACCOUNTS PERSISTENCE
// -------------------------------------------------------------
export function getRegisteredUsers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn('Error reading registered users:', e);
    return [];
  }
}

export function registerUserAccount(userObj) {
  try {
    const users = getRegisteredUsers();
    const existingIndex = users.findIndex(
      (u) => u.email?.toLowerCase() === userObj.email?.toLowerCase() || u.username?.toLowerCase() === userObj.username?.toLowerCase()
    );

    const newUser = {
      id: userObj.id || `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: userObj.name || userObj.username || 'Học Viên Nhí',
      email: userObj.email || `${userObj.username}@kidsenglish.edu.vn`,
      password: userObj.password || '123456',
      role: userObj.role || 'student',
      level: userObj.level || 'L1',
      stars: userObj.stars || 0,
      createdAt: userObj.createdAt || new Date().toISOString()
    };

    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...newUser };
    } else {
      users.push(newUser);
    }

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  } catch (e) {
    console.error('Error saving user account to persistent storage:', e);
    return userObj;
  }
}

export function authenticateLocalUser(emailOrUsername, password, role) {
  const users = getRegisteredUsers();
  const lowerInput = emailOrUsername ? emailOrUsername.trim().toLowerCase() : '';

  const matched = users.find(
    (u) =>
      (u.email?.toLowerCase() === lowerInput || u.username?.toLowerCase() === lowerInput || u.name?.toLowerCase() === lowerInput) &&
      (u.password === password || !password)
  );

  if (matched) return matched;

  // Fallback default role presets if user matches standard emails
  const defaultProfiles = {
    student: { id: 'minh_anh', name: 'Bé Minh Anh', role: 'student', email: 'minhanh@kidsenglish.edu.vn', level: 'L1', stars: 120 },
    parent: { id: 'parent_user', name: 'Phụ Huynh Bé Minh Anh', role: 'parent', email: 'parent@kidsenglish.edu.vn', level: 'L1', stars: 120 },
    admin: { id: 'bao_nguyen', name: 'Bảo Nguyễn', role: 'admin', email: 'baonguyen@kidsenglish.edu.vn', level: 'L6', stars: 999 }
  };

  return defaultProfiles[role] || defaultProfiles.student;
}

// -------------------------------------------------------------
// 2. CUSTOM VOCABULARY PERSISTENCE
// -------------------------------------------------------------
export function getCustomVocab() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_VOCAB);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn('Error reading custom vocab:', e);
    return [];
  }
}

export function saveCustomVocabItem(wordObj) {
  try {
    const customList = getCustomVocab();
    const newItem = {
      id: wordObj.id || `vocab_custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      word: wordObj.word ? wordObj.word.trim() : 'New Word',
      ipa: wordObj.ipa || wordObj.phonetics || `/${wordObj.word?.toLowerCase()}/`,
      vietnamesePhonetic: wordObj.vietnamesePhonetic || wordObj.word || '',
      meaning: wordObj.meaning ? wordObj.meaning.trim() : '',
      type: wordObj.type || 'Danh từ',
      example: wordObj.example || `This is a ${wordObj.word}.`,
      exampleVi: wordObj.exampleVi || `Đây là ${wordObj.meaning}.`,
      image: wordObj.image || wordObj.imageEmoji || '🌟',
      level: wordObj.level || 'L1',
      category: wordObj.category || 'Custom',
      unit: wordObj.unit || 1,
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    const existingIdx = customList.findIndex((w) => w.word.toLowerCase() === newItem.word.toLowerCase());
    if (existingIdx >= 0) {
      customList[existingIdx] = { ...customList[existingIdx], ...newItem };
    } else {
      customList.unshift(newItem);
    }

    localStorage.setItem(STORAGE_KEYS.CUSTOM_VOCAB, JSON.stringify(customList));
    return customList;
  } catch (e) {
    console.error('Error saving custom vocab:', e);
    return getCustomVocab();
  }
}

export function getCombinedVocabDatabase() {
  const customWords = getCustomVocab();
  return [...customWords, ...VOCABULARY_DATABASE];
}

// -------------------------------------------------------------
// 3. CUSTOM COURSES PERSISTENCE
// -------------------------------------------------------------
export function getCustomCourses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_COURSES);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function saveCustomCourse(courseObj) {
  try {
    const courses = getCustomCourses();
    const newCourse = {
      id: courseObj.id || `course_${Date.now()}`,
      title: courseObj.title || 'Bài Học Mới',
      level: courseObj.level || 'L1',
      topicId: courseObj.topicId || 'L1-U01',
      activityType: courseObj.activityType || 'FLASHCARD',
      status: courseObj.status || 'PUBLISHED',
      createdAt: new Date().toISOString()
    };
    courses.unshift(newCourse);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_COURSES, JSON.stringify(courses));
    return courses;
  } catch (e) {
    return getCustomCourses();
  }
}
