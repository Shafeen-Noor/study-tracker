import { Box, Typography } from '@mui/material'
import { useEntries } from '../../shared/context'
import { useSubjects } from '../../shared/context'
import EntryForm from './EntryForm'

const AddEntry: React.FC = () => {
  const { addEntry } = useEntries()
  const { addTopic } = useSubjects()

  const handleSubmit = (fields: {
    subject: string
    topic: string
    hours: number
    notes: string
    date: string
  }) => {
    addTopic(fields.subject, fields.topic)
    addEntry(fields)
  }

  return (
    <Box sx={{ maxWidth: 500, margin: '2rem auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Study Entry
      </Typography>
      <EntryForm onSubmit={handleSubmit} />
    </Box>
  )
}

export default AddEntry
