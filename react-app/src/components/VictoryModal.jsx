import { useGame } from '../context/GameContext'

const VictoryModal = () => {
  const {
    showVictoryModal,
    setShowVictoryModal,
    team1Score,
    team2Score,
    playerSettings,
    stats,
    newGame
  } = useGame()

  if (!showVictoryModal) return null

  const team1Won = team1Score >= 10
  const team1Name = `${playerSettings.south.name} & ${playerSettings.north.name}`
  const team2Name = `${playerSettings.east.name} & ${playerSettings.west.name}`
  const totalGames = stats.gamesWon + stats.gamesLost
  const winRate = totalGames > 0 ? Math.round((stats.gamesWon / totalGames) * 100) : 0

  return (
    <div className="victory-modal active">
      <div className="victory-content">
        <h2 style={{ color: team1Won ? '#27ae60' : '#e74c3c' }}>
          {team1Won ? '🎉 Victory! 🎉' : 'Game Over'}
        </h2>
        <p>
          {team1Won ? `${team1Name} win the game!` : `${team2Name} win the game!`}
        </p>

        <div className="victory-score-section">
          <h3>Final Score</h3>
          <div className="score-breakdown">
            <div className={`team-score ${team1Won ? 'winner' : ''}`}>
              <span className="team-name">{team1Name}</span>
              <span className="score">{team1Score}</span>
            </div>
            <div className="score-separator">-</div>
            <div className={`team-score ${!team1Won ? 'winner' : ''}`}>
              <span className="team-name">{team2Name}</span>
              <span className="score">{team2Score}</span>
            </div>
          </div>
        </div>

        <div className="victory-stats-section">
          <h3>Game Statistics</h3>
          <div className="stat-row">
            <span className="stat-label">Games Won:</span>
            <span className="stat-value">{stats.gamesWon}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Games Lost:</span>
            <span className="stat-value">{stats.gamesLost}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Win Rate:</span>
            <span className="stat-value">{winRate}%</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Hands Played:</span>
            <span className="stat-value">{stats.handsPlayed}</span>
          </div>
        </div>

        <div className="victory-buttons">
          <button className="victory-btn primary" onClick={newGame}>Play Again</button>
          <button className="victory-btn secondary" onClick={() => setShowVictoryModal(false)}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default VictoryModal
