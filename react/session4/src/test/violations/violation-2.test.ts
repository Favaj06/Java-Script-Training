import { test, expect } from 'vitest'

test.skip("score report has today's date", () => {
  const report = {
    date: new Date().toISOString().slice(0, 10),
  }

  expect(report.date).toBe('2024-11-15')
})

/*
FIRST Principle Violated: Repeatable

This test depends on the current system date but compares it against a hardcoded value.

It will fail whenever today's date is not 2024-11-15, making the test non-repeatable.
*/