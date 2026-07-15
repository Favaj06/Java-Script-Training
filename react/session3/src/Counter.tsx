import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>

      {/* We cannot update count directly using count = count + 1 because React
          does not detect direct variable changes. We must use the setter
          function (setCount) so React knows the state has changed and
          re-renders the component. */}
    </div>
  )
}

export default Counter