import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// createContext is initialized with null because there is no default theme.
// The useTheme hook throws an error if the context is null so developers know
// the component must be wrapped inside ThemeProvider.
const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  function toggleTheme(): void {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)

  if (!context)
    throw new Error('useTheme must be used inside ThemeProvider')

  return context
}

// Finding:
// Calling useTheme() inside a normal function results in an
// "Invalid hook call" error because React hooks can only be
// used inside React function components or custom hooks.