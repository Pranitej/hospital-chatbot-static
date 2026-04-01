import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MessageBubble from './MessageBubble'
import { SENDER } from '../../constants'

describe('MessageBubble', () => {
  it('renders bot message text', () => {
    render(<MessageBubble sender={SENDER.BOT} text="Hello from bot" timestamp="10:00 AM" />)
    expect(screen.getByText('Hello from bot')).toBeInTheDocument()
  })

  it('renders user message text', () => {
    render(<MessageBubble sender={SENDER.USER} text="User reply" timestamp="10:01 AM" />)
    expect(screen.getByText('User reply')).toBeInTheDocument()
  })

  it('renders timestamp', () => {
    render(<MessageBubble sender={SENDER.BOT} text="Hi" timestamp="09:45 AM" />)
    expect(screen.getByText('09:45 AM')).toBeInTheDocument()
  })

  it('bot bubble includes bot avatar', () => {
    const { container } = render(
      <MessageBubble sender={SENDER.BOT} text="Hi" timestamp="10:00 AM" />
    )
    expect(container.querySelector('[data-testid="bot-avatar"]')).toBeInTheDocument()
  })

  it('user bubble does not include bot avatar', () => {
    const { container } = render(
      <MessageBubble sender={SENDER.USER} text="Hi" timestamp="10:00 AM" />
    )
    expect(container.querySelector('[data-testid="bot-avatar"]')).not.toBeInTheDocument()
  })
})
