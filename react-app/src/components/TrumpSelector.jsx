import { useGame } from '../context/GameContext'

const TrumpSelector = () => {
  const {
    showTrumpDialog,
    trumpSelectionRound,
    flippedCard,
    currentDealer,
    playerSettings,
    canGoAlone,
    selectTrump,
    passTrump,
    declareAlone,
    continueWithPartner
  } = useGame()

  if (!showTrumpDialog) return null

  const isFirstRound = trumpSelectionRound === 1
  const dealerName = playerSettings[currentDealer]?.name || currentDealer
  const dealerAvatar = playerSettings[currentDealer]?.avatar || '🤖'

  const renderSuitOptions = () => {
    if (isFirstRound) {
      return (
        <div
          className="trump-option trump-card-option"
          onClick={() => selectTrump(flippedCard.suit)}
        >
          <div className="mini-card" style={{ color: flippedCard.color, borderColor: flippedCard.color }}>
            <div className="mini-card-corner top-left">
              <div className="mini-rank">{flippedCard.rank}</div>
              <div className="mini-suit">{flippedCard.suit}</div>
            </div>
            <div className="mini-card-center">{flippedCard.suit}</div>
            <div className="mini-card-corner bottom-right">
              <div className="mini-rank rotated">{flippedCard.rank}</div>
              <div className="mini-suit rotated">{flippedCard.suit}</div>
            </div>
          </div>
        </div>
      )
    } else {
      const availableSuits = [
        { suit: '♠', color: '#2c3e50' },
        { suit: '♥', color: '#e74c3c' },
        { suit: '♦', color: '#e74c3c' },
        { suit: '♣', color: '#2c3e50' }
      ].filter(s => s.suit !== flippedCard.suit)

      return availableSuits.map(s => (
        <div
          key={s.suit}
          className="trump-option"
          onClick={() => selectTrump(s.suit)}
          style={{ color: s.color }}
        >
          {s.suit}
        </div>
      ))
    }
  }

  return (
    <div className="trump-selection active">
      <div className="trump-content">
        <h3>
          {isFirstRound ? (
            <>Order up the {flippedCard.rank}{flippedCard.suit} to {dealerAvatar} {dealerName}?</>
          ) : (
            'Choose Trump Suit'
          )}
        </h3>

        <div className="trump-options">
          {renderSuitOptions()}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="pass-btn" onClick={passTrump}>Pass</button>
        </div>

        {canGoAlone && (
          <div className="alone-option" style={{ display: 'block' }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="alone-btn" onClick={declareAlone}>Go Alone!</button>
              <button className="pass-btn" onClick={continueWithPartner}>With Partner</button>
            </div>
            <div style={{ fontSize: '12px', marginTop: '5px', color: '#666', textAlign: 'center' }}>
              Play without your partner for extra points
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrumpSelector
