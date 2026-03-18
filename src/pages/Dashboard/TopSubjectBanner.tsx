import { Box, Paper, Typography } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

interface TopSubjectBannerProps {
  subject: string
  hours: number
}

const TopSubjectBanner: React.FC<TopSubjectBannerProps> = ({ subject, hours }) => (
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
        {subject}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {hours} hrs total
      </Typography>
    </Box>
  </Paper>
)

export default TopSubjectBanner
