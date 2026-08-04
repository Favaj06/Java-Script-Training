# Section 4 – Understanding CI/CD

## Task 4.1 – Map the Pipeline Stages

| Stage | What Runs | What It Checks | Blocks Merge If? |
|-------|-----------|----------------|------------------|
| On every push | Unit tests (`npm run test:run`) | Checks business logic and component behavior | Yes, if unit tests fail |
| On every pull request | Unit tests, coverage, and E2E tests | Checks code quality, coverage, and complete user workflows | Yes, if any test fails |
| Before merge to main | Complete CI pipeline | Ensures all quality checks pass before merging | Yes |

### Comment

Unit tests are executed on every push because they are fast and provide immediate feedback to developers. End-to-end tests are slower and consume more resources, so they are typically executed during pull requests. This approach balances fast development feedback with comprehensive application testing before code is merged.

---

## Task 4.2 – Pipeline Configuration

### 1. What is the trigger for this pipeline?

The pipeline runs on:

- Every push to any branch.
- Every pull request targeting the `main` branch.

---

### 2. Why does `e2e-tests` have `needs: unit-tests`?

The `e2e-tests` job depends on the successful completion of the `unit-tests` job. If the unit tests fail, the E2E tests do not run, saving execution time and CI resources.

---

### 3. What commands run in the `unit-tests` job?

```bash
npm ci
npm run test:run
npm run test:coverage
```

These commands:

- Install project dependencies.
- Execute unit and component tests.
- Generate and verify the code coverage report.

---

### 4. If `npm run test:coverage` fails the threshold, can the E2E tests still run?

No.

Because the `e2e-tests` job depends on the successful completion of the `unit-tests` job, a coverage threshold failure causes the pipeline to stop before E2E tests are executed.

---

### 5. What would you add to block a merge if coverage drops below 80%?

I would configure the coverage thresholds in Vitest and require the CI pipeline to pass before allowing a pull request to be merged into the `main` branch.

---

## Task 4.3 – Pipeline Health Audit

| Risk | Yes / No | File or Test Name |
|------|----------|-------------------|
| Any test that uses `test.skip`? | Yes | `src/test/violations/violation-1.test.ts`, `violation-2.test.ts`, `violation-3.test.ts`, `violation-4.test.ts` |
| Any test that uses `console.log` (not asserted)? | Yes | `src/components/InternRow.test.tsx` |
| Any test that calls `fetch` without mocking? | No | None identified |
| Any test that calls `new Date()` inline? | No | None identified |
| Any test over 500ms? | Yes | `AddInternForm.test.tsx`, `InternRow.test.tsx`, `Navbar.test.tsx` |
| Any flaky test? | No | All tests passed consistently during repeated runs |

### Comment

- **Skipped tests:** Complete the tests or remove unnecessary `test.skip`.
- **Console logs:** Remove debugging logs or replace them with assertions.
- **Slow tests:** Optimize rendering, mocks, or repeated setup to improve execution time.
- **Fetch calls:** Always mock network requests in unit tests.
- **Flaky tests:** Ensure tests are deterministic and independent so they produce consistent results across multiple executions.