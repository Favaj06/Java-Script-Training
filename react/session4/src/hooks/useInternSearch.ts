// Code Smell Audit — useInternSearch.ts
// Smell 1: Duplicate iteration — interns are traversed multiple times for filter(), length, and average calculation.
// Smell 2: Magic default value — calculateAverageScore() returns 0 for empty data, hiding the difference between "no interns" and an actual average.
// Smell 3: Mixed responsibilities — the hook manages search state and computes dashboard statistics.


// Silent Failure Audit
// Pattern 1: filterInterns returns the original intern list when the search query is empty.
// Pattern 2: calculateAverageScore returns 0 for an empty list instead of indicating that no data exists.
// No swallowed exceptions or silent defaults were found.
import { useState, useMemo } from 'react'
import {
  filterInterns,
  calculateAverageScore,
} from '../services/intern-service'

export interface SearchableIntern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

export type InternFilter = (
  interns: SearchableIntern[],
  search: string
) => SearchableIntern[]

interface UseInternSearchReturn {
  search: string
  setSearch: (value: string) => void
  filtered: SearchableIntern[]
  stats: {
    total: number
    present: number
    avg: number
  }
}

export function defaultFilter(
  interns: SearchableIntern[],
  search: string
): SearchableIntern[] {
  return filterInterns(interns, search)
}

function useInternSearch(
  interns: SearchableIntern[],
  filterFn: InternFilter = defaultFilter
): UseInternSearchReturn {
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () => filterFn(interns, search),
    [interns, search, filterFn]
  )

  const stats = useMemo(
    () => ({
      total: interns.length,
      present: interns.filter((intern) => intern.isPresent).length,
      avg: calculateAverageScore(interns),
    }),
    [interns]
  )

  return {
    search,
    setSearch,
    filtered,
    stats,
  }
}

export default useInternSearch

// Finding:
// Without useMemo, the filtering logic runs on every component render,
// even if the interns list hasn't changed. Using useMemo caches the
// filtered result and recalculates it only when interns or search changes,
// improving performance.

// Dependency Injection finding:
// defaultFilter preserves the existing behavior. Passing a custom
// filterFn lets tests or future screens inject alternate filtering
// logic without changing the hook's state management or statistics logic.

// Audit Comment:
// Returning 0 as the average for an empty list may hide the difference
// between "no interns" and "average score is actually zero".


// Audit Comment:
// I would separate statistics calculation first because mixing searching
// and statistics makes the hook harder to maintain and extend.