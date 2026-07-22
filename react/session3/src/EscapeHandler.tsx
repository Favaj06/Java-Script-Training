import { useState, useEffect } from 'react'

function EscapeHandler() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Panel
      </button>

      {isOpen && (
        <div
          style={{
            border: '1px solid #ccc',
            padding: '16px',
            marginTop: '8px',
          }}
        >
          <p>Panel is open. Press Escape to close.</p>

          <button onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      )}

      {/* Explore Findings:
          If the cleanup function is removed, every time the panel is opened
          a new event listener is added without removing the previous one.
          After opening and closing the panel multiple times, pressing Escape
          causes the event to fire multiple times because several listeners
          remain active. Cleanup prevents memory leaks and duplicate listeners. */}
    </div>
  )
}

export default EscapeHandler