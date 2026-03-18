import { Box, Paper, Typography } from '@mui/material'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <Paper
    sx={{
      flex: 1,
      padding: 2.5,
      textAlign: 'center',
      borderTop: `4px solid ${color}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0.5,
    }}
  >
    <Box sx={{ color, mb: 0.5 }}>{icon}</Box>
    <Typography variant="h4" fontWeight="bold">
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Paper>
)

export default StatCard
