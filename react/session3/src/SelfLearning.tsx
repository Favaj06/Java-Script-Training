import { useState, useEffect } from 'react'

function LiveTimer() {
  const [seconds, setSeconds] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // Cleanup function
    return () => clearInterval(interval)
  }, [])

  return <p>Live Timer: {seconds}s</p>
}

function SelfLearning() {
  return (
    <div>
      <h2>Self Learning Tasks</h2>

      <LiveTimer />

      {/* 
      1. React.StrictMode

      Observation:
      In development mode, React.StrictMode intentionally renders the component
      and runs useEffect twice. This helps detect unexpected side effects and
      missing cleanup functions. In production mode, the component runs only once.
      */}

      {/*
      2. useLayoutEffect vs useEffect

      useEffect:
      - Runs after the browser has painted the UI.
      - Used for data fetching, timers, API calls, and subscriptions.

      useLayoutEffect:
      - Runs immediately after React updates the DOM but before the browser
        paints the screen.
      - Used when measuring or modifying the DOM before it becomes visible,
        preventing flickering.
      */}

      {/*
      3. useEffect without a dependency array

      If useEffect updates state without providing a dependency array, it runs
      after every render. Updating state causes another render, which runs
      useEffect again, creating an infinite render loop.
      */}

      {/*
      4. useReducer vs useState

      useState is best for simple state such as counters, text fields, or
      booleans. useReducer is better when state is more complex, has multiple
      related values, or requires many update actions. It keeps update logic
      organized inside a reducer function and makes complex state easier to
      maintain.
      */}

      {/*
      5. Cleanup Function in useEffect

      Cleanup functions remove resources such as timers, event listeners,
      and subscriptions before the component unmounts or before the effect
      runs again. Without cleanup, multiple timers or event listeners remain
      active, causing memory leaks, duplicate events, and unexpected behavior.
      */}
    </div>
  )
}

export default SelfLearning 