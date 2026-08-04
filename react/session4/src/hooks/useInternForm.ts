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