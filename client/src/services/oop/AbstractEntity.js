/**
 * Abstract Base Class for Domain Entities
 * Demonstrates ABSTRACTION, ENCAPSULATION & POLYMORPHISM
 */
export class AbstractEntity {
  #id;
  #createdAt;
  #updatedAt;

  constructor(id, createdAt = new Date().toISOString(), updatedAt = new Date().toISOString()) {
    if (new.target === AbstractEntity) {
      throw new Error("Cannot instantiate AbstractEntity directly. Use concrete subclasses.");
    }
    this.#id = id || `ent_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  // Encapsulated Getters
  get id() { return this.#id; }
  get createdAt() { return this.#createdAt; }
  get updatedAt() { return this.#updatedAt; }

  // Abstract methods to be overridden by subclasses (Polymorphism)
  validate() {
    throw new Error("Abstract method validate() must be implemented by subclass.");
  }

  getBadgeStyle() {
    return "bg-slate-800 text-slate-300 border-slate-700";
  }

  getHealthScore() {
    return 100;
  }

  touch() {
    this.#updatedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.#id,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt
    };
  }
}
