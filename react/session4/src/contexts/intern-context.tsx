// Silent Failure Audit
// Pattern 1: addIntern accepts any Intern object without validating its contents.
// Pattern 2: removeIntern silently does nothing if the supplied ID does not exist.
// No empty catch blocks or swallowed exceptions were found.



// Code Smell Audit — intern-context.tsx
// Smell 1: Long function — validateInternResponse() performs multiple validation checks in one function.
// Smell 2: Magic numbers — score validation uses hardcoded values 0 and 100.
// Smell 3: Missing validation — addIntern() accepts any Intern without validating before storing it.
import type { Intern } from '../types/intern'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

export type { Intern } from '../types/intern'

interface InternContextType {
  interns: Intern[]
  isLoading: boolean
  addIntern: (intern: Intern) => void
  removeIntern: (id: number) => void
}

interface InternProviderProps {
  children: ReactNode
  initialInterns?: Intern[]
  loadDelay?: number
}

export const defaultInterns: Intern[] = [
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
  {
    id: 4,
    name: 'Sneha',
    score: 95,
    role: 'Fullstack',
    isPresent: true,
  },
]

function validateInternResponse(data: unknown): Intern[] {
  if (!Array.isArray(data)) {
    throw new Error(
      `validateInternResponse: expected array, got ${typeof data}`
    )
  }

  return data.map((item, index) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error(
        `validateInternResponse: item[${index}] is not an object`
      )
    }

    const intern = item as Intern

    if (
      typeof intern.name !== 'string' ||
      !intern.name.trim()
    ) {
      throw new Error(
        `validateInternResponse: item[${index}].name is invalid`
      )
    }

    if (
      typeof intern.score !== 'number' ||
      intern.score < 0 ||
      intern.score > 100
    ) {
      throw new Error(
        `validateInternResponse: item[${index}].score is invalid, got: ${intern.score}`
      )
    }

    return intern
  })
}

const InternContext = createContext<InternContextType | null>(null)

// Theme and intern data are stored in separate contexts because they
// represent different responsibilities. Keeping them separate makes the
// application easier to maintain and avoids unnecessary re-renders.
export function InternProvider({
  children,
  initialInterns = defaultInterns,
  loadDelay = 800,
}: InternProviderProps) {
  const [interns, setInterns] = useState<Intern[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    function loadInterns(): void {
      const validatedInterns =
        validateInternResponse(initialInterns)

      setInterns(validatedInterns)
      setIsLoading(false)
    }

    if (loadDelay <= 0) {
      loadInterns()
      return
    }

    const timeoutId = window.setTimeout(loadInterns, loadDelay)

    return () => window.clearTimeout(timeoutId)
  }, [initialInterns, loadDelay])

  function addIntern(intern: Intern): void {
    setInterns((prev) => [...prev, intern])
  }

  function removeIntern(id: number): void {
    setInterns((prev) =>
      prev.filter((intern) => intern.id !== id)
    )
  }

  return (
    <InternContext.Provider
      value={{
        interns,
        isLoading,
        addIntern,
        removeIntern,
      }}
    >
      {children}
    </InternContext.Provider>
  )
}

export function useInterns(): InternContextType {
  const context = useContext(InternContext)

  if (!context) {
    throw new Error(
      'useInterns: expected to be called inside <InternProvider>, got: no provider found'
    )
  }

  return context
}

// Theme and intern data are stored in separate contexts because they have
// different responsibilities. Keeping them separate improves organization,
// makes the code easier to maintain, and avoids unnecessary re-renders.

// Dependency Injection audit:
// ID generation remains inside AddInternForm because this codebase already
// creates IDs at the form boundary when a user submits a new intern.
// Injecting initialInterns fits better here because InternProvider owns the
// initial intern list and loading delay. The default props preserve existing
// runtime behavior, while tests and alternate screens can provide controlled
// data without mocking the context module.

// Audit Comment:
// The highest-risk silent failure is accepting malformed intern data into
// application state. The API-boundary validation now fails fast before any
// invalid data is stored, making bugs easier to diagnose.


// Audit Comment:
// I would fix addIntern() first because invalid data entering application
// state is the highest-risk bug and affects every component using the context.