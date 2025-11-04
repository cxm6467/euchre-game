import { Box } from '@mui/material'
import { FC } from 'react'
import { Card as CardType } from '../../types/game'
import { PlayingCard } from '../atoms'

interface CardHandProps {
  cards: CardType[]
  faceUp?: boolean
  onCardClick?: (index: number) => void
  isCardPlayable?: (card: CardType) => boolean
  orientation?: 'horizontal' | 'vertical'
}

export const CardHand: FC<CardHandProps> = ({
  cards,
  faceUp = true,
  onCardClick,
  isCardPlayable,
  orientation = 'horizontal'
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        gap: orientation === 'horizontal' ? -2 : -3,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {cards.map((card, index) => (
        <PlayingCard
          key={`${card.suit}-${card.rank}-${index}`}
          card={card}
          faceUp={faceUp}
          onClick={onCardClick ? () => onCardClick(index) : undefined}
          playable={isCardPlayable ? isCardPlayable(card) : true}
          disabled={isCardPlayable ? !isCardPlayable(card) : false}
        />
      ))}
    </Box>
  )
}
