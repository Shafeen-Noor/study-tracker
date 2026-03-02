import { useState } from "react"
import type { StudyEntry } from "./Logic"

interface Props {
  addEntry: (entry: StudyEntry) => void
}

const AddEntry: React.FC<Props> = ({ addEntry }) => {
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [hours, setHours] = useState(0)
  const [notes, setNotes] = useState("")
  const [date, setDate] = useState("")

const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault()
  addEntry({ subject, topic, hours, notes, date })
  setSubject("")
  setTopic("")
  setHours(0)
  setNotes("")
  setDate("")
}

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="subject-input">Subject</label>
      <input
        id="subject-input"
        placeholder="Subject"
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        required
      />
      <label htmlFor="topic-input">Topic</label>
      <input
        id="topic-input"
        placeholder="Topic"
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        required
      />
      <label htmlFor="hours-input">Hours</label>

      <input
        id="hours-input"
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={(event) => setHours(Number(event.target.value))}
        required
      />
      <label htmlFor="notes-input">Notes</label>

      <input
        id="notes-input"
        placeholder="Notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <label htmlFor="date-input">Subject</label>

      <input
        id="date-input"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        required
      />

      <button type="submit">Add Entry</button>
    </form>
  )
}

export default AddEntry
