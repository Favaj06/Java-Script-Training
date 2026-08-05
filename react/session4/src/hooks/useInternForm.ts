// Code Smell Audit — useInternForm.ts
// Smell 1: Long function — handleChange() contains multiple responsibilities (checkbox handling, score conversion, generic input updates).
// Smell 2: Nested conditional (ternary) — handleChange() uses nested ternary operators, reducing readability.
// Smell 3: Primitive obsession — validation depends on raw name and score values instead of a dedicated validation model.


// Silent Failure Audit
// Pattern 1: validateInternForm returns null for valid input instead of a success object.
// Pattern 2: handleSubmit returns boolean to indicate success/failure instead of throwing on invalid input.
// Pattern 3: generateId defaults to Date.now(), which assumes a valid ID generator is always available.
import { useState } from 'react'
import { validateInternForm } from '../services/intern-service'
import type { InternFormState } from '../types/intern'

interface InternSubmission {
  id: number
  name: string
  score: number
  isPresent: boolean
  role: string
}

interface UseInternFormOptions {
  addIntern?: (intern: InternSubmission) => void
  generateId?: () => number
}

interface UseInternFormReturn {
  form: InternFormState
  error: string
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleReset: () => void
  isValid: () => boolean
  handleSubmit: () => boolean
}

const initialForm: InternFormState = {
  name: '',
  score: 0,
  isPresent: true,
  role: 'Frontend',
}

function defaultGenerateId(): number {
  return Date.now()
}

// Defining a return type interface makes the hook easier to understand,
// improves TypeScript type checking, and ensures every component using
// this hook receives the expected values and functions.
function useInternForm({
  addIntern,
  generateId = defaultGenerateId,
}: UseInternFormOptions = {}): UseInternFormReturn {
  const [form, setForm] = useState<InternFormState>(initialForm)
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value, type } = e.target

    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'score'
          ? Number(value)
          : value,
    }))
  }

  function handleReset(): void {
    setForm({ ...initialForm })
    setError('')
  }

  function isValid(): boolean {
    const validationError = validateInternForm(form)
    setError(validationError ?? '')
    return validationError === null
  }

  function handleSubmit(): boolean {
    if (!isValid()) {
      return false
    }

    if (addIntern) {
      addIntern({
        id: generateId(),
        ...form,
      })
    }

    handleReset()
    return true
  }

  return {
    form,
    error,
    handleChange,
    handleReset,
    isValid,
    handleSubmit,
  }
}

export default useInternForm
// Audit Comment:
// The highest-risk silent failure is handleSubmit returning false.
// If a caller ignores the returned boolean, the form submission failure
// could be missed without any visible indication.



// Audit Comment:
// I would fix the nested conditional inside handleChange() first because
// it is the hardest part of the hook for a new developer to understand.
// Extracting the input conversion logic into a helper function would improve readability.