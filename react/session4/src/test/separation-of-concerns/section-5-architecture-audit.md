# Section 5 – Recognising Violations in the Wild

## Task 5.1 – Architecture Audit

| File | Expected Layer | Actual Concerns | Correct? |
|------|----------------|-----------------|----------|
| `src/components/SummaryBar.tsx` | UI | File not present in this project | N/A |
| `src/components/AddInternForm.tsx` | UI | Renders the form and delegates logic to `useInternForm` | ✅ Yes |
| `src/components/InternCard.tsx` | UI | File not present in this project | N/A |
| `src/hooks/useInternForm.ts` | Coordination Hook | Form state, validation coordination, submission | ✅ Yes |
| `src/hooks/useInternSearch.ts` | Coordination Hook | Search state, filtering coordination and statistics | ✅ Yes |
| `src/contexts/intern-context.tsx` | Wiring (Context) | Context provider, loading and state exposure | ⚠️ Partially |
| `src/services/intern-service.ts` | Service | Business logic only | ✅ Yes |
| `src/repositories/intern-repository.ts` | Repository | State management only | ✅ Yes |

---

### Comment

After the refactor, `useInternForm` is neither a pure service nor a repository.

It coordinates:

- UI events
- Form state
- Validation through the service layer
- Submission through the injected `addIntern` function

Therefore, it is best described as a **Coordination Hook** between the UI and the business logic.

---

## Task 5.2 – Verify `useInternForm`

### Checklist

- ✅ Calls `validateInternForm` from `intern-service.ts`
- ✅ Uses the injected `addIntern` function
- ✅ Contains no `fetch` calls
- ✅ Does not directly modify the intern list state

---

### Comment

`useInternForm` is not a service and not a repository.

It acts as a **Coordination Hook** that connects:

- The UI layer
- The Service layer
- The Context/Repository layer

This separation keeps responsibilities clear and makes each layer easier to test independently.