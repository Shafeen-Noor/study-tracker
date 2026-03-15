import type { StudyEntry } from './Logic'

describe('StudyEntry type', () => {
  it('smoke: can create a minimal valid entry', () => {
    const entry: StudyEntry = {
      subject: 'Math',
      topic: 'Algebra',
      hours: 2,
      date: '2024-01-15',
    }
    expect(entry.subject).toBe('Math')
    expect(entry.topic).toBe('Algebra')
    expect(entry.hours).toBe(2)
    expect(entry.date).toBe('2024-01-15')
  })

  it('smoke: notes field is optional', () => {
    const withNotes: StudyEntry = {
      subject: 'Science',
      topic: 'Physics',
      hours: 1,
      date: '2024-01-15',
      notes: 'Studied gravity',
    }
    const withoutNotes: StudyEntry = {
      subject: 'Science',
      topic: 'Physics',
      hours: 1,
      date: '2024-01-15',
    }
    expect(withNotes.notes).toBe('Studied gravity')
    expect(withoutNotes.notes).toBeUndefined()
  })

  it('comprehensive: entry fields hold the correct types of values', () => {
    const entry: StudyEntry = {
      subject: 'History',
      topic: 'World War II',
      hours: 3,
      notes: 'Read chapter 5',
      date: '2024-03-10',
    }

    expect(typeof entry.subject).toBe('string')
    expect(typeof entry.topic).toBe('string')
    expect(typeof entry.hours).toBe('number')
    expect(typeof entry.notes).toBe('string')
    expect(typeof entry.date).toBe('string')
  })

  it('comprehensive: hours can be a decimal (e.g. 1.5 hours)', () => {
    const entry: StudyEntry = {
      subject: 'Math',
      topic: 'Fractions',
      hours: 1.5,
      date: '2024-01-15',
    }
    expect(entry.hours).toBe(1.5)
    expect(entry.hours).toBeGreaterThan(1)
    expect(entry.hours).toBeLessThan(2)
  })

  it('comprehensive: subject and topic are independent fields', () => {
    const entry: StudyEntry = {
      subject: 'Math',
      topic: 'Geometry',
      hours: 2,
      date: '2024-01-15',
    }
    expect(entry.subject).not.toBe(entry.topic)
  })

  it('comprehensive: can create multiple entries with different data', () => {
    const entries: StudyEntry[] = [
      { subject: 'Math', topic: 'Algebra', hours: 1, date: '2024-01-01' },
      { subject: 'Science', topic: 'Biology', hours: 2, date: '2024-01-02' },
      { subject: 'History', topic: 'Romans', hours: 3, date: '2024-01-03' },
    ]

    expect(entries).toHaveLength(3)
    expect(entries[0].subject).toBe('Math')
    expect(entries[1].hours).toBe(2)
    expect(entries[2].date).toBe('2024-01-03')
  })
})
