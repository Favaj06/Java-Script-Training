import useCounter from '../hooks/useCounter'

function CounterDemo() {
  const basic = useCounter()

  const bounded = useCounter({
    initial: 5,
    min: 0,
    max: 10,
  })

  const stepped = useCounter({
    step: 5,
  })

  return (
    <div>

      <h2>Counter Demo</h2>

      <div>
        <p>Basic: {basic.count}</p>

        <button onClick={basic.increment}>+</button>

        <button onClick={basic.decrement}>-</button>

        <button onClick={basic.reset}>Reset</button>
      </div>

      <hr />

      <div>
        <p>Bounded (0–10): {bounded.count}</p>

        <button onClick={bounded.increment}>+</button>

        <button onClick={bounded.decrement}>-</button>
      </div>

      <hr />

      <div>
        <p>Step 5: {stepped.count}</p>

        <button onClick={stepped.increment}>+5</button>

        <button onClick={stepped.decrement}>-5</button>
      </div>

    </div>
  )
}

export default CounterDemo