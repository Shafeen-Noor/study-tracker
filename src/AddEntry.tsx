import { useState } from "react"
import type { StudyEntry } from "./Logic"
import { TextField, Button, Box } from "@mui/material"

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "2rem auto",
      }}
    >
      <TextField
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />

      <TextField
        label="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        required
      />

      <TextField
        label="Hours"
        type="number"
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
        required
      />

      <TextField
        label="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Add Entry
      </Button>
    </Box>
  )
}

export default AddEntry
