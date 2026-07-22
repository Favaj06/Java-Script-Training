import { useState } from 'react'

function TogglePanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Hide Details' : 'Show Details'}
      </button>

      {isOpen && (
        <div>
          <p>Name: Rahul</p>
          <p>Score: 92</p>
          <p>Role: Frontend</p>
        </div>
      )}

      {/* Both setIsOpen(prev => !prev) and setIsOpen(!isOpen) work in many cases.
          However, the functional update form (prev => !prev) is safer because it
          always uses the latest state value. This prevents bugs when multiple
          state updates occur asynchronously or are batched by React. */}
    </div>
  )
}

export default TogglePanel