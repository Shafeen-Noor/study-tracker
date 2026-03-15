import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Chip,
  ListItem,
  IconButton,
  Autocomplete,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import type { StudyEntry } from '../../shared/types'
import { useSubjects } from '../../shared/context'
import { RichTextEditor } from '../../shared/components'

interface OutletContext {
  addEntry: (entry: StudyEntry) => void
  updateEntry: (entry: StudyEntry) => void
  deleteEntry: (id: string) => void
}

const AddEntry: React.FC = () => {
  const { addEntry } = useOutletContext<OutletContext>()
  const { subjects, topics, addSubject, addTopic, removeSubject, removeTopic } = useSubjects()

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [subjectInput, setSubjectInput] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [topicInput, setTopicInput] = useState('')
  const [hours, setHours] = useState(0)
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState('')

  const subjectTopics = selectedSubject ? (topics[selectedSubject] ?? []) : []

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!selectedSubject || !selectedTopic || !date) {
      alert('Please fill in all required fields')
      return
    }

    addSubject(selectedSubject)
    addTopic(selectedSubject, selectedTopic)

    addEntry({
      id: '',
      subject: selectedSubject,
      topic: selectedTopic,
      hours,
      notes,
      date,
    })

    setSelectedSubject(null)
    setSubjectInput('')
    setSelectedTopic(null)
    setTopicInput('')
    setHours(0)
    setNotes('')
    setDate('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, margin: '2rem auto' }}
    >
      <Typography variant="h5">Add Study Entry</Typography>

      {/* Subject autocomplete */}
      <Autocomplete
        freeSolo
        options={subjects}
        value={selectedSubject}
        onChange={(_, value) => {
          setSelectedSubject(value)
          setSelectedTopic(null)
          setTopicInput('')
        }}
        inputValue={subjectInput}
        onInputChange={(_, value) => {
          setSubjectInput(value)
          setSelectedSubject(value)
        }}
        renderInput={params => (
          <TextField
            {...params}
            label="Subject"
            placeholder="Type or select a subject..."
            helperText="Select from list or type a new subject"
            required
          />
        )}
        renderOption={(props, option) => (
          <ListItem
            {...props}
            key={option}
            secondaryAction={
              <IconButton
                size="small"
                edge="end"
                onClick={e => {
                  e.stopPropagation()
                  removeSubject(option)
                  if (selectedSubject === option) {
                    setSelectedSubject(null)
                    setSubjectInput('')
                  }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            <Typography>{option}</Typography>
          </ListItem>
        )}
      />

      {/* Topic autocomplete — only shows after subject selected */}
      {selectedSubject && (
        <>
          <Autocomplete
            freeSolo
            options={subjectTopics}
            value={selectedTopic}
            onChange={(_, value) => setSelectedTopic(value)}
            inputValue={topicInput}
            onInputChange={(_, value) => {
              setTopicInput(value)
              setSelectedTopic(value)
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="Topic"
                placeholder="Type or select a topic..."
                helperText="Select from list or type a new topic"
                required
              />
            )}
            renderOption={(props, option) => (
              <ListItem
                {...props}
                key={option}
                secondaryAction={
                  <IconButton
                    size="small"
                    edge="end"
                    onClick={e => {
                      e.stopPropagation()
                      removeTopic(selectedSubject, option)
                      if (selectedTopic === option) {
                        setSelectedTopic(null)
                        setTopicInput('')
                      }
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              >
                <Typography>{option}</Typography>
              </ListItem>
            )}
          />

          {/* Previous topics as clickable chips */}
          {subjectTopics.length > 0 && (
            <Paper sx={{ padding: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Previous topics for {selectedSubject}:</strong>
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {subjectTopics.map(t => (
                  <Chip
                    key={t}
                    label={t}
                    variant={selectedTopic === t ? 'filled' : 'outlined'}
                    color={selectedTopic === t ? 'primary' : 'default'}
                    onClick={() => {
                      setSelectedTopic(t)
                      setTopicInput(t)
                    }}
                    onDelete={() => removeTopic(selectedSubject, t)}
                  />
                ))}
              </Box>
            </Paper>
          )}
        </>
      )}

      <TextField
        label="Hours"
        type="number"
        inputProps={{ step: 0.5, min: 0 }}
        value={hours}
        onChange={e => setHours(Number(e.target.value))}
        required
      />

      <Typography variant="body2" color="text.secondary">
        Notes (optional)
      </Typography>
      <RichTextEditor content={notes} onChange={(html: string) => setNotes(html)} />

      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
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
