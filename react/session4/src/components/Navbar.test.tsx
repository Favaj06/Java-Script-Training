import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar'

describe('Navbar', () => {
  test('renders the dashboard title', () => {
    expect.hasAssertions()

    render(<Navbar />)

    expect(screen.getByText('Intern Dashboard')).toBeInTheDocument()
  })

  test('theme toggle button is visible', () => {
    render(<Navbar />)

    expect(
      screen.getByRole('button', {
        name: /switch to dark mode/i,
      })
    ).toBeInTheDocument()
  })

  test('theme toggle button label changes after click', async () => {
    const user = userEvent.setup()

    render(<Navbar />)

    await user.click(
      screen.getByRole('button', {
        name: /switch to dark mode/i,
      })
    )

    expect(
      screen.getByRole('button', {
        name: /switch to light mode/i,
      })
    ).toBeInTheDocument()
  })
})

/*
If we import render from @testing-library/react directly,
Navbar will not be wrapped with ThemeProvider.
Since Navbar uses useTheme(), React throws a context error.
Always use render from test-utils.
*/

import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from '../contexts/theme-context'

test('renders correctly when wrapped manually in ThemeProvider', () => {
  rtlRender(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  )

  expect(screen.getByText('Intern Dashboard')).toBeInTheDocument()
})

/*
Both approaches render Navbar inside ThemeProvider.
customRender is preferred because it automatically wraps
every component with the required providers,
making tests shorter and easier to maintain.
*/