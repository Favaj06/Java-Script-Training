import { act, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, describe, expect, test } from 'vitest'
import {
  InternProvider,
  useInterns,
  type Intern,
} from './intern-context'

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

function InternProbe() {
  const { interns, isLoading } = useInterns()

  return (
    <p data-testid="intern-state">
      {isLoading
        ? 'Loading'
        : `Ready: ${interns.length} - ${interns
            .map((intern) => intern.name)
            .join(', ')}`}
    </p>
  )
}

describe('InternProvider dependency injection', () => {
  test('uses injected initial interns without changing consumer code', () => {
    const injectedInterns: Intern[] = [
      {
        id: 99,
        name: 'Injected Intern',
        score: 88,
        role: 'Fullstack',
        isPresent: true,
      },
    ]

    const view = render(
      <InternProvider
        initialInterns={injectedInterns}
        loadDelay={0}
      >
        <InternProbe />
      </InternProvider>
    )

    expect(view.textContent).toContain(
      'Ready: 1 - Injected Intern'
    )
  })
})

// Task 5.1 observation:
// This test injects initialInterns through InternProvider instead of
// mocking useInterns(). That proves dependency injection works at the
// provider boundary while keeping existing components unchanged.
