import { TextField } from '@mui/material'
import { useFilter } from '../../shared/context'

const EntryFilters: React.FC = () => {
  const { filterSubject, setFilterSubject } = useFilter()

  return (
    <TextField
      label="Filter by subject"
      value={filterSubject}
      onChange={e => setFilterSubject(e.target.value)}
      fullWidth
      sx={{ mb: 2 }}
    />
  )
}

export default EntryFilters
