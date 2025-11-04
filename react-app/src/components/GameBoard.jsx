import { useGame } from '../context/GameContext'
import Player from './Player'
import Card from './Card'
import TrumpSelector from './TrumpSelector'
import VictoryModal from './VictoryModal'
import DealerDiscardDialog from './DealerDiscardDialog'
import HelpModal from './HelpModal'
import NewGameModal from './NewGameModal'

const GameBoard = () => {
  const {
    players,
    team1Score,
    team2Score,
    trump,
    trumpCallerTeam,
    currentDealer,
    currentPlayer,
    currentTrick,
    round,
    gamePhase,
    message,
    flippedCard,
    playerSettings,
    stats,
    showDealButton,
    playingAlone,
    alonePlayer,
    dealCards,
    playCard,
    setShowHelpModal,
    setShowNewGameModal,
    getPartner,
    isCardPlayable
  } = useGame()

  const team1Name = `${playerSettings.south.name} & ${playerSettings.north.name}`
  const team2Name = `${playerSettings.east.name} & ${playerSettings.west.name}`

  const team1Tricks = (players.south?.tricks || 0) + (players.north?.tricks || 0)
  const team2Tricks = (players.east?.tricks || 0) + (players.west?.tricks || 0)

  const renderTrumpDisplay = () => {
    if (!trump) return 'Trump: Not Set'

    const trumpColor = (trump === '♥' || trump === '♦') ? '#e74c3c' : '#2c3e50'
    const teamName = trumpCallerTeam === 1 ? team1Name : team2Name
    const aloneText = playingAlone ? ' (ALONE)' : ''

    return (
      <>
        Trump: <span style={{ color: trumpColor }}>{trump}</span>{' '}
        <span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>
          (called by {teamName})
        </span>
        {aloneText && (
          <span style={{ color: 'gold', fontWeight: 'bold' }}>{aloneText}</span>
        )}
      </>
    )
  }

  const renderCenterArea = () => {
    if (showDealButton) {
      return (
        <div className="deal-button-container">
          <button className="deal-btn" onClick={dealCards}>
            <span className="deal-icon">🃏</span>
            <span className="deal-text">Deal Cards</span>
          </button>
        </div>
      )
    }

    return (
      <div className="trick-cards">
        {currentTrick.map((play, index) => (
          <div key={index} className={`trick-card player-${play.player}`}>
            <Card card={play.card} faceUp />
            <div className="player-label">{playerSettings[play.player].name}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="game-container">
      <div className="main-game">
        <div className="game-table">
          {/* Game Controls */}
          <div className="game-controls">
            <div className="control-buttons">
              <button className="new-game-btn" onClick={() => setShowNewGameModal(true)}>
                New Game
              </button>
              <button className="icon-btn" title="How to Play" onClick={() => setShowHelpModal(true)}>
                ❓
              </button>
            </div>
          </div>

          {/* Score Display */}
          <div className="score-display">
            <div className="scores-container">
              <div className="team-group">
                <div className="team">
                  <div className="team-name">{team1Name}: <span>{team1Score}</span></div>
                  <div className="tricks-progress">
                    <div className="tricks-label">Tricks</div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(team1Tricks / 5) * 100}%` }} />
                      <div className="progress-text">{team1Tricks}/5</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="vertical-divider" />
              <div className="team-group">
                <div className="team">
                  <div className="team-name">{team2Name}: <span>{team2Score}</span></div>
                  <div className="tricks-progress">
                    <div className="tricks-label">Tricks</div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(team2Tricks / 5) * 100}%` }} />
                      <div className="progress-text">{team2Tricks}/5</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trump Display */}
          <div className="trump-display">{renderTrumpDisplay()}</div>

          {/* Players */}
          <Player position="north" />
          <Player position="east" />
          <Player position="south" />
          <Player position="west" />

          {/* Center Area */}
          <div className="center-area">
            {renderCenterArea()}
          </div>

          {/* Message */}
          {message && (
            <div className="message active">{message}</div>
          )}

          {/* Flipped Card Display */}
          {flippedCard && (
            <div className="flipped-card-display active">
              <h4>Flipped Card</h4>
              <div className="flipped-card-container">
                <div className="flipped-card">
                  <Card card={flippedCard} faceUp />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="game-footer">
        <div className="footer-content">
          <div className="footer-text">
            Built with ❤️ using React & Ruby
          </div>
        </div>
      </footer>

      {/* Modals and Dialogs */}
      <TrumpSelector />
      <VictoryModal />
      <DealerDiscardDialog />
      <HelpModal />
      <NewGameModal />
    </div>
  )
}

export default GameBoard
