# Section 2 – Building the Service Layer

## Task 2.1 – Service Layer

Implemented:

- ✅ createIntern()
- ✅ validateInternForm()
- ✅ calculateAverageScore()
- ✅ getScoreLabel()
- ✅ filterInterns()

All business logic now exists in the service layer with zero React imports.

### Observation

Each service test required only a small Arrange section because the functions are pure.

None of the tests required:

- vi.mock
- render
- renderHook

The tests simply call the functions directly and verify their outputs.

---

## Task 2.2 – Service Layer Verification

Command:

```bash
grep -n "from 'react'" src/services/intern-service.ts
grep -n "from \"react\"" src/services/intern-service.ts

Keeping the service layer free from React imports makes it completely independent of the UI framework. This allows the business logic to be tested using simple function calls without rendering components or mocking React hooks, resulting in faster and easier-to-maintain tests.