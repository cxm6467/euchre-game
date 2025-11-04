import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { TrickPlay } from '../../types/game'
import { PlayingCard } from '../atoms'

interface GameTableProps {
  currentTrick: TrickPlay[]
  trumpDisplay: React.ReactNode
  message: string
  centerContent?: React.ReactNode
  playerSettings: any
}

export const GameTable: FC<GameTableProps> = ({
  currentTrick,
  trumpDisplay,
  message,
  centerContent,
  playerSettings
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at center, #2a5f3e, #1a3f2e)',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0 5px 20px rgba(0,0,0,0.5)',
      }}
    >
      {/* Trump display */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 15,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '8px 16px',
          borderRadius: 2,
          backdropFilter: 'blur(5px)',
        }}
      >
        <Typography variant="body2" sx={{ color: '#fff' }}>
          {trumpDisplay}
        </Typography>
      </Box>

      {/* Center area - trick cards or deal button */}
      <Box
        sx={{
          position: 'relative',
          minWidth: 300,
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {centerContent ? (
          centerContent
        ) : (
          // Display trick cards
          currentTrick.map((play, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <PlayingCard card={play.card} faceUp />
              <Typography
                variant="caption"
                sx={{
                  background: 'rgba(0,0,0,0.7)',
                  padding: '2px 8px',
                  borderRadius: 10,
                  color: '#fff',
                  fontSize: 12,
                }}
              >
                {playerSettings[play.player]?.name || play.player}
              </Typography>
            </Box>
          ))
        )}
      </Box>

      {/* Message display */}
      {message && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.9)',
            padding: '12px 24px',
            borderRadius: 2,
            maxWidth: '80%',
            textAlign: 'center',
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
