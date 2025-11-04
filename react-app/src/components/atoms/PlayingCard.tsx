import { Box, Paper } from '@mui/material'
import { FC } from 'react'
import { Card as CardType } from '../../types/game'

interface PlayingCardProps {
  card?: CardType
  faceUp?: boolean
  onClick?: () => void
  disabled?: boolean
  playable?: boolean
}

export const PlayingCard: FC<PlayingCardProps> = ({
  card,
  faceUp = true,
  onClick,
  disabled = false,
  playable = true
}) => {
  if (!card && !faceUp) {
    // Card back
    return (
      <Paper
        onClick={onClick}
        sx={{
          width: 90,
          height: 130,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          border: '2px solid #fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '10%',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: 1,
          },
        }}
      />
    )
  }

  if (!card) return null

  const isDisabled = !playable || disabled

  return (
    <Paper
      onClick={isDisabled ? undefined : onClick}
      sx={{
        width: 90,
        height: 130,
        borderRadius: 2,
        background: '#fff',
        border: '2px solid #333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 1,
        cursor: isDisabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
        opacity: isDisabled ? 0.5 : 1,
        boxShadow: isDisabled ? '0 2px 4px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.3)',
        transition: 'all 0.2s',
        '&:hover': !isDisabled && onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
        } : {},
      }}
    >
      {/* Top corner */}
      <Box sx={{ alignSelf: 'flex-start', textAlign: 'left' }}>
        <Box sx={{ fontSize: 20, fontWeight: 'bold', color: card.color, lineHeight: 1 }}>
          {card.rank}
        </Box>
        <Box sx={{ fontSize: 24, color: card.color, lineHeight: 1 }}>
          {card.suit}
        </Box>
      </Box>

      {/* Center suit */}
      <Box sx={{ fontSize: 48, color: card.color }}>
        {card.suit}
      </Box>

      {/* Bottom corner (rotated) */}
      <Box sx={{ alignSelf: 'flex-end', textAlign: 'right', transform: 'rotate(180deg)' }}>
        <Box sx={{ fontSize: 20, fontWeight: 'bold', color: card.color, lineHeight: 1 }}>
          {card.rank}
        </Box>
        <Box sx={{ fontSize: 24, color: card.color, lineHeight: 1 }}>
          {card.suit}
        </Box>
      </Box>
    </Paper>
  )
}
