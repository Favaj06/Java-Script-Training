# Section 6 – Reflection

## Task 6.1 – Before vs After

| | Before Testing Sessions | After Testing Sessions |
|--|-------------------------|------------------------|
| How do you know a change didn't break anything? | I manually tested the application after making changes. | I run the automated test suite, which quickly identifies regressions. |
| How long does it take to verify the app works? | Several minutes because every feature had to be tested manually. | A few seconds or minutes by running the automated test suite. |
| How confident are you to refactor old code? | Low confidence because changes could introduce hidden bugs. | High confidence because automated tests verify that existing functionality still works. |
| How do you find out about a regression? | Usually during manual testing or after noticing unexpected behavior. | Unit, component, and end-to-end tests immediately detect regressions during development or CI. |

---

### Comment

During this training, **unit tests** were the most useful for catching real bugs because they execute quickly, isolate individual pieces of logic, and immediately identify the exact source of a failure. Component tests verified UI behavior, while end-to-end tests ensured complete user workflows functioned correctly. Together, all three testing layers provided confidence that the application remained stable after changes.

---

# Explore

## Explore 1

Command:

```bash
npx vitest run --reporter verbose
```

Executed three times.

**Observation**

All tests passed consistently. No flaky tests were observed.

---

## Explore 2

Added:

```ts
retries: 1
```

to `playwright.config.ts`.

**Observation**

Retries can reduce failures caused by temporary issues, but they may also hide genuine application bugs if overused.

---

## Explore 3

Added:

```ts
timeout: 5000
```

to a passing Vitest test.

**Observation**

The test still passed successfully. If a test contains an `await` that never resolves, it will fail after reaching the configured timeout.

---

## Explore 4

Command:

```bash
npx playwright test --shard=1/2
```

**Observation**

Test sharding splits the E2E test suite into multiple parts so that different machines or runners can execute tests in parallel. This significantly reduces execution time for large projects with hundreds of end-to-end tests.