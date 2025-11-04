import { useGame } from '../context/GameContext'

const NewGameModal = () => {
  const { showNewGameModal, setShowNewGameModal, newGame } = useGame()

  if (!showNewGameModal) return null

  const handleConfirm = () => {
    setShowNewGameModal(false)
    newGame()
  }

  return (
    <div className="new-game-modal active">
      <div className="modal-content">
        <h3>Start New Game?</h3>
        <p>This will end the current game and start fresh. Your progress will be lost.</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={handleConfirm}>Start New Game</button>
          <button className="cancel-btn" onClick={() => setShowNewGameModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default NewGameModal
