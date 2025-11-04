import { Button, ButtonProps } from '@mui/material'
import { FC } from 'react'

interface GameButtonProps extends ButtonProps {
  icon?: React.ReactNode
}

export const GameButton: FC<GameButtonProps> = ({ icon, children, ...props }) => {
  return (
    <Button
      variant="contained"
      startIcon={icon}
      {...props}
      sx={{
        borderRadius: 5,
        fontWeight: 600,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  )
}
