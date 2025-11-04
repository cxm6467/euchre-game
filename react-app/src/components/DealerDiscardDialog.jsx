import { useGame } from '../context/GameContext'
import Card from './Card'

const DealerDiscardDialog = () => {
  const {
    showDealerDiscardDialog,
    players,
    trump,
    trumpCallerTeam,
    playerSettings,
    discardCard
  } = useGame()

  if (!showDealerDiscardDialog) return null

  const teamName = trumpCallerTeam === 1 ? 'You & North' : 'East & West'
  const trumpColor = trump === '♥' || trump === '♦' ? '#e74c3c' : '#2c3e50'

  return (
    <div className="dealer-discard active">
      <div className="discard-content">
        <h3>
          Dealer: Pick up and discard
          <br />
          <span style={{ fontSize: '0.8em', color: '#7f8c8d' }}>
            Trump: <span style={{ color: trumpColor }}>{trump}</span> (called by {teamName})
          </span>
        </h3>
        <div className="dealer-hand">
          {players.south.cards.map((card, index) => (
            <div key={index} onClick={() => discardCard(index)}>
              <Card card={card} faceUp playable />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DealerDiscardDialog
