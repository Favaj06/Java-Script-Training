// Code Smell Audit — intern-validation.ts
// Smell 1: Magic numbers — score limits (0 and 100) are hardcoded.
// Smell 2: Hardcoded error messages — validation messages are repeated string literals.
// Smell 3: Limited extensibility — additional validation rules would require modifying the existing function directly.
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

// Audit Comment:
// I would replace the magic numbers with named constants first because
// they make the validation rules clearer and easier to update later.