import { useState, useRef } from 'react'

function StopwatchRef() {
  const [seconds, setSeconds] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function handleStart(): void {
    if (isRunning) return

    setIsRunning(true)

    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }

  function handleStop(): void {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    setIsRunning(false)
  }

  function handleReset(): void {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    setIsRunning(false)
    setSeconds(0)
  }

  return (
    <div>
      <p>Time: {seconds}s</p>

      <button
        onClick={handleStart}
        disabled={isRunning}
      >
        Start
      </button>

      <button
        onClick={handleStop}
        disabled={!isRunning}
      >
        Stop
      </button>

      <button onClick={handleReset}>
        Reset
      </button>

      {/* The interval ID is stored in useRef because it does not need to
          trigger a UI update. If useState were used, every time the interval
          ID changed the component would re-render unnecessarily. useRef
          preserves the interval ID across renders without causing extra
          renders. */}
    </div>
  )
}

export default StopwatchRef