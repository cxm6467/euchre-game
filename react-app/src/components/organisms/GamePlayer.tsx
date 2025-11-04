import { Box } from '@mui/material'
import { FC } from 'react'
import { Card as CardType, PlayerPosition } from '../../types/game'
import { CardHand, PlayerInfo } from '../molecules'

interface GamePlayerProps {
  position: PlayerPosition
  name: string
  avatar: string
  cards: CardType[]
  isDealer: boolean
  isActive: boolean
  isSittingOut: boolean
  isHuman: boolean
  onCardClick?: (index: number) => void
  isCardPlayable?: (card: CardType) => boolean
  onAvatarClick?: () => void
}

export const GamePlayer: FC<GamePlayerProps> = ({
  position,
  name,
  avatar,
  cards,
  isDealer,
  isActive,
  isSittingOut,
  isHuman,
  onCardClick,
  isCardPlayable,
  onAvatarClick
}) => {
  const getPositionStyles = () => {
    const baseStyles = {
      position: 'absolute' as const,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
    }

    switch (position) {
      case 'north':
        return {
          ...baseStyles,
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'column-reverse' as const,
        }
      case 'south':
        return {
          ...baseStyles,
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'column' as const,
        }
      case 'east':
        return {
          ...baseStyles,
          right: 30,
          top: '50%',
          transform: 'translateY(-50%)',
          flexDirection: 'row-reverse' as const,
        }
      case 'west':
        return {
          ...baseStyles,
          left: 30,
          top: '50%',
          transform: 'translateY(-50%)',
          flexDirection: 'row' as const,
        }
    }
  }

  const isVertical = position === 'east' || position === 'west'

  return (
    <Box sx={getPositionStyles()}>
      <CardHand
        cards={cards}
        faceUp={isHuman}
        onCardClick={isHuman ? onCardClick : undefined}
        isCardPlayable={isHuman ? isCardPlayable : undefined}
        orientation={isVertical ? 'vertical' : 'horizontal'}
      />

      <PlayerInfo
        name={name}
        avatar={avatar}
        isDealer={isDealer}
        isActive={isActive}
        isSittingOut={isSittingOut}
        position={position === 'north' ? 'top' : position === 'south' ? 'bottom' : position}
        onAvatarClick={onAvatarClick}
      />
    </Box>
  )
}
