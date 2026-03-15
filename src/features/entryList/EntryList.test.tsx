import { render, screen } from '@testing-library/react'
import { MemoryRouter, useOutletContext } from 'react-router-dom'
import { FilterProvider } from '../../shared/context/FilterContext'
import EntryList from './EntryList'
import type { StudyEntry } from '../../shared/types'

const mockEntries: StudyEntry[] = [
  { id: '1', subject: 'Math', topic: 'Algebra', hours: 2, date: '2024-01-15' },
  { id: '2', subject: 'Science', topic: 'Biology', hours: 1, date: '2024-01-16' },
]

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useOutletContext: vi.fn(() => ({ entries: mockEntries })),
  }
})

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <FilterProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </FilterProvider>
)

describe('EntryList', () => {
  it('smoke: renders without crashing', () => {
    render(<EntryList />, { wrapper: Wrapper })
  })

  it('smoke: shows the heading', () => {
    render(<EntryList />, { wrapper: Wrapper })
    expect(screen.getByText('Study Entries')).toBeInTheDocument()
  })

  it('comprehensive: shows hours for each entry', () => {
    render(<EntryList />, { wrapper: Wrapper })
    expect(screen.getByText(/2 hrs/)).toBeInTheDocument()
    expect(screen.getByText(/1 hrs/)).toBeInTheDocument()
  })

  it('comprehensive: shows dates for each entry', () => {
    render(<EntryList />, { wrapper: Wrapper })
    expect(screen.getByText(/2024-01-15/)).toBeInTheDocument()
    expect(screen.getByText(/2024-01-16/)).toBeInTheDocument()
  })

  it('comprehensive: shows empty list when no entries', () => {
    vi.mocked(useOutletContext).mockReturnValueOnce({ entries: [] })
    render(<EntryList />, { wrapper: Wrapper })
    expect(screen.getByText('Study Entries')).toBeInTheDocument()
    expect(screen.queryByText(/hrs/)).not.toBeInTheDocument()
  })
})
