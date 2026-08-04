import { describe, expect, test } from 'vitest'
import {
  calculateAverageScore,
  createIntern,
  filterInterns,
  getScoreLabel,
  validateInternForm,
} from '../services/intern-service'
import type { Intern, InternFormState } from '../types/intern'

describe('createIntern', () => {
  test('creates an intern from form data', () => {
    const form: InternFormState = {
      name: '  Rahul  ',
      score: 92.6,
      role: 'Frontend',
      isPresent: true,
    }

    expect(createIntern(form, () => 101)).toEqual({
      id: 101,
      name: 'Rahul',
      score: 93,
      role: 'Frontend',
      isPresent: true,
    })
  })
})

describe('validateInternForm', () => {
  test('returns error for empty name', () => {
    expect(
      validateInternForm({
        name: '',
        score: 50,
        role: 'Frontend',
        isPresent: true,
      })
    ).toBe(
      'validateInternForm: expected a non-empty name, got: ""'
    )
  })

  test('returns error for score above 100', () => {
    expect(
      validateInternForm({
        name: 'Rahul',
        score: 120,
        role: 'Frontend',
        isPresent: true,
      })
    ).toBe(
      'validateInternForm: expected score between 0 and 100, got: 120'
    )
  })

  test('returns null when valid', () => {
    expect(
      validateInternForm({
        name: 'Rahul',
        score: 90,
        role: 'Frontend',
        isPresent: true,
      })
    ).toBeNull()
  })
})

describe('validateInternForm guard clauses', () => {
  test('returns error when form is undefined', () => {
    expect(
      validateInternForm(undefined as never)
    ).toBe(
      'validateInternForm: expected a form object, got: undefined'
    )
  })

  test('returns error when name is empty', () => {
    expect(
      validateInternForm({
        name: '',
        score: 80,
        role: 'Frontend',
        isPresent: true,
      })
    ).toBe(
      'validateInternForm: expected a non-empty name, got: ""'
    )
  })

  test('returns error when score is below 0', () => {
    expect(
      validateInternForm({
        name: 'Rahul',
        score: -1,
        role: 'Frontend',
        isPresent: true,
      })
    ).toBe(
      'validateInternForm: expected score between 0 and 100, got: -1'
    )
  })

  test('returns error when score is above 100', () => {
    expect(
      validateInternForm({
        name: 'Rahul',
        score: 101,
        role: 'Frontend',
        isPresent: true,
      })
    ).toBe(
      'validateInternForm: expected score between 0 and 100, got: 101'
    )
  })

  test('throws when name is not a string', () => {
    expect(() =>
      validateInternForm({
        name: null,
        score: 80,
        role: 'Frontend',
        isPresent: true,
      } as never)
    ).toThrow(
      'Assertion failed: validateInternForm: expected a non-empty name, got: null'
    )
  })

  test('throws when score is not a number', () => {
    expect(() =>
      validateInternForm({
        name: 'Rahul',
        score: '80',
        role: 'Frontend',
        isPresent: true,
      } as never)
    ).toThrow(
      'Assertion failed: validateInternForm: expected score between 0 and 100, got: 80'
    )
  })
})

describe('calculateAverageScore', () => {
  test('returns 0 for an empty list', () => {
    expect(calculateAverageScore([])).toBe(0)
  })

  test('returns the rounded average score', () => {
    const interns: Intern[] = [
      {
        id: 1,
        name: 'Rahul',
        score: 90,
        role: 'Frontend',
        isPresent: true,
      },
      {
        id: 2,
        name: 'Priya',
        score: 81,
        role: 'Backend',
        isPresent: true,
      },
    ]

    expect(calculateAverageScore(interns)).toBe(86)
  })
})

describe('getScoreLabel', () => {
  test('returns Pass for scores at or above 50', () => {
    expect(getScoreLabel(50)).toBe('Pass')
    expect(getScoreLabel(100)).toBe('Pass')
  })

  test('returns Fail for scores below 50', () => {
    expect(getScoreLabel(49)).toBe('Fail')
  })
})

describe('filterInterns', () => {
  const interns: Intern[] = [
    {
      id: 1,
      name: 'Rahul',
      score: 90,
      role: 'Frontend',
      isPresent: true,
    },
    {
      id: 2,
      name: 'Priya',
      score: 80,
      role: 'Backend',
      isPresent: true,
    },
  ]

  test('returns all interns for an empty query', () => {
    expect(filterInterns(interns, '')).toBe(interns)
  })

  test('matches interns by name or role', () => {
    expect(filterInterns(interns, 'rahul')).toEqual([
      interns[0],
    ])
    expect(filterInterns(interns, 'backend')).toEqual([
      interns[1],
    ])
  })
})
