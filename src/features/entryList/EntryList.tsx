import { useOutletContext } from "react-router-dom"
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  TextField,
} from "@mui/material"
import { useFilter } from "../../context/FilterContext"
import type { StudyEntry } from "../../Logic"

interface OutletContext {
  entries: StudyEntry[]
}

const EntryList: React.FC = () => {
  const { entries } = useOutletContext<OutletContext>()
  const { filterSubject, setFilterSubject } = useFilter()

  const filtered = entries.filter((e) =>
    e.subject.toLowerCase().includes(filterSubject.toLowerCase()),
  )

  return (
    <Paper sx={{ maxWidth: 600, margin: "2rem auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Study Entries
      </Typography>

      <TextField
        label="Filter by subject"
        value={filterSubject}
        onChange={(e) => setFilterSubject(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <List>
        {filtered.map((entry: StudyEntry, index: number) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${entry.subject} - ${entry.topic}`}
              secondary={`${entry.date} • ${entry.hours} hrs`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default EntryList
