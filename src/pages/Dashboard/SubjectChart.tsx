import { Box, LinearProgress, Typography } from '@mui/material'

interface SubjectHours {
  subject: string
  hours: number
}

interface SubjectChartProps {
  data: SubjectHours[]
}

const SubjectChart: React.FC<SubjectChartProps> = ({ data }) => {
  const maxHours = data[0]?.hours ?? 1

  if (data.length === 0) {
    return <Typography color="text.secondary">No entries yet.</Typography>
  }

  return (
    <>
      {data.map(({ subject, hours }) => {
        const percentage = Math.round((hours / maxHours) * 100)
        return (
          <Box key={subject} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" fontWeight="medium">
                {subject}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hours} hrs
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: 'linear-gradient(90deg, #9188f1, #c68efd)',
                },
              }}
            />
          </Box>
        )
      })}
    </>
  )
}

export default SubjectChart
