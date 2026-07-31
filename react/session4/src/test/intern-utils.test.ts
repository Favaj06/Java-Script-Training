import { describe, test, expect } from 'vitest'
import { filterInterns } from '../utils/intern-utils'

const interns = [
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
    score: 85,
    role: 'Backend',
    isPresent: true,
  },
  {
    id: 3,
    name: 'Karthik',
    score: 95,
    role: 'Frontend',
    isPresent: false,
  },
]

describe('filterInterns', () => {
  test('returns all interns when searchTerm is empty', () => {
    expect(filterInterns(interns, '')).toEqual(interns)
  })

  test('returns interns matching name', () => {
    expect(filterInterns(interns, 'rahul')).toEqual([interns[0]])
  })

  test('returns interns matching role', () => {
    expect(filterInterns(interns, 'frontend')).toEqual([
      interns[0],
      interns[2],
    ])
  })

  test('returns empty array when no match', () => {
    expect(filterInterns(interns, 'xyz')).toEqual([])
  })

  test('returns interns matching name or role', () => {
    expect(filterInterns(interns, 'backend')).toEqual([interns[1]])
  })
})
