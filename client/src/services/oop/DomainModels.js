import { AbstractEntity } from './AbstractEntity.js';
import { FsrsMemoryEngine } from './FsrsMemoryEngine.js';

/**
 * 1. VocabEntity (INHERITANCE, ENCAPSULATION, POLYMORPHISM)
 */
export class VocabEntity extends AbstractEntity {
  #word;
  #meaning;
  #ipa;
  #vietnamesePhonetic;
  #level;
  #ageGroup;
  #image;
  #example;
  #exampleVi;
  #difficulty;

  constructor(data = {}) {
    super(data.id, data.createdAt, data.updatedAt);
    this.#word = data.word || '';
    this.#meaning = data.meaning || data.meaning_vi || '';
    this.#ipa = data.ipa || `/${this.#word}/`;
    this.#vietnamesePhonetic = data.vietnamesePhonetic || '';
    this.#level = data.level || 'L1';
    this.#ageGroup = data.ageGroup || '3-6';
    this.#image = data.image || data.imageEmoji || '🔴';
    this.#example = data.example || '';
    this.#exampleVi = data.example_vi || data.exampleVi || '';
    this.#difficulty = data.difficulty || 'Medium';
  }

  get word() { return this.#word; }
  get meaning() { return this.#meaning; }
  get ipa() { return this.#ipa; }
  get vietnamesePhonetic() { return this.#vietnamesePhonetic; }
  get level() { return this.#level; }
  get ageGroup() { return this.#ageGroup; }
  get image() { return this.#image; }
  get example() { return this.#example; }
  get exampleVi() { return this.#exampleVi; }
  get difficulty() { return this.#difficulty; }

  // POLYMORPHIC OVERRIDES
  validate() {
    if (!this.#word) throw new Error("Vocab word cannot be empty.");
    if (!this.#meaning) throw new Error("Vocab meaning cannot be empty.");
    return true;
  }

  getBadgeStyle() {
    return "bg-purple-950 text-purple-300 border-purple-500/40";
  }

  getHealthScore() {
    return (this.#word && this.#meaning && this.#ipa) ? 100 : 75;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      word: this.#word,
      meaning: this.#meaning,
      ipa: this.#ipa,
      vietnamesePhonetic: this.#vietnamesePhonetic,
      level: this.#level,
      ageGroup: this.#ageGroup,
      image: this.#image,
      example: this.#example,
      example_vi: this.#exampleVi,
      difficulty: this.#difficulty
    };
  }
}

/**
 * 2. UserEntity (INHERITANCE, ENCAPSULATION, POLYMORPHISM)
 */
export class UserEntity extends AbstractEntity {
  #username;
  #displayName;
  #email;
  #role;
  #stars;
  #streak;
  #parentPhone;
  #pinCode;
  #status;

  constructor(data = {}) {
    super(data.id, data.createdAt, data.updatedAt);
    this.#username = data.username || '';
    this.#displayName = data.displayName || this.#username;
    this.#email = data.email || '';
    this.#role = data.role || 'student';
    this.#stars = Number(data.stars || 0);
    this.#streak = Number(data.streak || 0);
    this.#parentPhone = data.parentPhone || '';
    this.#pinCode = data.pinCode || '1234';
    this.#status = data.status || 'active';
  }

  get username() { return this.#username; }
  get displayName() { return this.#displayName; }
  get email() { return this.#email; }
  get role() { return this.#role; }
  get stars() { return this.#stars; }
  get streak() { return this.#streak; }
  get parentPhone() { return this.#parentPhone; }
  get pinCode() { return this.#pinCode; }
  get status() { return this.#status; }

  // POLYMORPHIC OVERRIDES
  validate() {
    if (!this.#username) throw new Error("Username cannot be empty.");
    return true;
  }

  getBadgeStyle() {
    if (this.#role === 'admin') return "bg-rose-950 text-rose-300 border-rose-500/40";
    if (this.#role === 'teacher') return "bg-amber-950 text-amber-300 border-amber-500/40";
    return "bg-cyan-950 text-cyan-300 border-cyan-500/40";
  }

  getHealthScore() {
    return this.#status === 'active' ? 100 : 50;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      username: this.#username,
      displayName: this.#displayName,
      email: this.#email,
      role: this.#role,
      stars: this.#stars,
      streak: this.#streak,
      parentPhone: this.#parentPhone,
      pinCode: this.#pinCode,
      status: this.#status
    };
  }
}

/**
 * 3. SrsEntity (INHERITANCE, ENCAPSULATION, POLYMORPHISM)
 */
export class SrsEntity extends AbstractEntity {
  #word;
  #user;
  #stage;
  #recallRate;
  #stability;
  #difficulty;

  constructor(data = {}) {
    super(data.id, data.createdAt, data.updatedAt);
    this.#word = data.word || '';
    this.#user = data.user || 'Bé Minh Anh';
    this.#stage = data.stage || 'Stage 1';
    this.#recallRate = Number(data.recall_rate || data.recallRate || 90);
    this.#stability = Number(data.stability || 2.5);
    this.#difficulty = Number(data.difficulty || 4.8);
  }

  get word() { return this.#word; }
  get user() { return this.#user; }
  get stage() { return this.#stage; }
  get recallRate() { return this.#recallRate; }
  get stability() { return this.#stability; }
  get difficulty() { return this.#difficulty; }

  processReview(rating) {
    const nextState = FsrsMemoryEngine.computeNextState(
      { stability: this.#stability, difficulty: this.#difficulty },
      rating
    );
    this.#stability = nextState.stability;
    this.#difficulty = nextState.difficulty;
    this.#recallRate = nextState.retrievability;
    this.touch();
    return nextState;
  }

  // POLYMORPHIC OVERRIDES
  validate() {
    if (!this.#word) throw new Error("SRS word cannot be empty.");
    return true;
  }

  getBadgeStyle() {
    return "bg-amber-950 text-amber-300 border-amber-500/40";
  }

  getHealthScore() {
    return this.#recallRate;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      word: this.#word,
      user: this.#user,
      stage: this.#stage,
      recall_rate: this.#recallRate,
      stability: this.#stability,
      difficulty: this.#difficulty
    };
  }
}

/**
 * 4. LessonEntity (INHERITANCE, ENCAPSULATION, POLYMORPHISM)
 */
export class LessonEntity extends AbstractEntity {
  #unitId;
  #title;
  #level;
  #passingScore;

  constructor(data = {}) {
    super(data.id, data.createdAt, data.updatedAt);
    this.#unitId = data.unitId || 'U01';
    this.#title = data.title || '';
    this.#level = data.level || 'L1';
    this.#passingScore = Number(data.passingScore || 80);
  }

  get unitId() { return this.#unitId; }
  get title() { return this.#title; }
  get level() { return this.#level; }
  get passingScore() { return this.#passingScore; }

  validate() {
    if (!this.#unitId) throw new Error("Unit ID required.");
    return true;
  }

  getBadgeStyle() {
    return "bg-indigo-950 text-indigo-300 border-indigo-500/40";
  }

  getHealthScore() {
    return this.#passingScore >= 80 ? 100 : 85;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      unitId: this.#unitId,
      title: this.#title,
      level: this.#level,
      passingScore: this.#passingScore
    };
  }
}

/**
 * 5. HomeworkEntity (INHERITANCE, ENCAPSULATION, POLYMORPHISM)
 */
export class HomeworkEntity extends AbstractEntity {
  #studentName;
  #assignment;
  #score;
  #feedback;

  constructor(data = {}) {
    super(data.id, data.createdAt, data.updatedAt);
    this.#studentName = data.studentName || '';
    this.#assignment = data.assignment || '';
    this.#score = Number(data.score || 0);
    this.#feedback = data.feedback || '';
  }

  get studentName() { return this.#studentName; }
  get assignment() { return this.#assignment; }
  get score() { return this.#score; }
  get feedback() { return this.#feedback; }

  validate() {
    if (!this.#studentName) throw new Error("Student name required.");
    return true;
  }

  getBadgeStyle() {
    return "bg-emerald-950 text-emerald-300 border-emerald-500/40";
  }

  getHealthScore() {
    return this.#score >= 80 ? 100 : 70;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      studentName: this.#studentName,
      assignment: this.#assignment,
      score: this.#score,
      feedback: this.#feedback
    };
  }
}
