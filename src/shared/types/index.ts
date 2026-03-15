export interface StudyEntry {
  id: string
  subject: string
  topic: string
  hours: number
  notes?: string
  date: string
}

export interface SubjectsContextType {
  subjects: string[]
  topics: Record<string, string[]>
  addSubject: (subject: string) => void
  addTopic: (subject: string, topic: string) => void
  removeSubject: (subject: string) => void
  removeTopic: (subject: string, topic: string) => void
}

export interface FilterContextType {
  filterSubject: string
  setFilterSubject: (subject: string) => void
}

export interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

export interface OutletContext {
  entries: StudyEntry[]
  addEntry: (entry: StudyEntry) => void
  updateEntry: (entry: StudyEntry) => void
  deleteEntry: (id: string) => void
}

export interface Quote {
  text: string
  author: string | null
}
