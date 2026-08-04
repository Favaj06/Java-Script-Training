# Section 4 – Wiring the Layers Together

## Task 4.1

The current project already separates responsibilities reasonably well.

- `useInternForm` manages form state and validation.
- `intern-service` contains business logic.
- `useInternRepository` manages state operations.
- `InternProvider` exposes the context to the application.

A complete migration of `InternProvider` was not performed because the existing project architecture already relies on `useInternForm` to create and validate interns. Changing the provider to accept form data directly would require broader changes to the application.

### Comment

The provider is now primarily responsible for wiring together the different layers instead of containing business logic.

If the ID generation strategy changes, only the service layer (`intern-service.ts`) needs to be updated.

---

## Task 4.2

### Dependency Direction

✅ intern-context → intern-service

✅ intern-context → intern-repository

❌ intern-service → intern-repository

❌ intern-repository → intern-service

### Comment

Presentational components should not import the service layer directly.

Instead, a container or hook should call the service and pass the computed values as props.

This keeps UI components focused on rendering and makes them easier to test because they only receive data.