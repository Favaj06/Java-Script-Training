# Section 2 – Coverage as a Quality Signal

## Task 2.1 – Read the Coverage Report

### Coverage Summary

| Metric | Percentage |
|--------|-----------:|
| Overall Statement Coverage | **90.43%** |
| Overall Branch Coverage | **82.85%** |
| Overall Function Coverage | **86.66%** |
| Overall Line Coverage | **91.50%** |

### Lowest Branch Coverage

- **File:** `utils/generate-id.ts`
- **Branch Coverage:** **0%**

### One Uncovered Branch

The branch in `generate-id.ts` (lines **2–3**) is not covered by the current unit tests.

### Comment

To improve branch coverage, I would add a unit test that verifies the uncovered execution path in the ID generation logic.

Example test:

```ts
describe("generateId", () => {
  it("returns a unique id when called multiple times", () => {
    // Test implementation
  });
});
```

---

## Task 2.3 – Enforce a Coverage Threshold

### Threshold Configuration

```ts
test: {
  coverage: {
    provider: "v8",
    thresholds: {
      statements: 75,
      branches: 70,
      functions: 75,
      lines: 75,
    },
  },
},
```

### Result

| Metric | Threshold | Actual | Status |
|--------|----------:|-------:|:------:|
| Statements | 75% | 90.43% | ✅ Pass |
| Branches | 70% | 82.85% | ✅ Pass |
| Functions | 75% | 86.66% | ✅ Pass |
| Lines | 75% | 91.50% | ✅ Pass |

### Comment

The coverage report passed all configured thresholds. Every metric is above the required minimum, so no additional tests are required to satisfy the quality gate.

### Observation

After verifying that the coverage thresholds pass, remove the temporary threshold configuration from the Vitest configuration so it does not affect future development work.