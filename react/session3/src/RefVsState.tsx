import { useState, useRef } from 'react'

function RefVsState() {
  const [stateCount, setStateCount] = useState<number>(0)
  const refCount = useRef<number>(0)

  function incrementState(): void {
    setStateCount(prev => prev + 1)
  }

  function incrementRef(): void {
    refCount.current += 1
    console.log('Ref value:', refCount.current)
  }

  return (
    <div>
      <p>State count (shown in UI): {stateCount}</p>
      <p>Ref count (check console): {refCount.current}</p>

      <button onClick={incrementState}>
        Increment State
      </button>

      <button onClick={incrementRef}>
        Increment Ref
      </button>

      {/* useState stores data that affects the UI and causes the component
          to re-render when updated. useRef stores mutable values that persist
          across renders but do not trigger a re-render. Use useState for UI
          data and useRef for DOM references or values that do not need to
          update the UI immediately. */}
    </div>
  )
}

export default RefVsState