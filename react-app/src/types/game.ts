// Card types
export interface Card {
  rank: string
  suit: string
  color: string
}

// Player types
export type PlayerPosition = 'north' | 'east' | 'south' | 'west'

export interface Player {
  cards: Card[]
  isAI: boolean
  tricks: number
}

export interface Players {
  north: Player
  east: Player
  south: Player
  west: Player
}

export interface PlayerSettings {
  name: string
  avatar: string
}

export interface AllPlayerSettings {
  north: PlayerSettings
  east: PlayerSettings
  south: PlayerSettings
  west: PlayerSettings
}

// Game state types
export interface GameStats {
  handsPlayed: number
  gamesWon: number
  gamesLost: number
}

export interface TrickPlay {
  player: PlayerPosition
  card: Card
}

export type GamePhase = 'setup' | 'dealing' | 'trumpSelection' | 'play' | 'handEnd' | 'gameEnd'

export type Difficulty = 'easy' | 'medium' | 'hard'

// Game context types
export interface GameContextType {
  // State
  players: Players
  team1Score: number
  team2Score: number
  trump: string | null
  trumpCaller: PlayerPosition | null
  trumpCallerTeam: number | null
  currentDealer: PlayerPosition
  currentPlayer: PlayerPosition | null
  currentTrick: TrickPlay[]
  round: number
  difficulty: Difficulty
  gamePhase: GamePhase
  message: string
  trumpSelectionPhase: boolean
  trumpSelectionPlayer: PlayerPosition | null
  trumpSelectionRound: number
  flippedCard: Card | null
  passedPlayers: PlayerPosition[]
  playingAlone: boolean
  alonePlayer: PlayerPosition | null
  dealerDiscardPhase: boolean
  kitty: Card[]
  playerSettings: AllPlayerSettings
  stats: GameStats
  showDealButton: boolean
  showTrumpDialog: boolean
  showVictoryModal: boolean
  showDealerDiscardDialog: boolean
  showHelpModal: boolean
  showNewGameModal: boolean
  canGoAlone: boolean

  // Actions
  dealCards: () => void
  selectTrump: (suit: string, player?: PlayerPosition) => void
  passTrump: () => void
  declareAlone: () => void
  continueWithPartner: () => void
  playCard: (player: PlayerPosition, cardIndex: number) => void
  discardCard: (cardIndex: number) => void
  newGame: () => void
  setPlayerSettings: (settings: AllPlayerSettings) => void
  saveSettings: (settings: AllPlayerSettings) => void
  setShowHelpModal: (show: boolean) => void
  setShowNewGameModal: (show: boolean) => void
  setShowVictoryModal: (show: boolean) => void
  isCardPlayable: (card: Card, player: PlayerPosition) => boolean
  getTeam: (player: PlayerPosition) => number
  getPartner: (player: PlayerPosition) => PlayerPosition
  showMessage: (text: string) => void
}
