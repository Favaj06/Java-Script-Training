# Section 5 – Assertions

## Task 5.1 – Assert Helper

Created a reusable assertion helper in:

```
src/utils/assert.ts
```

The helper throws immediately when a required precondition is violated.

Unit tests were added to verify:

- Assertion succeeds when the condition is true.
- Assertion throws the correct error when the condition is false.

---

## Task 5.2 – Precondition Assertions

Added assertions to `validateInternForm()`.

Current preconditions:

1. Form must be an object.
2. Name must be a string.
3. Score must be a number.

### Comment

Assertions verify programmer assumptions.

Validation verifies user input.

Assertions throw immediately because the function has been called incorrectly, whereas validation returns user-friendly messages so the UI can display them.

---

## Task 5.3 – Postcondition Assertion

Added a postcondition assertion to `filterInterns()`.

```
assert(
  Array.isArray(result),
  'filterInterns: result must be an array'
)
```

### Comment

Today this assertion is mostly documentation because JavaScript's `filter()` always returns an array.

However, it becomes valuable if the implementation changes in the future or the function is refactored, because it immediately detects unexpected behavior.