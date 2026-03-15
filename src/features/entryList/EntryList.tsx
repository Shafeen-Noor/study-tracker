import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  List,
  ListItem,
  Paper,
  Typography,
  TextField,
  Box,
  IconButton,
  Button,
  Collapse,
  Chip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import type { StudyEntry } from '../../shared/types'
import { useFilter } from '../../shared/context'
import { RichTextEditor } from '../../shared/components'

interface OutletContext {
  entries: StudyEntry[]
  updateEntry: (entry: StudyEntry) => void
  deleteEntry: (id: string) => void
}

const EntryList: React.FC = () => {
  const { entries, updateEntry, deleteEntry } = useOutletContext<OutletContext>()
  const { filterSubject, setFilterSubject } = useFilter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<StudyEntry | null>(null)

  const filtered = entries.filter(e =>
    e.subject.toLowerCase().includes(filterSubject.toLowerCase())
  )

  const handleEditStart = (entry: StudyEntry) => {
    setEditingId(entry.id)
    setEditForm({ ...entry })
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleEditSave = () => {
    if (editForm) {
      updateEntry(editForm)
      setEditingId(null)
      setEditForm(null)
    }
  }

  return (
    <Paper sx={{ maxWidth: 700, margin: '2rem auto', padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Study Entries
      </Typography>

      <TextField
        label="Filter by subject"
        value={filterSubject}
        onChange={e => setFilterSubject(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      {filtered.length === 0 && <Typography color="text.secondary">No entries found.</Typography>}

      <List disablePadding>
        {filtered.map(entry => (
          <ListItem key={entry.id} disablePadding sx={{ display: 'block', mb: 1 }}>
            <Paper variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
              {/* View mode */}
              {editingId !== entry.id && (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {entry.subject} — {entry.topic}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        <Chip
                          label={`${entry.hours} hrs`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip label={entry.date} size="small" variant="outlined" />
                      </Box>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleEditStart(entry)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => deleteEntry(entry.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Render notes HTML */}
                  {entry.notes && (
                    <Box
                      sx={{ mt: 1, fontSize: 14, color: 'text.secondary' }}
                      dangerouslySetInnerHTML={{ __html: entry.notes }}
                    />
                  )}
                </>
              )}

              {/* Edit mode — expands inline */}
              <Collapse in={editingId === entry.id}>
                {editForm && editingId === entry.id && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Editing entry
                    </Typography>

                    <TextField
                      label="Subject"
                      value={editForm.subject}
                      onChange={e => setEditForm({ ...editForm, subject: e.target.value })}
                      size="small"
                    />
                    <TextField
                      label="Topic"
                      value={editForm.topic}
                      onChange={e => setEditForm({ ...editForm, topic: e.target.value })}
                      size="small"
                    />
                    <TextField
                      label="Hours"
                      type="number"
                      value={editForm.hours}
                      onChange={e => setEditForm({ ...editForm, hours: Number(e.target.value) })}
                      size="small"
                      inputProps={{ step: 0.5, min: 0 }}
                    />
                    <TextField
                      label="Date"
                      type="date"
                      value={editForm.date}
                      onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />

                    <Typography variant="body2" color="text.secondary">
                      Notes
                    </Typography>
                    <RichTextEditor
                      content={editForm.notes ?? ''}
                      onChange={html => setEditForm({ ...editForm, notes: html })}
                    />

                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button
                        startIcon={<CancelIcon />}
                        onClick={handleEditCancel}
                        variant="outlined"
                        size="small"
                      >
                        Cancel
                      </Button>
                      <Button
                        startIcon={<SaveIcon />}
                        onClick={handleEditSave}
                        variant="contained"
                        size="small"
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                )}
              </Collapse>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default EntryList
