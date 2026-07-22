import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import AddInternForm from './AddInternForm'

describe('AddInternForm', () => {

  describe('initial state', () => {

    test('updates name when user types', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

      expect(screen.getByDisplayValue('Rahul')).toBeInTheDocument()
    })

    test('updates score when user types', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      const scoreInput = screen.getByPlaceholderText('Score')

      await user.clear(scoreInput)
      await user.type(scoreInput, '92')

      expect(screen.getByDisplayValue('92')).toBeInTheDocument()
    })

    test('resets name input when Reset is clicked', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      const nameInput = screen.getByPlaceholderText('Name')

      await user.type(nameInput, 'Rahul')
      await user.click(screen.getByRole('button', { name: 'Reset' }))

      expect(nameInput).toHaveValue('')
    })

  })

  describe('validation', () => {

    test('shows error when name is empty on submit', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      await user.click(
        screen.getByRole('button', {
          name: 'Add Intern',
        })
      )

      expect(
        screen.getByText('Name is required')
      ).toBeInTheDocument()
    })

    test('shows error when score is above 100', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      await user.type(
        screen.getByPlaceholderText('Name'),
        'Rahul'
      )

      const scoreInput = screen.getByPlaceholderText('Score')

      await user.clear(scoreInput)
      await user.type(scoreInput, '150')

      await user.click(
        screen.getByRole('button', {
          name: 'Add Intern',
        })
      )

      expect(
        screen.getByText('Score must be between 0 and 100')
      ).toBeInTheDocument()
    })

    test('error clears when Reset is clicked', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      await user.click(
        screen.getByRole('button', {
          name: 'Add Intern',
        })
      )

      expect(
        screen.getByText('Name is required')
      ).toBeInTheDocument()

      await user.click(
        screen.getByRole('button', {
          name: 'Reset',
        })
      )

      expect(
        screen.queryByText('Name is required')
      ).not.toBeInTheDocument()
    })

  })

  describe('successful submit', () => {

    test('submits the form and clears inputs', async () => {
      const user = userEvent.setup()

      render(<AddInternForm />)

      const nameInput = screen.getByPlaceholderText('Name')
      const scoreInput = screen.getByPlaceholderText('Score')

      await user.type(nameInput, 'Rahul')
      await user.clear(scoreInput)
      await user.type(scoreInput, '92')

      await user.click(
        screen.getByRole('button', {
          name: 'Add Intern',
        })
      )

      expect(nameInput).toHaveValue('')
      expect(scoreInput).toHaveValue(0)
    })

  })

})

/*
userEvent simulates real user interactions such as typing,
clicking, and selecting options. It fires browser events in
the same order as a real user, making tests more realistic.

expect.objectContaining() checks only the specified properties
of an object instead of requiring an exact match. This makes
tests more flexible when objects contain additional fields.

not.toHaveBeenCalled() clearly expresses that a function should
never be called. It is more readable than using
toHaveBeenCalledTimes(0).

Keep describe blocks to a maximum of two levels.
Deeper nesting makes tests harder to read, navigate, and maintain.
*/