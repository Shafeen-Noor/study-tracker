import type { StudyEntry } from "./Logic"
import "./App.css"
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material"

interface Props {
  entries: StudyEntry[]
}

const EntryList: React.FC<Props> = ({ entries }) => {
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
