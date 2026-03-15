import { Box, Typography, Paper, LinearProgress, Chip, Divider } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import SchoolIcon from '@mui/icons-material/School'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EventNoteIcon from '@mui/icons-material/EventNote'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import type { StudyEntry } from '../../shared/types'
import { useFilter } from '../../shared/context'

interface OutletContext {
  entries: StudyEntry[]
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <Paper
    sx={{
      flex: 1,
      padding: 2.5,
      textAlign: 'center',
      borderTop: `4px solid ${color}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0.5,
    }}
  >
    <Box sx={{ color, mb: 0.5 }}>{icon}</Box>
    <Typography variant="h4" fontWeight="bold">
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Paper>
)

const Dashboard: React.FC = () => {
  const { entries } = useOutletContext<OutletContext>()
  const { filterSubject } = useFilter()

  const filteredEntries = filterSubject
    ? entries.filter(e => e.subject.toLowerCase().includes(filterSubject.toLowerCase()))
    : entries

  const totalHours = filteredEntries.reduce((sum, e) => sum + e.hours, 0)
  const totalEntries = filteredEntries.length
  const avgHours = totalEntries > 0 ? (totalHours / totalEntries).toFixed(1) : '0'
  const subjects = [...new Set(filteredEntries.map(e => e.subject))]

  const subjectHoursMap = subjects
    .map(subject => {
      const hours = filteredEntries
        .filter(e => e.subject === subject)
        .reduce((sum, e) => sum + e.hours, 0)
      return { subject, hours }
    })
    .sort((a, b) => b.hours - a.hours)

  const maxHours = subjectHoursMap[0]?.hours ?? 1
  const mostStudied = subjectHoursMap[0]

  return (
    <Box sx={{ maxWidth: 700, margin: '2rem auto' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      {filterSubject && (
        <Chip
          label={`Filtered: ${filterSubject}`}
          color="primary"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />
      )}

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <StatCard
          icon={<EventNoteIcon />}
          label="Total Sessions"
          value={totalEntries}
          color="#9188f1"
        />
        <StatCard
          icon={<AccessTimeIcon />}
          label="Total Hours"
          value={totalHours}
          color="#c68efd"
        />
        <StatCard icon={<SchoolIcon />} label="Subjects" value={subjects.length} color="#e9a5f1" />
        <StatCard
          icon={<TrendingUpIcon />}
          label="Avg hrs / Session"
          value={avgHours}
          color="#7986cb"
        />
      </Box>

      {mostStudied && (
        <Paper
          sx={{
            padding: 2,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            background: 'linear-gradient(135deg, #9188f122 0%, #c68efd22 100%)',
            border: '1px solid',
            borderColor: 'primary.light',
            borderRadius: 2,
          }}
        >
          <EmojiEventsIcon sx={{ color: '#f4b942', fontSize: 36 }} />
          <Box>
            <Typography variant="body2" color="text.secondary">
              Most studied subject
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {mostStudied.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mostStudied.hours} hrs total
            </Typography>
          </Box>
        </Paper>
      )}

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Hours by Subject
      </Typography>

      {subjectHoursMap.length === 0 ? (
        <Typography color="text.secondary">No entries yet.</Typography>
      ) : (
        subjectHoursMap.map(({ subject, hours }) => {
          const percentage = Math.round((hours / maxHours) * 100)

          return (
            <Box key={subject} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" fontWeight="medium">
                  {subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hours} hrs
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'action.hover',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, #9188f1, #c68efd)',
                  },
                }}
              />
            </Box>
          )
        })
      )}
    </Box>
  )
}

export default Dashboard
