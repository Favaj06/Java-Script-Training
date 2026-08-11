const MIN_SCORE = 0
const MAX_SCORE = 100

export function validateInternForm(
  name: string,
  score: number
): string | null {

  console.log('VALIDATION CALLED:', name, score)

  if (!name.trim()) {
    return 'Name is required'
  }

  if (score < MIN_SCORE || score > MAX_SCORE) {
    return 'Score must be between 0 and 100'
  }

  return null
}