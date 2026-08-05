/*import { describe, test, expect } from 'vitest'
import { validateInternForm } from '../utils/intern-validation'

describe('validateInternForm', () => {
  test('empty name', () => {
    expect(validateInternForm('', 50)).toBe('Name is required')
  })

  test('whitespace name', () => {
    expect(validateInternForm('   ', 50)).toBe('Name is required')
  })

  test('score above 100', () => {
    expect(validateInternForm('Rahul', 101)).toBe(
      'Score must be between 0 and 100'
    )
  })

  test('score below 0', () => {
    expect(validateInternForm('Rahul', -1)).toBe(
      'Score must be between 0 and 100'
    )
  })

  test('valid Rahul 92', () => {
    expect(validateInternForm('Rahul', 92)).toBeNull()
  })

  test('score exactly 0', () => {
    expect(validateInternForm('Rahul', 0)).toBeNull()
  })

  test('score exactly 100', () => {
    expect(validateInternForm('Rahul', 100)).toBeNull()
  })
})
*/

import { describe, expect, it } from 'vitest'
import { validateInternForm } from '../utils/intern-validation'

describe('validateInternForm', () => {
  it('returns "Name is required" when name is empty', () => {
    expect(validateInternForm('', 50)).toBe('Name is required')
  })

  it('returns "Name is required" when name contains only whitespace', () => {
    expect(validateInternForm('   ', 50)).toBe('Name is required')
  })

  it('returns score error when score is greater than 100', () => {
    expect(validateInternForm('Rahul', 101)).toBe(
      'Score must be between 0 and 100'
    )
  })

  it('returns score error when score is less than 0', () => {
    expect(validateInternForm('Rahul', -1)).toBe(
      'Score must be between 0 and 100'
    )
  })

  it('returns null for valid name and score', () => {
    expect(validateInternForm('Rahul', 92)).toBeNull()
  })

  it('accepts score exactly 0', () => {
    expect(validateInternForm('Rahul', 0)).toBeNull()
  })

  it('accepts score exactly 100', () => {
    expect(validateInternForm('Rahul', 100)).toBeNull()
  })
})