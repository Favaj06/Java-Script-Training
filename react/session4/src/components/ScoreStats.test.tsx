import { act, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, describe, expect, test } from 'vitest'
import ScoreStats, {
  ScoreStatsView,
  calculateScoreStats,
} from './ScoreStats'
import {
  InternProvider,
  type Intern,
} from '../contexts/intern-context'

let root: Root | null = null
let container: HTMLDivElement | null = null

function render(ui: ReactNode): HTMLDivElement {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)

  act(() => {
    root?.render(ui)
  })

  return container
}

afterEach(() => {
  if (root) {
    act(() => {
      root?.unmount()
    })
  }

  container?.remove()
  root = null
  container = null
})

const sampleInterns: Intern[] = [
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
]

describe('calculateScoreStats', () => {
  test('calculates highest, lowest, average and passing count', () => {
    expect(calculateScoreStats(sampleInterns)).toEqual({
      highest: 92,
      lowest: 45,
      average: 72,
      passing: 2,
    })
  })
})

describe('ScoreStatsView', () => {
  test('renders statistics from props', () => {
    const view = render(
      <ScoreStatsView
        highest={95}
        lowest={45}
        average={78}
        passing={3}
        total={4}
      />
    )

    expect(view.textContent).toContain('Score Statistics')
    expect(view.textContent).toContain(
      'Highest: 95 | Lowest: 45 | Average: 78'
    )
    expect(view.textContent).toContain('Passing: 3 of 4')
  })
})

describe('ScoreStats container', () => {
  test('reads interns from InternProvider and passes stats to the view', () => {
    const view = render(
      <InternProvider
        initialInterns={sampleInterns}
        loadDelay={0}
      >
        <ScoreStats />
      </InternProvider>
    )

    expect(view.textContent).toContain(
      'Highest: 92 | Lowest: 45 | Average: 72'
    )
    expect(view.textContent).toContain('Passing: 2 of 3')
  })
})

// Task 5.2 observation:
// ScoreStats is tested with the real InternProvider because the container's
// job is to read context. ScoreStatsView is tested directly because it has
// no context dependency and receives all display values through props.
