import { Avatar, Badge, Box } from '@mui/material'
import { FC } from 'react'

interface PlayerAvatarProps {
  avatar: string
  isDealer?: boolean
  isActive?: boolean
  isSittingOut?: boolean
  onClick?: () => void
}

export const PlayerAvatar: FC<PlayerAvatarProps> = ({
  avatar,
  isDealer = false,
  isActive = false,
  isSittingOut = false,
  onClick
}) => {
  const avatarContent = (
    <Avatar
      onClick={onClick}
      sx={{
        width: 80,
        height: 80,
        fontSize: 36,
        background: 'linear-gradient(135deg, rgba(74, 107, 255, 0.8), rgba(26, 58, 143, 0.9))',
        border: isActive ? '3px solid #ffcc00' : '2px solid rgba(255, 255, 255, 0.2)',
        boxShadow: isActive
          ? '0 0 20px rgba(255, 204, 0, 0.6)'
          : '0 4px 15px rgba(0, 0, 0, 0.3)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s',
        opacity: isSittingOut ? 0.3 : 1,
        '&:hover': onClick ? {
          transform: 'scale(1.05)',
          borderColor: 'rgba(255, 255, 255, 0.4)',
        } : {},
      }}
    >
      {avatar}
    </Avatar>
  )

  if (isDealer) {
    return (
      <Badge
        badgeContent="D"
        color="secondary"
        sx={{
          '& .MuiBadge-badge': {
            fontSize: 14,
            fontWeight: 'bold',
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: '2px solid #fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
          },
        }}
      >
        {avatarContent}
      </Badge>
    )
  }

  return avatarContent
}
