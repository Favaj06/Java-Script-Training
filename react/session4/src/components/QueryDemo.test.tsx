import { render, screen } from '../test/test-utils'
import ThemedCard from './ThemedCard'

test('getByText finds the name', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Rahul')).toBeInTheDocument()

  // Uncomment to see getBy throw an error
  // screen.getByText('Priya')
})

test('queryBy returns null when element is missing', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.queryByText('Fail')).not.toBeInTheDocument()
})

test('getAllBy finds multiple elements', () => {
  render(
    <div>
      <ThemedCard name="Rahul" score={92} />
      <ThemedCard name="Priya" score={78} />
    </div>
  )

  const passBadges = screen.getAllByText('Pass')
  expect(passBadges).toHaveLength(2)
})

// getByRole() is used when expecting a single element.
// getAllByRole() is used when expecting multiple elements with the same role.