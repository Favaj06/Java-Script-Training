# Section 1 – Recognising Concerns

## Task 1.1 – The One-Sentence Test

```ts
// src/contexts/intern-context.tsx
// Job: "This file provides the intern context and manages the application's intern state."
// Concerns mixed (if any): State management, loading data, adding interns, removing interns.


// src/hooks/useInternForm.ts
// Job: "This hook manages the intern form state, validation, and submission."
// Concerns mixed (if any): Form state management, validation, submission coordination.


// src/hooks/useInternSearch.ts
// Job: "This hook manages the search query and filters interns."
// Concerns mixed (if any): Search state and filtering logic.


// src/components/SummaryBar.tsx
// Job: "This component displays summary information about interns."
// Concerns mixed (if any): None (mainly presentation).


// src/components/AddInternForm.tsx
// Job: "This component renders the form used to add a new intern."
// Concerns mixed (if any): UI rendering and event handling.
```

### Comment

The file that mixes the most concerns is **`intern-context.tsx`**.

It currently handles multiple responsibilities:

- State management
- Loading initial intern data
- Adding interns
- Removing interns
- Context creation
- Context provider wiring

Because it performs several unrelated responsibilities, it is the best candidate for refactoring into separate service and repository layers.

---

## Task 1.2 – Label the Violations

### Snippet A

| Code | Current Layer | Should Be | Why? |
|------|---------------|-----------|------|
| `if (!form.name.trim()) return` | Context | Service | Validation is business logic. |
| `const id = Date.now()` | Context | Service | ID generation is business logic. |
| `const score = Math.round(form.score)` | Context | Service | Score transformation is business logic. |
| `setInterns(...)` | Context | Repository | State management belongs in the repository layer. |

---

### Snippet B

| Current Layer | Should Be | Why? |
|---------------|-----------|------|
| UI Component | Repository (or data access hook) | Components should render UI, not fetch data directly. |

---

### Snippet C

| Current Layer | Should Be | Why? |
|---------------|-----------|------|
| Utility | UI Component | Utilities should return data, not JSX elements. Rendering belongs in the UI layer. |

---

### Snippet D

| Current Layer | Should Be | Why? |
|---------------|-----------|------|
| Context | Service | Filtering is business logic and should be implemented as a reusable pure function. |

---

### Comment

Snippet A contains **four distinct concerns**:

1. Validation
2. ID generation
3. Score transformation
4. State management

The concern that requires the most setup when writing tests is **state management**, because it depends on React state and the context provider, whereas the other three concerns can be tested as simple pure functions.