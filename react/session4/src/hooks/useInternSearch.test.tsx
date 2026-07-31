import { act, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'
import useInternSearch, {
  defaultFilter,
  type InternFilter,
  type SearchableIntern,
} from './useInternSearch'

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

const interns: SearchableIntern[] = [
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
]

function SearchHarness({
  filterFn,
}: {
  filterFn?: InternFilter
}) {
  const { search, setSearch, filtered } = useInternSearch(
    interns,
    filterFn
  )

  return (
    <div>
      <p data-testid="search">{search}</p>

      <p data-testid="filtered">
        {filtered.map((intern) => intern.name).join(', ')}
      </p>

      <button
        type="button"
        onClick={() => setSearch('ra')}
      >
        Search Rahul
      </button>
    </div>
  )
}

describe('defaultFilter', () => {
  test('keeps the existing case-insensitive name search behavior', () => {
    expect(defaultFilter(interns, 'PRIYA')).toEqual([interns[1]])
  })
})

describe('useInternSearch dependency injection', () => {
  test('calls injected filter with interns and search, then uses its return value', () => {
    const injectedResult: SearchableIntern[] = [
      {
        id: 100,
        name: 'Injected Result',
        score: 100,
        role: 'Fullstack',
        isPresent: true,
      },
    ]

    const filterFn = vi.fn(
      (
        receivedInterns: SearchableIntern[],
        search: string
      ): SearchableIntern[] =>
        search === 'never' ? receivedInterns : injectedResult
    )

    const view = render(
      <SearchHarness
        filterFn={filterFn}
      />
    )

    expect(filterFn).toHaveBeenCalledWith(interns, '')
    expect(view.textContent).toContain('Injected Result')

    const button = view.querySelector('button')

    act(() => {
      button?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      )
    })

    expect(filterFn).toHaveBeenLastCalledWith(interns, 'ra')
    expect(filterFn).toHaveBeenCalledTimes(2)
    expect(view.textContent).toContain('Injected Result')
  })
})

// Task 5.3 observation:
// The hook still owns search state and stats. Only the filtering dependency
// is injected, so the default UI behavior remains identical while tests can
// verify the filter call arguments and rendered return value directly.
