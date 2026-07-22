import { renderHook } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { useInterns } from './intern-context'

describe('useInterns', () => {
  test('throws error when used outside InternProvider', () => {
    expect(() => renderHook(() => useInterns())).toThrow(
      'useInterns must be used inside InternProvider'
    )
  })
})