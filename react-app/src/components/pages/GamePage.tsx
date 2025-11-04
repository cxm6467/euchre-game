import { FC } from 'react'
import { useGame } from '../../context/GameContext'
import { GameButton } from '../atoms'
import { GamePlayer, GameTable } from '../organisms'
import { GameTemplate } from '../templates'
import { Box, Typography } from '@mui/material'

export const GamePage: FC = () => {
  const {
    players,
    team1Score,
    team2Score,
    trump,
    trumpCallerTeam,
    currentDealer,
    currentPlayer,
    currentTrick,
    playerSettings,
    playingAlone,
    alonePlayer,
    message,
    showDealButton,
    flippedCard,
    dealCards,
    playCard,
    setShowHelpModal,
    setShowNewGameModal,
    isCardPlayable,
    getPartner,
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

  const renderCenterContent = () => {
    if (showDealButton) {
      return (
        <GameButton
          onClick={dealCards}
          size="large"
          sx={{
            fontSize: 18,
            padding: '12px 32px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>🃏</span>
            <span>Deal Cards</span>
          </Box>
        </GameButton>
      )
    }

    if (flippedCard) {
      return (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
            Flipped Card
          </Typography>
          {/* Flipped card would be rendered here */}
        </Box>
      )
    }

    return null
  }

  return (
    <GameTemplate
      team1Name={team1Name}
      team1Score={team1Score}
      team1Tricks={team1Tricks}
      team2Name={team2Name}
      team2Score={team2Score}
      team2Tricks={team2Tricks}
      onNewGame={() => setShowNewGameModal(true)}
      onShowHelp={() => setShowHelpModal(true)}
    >
      <GameTable
        currentTrick={currentTrick}
        trumpDisplay={renderTrumpDisplay()}
        message={message}
        centerContent={renderCenterContent()}
        playerSettings={playerSettings}
      >
        {/* Render all 4 players */}
        {(['north', 'east', 'south', 'west'] as const).map((position) => (
          <GamePlayer
            key={position}
            position={position}
            name={playerSettings[position].name}
            avatar={playerSettings[position].avatar}
            cards={players[position].cards}
            isDealer={currentDealer === position}
            isActive={currentPlayer === position}
            isSittingOut={playingAlone && position === getPartner(alonePlayer!)}
            isHuman={position === 'south'}
            onCardClick={(index) => playCard(position, index)}
            isCardPlayable={(card) => isCardPlayable(card, position)}
          />
        ))}
      </GameTable>

      {/* Modals would be rendered here */}
    </GameTemplate>
  )
}
