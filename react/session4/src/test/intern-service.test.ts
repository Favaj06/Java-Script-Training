import { describe, test, expect } from 'vitest'
import {
  createIntern,
  validateInternForm,
  calculateAverageScore,
  getScoreLabel,
  filterInterns,
} from '../services/intern-service'
import type { InternFormState, Intern } from '../types/intern'

describe('createIntern', () => {
  test('generates an id', () => {
    const form: InternFormState = {
      name: 'Rahul',
      score: 92,
      role: 'Frontend',
      isPresent: true,
    }

    const intern = createIntern(form, () => 101)

    expect(intern.id).toBe(101)
  })

  test('trims the name', () => {
    const form: InternFormState = {
      name: '  Rahul  ',
      score: 92,
      role: 'Frontend',
      isPresent: true,
    }

    expect(createIntern(form, () => 1).name).toBe('Rahul')
  })

  test('rounds the score', () => {
    const form: InternFormState = {
      name: 'Rahul',
      score: 92.6,
      role: 'Frontend',
      isPresent: true,
    }

    expect(createIntern(form, () => 1).score).toBe(93)
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
    ).toBe('Name is required')
  })

  test('returns error for score above 100', () => {
    expect(
      validateInternForm({
        name: 'Rahul',
        score: 120,
        role: 'Frontend',
        isPresent: true,
      })
    ).toBe('Score must be between 0 and 100')
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

describe('calculateAverageScore', () => {
  test('returns 0 for empty list', () => {
    expect(calculateAverageScore([])).toBe(0)
  })

  test('returns correct average', () => {
    const interns: Intern[] = [
      {
        id: 1,
        name: 'A',
        score: 80,
        role: 'Frontend',
        isPresent: true,
      },
      {
        id: 2,
        name: 'B',
        score: 100,
        role: 'Backend',
        isPresent: true,
      },
    ]

    expect(calculateAverageScore(interns)).toBe(90)
  })

  test('rounds correctly', () => {
    const interns: Intern[] = [
      {
        id: 1,
        name: 'A',
        score: 90,
        role: 'Frontend',
        isPresent: true,
      },
      {
        id: 2,
        name: 'B',
        score: 91,
        role: 'Backend',
        isPresent: true,
      },
    ]

    expect(calculateAverageScore(interns)).toBe(91)
  })
})

describe('getScoreLabel', () => {
  test('returns Pass for 50', () => {
    expect(getScoreLabel(50)).toBe('Pass')
  })

  test('returns Fail for 49', () => {
    expect(getScoreLabel(49)).toBe('Fail')
  })

  test('returns Pass for 100', () => {
    expect(getScoreLabel(100)).toBe('Pass')
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

  test('returns all when query is empty', () => {
    expect(filterInterns(interns, '')).toEqual(interns)
  })

  test('matches by name', () => {
    expect(filterInterns(interns, 'rahul')).toHaveLength(1)
  })

  test('matches by role', () => {
    expect(filterInterns(interns, 'backend')).toHaveLength(1)
  })

  test('is case-insensitive', () => {
    expect(filterInterns(interns, 'FRONTEND')).toHaveLength(1)
  })
})