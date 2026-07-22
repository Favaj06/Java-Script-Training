import { renderHook, act } from '@testing-library/react'
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