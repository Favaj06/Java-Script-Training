import { renderHook, act } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import useInternForm from './useInternForm'
import type { ChangeEvent } from 'react'

test('initialises with empty form state', () => {
  expect.hasAssertions()

  const { result } = renderHook(() => useInternForm())

  expect(result.current.form.name).toBe('')
  expect(result.current.form.score).toBe(0)
  expect(result.current.form.role).toBe('Frontend')
  expect(result.current.error).toBe('')
})

test('isValid returns false and sets error when name is empty', () => {
  expect.hasAssertions()

  const { result } = renderHook(() => useInternForm())

  let valid = false

  act(() => {
    valid = result.current.isValid()
  })

  expect(valid).toBe(false)
  expect(result.current.error).toBe('Name is required')
})

test('isValid returns true when name and score are valid', () => {
  expect.hasAssertions()

  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Rahul',
        type: 'text',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: {
        name: 'score',
        value: '92',
        type: 'number',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  let valid = false

  act(() => {
    valid = result.current.isValid()
  })

  expect(valid).toBe(true)
  expect(result.current.error).toBe('')
})

test('handleReset clears form values and error', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Rahul',
        type: 'text',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.isValid()
  })

  act(() => {
    result.current.handleReset()
  })

  expect(result.current.form.name).toBe('')
  expect(result.current.form.score).toBe(0)
  expect(result.current.form.role).toBe('Frontend')
  expect(result.current.error).toBe('')
})

/*
Hook tests verify the business logic directly without involving the UI.
They are faster, simpler, and help isolate bugs in the hook itself,
whereas component tests verify that the UI correctly uses the hook.
*/

/*
result.current contains the latest state and functions returned by the hook.
After act() updates the state, result.current reflects the updated values,
so it should be read after the act() call.
*/

/*
Hook tests focus on the hook's logic without rendering a component.
This makes them faster and helps identify whether a bug is in the hook
or in the component that uses it.
*/

// Task 3.1 – Label the AAA phases in an existing test

test('shows error when name is empty', () => {
  // Arrange
  const { result } = renderHook(() => useInternForm())

  let valid = false

  // Act
  act(() => {
    valid = result.current.isValid()
  })

  // Assert
  expect(valid).toBe(false)
  expect(result.current.error).toBe('Name is required')
})

/*
Arrange:
Sets up the hook and prepares everything needed.

Act:
Calls isValid() to validate the form.

Assert:
Verifies that validation failed and the correct error message is displayed.

The phases are clearly separated. Arrange prepares everything,
Act performs the validation, and Assert verifies only the result.
*/

// Task 3.2 – Test 1

test('returns true when name is Sneha and score is 88', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Sneha',
        type: 'text',
      },
    } as ChangeEvent<HTMLInputElement>)

    result.current.handleChange({
      target: {
        name: 'score',
        value: '88',
        type: 'number',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  let valid = false

  act(() => {
    valid = result.current.isValid()
  })

  expect(valid).toBe(true)
})

test('updates the name field when handleChange is called', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Sneha',
        type: 'text',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  expect(result.current.form.name).toBe('Sneha')
})

/*
FIRST audit for the form hook:
- Fast: these tests exercise the hook logic without rendering the whole form.
- Isolated: dependency injection allows us to provide fake addIntern and generateId functions.
- Repeatable: the tests do not rely on timers, network calls, or browser APIs.
- Self-validating: the hook returns clear state and error messages for each path.
- Timely: these assertions cover the current behavior immediately after the refactor.

Observation:
The new submit tests are stronger than the older validation-only tests because they validate the real contract of the hook: validation, delegation to addIntern, and clearing the error state after a successful submission.
*/

test('submits successfully with injected addIntern and generateId', () => {
  const addIntern = vi.fn()
  const generateId = vi.fn(() => 42)
  const { result } = renderHook(() => useInternForm({ addIntern, generateId }))

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Rahul',
        type: 'text',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: {
        name: 'score',
        value: '92',
        type: 'number',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  let submitted = false

  act(() => {
    submitted = result.current.handleSubmit()
  })

  expect(submitted).toBe(true)
  expect(generateId).toHaveBeenCalledTimes(1)
  expect(addIntern).toHaveBeenCalledWith({
    id: 42,
    name: 'Rahul',
    score: 92,
    isPresent: true,
    role: 'Frontend',
  })
  expect(result.current.form.name).toBe('')
  expect(result.current.error).toBe('')
})

test('fails validation without calling addIntern', () => {
  const addIntern = vi.fn()
  const { result } = renderHook(() => useInternForm({ addIntern }))

  let submitted = false

  act(() => {
    submitted = result.current.handleSubmit()
  })

  expect(submitted).toBe(false)
  expect(addIntern).not.toHaveBeenCalled()
  expect(result.current.error).toBe('Name is required')
})

test('clears the error after a successful submit', () => {
  const addIntern = vi.fn()
  const { result } = renderHook(() => useInternForm({ addIntern }))

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Rahul',
        type: 'text',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.isValid()
  })

  expect(result.current.error).toBe('')

  act(() => {
    result.current.handleSubmit()
  })

  expect(result.current.error).toBe('')
})