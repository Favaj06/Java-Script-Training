# Section 3 – Building the Repository Layer

## Task 3.1

Created:

- ✅ useInternRepository()

Repository responsibilities:

- Store interns
- Add interns
- Remove interns
- Update interns

No validation or business rules are implemented in the repository.

### Comment

No test required `vi.mock`.

The repository only manages React state, so the tests simply use `renderHook` and `act` to verify state changes.

The service layer is simpler to test because it contains pure functions that can be called directly. The repository requires React hooks, so it needs `renderHook`, but it still does not require mocking.

---

## Task 3.2

### Separation Check

1. Validation?
- ✅ No

2. ID generation?
- ✅ No

3. Average calculation?
- ✅ No

All business logic remains inside the service layer.

The repository is responsible only for storing and updating application state.