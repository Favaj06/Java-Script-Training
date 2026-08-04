import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { generateInternId } from '../utils/generate-id'

describe('generateInternId', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

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

  test('uses the default generators when no values are provided', () => {
    vi.spyOn(Date, 'now').mockReturnValue(123456)
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    const id = generateInternId()

    expect(id).toBe('intern-123456-0.5')
  })
})
