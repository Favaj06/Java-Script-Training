// Code Smell Audit — intern-validation.ts
// Smell 1: Magic numbers — score limits (0 and 100) are hardcoded.
// Smell 2: Hardcoded error messages — validation messages are repeated string literals.
// Smell 3: Limited extensibility — additional validation rules would require modifying the existing function directly.

const MIN_SCORE = 0
const MAX_SCORE = 100

export function validateInternForm(
  name: string,
  score: number
): string | null {
  if (!name.trim()) {
    return 'Name is required'
  }

  if (score < MIN_SCORE || score > MAX_SCORE) {
    return 'Score must be between 0 and 100'
  }

  return null
}

// Rename / Magic Number Comment:
// The values 0 and 100 represent the valid score range.
// Extracting them into MIN_SCORE and MAX_SCORE makes the validation rule
// explicit and allows the score limits to be updated in one place.

// Audit Comment:
// I would replace the magic numbers with named constants first because
// they make the validation rules clearer and easier to update later.