import { useState } from 'react'

interface Intern {
  id: number
  name: string
  isPresent: boolean
}

function StateTypes() {
  // TypeScript infers type from initial value
  const [name, setName] = useState('')
  const [score, setScore] = useState(0)
  const [isActive, setIsActive] = useState(false)

  // Explicit annotation needed because the initial value is ambiguous
  const [selected] = useState<Intern | null>(null)
  const [interns] = useState<Intern[]>([])

  return (
    <div>
      <p>Name: {name || '(none)'}</p>
      <p>Score: {score}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
      <p>Selected: {selected ? selected.name : '(none)'}</p>
      <p>Intern count: {interns.length}</p>

      <button onClick={() => setName('Rahul')}>
        Set Name
      </button>

      <button onClick={() => setScore(92)}>
        Set Score
      </button>

      <button onClick={() => setIsActive(true)}>
        Activate
      </button>

      {/* Explore Findings:
          1. setScore('92') gives a TypeScript error because setScore expects
             a number, but a string is provided.
          2. setSelected({ id: 1, name: 'Rahul' }) gives an error because
             the required 'isPresent' property is missing from the object.
      */}
    </div>
  )
}

export default StateTypes