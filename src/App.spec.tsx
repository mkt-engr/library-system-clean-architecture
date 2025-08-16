import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('初期カウントでアプリがレンダリングされる', () => {
    render(<App />)
    
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
    expect(screen.getByText('count is 0')).toBeInTheDocument()
  })

  it('ボタンクリック時にカウントが増加する', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const button = screen.getByRole('button', { name: /count is/i })
    
    await user.click(button)
    expect(screen.getByText('count is 1')).toBeInTheDocument()
    
    await user.click(button)
    expect(screen.getByText('count is 2')).toBeInTheDocument()
  })

  it('ViteとReactのドキュメントへのリンクがある', () => {
    render(<App />)
    
    const viteLink = screen.getByRole('link', { name: /vite logo/i })
    const reactLink = screen.getByRole('link', { name: /react logo/i })
    
    expect(viteLink).toHaveAttribute('href', 'https://vite.dev')
    expect(reactLink).toHaveAttribute('href', 'https://react.dev')
  })
})