import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import ScoreStats from './ScoreStats'

vi.mock('../contexts/intern-context', () => ({
  useInterns: () => ({
    interns: [
      {
        id: 1,
        name: 'Rahul',
        score: 92,
        role: 'Frontend',
        isPresent: true,
      },
      {
        id: 2,
        name: 'Priya',
        score: 78,
        role: 'Backend',
        isPresent: true,
      },
      {
        id: 3,
        name: 'Amit',
        score: 45,
        role: 'Frontend',
        isPresent: false,
      },
    ],
  }),
}))

describe('ScoreStats Isolated Tests', () => {
  test('shows total intern count as 3', () => {
    render(<ScoreStats />)

    expect(screen.getByText('Passing: 2 of 3')).toBeInTheDocument()
  })

  test('shows passing intern count as 2', () => {
    render(<ScoreStats />)

    expect(screen.getByText('Passing: 2 of 3')).toBeInTheDocument()
  })

  test('shows average score as 72', () => {
    render(<ScoreStats />)

    expect(
      screen.getByText(/Highest: 92 \| Lowest: 45 \| Average: 72/)
    ).toBeInTheDocument()
  })
})
/*
Observation:

When vi.mock() is removed, the test throws:

"useInterns must be used inside InternProvider"

because ScoreStats depends on InternContext.
Without mocking or wrapping it inside InternProvider,
the hook cannot access the context.
*/

/*
Task 4.3

1. No, useState() and useMemo() were not mocked because they are
React's built-in hooks and already behave correctly.

2. addIntern() and removeIntern() were not mocked because
ScoreStats never calls them. If it accidentally called them,
the test would fail and reveal the unexpected behavior.

3. If the Intern interface gets a new field in the future,
the mock only needs updating if ScoreStats starts using that field.
TypeScript or failing tests will indicate when the mock needs changes.
*/