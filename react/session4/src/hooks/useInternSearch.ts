import { useState, useMemo } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface UseInternSearchReturn {
  search: string
  setSearch: (value: string) => void
  filtered: Intern[]
  stats: {
    total: number
    present: number
    avg: number
  }
}

function useInternSearch(interns: Intern[]): UseInternSearchReturn {
  const [search, setSearch] = useState<string>('')

  const filtered = useMemo(
    () =>
      interns.filter((intern) =>
        intern.name.toLowerCase().includes(search.toLowerCase())
      ),
    [interns, search]
  )

  const stats = useMemo(
    () => ({
      total: interns.length,
      present: interns.filter((intern) => intern.isPresent).length,
      avg:
        interns.length > 0
          ? Math.round(
              interns.reduce((sum, intern) => sum + intern.score, 0) /
                interns.length
            )
          : 0,
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