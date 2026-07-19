import { test, expect } from 'vitest'

test.skip('loads interns from API', async () => {
  const response = await fetch(
    'http://localhost:5173/api/interns'
  )

  const data = await response.json()

  expect(data).toHaveLength(4)
})

/*
FIRST Principles Violated:

1. Fast
2. Repeatable

This test depends on an external API server.
In CI or another environment, the server may
not be running, causing the test to fail.
Since it relies on a real network request,
the test is slower and its result depends
on external conditions.
*/