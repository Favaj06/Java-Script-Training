import { test, expect, vi } from 'vitest'

test('fake timers example', () => {
  vi.useFakeTimers()

  let finished = false

  setTimeout(() => {
    finished = true
  }, 1000)

  expect(finished).toBe(false)

  vi.runAllTimers()

  expect(finished).toBe(true)

  vi.useRealTimers()
})
//SL-3 — within()
// within() limits queries to a specific container.
// It is useful when the same text appears multiple times on the page.

//SL-4 — Tab Navigation
import { render, screen } from '../test/test-utils'

/*
SL-3 – within()

within() limits queries to a specific container instead of searching
the entire document.

It is useful when multiple components contain identical text.

In this project, InternRow does not render a table row or repeated
containers, so using within() is not necessary.
*/

/*
within() limits searching to one container instead
of searching the entire page.
*/

import AddInternForm from '../components/AddInternForm'
import userEvent from '@testing-library/user-event'

test('tab moves focus between inputs', async () => {
  const user = userEvent.setup()

  render(<AddInternForm />)

  await user.tab()

  expect(
    screen.getByPlaceholderText('Name')
  ).toHaveFocus()

  await user.tab()

  expect(
    screen.getByPlaceholderText('Score')
  ).toHaveFocus()
})
/*
SL-5 – Coverage Report

I ran the coverage report using:

npm run test:coverage

Coverage Summary:

- useCounter.ts
  - Statements: 100%
  - Branches: 100%
  - Functions: 100%
  - Lines: 100%

- useInternForm.ts
  - Statements: 100%
  - Branches: 90%
  - Functions: 100%
  - Lines: 100%

Observation:
Both custom hooks have excellent test coverage. 
All statements, functions, and lines are covered. 
The only uncovered part is one branch in useInternForm.ts, resulting in 90% branch coverage, 
which indicates one conditional path was not exercised during testing.
*/
