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
FIRST Principle Violated: Independent

The second test depends on the first test because both tests share the same interns array.

If the second test runs by itself, the array starts empty, so its length becomes 1 instead of 2.

Running:
npx vitest run --reporter verbose
will show that the second test fails when executed alone.
*/