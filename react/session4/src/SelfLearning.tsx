// ============================================================
// SELF LEARNING TASKS
// ============================================================

// ------------------------------------------------------------
// 1. React.memo
// ------------------------------------------------------------

// React.memo is a Higher Order Component (HOC) that memoizes a
// functional component. It prevents unnecessary re-renders by
// comparing the previous props with the new props.
//
// If the props have not changed, React reuses the previous render
// instead of rendering the component again.
//
// React.memo works best together with useCallback because functions
// are recreated on every render. useCallback keeps the same function
// reference so React.memo can correctly determine that the props
// haven't changed.
//
// Example:
//
// const MemoInternRow = React.memo(InternRow);
//
// Instead of:
//
// <InternRow ... />
//
// use:
//
// <MemoInternRow ... />


// ------------------------------------------------------------
// 2. When NOT to use useMemo and useCallback
// ------------------------------------------------------------

// Example 1:
//
// Do NOT use useMemo for simple calculations.
//
// Instead of:
//
// const total = useMemo(() => a + b, [a, b])
//
// simply write:
//
// const total = a + b
//
// Because calculating a + b is cheaper than maintaining the memo.

// Example 2:
//
// Do NOT wrap every function inside useCallback.
//
// If the function is only used inside the current component and
// isn't passed to memoized child components, useCallback adds
// unnecessary complexity and memory overhead without improving
// performance.

// Conclusion:
//
// useMemo and useCallback should only be used after identifying
// a real performance problem. Using them everywhere can actually
// make code slower and harder to understand.


// ------------------------------------------------------------
// 3. useReducer Version of useCounter
// ------------------------------------------------------------

import { useReducer } from 'react'

interface CounterState {
  count: number
}

type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }

    case 'decrement':
      return { count: state.count - 1 }

    case 'reset':
      return { count: 0 }

    default:
      return state
  }
}

export function useReducerCounter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
  })

  return {
    count: state.count,

    increment: () => dispatch({ type: 'increment' }),

    decrement: () => dispatch({ type: 'decrement' }),

    reset: () => dispatch({ type: 'reset' }),
  }
}

// useReducer is preferred when:
//
// • State transitions become complex.
// • Multiple state values are related.
// • Many actions update the same state.
// • Business logic becomes difficult to manage with several useState calls.


// ------------------------------------------------------------
// 4. Zustand / Redux Toolkit vs Context API
// ------------------------------------------------------------

// Context + useState is suitable for small and medium-sized
// applications where only a few pieces of global state need
// to be shared, such as themes or authenticated users.
//
// Zustand and Redux Toolkit are better choices for large
// applications with complex global state, asynchronous actions,
// middleware, caching, debugging tools, and predictable state
// updates. Redux Toolkit provides a structured architecture and
// excellent DevTools support, while Zustand offers a simpler API
// with less boilerplate. For enterprise-scale applications,
// these libraries provide better scalability than Context API.

function SelfLearning() {
  return null
}

export default SelfLearning