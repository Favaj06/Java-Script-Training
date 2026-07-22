import userEvent from '@testing-library/user-event'
import { render, screen } from '../test/test-utils'
import { InternRow } from './InternListWithCallback'

test('calls onRemove with the correct id when Remove is clicked', async () => {
  const user = userEvent.setup()
  const onRemove = vi.fn()

  render(
    <InternRow
      id={1}
      name="Rahul"
      score={92}
      onRemove={onRemove}
    />
  )

  await user.click(
    screen.getByRole('button', {
      name: 'Remove',
    })
  )

  expect(onRemove).toHaveBeenCalledTimes(1)
  expect(onRemove).toHaveBeenCalledWith(1)
})

test('does not call onRemove when row is only rendered', () => {
  const onRemove = vi.fn()

  render(
    <InternRow
      id={1}
      name="Rahul"
      score={92}
      onRemove={onRemove}
    />
  )

  expect(onRemove).not.toHaveBeenCalled()
})

// screen.debug() prints the rendered HTML in the terminal.
// It helps inspect the DOM and choose the correct query like getByRole or getByText.

// getByRole() is used when expecting one element with a specific role.
// getAllByRole() is used when multiple elements share the same role.