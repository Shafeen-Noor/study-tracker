import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FilterProvider } from '../../shared/context/FilterContext'
import Dashboard from './Dashboard'
import type { StudyEntry } from '../../shared/types'

const mockEntries: StudyEntry[] = [
  { id: '1', subject: 'Math', topic: 'Algebra', hours: 2, date: '2024-01-15' },
]

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useOutletContext: () => ({ entries: mockEntries }),
  }
})

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <FilterProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </FilterProvider>
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
