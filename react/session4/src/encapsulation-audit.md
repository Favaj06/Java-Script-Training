# Section 1 — Spot the Violations

```ts
export class InternTracker {
  interns: Intern[] = []; // Violation: Should be private because callers should not modify the intern list directly.

  apiUrl: string = '/api/interns'; // Violation: Should be private because the API URL is an implementation detail.

  lastFetchedAt: Date = new Date(0); // Violation: Should be private because it is internal state.

  _localCache: Map<number, Intern> = new Map(); // Violation: Should be private because the cache is an internal implementation detail.

  async loadAll(): Promise<void> {
    const res = await fetch(this.apiUrl);
    this.interns = await res.json();
    this.lastFetchedAt = new Date();
  }

  _buildUrl(id: number): string {
    // Violation: Should be private because it is an internal helper method.
    return `${this.apiUrl}/${id}`;
  }

  _updateCache(intern: Intern): void {
    // Violation: Should be private because it is used only inside the class.
    this._localCache.set(intern.id, intern);
  }
}

export const API_KEY = "intern-tracker-v1"; // Violation: Should not be exported because it is an implementation detail.

export const DEFAULT_LIMIT = 50; // Violation: Should not be exported because it is an implementation detail.
```

## Answers

1. A caller should not access these fields directly. The class should expose only public methods such as `loadAll()`, `getAll()`, and `getById()`.

2. `_buildUrl()` and `_updateCache()` are internal helper methods and should remain private.

3. `API_KEY` and `DEFAULT_LIMIT` are implementation details and should not be exported.

4. If the implementation changes from a REST API to a local JSON file, only the internals of `loadAll()` and `apiUrl` would change. Callers would not break because they still use `loadAll()`.