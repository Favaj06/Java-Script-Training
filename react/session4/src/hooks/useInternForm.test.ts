import { act, renderHook } from '@testing-library/react'
import { type ChangeEvent } from 'react'
import { expect, test, vi } from 'vitest'
import useInternForm from './useInternForm'

test('isValid returns false and sets error when name is empty', () => {
  expect.hasAssertions()

  const { result } = renderHook(() => useInternForm())

  let valid = false

  act(() => {
    valid = result.current.isValid()
  })

  expect(valid).toBe(false)
  expect(result.current.error).toBe(
    'validateInternForm: expected a non-empty name, got: ""'
  )
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

test('handleChange updates checkbox and select fields', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: 'isPresent',
        checked: false,
        type: 'checkbox',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: {
        name: 'role',
        value: 'Backend',
        type: 'select-one',
      },
    } as ChangeEvent<HTMLSelectElement>)
  })

  expect(result.current.form.isPresent).toBe(false)
  expect(result.current.form.role).toBe('Backend')
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
  expect(result.current.error).toBe(
    'validateInternForm: expected a non-empty name, got: ""'
  )
})

test('submits valid form with addIntern and default ID generation', () => {
  const addIntern = vi.fn()
  const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(123)
  const { result } = renderHook(() =>
    useInternForm({ addIntern })
  )

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Sneha',
        type: 'text',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: {
        name: 'score',
        value: '88',
        type: 'number',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  let submitted = false

  act(() => {
    submitted = result.current.handleSubmit()
  })

  expect(submitted).toBe(true)
  expect(addIntern).toHaveBeenCalledWith({
    id: 123,
    name: 'Sneha',
    score: 88,
    role: 'Frontend',
    isPresent: true,
  })
  expect(result.current.form.name).toBe('')
  expect(result.current.error).toBe('')

  nowSpy.mockRestore()
})

test('submits valid form without an addIntern callback', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Amit',
        type: 'text',
      },
    } as ChangeEvent<HTMLInputElement>)
  })

  let submitted = false

  act(() => {
    submitted = result.current.handleSubmit()
  })

  expect(submitted).toBe(true)
  expect(result.current.form.name).toBe('')
  expect(result.current.error).toBe('')
})
