import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import EventForm from '../EventForm'

describe('EventForm', () => {
  it('renders form fields', () => {
    render(<EventForm />)
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
  })

  it('handles form submission', async () => {
    render(<EventForm />)
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Event' },
    })
    
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }))
    
    // Assert form submission
  })
})