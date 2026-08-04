import { act, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, describe, expect, test, vi } from 'vitest'
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
  vi.restoreAllMocks()
  vi.useRealTimers()
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

  test('supports adding and removing interns through the provider', () => {
    function Consumer() {
      const { addIntern, removeIntern } = useInterns()

      return (
        <button
          onClick={() => {
            addIntern({
              id: 10,
              name: 'New Intern',
              score: 70,
              role: 'QA',
              isPresent: true,
            })
            removeIntern(1)
          }}
        >
          Update
        </button>
      )
    }

    const view = render(
      <InternProvider loadDelay={0}>
        <Consumer />
        <InternProbe />
      </InternProvider>
    )

    act(() => {
      view.querySelector('button')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(view.textContent).toContain('Ready: 4 - Priya, Amit, Sneha, New Intern')
  })

  test('throws when useInterns is used outside the provider', () => {
    expect(() => {
      render(<InternProbe />)
    }).toThrow(/useInterns: expected to be called inside/i)
  })

  test('rejects invalid intern data from the initial list', () => {
    const invalidInterns = [
      {
        id: 1,
        name: '',
        score: 90,
        role: 'Frontend',
        isPresent: true,
      },
    ] as unknown as Intern[]

    expect(() => {
      render(
        <InternProvider initialInterns={invalidInterns} loadDelay={0}>
          <InternProbe />
        </InternProvider>
      )
    }).toThrow('validateInternResponse: item[0].name is invalid')
  })

  test('rejects a non-array initial intern list', () => {
    expect(() => {
      render(
        <InternProvider
          initialInterns={{} as unknown as Intern[]}
          loadDelay={0}
        >
          <InternProbe />
        </InternProvider>
      )
    }).toThrow(
      'validateInternResponse: expected array, got object'
    )
  })

  test('rejects non-object items from the initial list', () => {
    expect(() => {
      render(
        <InternProvider
          initialInterns={[null] as unknown as Intern[]}
          loadDelay={0}
        >
          <InternProbe />
        </InternProvider>
      )
    }).toThrow(
      'validateInternResponse: item[0] is not an object'
    )
  })

  test('rejects invalid scores from the initial list', () => {
    const invalidInterns = [
      {
        id: 1,
        name: 'Rahul',
        score: 101,
        role: 'Frontend',
        isPresent: true,
      },
    ] as unknown as Intern[]

    expect(() => {
      render(
        <InternProvider initialInterns={invalidInterns} loadDelay={0}>
          <InternProbe />
        </InternProvider>
      )
    }).toThrow(
      'validateInternResponse: item[0].score is invalid, got: 101'
    )
  })

  test('loads interns after the configured delay', () => {
    vi.useFakeTimers()

    const injectedInterns: Intern[] = [
      {
        id: 7,
        name: 'Delayed Intern',
        score: 84,
        role: 'Frontend',
        isPresent: true,
      },
    ]

    const view = render(
      <InternProvider initialInterns={injectedInterns} loadDelay={100}>
        <InternProbe />
      </InternProvider>
    )

    expect(view.textContent).toContain('Loading')

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(view.textContent).toContain(
      'Ready: 1 - Delayed Intern'
    )
  })

  test('clears the delayed load timer when unmounted', () => {
    vi.useFakeTimers()
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout')

    render(
      <InternProvider loadDelay={100}>
        <InternProbe />
      </InternProvider>
    )

    act(() => {
      root?.unmount()
    })

    root = null

    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})

// Task 5.1 observation:
// This test injects initialInterns through InternProvider instead of
// mocking useInterns(). That proves dependency injection works at the
// provider boundary while keeping existing components unchanged.
