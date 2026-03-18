import { Box, Chip, Divider, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EventNoteIcon from '@mui/icons-material/EventNote'
import SchoolIcon from '@mui/icons-material/School'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useEntries } from '../../shared/context'
import { useFilter } from '../../shared/context'
import StatCard from './StatCard'
import SubjectChart from './SubjectChart'
import TopSubjectBanner from './TopSubjectBanner'

const Dashboard: React.FC = () => {
  const { entries } = useEntries()
  const { filterSubject } = useFilter()

  const filteredEntries = filterSubject
    ? entries.filter(e => e.subject.toLowerCase().includes(filterSubject.toLowerCase()))
    : entries

  const totalHours = filteredEntries.reduce((sum, e) => sum + e.hours, 0)
  const totalEntries = filteredEntries.length
  const avgHours = totalEntries > 0 ? (totalHours / totalEntries).toFixed(1) : '0'
  const subjects = [...new Set(filteredEntries.map(e => e.subject))]

  const subjectHoursMap = subjects
    .map(subject => ({
      subject,
      hours: filteredEntries
        .filter(e => e.subject === subject)
        .reduce((sum, e) => sum + e.hours, 0),
    }))
    .sort((a, b) => b.hours - a.hours)

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

      {mostStudied && <TopSubjectBanner subject={mostStudied.subject} hours={mostStudied.hours} />}

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Hours by Subject
      </Typography>

      <SubjectChart data={subjectHoursMap} />
    </Box>
  )
}

export default Dashboard
