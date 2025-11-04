import { Box, Divider } from '@mui/material'
import { FC } from 'react'
import { ScoreDisplay } from '../molecules'

interface ScoreBoardProps {
  team1Name: string
  team1Score: number
  team1Tricks: number
  team2Name: string
  team2Score: number
  team2Tricks: number
}

export const ScoreBoard: FC<ScoreBoardProps> = ({
  team1Name,
  team1Score,
  team1Tricks,
  team2Name,
  team2Score,
  team2Tricks
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(5px)',
        borderRadius: 2,
        padding: 1.5,
      }}
    >
      <ScoreDisplay
        teamName={team1Name}
        score={team1Score}
        tricks={team1Tricks}
      />

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: 1,
        }}
      />

      <ScoreDisplay
        teamName={team2Name}
        score={team2Score}
        tricks={team2Tricks}
      />
    </Box>
  )
}
