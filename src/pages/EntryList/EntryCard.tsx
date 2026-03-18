import { useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import type { StudyEntry } from '../../shared/types'
import { useEntries } from '../../shared/context'
import { RichTextEditor } from '../../shared/components/RichTextEditor'

interface EntryCardProps {
  entry: StudyEntry
}

const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useEntries()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<StudyEntry>(entry)

  const handleSave = () => {
    updateEntry(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(entry)
    setIsEditing(false)
  }

  return (
    <Paper variant="outlined" sx={{ padding: 2, borderRadius: 2, mb: 1 }}>
      {!isEditing && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
              <IconButton size="small" onClick={() => setIsEditing(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error" onClick={() => deleteEntry(entry.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          {entry.notes && (
            <Box
              sx={{ mt: 1, fontSize: 14, color: 'text.secondary' }}
              dangerouslySetInnerHTML={{ __html: entry.notes }}
            />
          )}
        </>
      )}

      <Collapse in={isEditing}>
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
              onClick={handleCancel}
              variant="outlined"
              size="small"
            >
              Cancel
            </Button>
            <Button startIcon={<SaveIcon />} onClick={handleSave} variant="contained" size="small">
              Save
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
}

export default EntryCard
