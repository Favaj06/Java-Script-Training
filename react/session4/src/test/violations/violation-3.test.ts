import { test, expect } from 'vitest'

const interns: { id: number; name: string }[] = []

test.skip('can add first intern', () => {
  interns.push({ id: 1, name: 'Rahul' })
  expect(interns).toHaveLength(1)
})

test.skip('can add second intern', () => {
  interns.push({ id: 2, name: 'Priya' })
  expect(interns).toHaveLength(2)
})
/*
FIRST Principle Violated: Self-validating

This test has no assertion.
Because there is no expect() statement,
the test always passes even if the average
calculation is incorrect.
This makes the test dangerous because
bugs cannot be detected.
*/