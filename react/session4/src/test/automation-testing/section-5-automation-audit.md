# Section 5 – Putting It All Together

## Task 5.1 – Write the Missing Pyramid Layer

| Feature | Unit Test? | Component Test? | E2E Test? | What's Missing? |
|---------|:----------:|:---------------:|:---------:|-----------------|
| Score validation (0–100) | ✅ | ❌ | ❌ | Component test |
| Attendance toggle (isPresent) | ❌ | ✅ | ❌ | Unit test |
| Search filtering by name | ✅ | ✅ | ❌ | E2E test |
| Add intern form submission | ✅ | ✅ | ✅ | None |

### Most Valuable Test to Add

A **Component Test** for the score validation feature would provide the highest confidence with the least setup cost. It verifies that invalid scores display the correct validation message without requiring a full browser-based E2E test.

---

## Task 5.2 – Automation Audit

### 1. Coverage

- **Branch Coverage:** **85.71%**
- **Lowest Branch Coverage File:** `InternListWithCallback.tsx` (50%)

---

### 2. Speed

The slowest individual test is:

- `AddInternForm.test.tsx`

Reason:

This test renders the complete form, simulates multiple user interactions, and performs DOM assertions, making it slower than pure unit tests.

---

### 3. Pyramid Shape

The project has a healthy testing structure.

- Unit Tests: ✔️
- Component Tests: ✔️
- E2E Tests: ✔️

The project contains more unit and component tests than end-to-end tests, which follows the Test Pyramid principle.

---

### 4. Critical User Journeys

The three most important user journeys are:

1. Add a new intern.
2. Search interns by name.
3. Remove an existing intern.

These critical user journeys are covered by Playwright end-to-end tests.

---

### 5. What Breaks Silently?

If `intern-context.tsx` returned interns in a different order:

**Tests that would catch it**

- Context tests
- Component rendering tests
- Playwright E2E tests that verify displayed order

**Tests that would not catch it**

- Utility function tests
- Validation tests
- Hook tests that do not verify rendering order

---

### Comment

The current automation suite provides good confidence because it combines unit, component, and end-to-end testing. Increasing coverage for lower-covered components and keeping tests fast and deterministic will further improve pipeline reliability.