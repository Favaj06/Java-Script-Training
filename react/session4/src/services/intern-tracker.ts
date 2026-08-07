// intern-tracker.ts

import type { Intern } from "../types/intern";

/*
Section 1 Answers

A caller should not access these fields directly.
The class should expose only public methods such as loadAll(), getAll(), and getById().

_buildUrl() and _updateCache() are internal helper methods and should remain private.

API_KEY and DEFAULT_LIMIT are implementation details and should not be exported.

If the implementation changes from a REST API to a local JSON file,
only the internals of loadAll() and apiUrl would change.
Callers would not break because they still use loadAll().
*/

class InternTracker {
  #interns: Intern[] = [
    { id: 1, name: "Ava", score: 0, role: "Intern", isPresent: true },
    { id: 2, name: "Noah", score: 0, role: "Intern", isPresent: true },
    { id: 3, name: "Mia", score: 0, role: "Intern", isPresent: true },
  ];
  #apiUrl: string = "/api/interns";
  #lastFetchedAt: Date = new Date(0);
  #localCache: Map<number, Intern> = new Map();

  constructor() {
    for (const intern of this.#interns) {
      this.#updateCache(intern);
    }
  }

  async loadAll(): Promise<void> {
    const res = await fetch(this.#apiUrl);

    this.#interns = await res.json();
    this.#lastFetchedAt = new Date();

    for (const intern of this.#interns) {
      this.#updateCache(intern);
    }
  }

  getAll(): readonly Intern[] {
    return this.#interns;
  }

  getById(id: number): Intern | undefined {
    return this.#localCache.get(id);
  }
  updateScore(internId: number, score: number): void {
    if (score < 0 || score > 100) {
      throw new RangeError("Score must be between 0 and 100");
    }

    const intern =
      this.#interns.find((intern) => intern.id === internId) ??
      this.#localCache.get(internId);

    if (!intern) {
      throw new Error("Intern not found");
    }

    intern.score = score;
    this.#updateCache(intern);
  }
  #buildUrl(id: number): string {
    return `${this.#apiUrl}/${id}`;
  }

  #updateCache(intern: Intern): void {
    this.#localCache.set(intern.id, intern);
  }
}

export type { Intern };
export { InternTracker };

/*
Section 2 Check

tracker.interns ❌ Not accessible

tracker.apiUrl = "/fake" ❌ Not allowed

Only loadAll(), getAll(), and getById() are publicly accessible.

Encapsulation is working correctly.
*/