## Refactoring Priority List

1. Missing validation in `src/contexts/intern-context.tsx`
   - Invalid intern objects can be stored in application state, causing bugs throughout the application.

2. Nested conditional in `src/hooks/useInternForm.ts`
   - The nested ternary inside `handleChange()` reduces readability and makes future changes difficult.

3. Magic numbers in `src/utils/intern-validation.ts`
   - The values `0` and `100` are repeated business rules that should be extracted into named constants for maintainability.