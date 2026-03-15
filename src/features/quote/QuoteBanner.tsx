import { useState, useEffect } from 'react'
import { Box, Button, Typography, CircularProgress, Paper } from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { fetchRandomQuote } from '../../api/quote'
import type { Quote } from '../../shared/types'

const QuoteBanner: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadQuote()
  }, [])

  const loadQuote = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const newQuote = await fetchRandomQuote()
      setQuote(newQuote)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to load quote')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ backgroundColor: 'background.default', px: 3, py: 2 }}>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '16px 24px',
          borderRadius: 4,
          background: 'linear-gradient(135deg, #9188f122 0%, #c68efd22 100%)',
          border: '1px solid',
          borderColor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <FormatQuoteIcon
          sx={{
            fontSize: 36,
            color: 'primary.main',
            opacity: 0.6,
            flexShrink: 0,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {isLoading && <CircularProgress size={18} sx={{ color: 'primary.main' }} />}
          {error && (
            <Typography variant="body2" color="text.secondary">
              Could not load quote.
            </Typography>
          )}
          {quote && !isLoading && (
            <>
              <Typography
                variant="body2"
                sx={{
                  fontStyle: 'italic',
                  color: 'text.primary',
                  lineHeight: 1.6,
                }}
              >
                "{quote.text}"
              </Typography>
              {quote.author && (
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}
                >
                  — {quote.author}
                </Typography>
              )}
            </>
          )}
        </Box>

        <Button
          onClick={loadQuote}
          disabled={isLoading}
          size="small"
          startIcon={<AutorenewIcon />}
          sx={{
            flexShrink: 0,
            borderRadius: 3,
            color: 'primary.main',
            borderColor: 'primary.light',
            '&:hover': { backgroundColor: 'primary.main', color: 'white' },
          }}
          variant="outlined"
        >
          New Quote
        </Button>
      </Paper>
    </Box>
  )
}

export default QuoteBanner
