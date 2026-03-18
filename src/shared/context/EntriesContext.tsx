import { createContext, useContext, useState } from 'react'
import type { StudyEntry } from '../types'
import { loadEntries, saveEntries } from '../storage'

interface EntriesContextType {
  entries: StudyEntry[]
  addEntry: (entry: Omit<StudyEntry, 'id'>) => void
  updateEntry: (entry: StudyEntry) => void
  deleteEntry: (id: string) => void
}

const EntriesContext = createContext<EntriesContextType | null>(null)

export const EntriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<StudyEntry[]>(loadEntries)

  const addEntry = (entry: Omit<StudyEntry, 'id'>) => {
    const newEntries = [...entries, { ...entry, id: crypto.randomUUID() }]
    setEntries(newEntries)
    saveEntries(newEntries)
  }

  const updateEntry = (updated: StudyEntry) => {
    const newEntries = entries.map(e => (e.id === updated.id ? updated : e))
    setEntries(newEntries)
    saveEntries(newEntries)
  }

  const deleteEntry = (id: string) => {
    const newEntries = entries.filter(e => e.id !== id)
    setEntries(newEntries)
    saveEntries(newEntries)
  }

  return (
    <EntriesContext.Provider value={{ entries, addEntry, updateEntry, deleteEntry }}>
      {children}
    </EntriesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEntries = () => {
  const ctx = useContext(EntriesContext)
  if (!ctx) throw new Error('useEntries must be used within EntriesProvider')
  return ctx
}
