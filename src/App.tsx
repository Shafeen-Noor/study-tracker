import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import type { StudyEntry } from './shared/types'
import { loadEntries, saveEntries } from './shared/storage'

const App: React.FC = () => {
  const [entries, setEntries] = useState<StudyEntry[]>(loadEntries)

  const addEntry = (entry: StudyEntry): void => {
    const newEntries = [...entries, { ...entry, id: crypto.randomUUID() }]
    setEntries(newEntries)
    saveEntries(newEntries)
  }

  const updateEntry = (updated: StudyEntry): void => {
    const newEntries = entries.map(e => (e.id === updated.id ? updated : e))
    setEntries(newEntries)
    saveEntries(newEntries)
  }

  const deleteEntry = (id: string): void => {
    const newEntries = entries.filter(e => e.id !== id)
    setEntries(newEntries)
    saveEntries(newEntries)
  }

  return <Outlet context={{ entries, addEntry, updateEntry, deleteEntry }} />
}

export default App
