import { useState } from "react"
import { Outlet } from "react-router-dom"
import type { StudyEntry } from "./Logic"

const App: React.FC = () => {
  const [entries, setEntries] = useState<StudyEntry[]>([])

  const addEntry = (entry: StudyEntry) => {
    setEntries([...entries, entry])
  }

  return <Outlet context={{ entries, addEntry }} />
}

export default App
