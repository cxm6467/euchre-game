const Card = ({ card, faceUp = true, onClick, playable = true, disabled = false }) => {
  if (!card) return null

  if (!faceUp) {
    return (
      <div className="card back classic" onClick={onClick}>
        <div className="card-back-pattern" />
      </div>
    )
  }

  const cardClasses = `card ${!playable || disabled ? 'disabled' : ''} ${playable && !disabled ? 'playable' : ''}`

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="card-content">
        <div className="card-corner top-left">
          <div className="rank" style={{ color: card.color }}>{card.rank}</div>
          <div className="suit" style={{ color: card.color }}>{card.suit}</div>
        </div>
        <div className="card-center" style={{ color: card.color }}>
          {card.suit}
        </div>
        <div className="card-corner bottom-right">
          <div className="rank rotated" style={{ color: card.color }}>{card.rank}</div>
          <div className="suit rotated" style={{ color: card.color }}>{card.suit}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
