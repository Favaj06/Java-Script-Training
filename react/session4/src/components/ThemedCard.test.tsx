import { render, screen } from '../test/test-utils'
import ThemedCard from './ThemedCard'

// We import render and screen from test-utils so every component is automatically
// wrapped with ThemeProvider and any shared test configuration.
test('renders the student name', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Rahul')).toBeInTheDocument()
})

test('renders the score', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Score: 92')).toBeInTheDocument()
})

test('shows Pass when score is 92', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Pass')).toBeInTheDocument()
})

test('shows Fail when score is 45', () => {
  render(<ThemedCard name="Amit" score={45} />)

  expect(screen.getByText('Fail')).toBeInTheDocument()
})

test('no console errors during ThemedCard render', () => {
  const spy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  render(
    <ThemedCard
      name="Rahul"
      score={92}
    />
  )

  expect(spy).not.toHaveBeenCalled()

  spy.mockRestore()
})
// vi.fn() creates a mock function that records calls and arguments.
// vi.mock() replaces an entire module with a mocked implementation.
// vi.spyOn() observes or temporarily overrides an existing function while allowing it to be restored later.
// Mock only external dependencies or expensive operations.
// Let your own business logic run normally whenever possible so the test reflects real application behavior.
