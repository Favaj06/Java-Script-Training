import { useState } from 'react'

interface InternFormState {
  name: string
  score: number | ''
  isPresent: boolean
  role: string
}

interface UseInternFormReturn {
  form: InternFormState
  error: string
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleReset: () => void
  isValid: () => boolean
}

const initialForm: InternFormState = {
  name: '',
  score: 0,
  isPresent: true,
  role: 'Frontend',
}

// Defining a return type interface makes the hook easier to understand,
// improves TypeScript type checking, and ensures every component using
// this hook receives the expected values and functions.
function useInternForm(): UseInternFormReturn {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value, type } = e.target

    setForm(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'score'
            ? value === ''
              ? ''
              : Number(value)
            : value,
    }))
  }

  function handleReset(): void {
    setForm(initialForm)
    setError('')
  }

  function isValid(): boolean {
    if (!form.name.trim()) {
      setError('Name is required')
      return false
    }

    if (form.score === '' || form.score < 0 || form.score > 100) {
      setError('Score must be between 0 and 100')
      return false
    }

    setError('')
    return true
  }

  return {
    form,
    error,
    handleChange,
    handleReset,
    isValid,
  }
}

export default useInternForm
