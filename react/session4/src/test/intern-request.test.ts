import { describe, test, expect } from 'vitest'
import { prepareInternPayload } from '../utils/intern-request'

describe('prepareInternPayload', () => {
  test('creates request payload', () => {
    const payload = prepareInternPayload({
      name: 'Rahul',
      score: 90,
      role: 'Frontend',
      isPresent: true,
    })

    expect(payload).toEqual({
      method: 'POST',
      body: JSON.stringify({
        name: 'Rahul',
        score: 90,
        role: 'Frontend',
        isPresent: true,
      }),
    })
  })
})
