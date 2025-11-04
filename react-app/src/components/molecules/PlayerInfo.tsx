import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { PlayerAvatar } from '../atoms'

interface PlayerInfoProps {
  name: string
  avatar: string
  isDealer?: boolean
  isActive?: boolean
  isSittingOut?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
  onAvatarClick?: () => void
}

export const PlayerInfo: FC<PlayerInfoProps> = ({
  name,
  avatar,
  isDealer = false,
  isActive = false,
  isSittingOut = false,
  position = 'bottom',
  onAvatarClick
}) => {
  const isVertical = position === 'top' || position === 'bottom'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        gap: 1,
        opacity: isSittingOut ? 0.4 : 1,
      }}
    >
      {position === 'top' && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: isActive ? 700 : 500,
            color: isActive ? '#ffcc00' : '#fff',
            textShadow: isActive ? '0 0 10px rgba(255, 204, 0, 0.8)' : 'none',
            transition: 'all 0.3s',
          }}
        >
          {name}
        </Typography>
      )}

      <PlayerAvatar
        avatar={avatar}
        isDealer={isDealer}
        isActive={isActive}
        isSittingOut={isSittingOut}
        onClick={onAvatarClick}
      />

      {position !== 'top' && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: isActive ? 700 : 500,
            color: isActive ? '#ffcc00' : '#fff',
            textShadow: isActive ? '0 0 10px rgba(255, 204, 0, 0.8)' : 'none',
            transition: 'all 0.3s',
          }}
        >
          {name}
        </Typography>
      )}
    </Box>
  )
}
