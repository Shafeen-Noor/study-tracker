import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Dashboard from './Dashboard'

vi.mock('../../shared/context', () => ({
  useEntries: () => ({
    entries: [{ id: '1', subject: 'Math', topic: 'Algebra', hours: 2, date: '2024-01-15' }],
    addEntry: vi.fn(),
    updateEntry: vi.fn(),
    deleteEntry: vi.fn(),
  }),
  useFilter: () => ({
    filterSubject: '',
    setFilterSubject: vi.fn(),
  }),
}))

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('Dashboard', () => {
  it('smoke: renders without crashing', () => {
    render(<Dashboard />, { wrapper: Wrapper })
  })

  it('smoke: shows the Dashboard heading', () => {
    render(<Dashboard />, { wrapper: Wrapper })
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('smoke: shows the subject name', () => {
    render(<Dashboard />, { wrapper: Wrapper })
    const mathElements = screen.getAllByText('Math')
    expect(mathElements.length).toBeGreaterThan(0)
  })
})
