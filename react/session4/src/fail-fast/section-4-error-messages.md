# Section 4 – Meaningful Error Messages

## Task 4.1 – Error Message Audit

| File | Current message | Answers all 3 questions? | Improved message |
|------|-----------------|--------------------------|------------------|
| intern-context.tsx | useInterns must be used inside InternProvider | ❌ No | useInterns: expected to be called inside <InternProvider>, got: no provider found |
| intern-service.ts | Name is required | ❌ No | validateInternForm: expected a non-empty name, got: "" |
| intern-service.ts | Score must be between 0 and 100 | ❌ No | validateInternForm: expected score between 0 and 100, got: actual score |

---

## Task 4.2 – Improved Error Messages

Three existing validation messages were improved by including:

- Function name
- Expected value
- Actual value

### Before

```
Name is required
```

### After

```
validateInternForm: expected a non-empty name, got: ""
```

---

### Before

```
Score must be between 0 and 100
```

### After

```
validateInternForm: expected score between 0 and 100, got: -5
```

---

### Before

```
useInterns must be used inside InternProvider
```

### After

```
useInterns: expected to be called inside <InternProvider>, got: no provider found
```

### Comment

The improved messages provide enough context to identify the failing function, the expected input, and the actual value without needing to inspect the source code.

---

## Task 4.3 – 2am Test

### Error Message

```
validateInternForm: expected score between 0 and 100, got: -5
```

### What I know immediately

- Function that failed:
  - `validateInternForm`

- Expected:
  - Score must be between 0 and 100.

- Actual value:
  - `-5`

### What I would do next

1. Trace where the score value originated.
2. Check the form submission logic.
3. Verify whether the invalid value came from user input or an API response.
4. Add validation before calling the service if necessary.

### Would the original message have been enough?

No.

The original message ("Score must be between 0 and 100") did not identify the function or the invalid value. The improved message significantly reduces debugging time by providing complete context.