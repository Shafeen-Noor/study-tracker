import { useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  ListItem,
  TextField,
  Typography,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useSubjects } from '../../shared/context'
import { RichTextEditor } from '../../shared/components/RichTextEditor'
import TopicChips from './TopicChips'

interface EntryFormProps {
  onSubmit: (fields: {
    subject: string
    topic: string
    hours: number
    notes: string
    date: string
  }) => void
}

const EntryForm: React.FC<EntryFormProps> = ({ onSubmit }) => {
  const { subjects, topics, addSubject, removeTopic, removeSubject } = useSubjects()

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [subjectInput, setSubjectInput] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [topicInput, setTopicInput] = useState('')
  const [hours, setHours] = useState(0)
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState('')

  const subjectTopics = selectedSubject ? (topics[selectedSubject] ?? []) : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSubject || !selectedTopic || !date) {
      alert('Please fill in all required fields')
      return
    }
    addSubject(selectedSubject)
    onSubmit({ subject: selectedSubject, topic: selectedTopic, hours, notes, date })
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
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
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

          <TopicChips
            subject={selectedSubject}
            selectedTopic={selectedTopic}
            onSelect={t => {
              setSelectedTopic(t)
              setTopicInput(t)
            }}
          />
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

export default EntryForm
