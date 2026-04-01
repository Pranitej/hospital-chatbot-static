import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OptionButtons from './OptionButtons'

const options = ['Book Appointment', 'Find a Doctor', 'Back to Main Menu']

describe('OptionButtons', () => {
  it('renders all option buttons', () => {
    render(<OptionButtons options={options} onSelect={vi.fn()} disabled={false} />)
    options.forEach((opt) => expect(screen.getByText(opt)).toBeInTheDocument())
  })

  it('calls onSelect with the option text when clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<OptionButtons options={options} onSelect={onSelect} disabled={false} />)
    await user.click(screen.getByText('Find a Doctor'))
    expect(onSelect).toHaveBeenCalledWith('Find a Doctor')
  })

  it('buttons are disabled when disabled prop is true', () => {
    render(<OptionButtons options={options} onSelect={vi.fn()} disabled={true} />)
    options.forEach((opt) => expect(screen.getByText(opt)).toBeDisabled())
  })

  it('renders nothing when options array is empty', () => {
    const { container } = render(<OptionButtons options={[]} onSelect={vi.fn()} disabled={false} />)
    expect(container.firstChild).toBeNull()
  })
})
