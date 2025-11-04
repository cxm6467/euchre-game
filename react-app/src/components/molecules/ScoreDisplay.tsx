import { Box, LinearProgress, Paper, Typography } from '@mui/material'
import { FC } from 'react'

interface ScoreDisplayProps {
  teamName: string
  score: number
  tricks: number
  maxTricks?: number
}

export const ScoreDisplay: FC<ScoreDisplayProps> = ({
  teamName,
  score,
  tricks,
  maxTricks = 5
}) => {
  const progressValue = (tricks / maxTricks) * 100

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(5px)',
        borderRadius: 2,
        minWidth: 150,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Team name and score */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontSize: '0.95em', fontWeight: 500 }}>
            {teamName}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#ffcc00',
              textShadow: '0 0 5px rgba(255, 204, 0, 0.5)',
            }}
          >
            {score}
          </Typography>
        </Box>

        {/* Tricks progress */}
        <Box>
          <Typography variant="caption" sx={{ fontSize: '0.8em', color: 'rgba(255, 255, 255, 0.8)' }}>
            Tricks
          </Typography>
          <Box sx={{ position: 'relative', mt: 0.5 }}>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                height: 14,
                borderRadius: 7,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#4CAF50',
                  backgroundImage: 'linear-gradient(90deg, #4CAF50, #66BB6A)',
                  boxShadow: '0 0 4px rgba(76, 175, 80, 0.5)',
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
                color: '#fff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
              }}
            >
              {tricks}/{maxTricks}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
