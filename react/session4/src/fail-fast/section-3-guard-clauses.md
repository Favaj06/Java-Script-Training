# Section 3 – Guard Clauses

## Task 3.1

The validation logic was refactored so that the cheapest checks execute first.

Current order:

1. Null check
2. Type check
3. Required field check
4. Range validation

This ensures invalid input is rejected before any unnecessary work is performed.

### Comment

Previously, validation immediately accessed object properties without first confirming that the input existed or had the expected type.

The refactored version performs guard clauses first, making the function fail fast.

---

## Task 3.2

Guard clause order was updated to execute inexpensive validations before more expensive business rules.

### Before

1. Name validation
2. Score validation

### After

1. Null check
2. Type check
3. Required field validation
4. Range validation

---

## Task 3.3

Added guard clause tests for:

- Missing form
- Empty name
- Score below 0
- Score above 100

### Comment

Testing the service function is significantly easier than testing the same behavior through a React hook or component because it requires no rendering, React state, or mocked dependencies.