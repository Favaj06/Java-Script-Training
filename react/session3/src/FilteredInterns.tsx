import { useState, useEffect } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
}

const allInterns: Intern[] = [
  { id: 1, name: 'Rahul', score: 92, role: 'Frontend' },
  { id: 2, name: 'Priya', score: 78, role: 'Backend' },
  { id: 3, name: 'Amit', score: 45, role: 'Frontend' },
  { id: 4, name: 'Sneha', score: 95, role: 'Fullstack' },
]

function FilteredInterns() {
  const [role, setRole] = useState<string>('all')
  const [filtered, setFiltered] = useState<Intern[]>(allInterns)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    // Simulate re-fetching when role changes
    setTimeout(() => {
      const result =
        role === 'all'
          ? allInterns
          : allInterns.filter(i => i.role === role)

      setFiltered(result)
      setIsLoading(false)
    }, 500)
  }, [role])

  return (
    <div>
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      {isLoading ? (
        <p>Updating...</p>
      ) : (
        <ul>
          {filtered.map(i => (
            <li key={i.id}>
              {i.name} — {i.role}
            </li>
          ))}
        </ul>
      )}

      {/* Explore Findings:
          1. Without a dependency array, useEffect runs after every render.
          2. With an empty array ([]), it runs only once after the initial render.
          3. With [role], it runs on the first render and whenever the role
             value changes, which is the correct behavior for this component. */}
    </div>
  )
}

export default FilteredInterns  