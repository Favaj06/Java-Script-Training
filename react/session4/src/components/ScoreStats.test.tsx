import { render, screen } from '../test/test-utils'
import ScoreStats from './ScoreStats'

test('renders score statistics heading', () => {
  render(<ScoreStats />)

  expect(
    screen.getByText('Score Statistics')
  ).toBeInTheDocument()
})

test('shows highest, lowest and average scores', () => {
  render(<ScoreStats />)

  expect(
    screen.getByText(/Highest:/)
  ).toBeInTheDocument()

  expect(
    screen.getByText(/Lowest:/)
  ).toBeInTheDocument()

  expect(
    screen.getByText(/Average:/)
  ).toBeInTheDocument()
})

test('shows passing intern count', () => {
  render(<ScoreStats />)

  expect(
    screen.getByText(/Passing:/)
  ).toBeInTheDocument()
})

// findBy queries are used when waiting for a single element
// to appear asynchronously.
//
// waitFor is used for more complex asynchronous conditions,
// such as waiting for multiple assertions or state updates.