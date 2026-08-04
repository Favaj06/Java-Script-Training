import type { Intern } from '../types/intern'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

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
      setInterns([...initialInterns])
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
    setInterns((prev) => prev.filter((intern) => intern.id !== id))
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
    throw new Error('useInterns must be used inside InternProvider')
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
