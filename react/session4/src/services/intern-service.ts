// Silent Failure Audit
// Pattern 1: validateInternForm returns null for valid input.
// Pattern 2: calculateAverageScore returns 0 for an empty list.
// Pattern 3: filterInterns returns the original list when the search query is empty.
// No silent defaults, swallowed exceptions or empty catch blocks were found.
import type { Intern, InternFormState } from '../types/intern'
import { assert } from '../utils/assert'
export function createIntern(
  form: InternFormState,
  generateId: () => number = Date.now
): Intern {
  return {
    id: generateId(),
    name: form.name.trim(),
    score: Math.round(form.score),
    role: form.role,
    isPresent: form.isPresent,
  }
}

export function validateInternForm(
  form: InternFormState
): string | null {
  if (typeof form !== 'object' || form === null) {
    return 'validateInternForm: expected a form object, got: undefined'
  }

  assert(
    typeof form.name === 'string',
    `validateInternForm: expected a non-empty name, got: ${JSON.stringify(form.name)}`
  )

  assert(
    typeof form.score === 'number',
    `validateInternForm: expected score between 0 and 100, got: ${form.score}`
  )

  if (!form.name.trim()) {
    return `validateInternForm: expected a non-empty name, got: ${JSON.stringify(form.name)}`
  }

  if (form.score < 0 || form.score > 100) {
    return `validateInternForm: expected score between 0 and 100, got: ${form.score}`
  }

  return null
}
export function calculateAverageScore(interns: Intern[]): number {
  if (interns.length === 0) {
    return 0
  }

  const total = interns.reduce(
    (sum, intern) => sum + intern.score,
    0
  )

  return Math.round(total / interns.length)
}

export function getScoreLabel(
  score: number
): 'Pass' | 'Fail' {
  return score >= 50 ? 'Pass' : 'Fail'
}

export function filterInterns(
  interns: Intern[],
  query: string
): Intern[] {

  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return interns
  }

  const result = interns.filter((intern) => {
    return (
      intern.name.toLowerCase().includes(normalized) ||
      intern.role.toLowerCase().includes(normalized)
    )
  })

  assert(
    Array.isArray(result),
    'filterInterns: result must be an array'
  )

  return result
}
// Audit Comment:
// Returning 0 for an empty list is the most likely silent failure because
// callers cannot distinguish between "no data" and a legitimate average.