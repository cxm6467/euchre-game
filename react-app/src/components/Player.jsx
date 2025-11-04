import { useGame } from '../context/GameContext'
import Card from './Card'

const Player = ({ position }) => {
  const {
    players,
    currentPlayer,
    currentDealer,
    playerSettings,
    playCard,
    isCardPlayable,
    gamePhase,
    playingAlone,
    alonePlayer,
    getPartner
  } = useGame()

  const player = players[position]
  const settings = playerSettings[position]
  const isCurrentPlayer = currentPlayer === position
  const isDealer = currentDealer === position
  const isSouth = position === 'south'

  // Check if sitting out during alone play
  const isSittingOut = playingAlone && position === getPartner(alonePlayer)

  const positionClass = {
    south: 'bottom',
    north: 'top',
    east: 'right',
    west: 'left'
  }[position]

  const handleCardClick = (cardIndex) => {
    if (!isSouth || !isCurrentPlayer || gamePhase !== 'play') return
    playCard(position, cardIndex)
  }

  return (
    <div className={`player-position ${positionClass} ${isSittingOut ? 'sitting-out' : ''}`}>
      <div className={`player-cards ${isSouth && isCurrentPlayer ? 'must-follow' : ''}`} id={`${position}-cards`}>
        {player.cards.map((card, index) => (
          <div key={index}>
            {isSouth ? (
              <Card
                card={card}
                faceUp
                onClick={() => handleCardClick(index)}
                playable={isCardPlayable(card, position)}
                disabled={!isCardPlayable(card, position)}
              />
            ) : (
              <Card card={card} faceUp={false} />
            )}
          </div>
        ))}
      </div>

      <div className="player-avatar-container">
        <div className="player-avatar" id={`${position}-avatar`}>
          {settings.avatar}
          {isDealer && <div className="dealer-chip" title="Dealer">D</div>}
        </div>
      </div>

      <div
        className={`player-name ${isCurrentPlayer ? 'active-turn' : ''}`}
        id={`${position}-name`}
      >
        {settings.name}
      </div>
    </div>
  )
}

export default Player
