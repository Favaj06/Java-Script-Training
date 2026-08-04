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