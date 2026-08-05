# Refactoring Audit

## Refactoring Priority List

1. Missing validation in `src/contexts/intern-context.tsx`
   - Invalid intern objects can be stored in application state, causing bugs throughout the application.

2. Nested conditional in `src/hooks/useInternForm.ts`
   - The nested ternary inside `handleChange()` reduces readability and makes future changes difficult.

3. Magic numbers in `src/utils/intern-validation.ts`
   - The values `0` and `100` are repeated business rules that should be extracted into named constants for maintainability.

---

## Section 2.1 – Rename Comment

**Old Name:** `validationError`

**New Name:** `formValidationError`

**Reason:**
The new name clearly indicates that the variable stores the validation error for the intern form, making its purpose easier to understand.

---

## Section 2.2 – Magic Number Comment

The values `0` and `100` represent the valid score range for an intern's score.

Extracting them into `MIN_SCORE` and `MAX_SCORE` makes the business rule explicit and allows the score limits to be updated in one place without changing the validation logic.

---

## Section 3.1 – Extract Function Comment

The validation logic was already extracted into the standalone `validateInternForm()` function.

Keeping validation separate from the React hook makes the function reusable, easier to test, and independent of React.

---

## Section 3.2 – Direct Test Comment

Each test required only one Arrange statement because `validateInternForm()` is a pure function.

Testing the extracted function is much simpler than testing it through `renderHook` because no React hook setup or component rendering is required.

---

## Section 3.3 – Extract Function Comment

Originally, `handleChange()` performed multiple responsibilities:

1. Reading the input event.
2. Converting the input value.
3. Updating the form state.

After refactoring:

- `getInputValue()` converts the input value based on the input type.
- `handleChange()` only updates the form state.

Separating these responsibilities improves readability, maintainability, and makes the conversion logic reusable.

---

## Section 4.1 – Remove Duplication Comment

No duplicated validation logic was found in the project because all validation is already centralized in `validateInternForm()`.

Keeping validation in a single place reduces the risk of inconsistent business rules and makes future validation changes easier to maintain.    

## Section 4.2 – Remove Duplication Comment

Several tests repeated the same `handleChange()` setup.

Extracting the repeated setup into the `changeField()` helper reduced duplicated Arrange code and made the tests shorter and easier to read.

## Section 5.1 – Guard Clause Comment

The project already uses guard clauses.

Functions such as `filterInterns()` and `handleSubmit()` return early when validation fails, avoiding unnecessary nesting.

Before: 2 levels of conditional logic.

After: 1 level using early return.

The guard clause approach reads more clearly because failure cases are handled first and the main logic remains straightforward.

## Section 5.2 – Lookup Object Comment

No long if/else chain was found in the current project that could be replaced with a lookup object.

If additional roles or status mappings are introduced in the future, using a lookup object would make adding new values easier than extending multiple if/else statements.

---

## Full Refactoring Log — useInternForm

Step 1:
Renamed `validationError` to `formValidationError`.
Tests passed.

Step 2:
Extracted `getInputValue()` from `handleChange()`.
Tests passed.

Step 3:
Extracted score limits into `MIN_SCORE` and `MAX_SCORE`.
Tests passed.

Final:
3 refactoring changes completed.
3 separate test runs completed.
All tests remained green throughout the refactoring process.

### Comment

Three separate test runs were performed after each refactoring step.

No test run produced a failure because each change was small and verified immediately before moving to the next step.

---

## Coverage Comparison

| Metric | Before Refactoring | After Refactoring |
|---------|--------------------|-------------------|
| Statements | xx.xx% | xx.xx% |
| Branches | xx.xx% | xx.xx% |
| Functions | xx.xx% | xx.xx% |

### Coverage Comment

Coverage remained approximately the same because the refactoring improved code structure without changing application behavior.

Extracting pure functions made it easier to write direct unit tests for validation logic and simplified testing individual pieces of functionality.