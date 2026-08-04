import { memo, useCallback } from 'react'
import { useInterns } from '../contexts/intern-context'
import { useTheme } from '../contexts/theme-context'
import ScoreBadge from './ScoreBadge'

interface InternRowProps {
  id: number
  name: string
  score: number
  onRemove: (id: number) => void
}

const InternRow = memo(function InternRow({
  id,
  name,
  score,
  onRemove,
}: InternRowProps) {
  const { theme } = useTheme()

  console.log(`InternRow rendered: ${name}`)

  return (
    <div
      style={{
        background: theme === 'light' ? '#ffffff' : '#2a2a2a',
        color: theme === 'light' ? '#000000' : '#eeeeee',
        padding: '8px',
        margin: '4px 0',
      }}
    >
     <span>
      {name} — {score}
      <ScoreBadge score={score} />
    </span>

      <button
        onClick={() => onRemove(id)}
        style={{ marginLeft: '10px' }}
      >
        Remove
      </button>
    </div>
  )
})

function InternListWithCallback() {
  const { interns, removeIntern } = useInterns()

  // useCallback keeps the same function reference between renders.
  // This helps prevent unnecessary re-renders of child components
  // when the callback function itself hasn't changed.
  const handleRemove = useCallback(
    (id: number): void => {
      removeIntern(id)
    },
    [removeIntern]
  )

  return (
    <div>
      <h2>Intern List</h2>

      {interns.map((intern) => (
        <InternRow
          key={intern.id}
          id={intern.id}
          name={intern.name}
          score={intern.score}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}

export default InternListWithCallback
// React.memo prevents unnecessary re-renders by reusing the previous
// rendered output when the component's props have not changed.
// It works well with useCallback because useCallback keeps the same
// function reference between renders, allowing React.memo to detect
// unchanged props more effectively.