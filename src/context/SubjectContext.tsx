import { createContext, useContext, useState } from "react"

interface SubjectsContextType {
  subjects: string[]
  topics: Record<string, string[]>
  addSubject: (subject: string) => void
  addTopic: (subject: string, topic: string) => void
  removeSubject: (subject: string) => void
  removeTopic: (subject: string, topic: string) => void
}

const SubjectsContext = createContext<SubjectsContextType | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useSubjects() {
  const context = useContext(SubjectsContext)
  if (!context)
    throw new Error("useSubjects must be used inside SubjectsProvider")
  return context
}

export function SubjectsProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<string[]>([
    "Math",
    "Science",
    "History",
    "English",
    "Physics",
    "Chemistry",
  ])

  const [topics, setTopics] = useState<Record<string, string[]>>({
    Math: ["Algebra", "Calculus", "Geometry"],
    Science: ["Biology", "Physics", "Chemistry"],
    History: ["Ancient Rome", "World War II", "Renaissance"],
    English: ["Literature", "Grammar", "Writing"],
    Physics: ["Mechanics", "Thermodynamics", "Optics"],
    Chemistry: ["Organic", "Inorganic", "Physical"],
  })

  const addSubject = (subject: string) => {
    if (!subjects.includes(subject)) {
      setSubjects([...subjects, subject])
      setTopics({ ...topics, [subject]: [] })
    }
  }

  const addTopic = (subject: string, topic: string) => {
    if (!topics[subject]) {
      setTopics({ ...topics, [subject]: [topic] })
    } else if (!topics[subject].includes(topic)) {
      setTopics({
        ...topics,
        [subject]: [...topics[subject], topic],
      })
    }
  }

  const removeSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject))
    const newTopics = { ...topics }
    delete newTopics[subject]
    setTopics(newTopics)
  }

  const removeTopic = (subject: string, topic: string) => {
    setTopics({
      ...topics,
      [subject]: topics[subject].filter((t) => t !== topic),
    })
  }

  return (
    <SubjectsContext.Provider
      value={{
        subjects,
        topics,
        addSubject,
        addTopic,
        removeSubject,
        removeTopic,
      }}
    >
      {children}
    </SubjectsContext.Provider>
  )
}
