import type { StudyEntry } from "../../Logic"
import { Box, Typography, Paper } from "@mui/material"
import { useOutletContext } from "react-router-dom"
import { useFilter } from "../../context/FilterContext"

interface OutletContext {
  entries: StudyEntry[]
}

const Dashboard: React.FC = () => {
  const { entries } = useOutletContext<OutletContext>()
  const { filterSubject } = useFilter()

  const totalHours = entries.reduce((sum, e) => sum + e.hours, 0)
  const totalEntries = entries.length
  const subjects = [...new Set(entries.map((e) => e.subject))]

  return (
    <Box sx={{ maxWidth: 600, margin: "2rem auto" }}>

      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>

      {filterSubject && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing results for: <strong>{filterSubject}</strong>
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Paper sx={{ flex: 1, padding: 2, textAlign: "center" }}>
          <Typography variant="h4">{totalEntries}</Typography>
          <Typography variant="body2" color="text.secondary">
            Total Sessions
          </Typography>
        </Paper>

        <Paper sx={{ flex: 1, padding: 2, textAlign: "center" }}>
          <Typography variant="h4">{totalHours}</Typography>
          <Typography variant="body2" color="text.secondary">
            Total Hours
          </Typography>
        </Paper>

        <Paper sx={{ flex: 1, padding: 2, textAlign: "center" }}>
          <Typography variant="h4">{subjects.length}</Typography>
          <Typography variant="body2" color="text.secondary">
            Subjects
          </Typography>
        </Paper>
      </Box>

      <Typography variant="h6" gutterBottom>
        Hours by Subject
      </Typography>

      {subjects.length === 0 ? (
        <Typography color="text.secondary">No entries yet.</Typography>
      ) : (
        subjects.map((subject) => {
          const subjectHours = entries
            .filter((e) => e.subject === subject)
            .reduce((sum, e) => sum + e.hours, 0)

          return (
            <Paper
              key={subject}
              sx={{ padding: 2, mb: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Typography>{subject}</Typography>
              <Typography fontWeight="bold">{subjectHours} hrs</Typography>
            </Paper>
          )
        })
      )}

    </Box>
  )
}

export default Dashboard