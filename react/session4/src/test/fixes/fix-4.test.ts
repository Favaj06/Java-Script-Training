import { test, expect, vi } from 'vitest'

test('loads interns from API', async () => {
  const mockInterns = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' },
    { id: 3, name: 'Arun' },
    { id: 4, name: 'Divya' },
  ]

  globalThis.fetch = vi.fn().mockResolvedValue({
  json: async () => mockInterns,
} as Response)

  const response = await fetch('http://localhost:5173/api/interns')

  const data = await response.json()

  expect(data).toHaveLength(4)
})

/*
If vi.useRealTimers() is not called after using fake timers, the fake timers remain active for subsequent tests. 
This can cause other tests to behave incorrectly, fail unexpectedly, or produce inconsistent results because they no longer use the actual system clock.
*/