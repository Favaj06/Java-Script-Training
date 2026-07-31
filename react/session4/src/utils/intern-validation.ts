export function validateInternForm(
  name: string,
  score: number
): string | null {
  if (!name.trim()) {
    return 'Name is required'
  }

  if (score < 0 || score > 100) {
    return 'Score must be between 0 and 100'
  }

  return null
}
