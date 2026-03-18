import { List, ListItem, Paper, Typography } from '@mui/material'
import { useEntries } from '../../shared/context'
import { useFilter } from '../../shared/context'
import EntryCard from './EntryCard'
import EntryFilters from './EntryFilters'

const EntryList: React.FC = () => {
  const { entries } = useEntries()
  const { filterSubject } = useFilter()

  const filtered = entries.filter(e =>
    e.subject.toLowerCase().includes(filterSubject.toLowerCase())
  )

  return (
    <Paper sx={{ maxWidth: 700, margin: '2rem auto', padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Study Entries
      </Typography>

      <EntryFilters />

      {filtered.length === 0 && <Typography color="text.secondary">No entries found.</Typography>}

      <List disablePadding>
        {filtered.map(entry => (
          <ListItem key={entry.id} disablePadding>
            <EntryCard entry={entry} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default EntryList
