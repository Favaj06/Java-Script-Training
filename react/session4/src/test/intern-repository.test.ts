import { describe, expect, test } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useInternRepository } from '../repositories/intern-repository'
import type { Intern } from '../types/intern'

const RAHUL: Intern = {
  id: 1,
  name: 'Rahul',
  score: 92,
  role: 'Frontend',
  isPresent: true,
}

const PRIYA: Intern = {
  id: 2,
  name: 'Priya',
  score: 78,
  role: 'Backend',
  isPresent: false,
}

describe('useInternRepository', () => {
  test('starts with an empty list', () => {
    const { result } = renderHook(() => useInternRepository())

    expect(result.current.interns).toEqual([])
  })

  test('add() adds an intern', () => {
    const { result } = renderHook(() => useInternRepository())

    act(() => {
      result.current.add(RAHUL)
    })

    expect(result.current.interns).toEqual([RAHUL])
  })

  test('add() twice results in two interns', () => {
    const { result } = renderHook(() => useInternRepository())

    act(() => {
      result.current.add(RAHUL)
      result.current.add(PRIYA)
    })

    expect(result.current.interns).toHaveLength(2)
  })

  test('remove() removes an intern', () => {
    const { result } = renderHook(() => useInternRepository())

    act(() => {
      result.current.add(RAHUL)
      result.current.remove(1)
    })

    expect(result.current.interns).toEqual([])
  })

  test('remove() on a non-existent id does nothing', () => {
    const { result } = renderHook(() => useInternRepository())

    act(() => {
      result.current.add(RAHUL)
      result.current.remove(100)
    })

    expect(result.current.interns).toEqual([RAHUL])
  })

  test('update() replaces matching intern', () => {
    const { result } = renderHook(() => useInternRepository())

    act(() => {
      result.current.add(RAHUL)

      result.current.update({
        ...RAHUL,
        score: 99,
      })
    })

    expect(result.current.interns[0].score).toBe(99)
  })

  test('update() does not affect other interns', () => {
    const { result } = renderHook(() => useInternRepository())

    act(() => {
      result.current.add(RAHUL)
      result.current.add(PRIYA)

      result.current.update({
        ...RAHUL,
        score: 100,
      })
    })

    expect(result.current.interns[1]).toEqual(PRIYA)
  })
})