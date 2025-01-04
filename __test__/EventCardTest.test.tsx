import { render, screen } from '@testing-library/react'
import EventCard from '@/components/events/EventCard'
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';

describe('EventCard', () => {
  const mockEvents = [{
    id: 1,
    title: 'Test Event',
    description: 'Test Description',
    start_date: new Date(),
    userId: 1,
    likes: 0,
    image_url: null,
    location: 'Test Location',
    user: {
      id: 1,
      email: 'test@example.com',
      password: 'hash',
      profile_picture: null,
      first_name: 'John',
      last_name: 'Doe',
      details: null,
      contacts: null
    },
    participants: [],
    comments: []
  }]

  it('renders event card with correct data', () => {
    render(<EventCard events={mockEvents} />)
    
    // Test user details
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    
    // Test event details
    expect(screen.getByText('Test Event')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders avatar with fallback initials', () => {
    render(<EventCard events={mockEvents} />)
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('renders link with correct href', () => {
    render(<EventCard events={mockEvents} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/event/1')
  })

  it('handles empty events array', () => {
    render(<EventCard events={[]} />)
    expect(screen.queryByText('Test Event')).not.toBeInTheDocument()
  })

  it('truncates long descriptions', () => {
    const longDescription = 'A'.repeat(100)
    const eventsWithLongDesc = [{
      ...mockEvents[0],
      description: longDescription
    }]
    
    render(<EventCard events={eventsWithLongDesc} />)
    const description = screen.getByText(/A+/)
    expect(description).toHaveClass('truncate')
  })
})