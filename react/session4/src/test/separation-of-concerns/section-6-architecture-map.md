# Section 6 – Architecture Map

## Task 6.1 – Dependency Diagram

### Current Architecture

```
AddInternForm.tsx
└── calls useInternForm (Coordination Hook)
    ├── calls validateInternForm (Service)
    ├── calls injected addIntern()
    └── generates form submission

InternProvider
└── provides Intern Context
    ├── exposes interns
    ├── exposes addIntern()
    └── exposes removeIntern()

useInternSearch
└── calls filterInterns (Service)
└── calls calculateAverageScore (Service)

useInternRepository
└── manages React state
    ├── add()
    ├── remove()
    └── update()

intern-service
├── createIntern()
├── validateInternForm()
├── calculateAverageScore()
├── filterInterns()
└── getScoreLabel()
```

---

### Comment

No dependency points upward.

The dependency flow always moves from higher-level UI components toward lower-level service and repository layers.

There are no circular dependencies.

---

## Task 6.2 – The One-Sentence Test (Revisited)

### Before vs After

```ts
// intern-context.tsx
// BEFORE:
// Manages intern state and provides context.

// AFTER:
// Provides the intern context and exposes application state to consumers.


// useInternForm.ts
// BEFORE:
// Handles form state and validation.

// AFTER:
// Coordinates UI events, validation, and intern submission.


// useInternSearch.ts
// BEFORE:
// Handles searching and statistics.

// AFTER:
// Coordinates search state while delegating filtering and calculations to the service layer.


// AddInternForm.tsx
// BEFORE:
// Displays the intern form.

// AFTER:
// Renders the form UI and delegates all business logic to useInternForm.


// intern-service.ts
// BEFORE:
// Did not exist.

// AFTER:
// Contains all reusable business logic for the intern domain.


// intern-repository.ts
// BEFORE:
// Did not exist.

// AFTER:
// Manages intern state without containing business logic.
```

---

### Comment

Most files became easier to describe with a single sentence because responsibilities are now more clearly separated.

The most difficult file to describe in one sentence is **`useInternForm.ts`**, because it acts as a coordination hook between the UI, service layer, and context instead of belonging entirely to a single architectural layer.