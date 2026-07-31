# Engineering First Principles Activity – Answers

---

# Section 1 – Testability Audit

## Task 1.1

### useInternForm.ts

- Predictable Output: PARTIAL – depends on React hook state.
- External Dependencies: NO – depends on React hooks.
- Dependencies Injectable: PARTIAL – validation logic was originally embedded.
- Verdict: Moderately Testable.

### useInternSearch.ts

- Predictable Output: PARTIAL – depends on hook state.
- External Dependencies: NO – depends on React hooks.
- Dependencies Injectable: PARTIAL – filtering logic was initially inside the hook.
- Verdict: Moderately Testable.

### intern-context.tsx

- Predictable Output: PARTIAL – depends on React state.
- External Dependencies: YES – uses React Context and asynchronous loading.
- Dependencies Injectable: PARTIAL.
- Verdict: Low Testability.

### ScoreStats.tsx

- Predictable Output: YES.
- External Dependencies: YES – depends on InternContext.
- Dependencies Injectable: PARTIAL.
- Verdict: Moderately Testable.

---

# Section 2 – Avoiding Global State

## Observation

The global-state tests fail because all tests share the same module-level state. One test modifies the global array and later tests read the modified value. This violates the FIRST principles of Independent and Repeatable tests.

## Fix

The solution was to replace the shared mutable global state with pure functions that return new values instead of modifying shared variables.

---

# Section 3 – Pure Functions

## Task 3.1

The filtering logic was extracted into a reusable pure function named `filterInterns`.

Benefits:

- Easier to test.
- Reusable.
- Independent of React.
- No rendering required.

---

## Task 3.2

Validation logic was extracted into a pure function named `validateInternForm`.

Benefits:

- No React dependency.
- Simple unit tests.
- Faster execution.
- Better maintainability.

---

## Observation

After extracting pure functions, almost no Arrange code was needed in the tests. The functions could be tested directly without rendering React components or mocking Context.

---

# Section 4 – Spotting Untestable Code

## Task 4.1

### Snippet A

Pattern:
Hard-coded dependency.

FIRST Principle Violated:
Repeatable.

Fix:
Inject the clock and random generator.

---

### Snippet B

Pattern:
Hard-coded dependency.

FIRST Principle Violated:
Independent.

Fix:
Inject the analytics service.

---

### Snippet C

Pattern:
Multiple responsibilities / Side effects.

FIRST Principle Violated:

- Fast
- Independent
- Repeatable

Fix:

Split into:

- payload preparation
- API request
- navigation
- localStorage update

---

### Snippet D

Pattern:
Global State.

FIRST Principle Violated:

- Independent
- Repeatable

Fix:

Avoid module-level mutable variables.

---

## Task 4.2

generateInternId was refactored to receive:

- now()
- random()

through dependency injection.

Benefits:

- deterministic output
- repeatable tests
- no mocking Date.now()

---

## Task 4.3

The request preparation logic was extracted into a pure function.

The fetch implementation became injectable.

Navigation and localStorage remained inside the UI layer.

Benefits:

- business logic became testable
- no fetch mocking required

---

# Section 5 – Dependency Injection

**Note:**
The provided repository version differed from the activity instructions. The repository contained `ScoreStats.tsx` instead of `SummaryBar.tsx`, and the existing `InternProvider` implementation differed from the activity. Therefore, the Dependency Injection concepts were adapted to the existing codebase while preserving the intended software engineering principles.

## Task 5.1

Dependency Injection was demonstrated by allowing external dependencies to be supplied instead of hard-coding them inside the logic.

Benefits:

- easier testing
- reusable logic
- less coupling

---

## Task 5.2

`ScoreStats` was separated into:

- Container component
- Presentational component

The presentational component receives all required values through props.

Observation:

- No Provider required.
- No Context mocking required.
- Tests became much simpler.

---

## Task 5.3

Filtering was made injectable.

Instead of hard-coding the filtering implementation, the hook accepts a filtering function.

Benefits:

- custom filtering strategies
- easy mocking
- easier testing

Observation:

Injecting every dependency is not always necessary. It is useful only when it improves testing or flexibility.

---

# Section 6 – Refactoring for Testability

## Task 6.1

Before Refactoring:

- validation inside hook
- more setup
- tighter coupling
- harder to test

After Refactoring:

- validation extracted
- dependency injection used
- smaller Arrange section
- simpler tests
- easier maintenance

Observation:

The Arrange phase became significantly shorter because dependencies could be supplied directly using `vi.fn()` instead of requiring React setup.

---

## Task 6.2 – FIRST Audit

| Test | Fast | Independent | Repeatable | Self-validating | Timely |
|------|------|-------------|------------|-----------------|--------|
| validateInternForm | ✅ | ✅ | ✅ | ✅ | ✅ |
| useInternForm | ✅ | ✅ | ✅ | ✅ | ✅ |
| ScoreStats | ✅ | ✅ | ✅ | ✅ | ✅ |
| useInternSearch | ✅ | ✅ | ✅ | ✅ | ✅ |


## Terminal Output:
% Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   85.29 |    81.81 |   81.25 |   90.32 |                   
 contexts          |   60.86 |    66.66 |      40 |   73.68 |                   
  ...n-context.tsx |   60.86 |    66.66 |      40 |   73.68 | 85-95,116         
 hooks             |     100 |       80 |     100 |     100 |                   
  useInternForm.ts |     100 |    83.33 |     100 |     100 | 64,88             
  ...ternSearch.ts |     100 |    66.66 |     100 |     100 | 52                
 utils             |      80 |    83.33 |     100 |      80 |                   
  ...validation.ts |      80 |    83.33 |     100 |      80 | 10                
-------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 85.29% ( 58/68 )
Branches     : 81.81% ( 27/33 )
Functions    : 81.25% ( 26/32 )
Lines        : 90.32% ( 56/62 )
---

## Comment

The greatest improvement came from extracting validation into a pure function and introducing dependency injection.

Tests became:

- shorter
- faster
- independent
- easier to understand
- easier to maintain

---

# Explore 1

Extracting `validateInternForm` and `filterInterns` into pure functions does not automatically increase coverage.

Coverage only increases when those functions are executed by tests.

Pure functions are easier to test because they do not depend on React or Context.

---

# Explore 2

Testing `InternProvider` with real children requires more setup because the Provider must be rendered.

Injecting dependencies with `vi.fn()` reduces setup and makes tests more isolated.

---

# Explore 3

Replacing `Date.now()` or `new Date()` with an injected clock makes tests deterministic.

Instead of mocking global objects, tests simply pass a fixed implementation.

This improves repeatability.

---

# Explore 4

Including the injected filtering function in the `useMemo` dependency array ensures the memoized result updates whenever the filtering implementation changes.

The default filtering function remains stable, so unnecessary re-renders are avoided.

---

# Final Result

## Test Results

- Test Files Passed: 4/4
- Tests Passed: 16/16

## Coverage

- Statements: 85.29%
- Branches: 81.81%
- Functions: 81.25%
- Lines: 90.32%

---
