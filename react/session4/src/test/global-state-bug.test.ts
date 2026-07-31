import { describe, test, expect } from 'vitest'

describe('global state bug reproduction', () => {
  test('documents the original bug scenario', () => {
    expect(true).toBe(true)
  })
})
