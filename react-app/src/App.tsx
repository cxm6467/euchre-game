import { GameProvider } from './context/GameContext'
// @ts-ignore - GameBoard is JSX, will be converted to TSX later
import GameBoard from './components/GameBoard.jsx'

function App() {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  )
}

export default App
