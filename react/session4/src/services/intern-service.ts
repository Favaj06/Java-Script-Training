import type { Intern, InternFormState } from '../types/intern'

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
  if (!form.name.trim()) {
    return 'Name is required'
  }

  if (form.score < 0 || form.score > 100) {
    return 'Score must be between 0 and 100'
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

  return interns.filter((intern) => {
    return (
      intern.name.toLowerCase().includes(normalized) ||
      intern.role.toLowerCase().includes(normalized)
    )
  })
}