import type { StudyEntry } from "../../Logic"
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material"
import { useOutletContext } from "react-router-dom"

interface OutletContext {
  entries: StudyEntry[]
}

const EntryList: React.FC = () => {
  const { entries } = useOutletContext<OutletContext>()
  return (
    <Paper sx={{ maxWidth: 600, margin: "2rem auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Study Entries
      </Typography>

      <List>
        {entries.map((entry, index) => (
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
