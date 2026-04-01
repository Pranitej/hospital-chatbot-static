import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TypingIndicator from './TypingIndicator'

describe('TypingIndicator', () => {
  it('renders three animated dots', () => {
    const { container } = render(<TypingIndicator />)
    const dots = container.querySelectorAll('[data-testid="typing-dot"]')
    expect(dots).toHaveLength(3)
  })

  it('has accessible status role', () => {
    render(<TypingIndicator />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
