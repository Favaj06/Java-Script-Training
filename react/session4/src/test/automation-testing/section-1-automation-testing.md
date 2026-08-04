# Section 1 – Understanding the Test Pyramid

## Task 1.1 – Count Your Tests by Layer

| Layer | Tool | # Tests | Duration |
|-------|------|---------:|----------:|
| Unit / Hook | Vitest | 38 | ~0.30 s |
| Component (RTL) | Vitest + RTL | 36 | ~6.25 s |
| End-to-end | Playwright | 22 | 29.4 s |
| **Total** | | **96** | |

### Comment

My test suite is reasonably close to a test pyramid. It contains a larger number of unit and component tests than end-to-end tests. This structure provides fast feedback during development while still ensuring that critical user journeys are validated through Playwright E2E tests.

---

## Task 1.2 – Classification of Existing Tests

### Unit / Hook Tests

- `src/hooks/useInternForm.test.ts`
- `src/hooks/useInternSearch.test.tsx`
- `src/hooks/useCounter.test.ts`
- `src/test/intern-validation.test.ts`
- `src/test/intern-utils.test.ts`
- `src/test/generate-id.test.ts`
- `src/test/intern-request.test.ts`
- `src/test/global-state-bug.test.ts`
- `src/test/global-state-fixed.test.ts`
- `src/test/fixes/fix-1.test.ts`
- `src/test/fixes/fix-2.test.ts`
- `src/test/fixes/fix-3.test.ts`
- `src/test/fixes/fix-4.test.ts`
- `src/test/ScoreStats.isolated.test.tsx`

### Component Tests

- `src/components/AddInternForm.test.tsx`
- `src/components/InternRow.test.tsx`
- `src/components/Navbar.test.tsx`
- `src/components/ScoreStats.test.tsx`
- `src/components/ScoreStats.isolated.test.tsx`
- `src/components/QueryDemo.test.tsx`
- `src/components/ThemedCard.test.tsx`
- `src/contexts/intern-context.test.tsx`
- `src/test/self-learning.test.tsx`

### End-to-End Tests

- `tests/intern-dashboard.spec.ts`

### Comment

Yes. Some user interface validation scenarios currently covered by end-to-end tests could also be verified using unit or component tests. Lower-level tests execute faster, are easier to maintain, and help isolate failures. However, end-to-end tests remain essential because they verify complete user workflows in a real browser and provide confidence that the application works as expected from the user's perspective.