import { useGame } from '../context/GameContext'

const HelpModal = () => {
  const { showHelpModal, setShowHelpModal } = useGame()

  if (!showHelpModal) return null

  return (
    <div className="help-modal active">
      <div className="help-content">
        <div className="help-header">
          <h2>🃏 How to Play Euchre</h2>
          <button className="close-btn" onClick={() => setShowHelpModal(false)}>×</button>
        </div>
        <div className="help-body">
          <div className="help-section">
            <h3>🎯 Game Objective</h3>
            <p>Be the first team to score <strong>10 points</strong> by winning tricks with trump cards!</p>
          </div>

          <div className="help-section">
            <h3>🃎 Card Hierarchy</h3>
            <p><strong>Trump Suit (Highest to Lowest):</strong></p>
            <ul>
              <li>Right Bower (Jack of trump suit)</li>
              <li>Left Bower (Jack of same color as trump)</li>
              <li>Ace, King, Queen, 10, 9 of trump</li>
            </ul>
            <p><strong>Non-Trump:</strong> A, K, Q, J, 10, 9</p>
          </div>

          <div className="help-section">
            <h3>🎲 Game Flow</h3>
            <ol>
              <li><strong>Deal:</strong> 5 cards each, flip one for trump</li>
              <li><strong>Trump Selection:</strong> Players can "order up" or pass</li>
              <li><strong>Play Tricks:</strong> Follow suit if possible, highest trump wins</li>
              <li><strong>Score:</strong> Team that called trump needs 3+ tricks to score</li>
            </ol>
          </div>

          <div className="help-section">
            <h3>📊 Scoring</h3>
            <ul>
              <li><strong>Make it:</strong> 3-4 tricks = 1 point</li>
              <li><strong>March:</strong> All 5 tricks = 2 points</li>
              <li><strong>Euchred:</strong> Opponents get 2 points if you fail</li>
              <li><strong>Alone March:</strong> All 5 tricks alone = 4 points</li>
            </ul>
          </div>

          <div className="help-section">
            <h3>🚀 Going Alone</h3>
            <p>If you're confident, declare "alone" and play without your partner for bonus points!</p>
          </div>

          <div className="help-section">
            <h3>💡 Tips</h3>
            <ul>
              <li>Remember: Left bower becomes part of trump suit</li>
              <li>Count trump cards to track what's still out</li>
              <li>Communication with partner is key</li>
              <li>Don't order up trump without strong cards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpModal
