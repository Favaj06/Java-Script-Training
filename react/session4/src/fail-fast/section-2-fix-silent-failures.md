# Section 2 – Fix Silent Failures

## Task 2.1 – Replace a null/undefined return with a throw

### Observation

The current intern dashboard does not contain a function that returns `null` or `undefined` for an error case. Validation functions either return a validation message or `null` to indicate success, which is an intentional design rather than a hidden failure.

### Result

No code changes were required for this task.

### Comment

There were no callers performing defensive null checks that could be removed because no repository or service function silently returned `null` for an error condition.

---

## Task 2.2 – Fix an empty catch block or swallowed exception

### Observation

The current project contains no `try...catch` blocks that swallow exceptions or only log errors.

There are also no API or `fetch()` calls in the intern dashboard that require exception handling.

### Result

No code changes were required.

### Comment

Since there were no swallowed exceptions, there was no risk of callers receiving `undefined` or silently displaying incorrect data.

---

## Task 2.3 – Replace a silent default with a throw

### Observation

No required fields are hidden using patterns such as:

```ts
value || "Unknown"
value ?? defaultValue
```

The application already validates required form values before creating an intern.

### Result

No code changes were required.

### Comment

A silent default is appropriate only for optional values.

For required values such as `name`, `score`, and `role`, validation should fail instead of silently substituting another value.

---

## Overall Observation

The current intern dashboard already follows good fail-fast practices because:

- No swallowed exceptions were found.
- No hidden `null`/`undefined` error returns were found.
- No required values are silently replaced with defaults.

Most fail-fast improvements have already been achieved through the previous Code Testability and Separation of Concerns refactoring sessions.