import { render, type RenderOptions } from '@testing-library/react'
import { type ReactElement } from 'react'
import { afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  document.body.innerHTML = ''
})

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, options)

export * from '@testing-library/react'
export { customRender as render }
