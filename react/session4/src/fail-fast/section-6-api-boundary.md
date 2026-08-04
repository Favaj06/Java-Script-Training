# Section 6 – Fail Fast at the API Boundary

## Task 6.1 – API Boundary Validation

The project does not consume a real API, so the InternProvider was treated as the application's data entry point.

A validation function (`validateInternResponse`) was added before updating React state.

Validation checks:

- Input is an array.
- Every item is an object.
- Name is a non-empty string.
- Score is a number between 0 and 100.

### Comment

Without validation, malformed data could be stored in application state and cause failures later during rendering.

With fail-fast validation, invalid data is rejected immediately before the state is updated, making the source of the problem much easier to identify.

---

## Task 6.2 – Configuration Validation

A startup configuration file (`src/config.ts`) was created.

It validates required configuration values during application startup.

### Comment

The configuration check runs at import time.

This follows the Fail Fast principle because configuration errors are detected immediately when the application starts instead of much later when a feature first accesses the configuration.

Early failure makes configuration problems much easier to diagnose.