import { render, screen } from '@testing-library/react'
import { useOutletContext } from 'react-router-dom'
import EntryList from './EntryList'
import type { StudyEntry } from '../../Logic'

const mockEntries: StudyEntry[] = [
  { subject: 'Math', topic: 'Algebra', hours: 2, date: '2024-01-15' },
  { subject: 'Science', topic: 'Biology', hours: 1, date: '2024-01-16' },
]

vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(() => ({ entries: mockEntries })),
}))

describe('EntryList', () => {

  it('smoke: renders without crashing', () => {
    render(<EntryList />)
  })

  it('smoke: shows the heading', () => {
    render(<EntryList />)
    expect(screen.getByText('Study Entries')).toBeInTheDocument()
  })

  it('comprehensive: renders all entries', () => {
    render(<EntryList />)
    expect(screen.getByText('Math - Algebra')).toBeInTheDocument()
    expect(screen.getByText('Science - Biology')).toBeInTheDocument()
  })

  it('comprehensive: shows hours for each entry', () => {
    render(<EntryList />)
    expect(screen.getByText(/2 hrs/)).toBeInTheDocument()
    expect(screen.getByText(/1 hrs/)).toBeInTheDocument()
  })

  it('comprehensive: shows dates for each entry', () => {
    render(<EntryList />)
    expect(screen.getByText(/2024-01-15/)).toBeInTheDocument()
    expect(screen.getByText(/2024-01-16/)).toBeInTheDocument()
  })

it('comprehensive: shows empty list when no entries', () => {
  vi.mocked(useOutletContext).mockReturnValueOnce({ entries: [] })

  render(<EntryList />)
  expect(screen.getByText('Study Entries')).toBeInTheDocument()
  expect(screen.queryByText(/hrs/)).not.toBeInTheDocument()
})
})