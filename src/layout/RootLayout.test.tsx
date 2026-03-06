import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RootLayout from './RootLayout'


describe('RootLayout', () => {

  it('smoke: renders without crashing', () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    )
  })

  it('smoke: shows navigation links', () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Add Entry')).toBeInTheDocument()
    expect(screen.getByText('My Entries')).toBeInTheDocument()
  })

})