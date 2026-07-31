import { describe, test, expect } from 'vitest'
import { generateInternId } from '../utils/generate-id'

describe('generateInternId', () => {
  test('returns expected ID using injected values', () => {
    const id = generateInternId(
      () => 123456,
      () => 0.5
    )

    expect(id).toBe('intern-123456-0.5')
  })

  test('returns same ID with same injected values', () => {
    const id1 = generateInternId(
      () => 100,
      () => 0.25
    )

    const id2 = generateInternId(
      () => 100,
      () => 0.25
    )

    expect(id1).toBe(id2)
  })
})
