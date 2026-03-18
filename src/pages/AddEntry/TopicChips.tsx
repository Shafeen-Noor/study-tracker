import { Box, Chip, Paper, Typography } from '@mui/material'
import { useSubjects } from '../../shared/context'

interface TopicChipsProps {
  subject: string
  selectedTopic: string | null
  onSelect: (topic: string) => void
}

const TopicChips: React.FC<TopicChipsProps> = ({ subject, selectedTopic, onSelect }) => {
  const { topics, removeTopic } = useSubjects()
  const subjectTopics = topics[subject] ?? []

  if (subjectTopics.length === 0) return null

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Previous topics for {subject}:</strong>
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {subjectTopics.map(t => (
          <Chip
            key={t}
            label={t}
            variant={selectedTopic === t ? 'filled' : 'outlined'}
            color={selectedTopic === t ? 'primary' : 'default'}
            onClick={() => onSelect(t)}
            onDelete={() => removeTopic(subject, t)}
          />
        ))}
      </Box>
    </Paper>
  )
}

export default TopicChips
