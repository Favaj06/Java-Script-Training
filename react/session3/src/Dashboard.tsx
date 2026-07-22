import { useState, useEffect, useRef } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

function Dashboard() {
  const [interns, setInterns] = useState<Intern[]>([])
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // Load data after component mounts
  useEffect(() => {
    setTimeout(() => {
      setInterns([
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
      ])

      setIsLoading(false)
    }, 1500)
  }, [])

  // Auto focus search input
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  // Derived data (not stored in state)
  const filteredInterns = interns.filter(intern =>
    intern.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return <p>Loading interns...</p>
  }

  return (
    <div>
      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Hide Search' : 'Show Search'}
      </button>

      {isOpen && (
        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Intern"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      <p>
        Showing {filteredInterns.length} of {interns.length} interns
      </p>

      {filteredInterns.map(intern => (
        <div
          key={intern.id}
          style={{
            border: '1px solid gray',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <h3>{intern.name}</h3>

          <p>Role: {intern.role}</p>

          <p>Score: {intern.score}</p>

          <p>
            Status:{' '}
            <span
              style={{
                color: intern.score >= 50 ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {intern.score >= 50 ? 'Pass' : 'Fail'}
            </span>
          </p>
        </div>
      ))}
    </div>
  )
}

export default Dashboard