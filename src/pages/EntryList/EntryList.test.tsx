import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import EntryList from './EntryList'
import type { StudyEntry } from '../../shared/types'

// Mock child modlets to avoid their own context dependencies
vi.mock('./EntryCard', () => ({
  default: ({ entry }: { entry: StudyEntry }) => (
    <div>
      <span>{entry.subject}</span>
      <span>{entry.hours} hrs</span>
      <span>{entry.date}</span>
    </div>
  ),
}))

vi.mock('./EntryFilters', () => ({
  default: () => <div />,
}))

const mockEntries: StudyEntry[] = [
  { id: '1', subject: 'Math', topic: 'Algebra', hours: 2, date: '2024-01-15' },
  { id: '2', subject: 'Science', topic: 'Biology', hours: 1, date: '2024-01-16' },
]

const mockUseEntries = vi.fn()

vi.mock('../../shared/context', () => ({
  useEntries: () => mockUseEntries(),
  useFilter: () => ({
    filterSubject: '',
    setFilterSubject: vi.fn(),
  }),
}))

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('EntryList', () => {
  it('smoke: renders without crashing', () => {
    mockUseEntries.mockReturnValue({ entries: mockEntries, updateEntry: vi.fn(), deleteEntry: vi.fn() })
    render(<EntryList />, { wrapper: Wrapper })
  })

  it('smoke: shows the heading', () => {
    mockUseEntries.mockReturnValue({ entries: mockEntries, updateEntry: vi.fn(), deleteEntry: vi.fn() })
    render(<EntryList />, { wrapper: Wrapper })
    expect(screen.getByText('Study Entries')).toBeInTheDocument()
  })

  it('comprehensive: shows hours for each entry', () => {
    mockUseEntries.mockReturnValue({ entries: mockEntries, updateEntry: vi.fn(), deleteEntry: vi.fn() })
    render(<EntryList />, { wrapper: Wrapper })
    expect(screen.getByText(/2 hrs/)).toBeInTheDocument()
    expect(screen.getByText(/1 hrs/)).toBeInTheDocument()
  })

  it('comprehensive: shows dates for each entry', () => {
    mockUseEntries.mockReturnValue({ entries: mockEntries, updateEntry: vi.fn(), deleteEntry: vi.fn() })
    render(<EntryList />, { wrapper: Wrapper })
    expect(screen.getByText(/2024-01-15/)).toBeInTheDocument()
    expect(screen.getByText(/2024-01-16/)).toBeInTheDocument()
  })

  it('comprehensive: shows empty list when no entries', () => {
    mockUseEntries.mockReturnValue({ entries: [], updateEntry: vi.fn(), deleteEntry: vi.fn() })
    render(<EntryList />, { wrapper: Wrapper })
    expect(screen.getByText('Study Entries')).toBeInTheDocument()
    expect(screen.queryByText(/hrs/)).not.toBeInTheDocument()
  })
})