import { Box, IconButton } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import { FC, ReactNode } from 'react'
import { GameButton } from '../atoms'
import { ScoreBoard } from '../organisms'

interface GameTemplateProps {
  team1Name: string
  team1Score: number
  team1Tricks: number
  team2Name: string
  team2Score: number
  team2Tricks: number
  onNewGame: () => void
  onShowHelp: () => void
  children: ReactNode
}

export const GameTemplate: FC<GameTemplateProps> = ({
  team1Name,
  team1Score,
  team1Tricks,
  team2Name,
  team2Score,
  team2Tricks,
  onNewGame,
  onShowHelp,
  children
}) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        maxWidth: 1400,
        maxHeight: 900,
        display: 'flex',
        background: '#1a3f2e',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(5px, 2vw, 20px)',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Game controls - top left */}
        <Box
          sx={{
            position: 'absolute',
            top: 15,
            left: 15,
            zIndex: 100,
            display: 'flex',
            gap: 1,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(5px)',
            borderRadius: 30,
            padding: '8px 12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          <GameButton
            onClick={onNewGame}
            size="small"
            color="primary"
            sx={{
              background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
            }}
          >
            New Game
          </GameButton>

          <IconButton
            onClick={onShowHelp}
            size="small"
            sx={{
              color: 'white',
              background: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <HelpIcon />
          </IconButton>
        </Box>

        {/* Scoreboard - top right */}
        <Box
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            zIndex: 100,
          }}
        >
          <ScoreBoard
            team1Name={team1Name}
            team1Score={team1Score}
            team1Tricks={team1Tricks}
            team2Name={team2Name}
            team2Score={team2Score}
            team2Tricks={team2Tricks}
          />
        </Box>

        {/* Game content */}
        {children}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '8px 0',
          textAlign: 'center',
          fontSize: 14,
          zIndex: 99,
        }}
      >
        Built with ❤️ using React, TypeScript, Material-UI & Ruby
      </Box>
    </Box>
  )
}
