import { useState } from 'react'

function InternForm() {
  const [name, setName] = useState<string>('')
  const [score, setScore] = useState<number>(0)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value)
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setScore(Number(e.target.value))
  }

  function handleReset(): void {
    setName('')
    setScore(0)
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Intern name"
      />

      <input
        type="number"
        value={score}
        onChange={handleScoreChange}
        placeholder="Score"
      />

      <p>
        Name: {name} | Score: {score}
      </p>

      <button onClick={handleReset}>Reset</button>

      {/* Even though the input type is "number", e.target.value is always
          returned as a string. Number() converts the string into a number
          so it matches the state type and prevents TypeScript errors. */}

      {/* A controlled input is an input whose value is managed by React state.
          The value displayed in the input always comes from the component's
          state, and any user changes update the state through the onChange
          handler. This keeps the UI and state synchronized. */}
    </div>
  )
}

export default InternForm