# Silent Failure Priority List

1. `handleSubmit()` in `useInternForm.ts`
   - Risk: The function returns `false` when validation fails. If the caller ignores the return value, the failure is silent.

2. `addIntern()` in `intern-context.tsx`
   - Risk: Invalid Intern objects can be added without validation, leading to inconsistent application state.

3. `calculateAverageScore()` in `intern-service.ts`
   - Risk: Returning `0` for an empty list hides the difference between "no data" and a genuine average of zero.

## Guard Clause Order — validateInternForm

### Before

1. Empty name check
2. Score range check

### After

1. Null check
2. Type check
3. Empty name check
4. Score type check
5. Score range check

### Reason for Reordering

The cheapest validations now execute first. Invalid input is rejected immediately before any additional processing occurs, making the function easier to understand and preventing unnecessary work.