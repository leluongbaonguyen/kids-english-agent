import { VocabEntity, UserEntity, SrsEntity, LessonEntity, HomeworkEntity } from './DomainModels.js';

/**
 * ABSTRACT REPOSITORY (ABSTRACTION & ENCAPSULATION)
 */
export class AbstractRepository {
  constructor() {
    if (new.target === AbstractRepository) {
      throw new Error("Cannot instantiate AbstractRepository directly.");
    }
  }

  async findAll() { throw new Error("Method findAll() must be implemented."); }
  async findById(id) { throw new Error("Method findById() must be implemented."); }
  async save(entity) { throw new Error("Method save() must be implemented."); }
  async delete(id) { throw new Error("Method delete() must be implemented."); }
}

/**
 * CONCRETE SYSTEM REPOSITORY (INHERITANCE & POLYMORPHISM)
 */
export class SystemRepository extends AbstractRepository {
  #storageKey;
  #entityClass;

  constructor(storageKey, entityClass) {
    super();
    this.#storageKey = storageKey;
    this.#entityClass = entityClass;
  }

  async findAll() {
    try {
      const raw = localStorage.getItem(this.#storageKey);
      if (!raw) return [];
      const items = JSON.parse(raw);
      return items.map(item => new this.#entityClass(item));
    } catch {
      return [];
    }
  }

  async save(entityInstance) {
    if (!(entityInstance instanceof this.#entityClass)) {
      entityInstance = new this.#entityClass(entityInstance);
    }
    entityInstance.validate();

    const currentList = await this.findAll();
    const existingIdx = currentList.findIndex(item => item.id === entityInstance.id);

    if (existingIdx >= 0) {
      currentList[existingIdx] = entityInstance;
    } else {
      currentList.unshift(entityInstance);
    }

    const plainObjects = currentList.map(item => item.toJSON());
    localStorage.setItem(this.#storageKey, JSON.stringify(plainObjects));
    return entityInstance;
  }

  async delete(id) {
    const currentList = await this.findAll();
    const filtered = currentList.filter(item => item.id !== id);
    const plainObjects = filtered.map(item => item.toJSON());
    localStorage.setItem(this.#storageKey, JSON.stringify(plainObjects));
    return true;
  }
}

// Instantiate Concrete Repositories
export const vocabRepository = new SystemRepository('oop_vocab_db', VocabEntity);
export const userRepository = new SystemRepository('oop_users_db', UserEntity);
export const srsRepository = new SystemRepository('oop_srs_db', SrsEntity);
export const lessonRepository = new SystemRepository('oop_lessons_db', LessonEntity);
export const homeworkRepository = new SystemRepository('oop_homework_db', HomeworkEntity);
