# Section 1 – Identify Silent Failures

## Task 1.1 – Silent Failure Audit

### useInternForm.ts

**Silent failures found:**

- `validateInternForm()` returns `null` for valid input instead of returning an explicit success result.
- `handleSubmit()` returns `false` when validation fails. If the caller ignores the return value, the failure is silent.
- `generateId()` defaults to `Date.now()`, assuming a valid ID generator is always available.

**Highest risk**

The highest-risk silent failure is `handleSubmit()` returning `false`. If the caller does not check the returned value, the failed submission can go unnoticed.

---

### useInternSearch.ts

**Silent failures found:**

- `filterInterns()` returns the original intern list when the search query is empty.
- `calculateAverageScore()` returns `0` when the intern list is empty.

**Highest risk**

Returning `0` for an empty list can hide the difference between "no interns available" and "the average score is actually zero."

---

### intern-context.tsx

**Silent failures found:**

- `addIntern()` accepts any `Intern` object without additional validation.
- `removeIntern()` silently does nothing if the supplied ID does not exist.

**Highest risk**

Adding invalid intern objects may corrupt application state and make later bugs difficult to diagnose.

---

### intern-service.ts

**Silent failures found:**

- `validateInternForm()` returns `null` for valid input.
- `calculateAverageScore()` returns `0` when the list is empty.
- `filterInterns()` returns the original list when the search query is empty.

**Highest risk**

Returning `0` for an empty list hides whether there is no data or whether the calculated average is genuinely zero.

---

## Task 1.2 – Silent Failure Priority List

1. **handleSubmit()** in `useInternForm.ts`
   - Returns `false` when validation fails. If the caller ignores the result, the failure is silent.

2. **addIntern()** in `intern-context.tsx`
   - Accepts any `Intern` object without validation, allowing invalid data into application state.

3. **calculateAverageScore()** in `intern-service.ts`
   - Returns `0` for an empty list, making it impossible to distinguish between "no data" and a real average of zero.

---

## Observation

The current intern dashboard already follows good engineering practices because there are no swallowed exceptions, empty `catch` blocks, or hidden network failures. Most remaining silent failures are related to default return values and ignored boolean results rather than exception handling.