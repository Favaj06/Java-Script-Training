# Section 3 – Making the Quality Gate Work

## Task 3.1 – Observe a Failing Quality Gate

### Deliberate Bug Introduced

Changed the validation message from:

```ts
if (!name.trim()) return "Name is required";
```

to

```ts
if (!name.trim()) return "Wrong message";
```

### Command Executed

```bash
npm run test:run
```

### Observation

#### Failed Test Files

- `src/components/AddInternForm.test.tsx`
- `src/hooks/useInternForm.test.ts`
- `src/test/intern-validation.test.ts`

#### Expected Value

```text
Name is required
```

#### Received Value

```text
Wrong message
```

#### Time Taken to Catch the Bug

The automated test suite detected the bug in approximately **17 seconds**.

### Comment

The quality gate immediately detected the incorrect validation message before the application could be released. Without automated testing, this bug could easily reach production. Manual testing would require opening the application, navigating to the form, entering invalid input, and verifying the validation message, which would take significantly more time than running the automated test suite.

---

## Task 3.2 – Break an E2E Test and Observe

### Deliberate UI Bug

Changed the button text from:

```text
Add Intern
```

to

```text
Submit Intern
```

### Command Executed

```bash
npx playwright test --headed
```

### Observation

#### Failed Test

- Playwright test that searched for the **"Add Intern"** button.

#### Failed Step

Playwright failed while trying to locate and click the **"Add Intern"** button because the visible text had changed.

#### Failure Screenshot

The Playwright report showed that the expected button text was not found on the page, causing the test to fail.

### Comment

A unit test clearly reports the expected and actual values, making logic errors easy to identify. An end-to-end test provides additional context, including the browser action, page state, screenshot, and execution trace, helping identify failures in the complete user workflow.

---

## Task 3.3 – Simulate a Pull Request Quality Check

### Branch Created

```bash
git checkout -b feature/add-score-badge
```

### Local Quality Checks

```bash
npm run test:run
npm run test:coverage
npx playwright test
```

### New Tests

#### Unit Test

```ts
describe("getScoreLabel", () => {
  it("returns 'Fail' when score is 45", () => {
    expect(getScoreLabel(45)).toBe("Fail");
  });
});
```

#### Component Test

```ts
it("renders 'Pass' when score is 92", () => {
  render(<ScoreBadge score={92} />);
  expect(screen.getByText("Pass")).toBeInTheDocument();
});
```

### Comment

The definition of done is not just that the feature renders correctly. A feature is complete only when it renders as expected, all unit tests, component tests, and end-to-end tests pass successfully, and the application meets the required quality standards.
Before merging the feature into the main branch, I ran the complete local quality checks, including unit tests, component tests, coverage analysis, and end-to-end tests. This ensures that the new feature does not introduce regressions or reduce code quality.


### Local Quality Checks

Commands executed:

```bash
npm run test:run
npm run test:coverage
npx playwright test
```

### Results

| Check | Result |
|--------|--------|
| Unit & Component Tests | ✅ 75 Passed, 6 Skipped |
| Coverage | ✅ Passed |
| Statement Coverage | **92.17%** |
| Branch Coverage | **85.71%** |
| Function Coverage | **90.00%** |
| Line Coverage | **93.39%** |
| Playwright E2E Tests | ✅ 22 Passed |

---

The feature is considered complete only when:

- The feature is implemented successfully.
- All unit tests pass.
- All component tests pass.
- All end-to-end tests pass.
- Coverage meets the required quality standards.
- The code is ready for review and merge.

A feature is **not** considered done simply because it renders correctly. It is complete only when it renders correctly **and all automated quality checks pass successfully.**