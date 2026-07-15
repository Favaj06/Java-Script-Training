import { useState } from 'react'

interface Intern {
  id: number
  name: string
}

function InternList() {
  const [interns, setInterns] = useState<Intern[]>([])
  const [inputName, setInputName] = useState<string>('')
  const [nextId, setNextId] = useState<number>(1)

  function handleAdd(): void {
    if (!inputName.trim()) return

    setInterns(prev => [
      ...prev,
      {
        id: nextId,
        name: inputName.trim(),
      },
    ])

    setNextId(prev => prev + 1)
    setInputName('')
  }

  function handleRemove(id: number): void {
    setInterns(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div>
      <input
        type="text"
        value={inputName}
        onChange={e => setInputName(e.target.value)}
        placeholder="Intern name"
      />

      <button onClick={handleAdd}>Add</button>

      <p>Total: {interns.length}</p>

      <ul>
        {interns.map(i => (
          <li key={i.id}>
            {i.name}{' '}
            <button onClick={() => handleRemove(i.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* We use [...prev, newIntern] to create a new array with the existing
          items plus the new intern, and prev.filter(...) to create a new array
          without the removed item. React state should be treated as immutable,
          so we should not use push() or splice() because they modify the
          existing array directly. Creating a new array allows React to detect
          the change and re-render the component correctly. */}
    </div>
  )
}

export default InternList