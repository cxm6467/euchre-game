import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react'
import { createDeck, shuffle, getCardValue, getEffectiveSuit, canFollowSuit } from '../utils/cardUtils'
import { getRandomNPCProfile } from '../utils/playerUtils'
import {
  Card,
  PlayerPosition,
  Players,
  AllPlayerSettings,
  GameStats,
  GamePhase,
  Difficulty,
  GameContextType,
  TrickPlay
} from '../types/game'

const GameContext = createContext<GameContextType | undefined>(undefined)

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

interface GameProviderProps {
  children: ReactNode
}

export const GameProvider = ({ children }: GameProviderProps) => {
  // Player state
  const [players, setPlayers] = useState<Players>({
    north: { cards: [], isAI: true, tricks: 0 },
    east: { cards: [], isAI: true, tricks: 0 },
    south: { cards: [], isAI: false, tricks: 0 },
    west: { cards: [], isAI: true, tricks: 0 }
  })

  // Game state
  const [team1Score, setTeam1Score] = useState(0)
  const [team2Score, setTeam2Score] = useState(0)
  const [trump, setTrump] = useState<string | null>(null)
  const [trumpCaller, setTrumpCaller] = useState<PlayerPosition | null>(null)
  const [trumpCallerTeam, setTrumpCallerTeam] = useState<number | null>(null)
  const [currentDealer, setCurrentDealer] = useState<PlayerPosition>('south')
  const [currentPlayer, setCurrentPlayer] = useState<PlayerPosition | null>(null)
  const [currentTrick, setCurrentTrick] = useState<TrickPlay[]>([])
  const [round, setRound] = useState(1)
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup')
  const [message, setMessage] = useState('')

  // Trump selection state
  const [trumpSelectionPhase, setTrumpSelectionPhase] = useState(false)
  const [trumpSelectionPlayer, setTrumpSelectionPlayer] = useState<PlayerPosition | null>(null)
  const [trumpSelectionRound, setTrumpSelectionRound] = useState(1)
  const [flippedCard, setFlippedCard] = useState<Card | null>(null)
  const [passedPlayers, setPassedPlayers] = useState<PlayerPosition[]>([])
  const [trumpTurnOrder, setTrumpTurnOrder] = useState<PlayerPosition[]>([])
  const [canGoAlone, setCanGoAlone] = useState(false)

  // Alone play state
  const [playingAlone, setPlayingAlone] = useState(false)
  const [alonePlayer, setAlonePlayer] = useState<PlayerPosition | null>(null)

  // Dealer discard state
  const [dealerDiscardPhase, setDealerDiscardPhase] = useState(false)

  // Kitty and deck
  const [kitty, setKitty] = useState<Card[]>([])
  const [deck, setDeck] = useState<Card[]>([])

  // Player settings
  const [playerSettings, setPlayerSettings] = useState<AllPlayerSettings>({
    south: { name: 'You', avatar: '😊' },
    north: { name: 'North (Partner)', avatar: '🤖' },
    east: { name: 'East', avatar: '🤖' },
    west: { name: 'West', avatar: '🤖' }
  })

  // Stats state
  const [stats, setStats] = useState<GameStats>({
    handsPlayed: 0,
    gamesWon: 0,
    gamesLost: 0
  })

  // UI state
  const [showDealButton, setShowDealButton] = useState(true)
  const [showTrumpDialog, setShowTrumpDialog] = useState(false)
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  const [showDealerDiscardDialog, setShowDealerDiscardDialog] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showNewGameModal, setShowNewGameModal] = useState(false)

  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize game
  useEffect(() => {
    loadStats()
    loadSettings()
    const dealers: PlayerPosition[] = ['south', 'west', 'north', 'east']
    setCurrentDealer(dealers[Math.floor(Math.random() * dealers.length)])
  }, [])

  // Show message utility
  const showMessage = useCallback((text: string) => {
    setMessage(text)
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current)
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('')
    }, 5000)
  }, [])

  // Load stats from API
  const loadStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      setStats(data)
    } catch (e) {
      console.error('Error loading stats:', e)
    }
  }

  // Save stats to API
  const saveStats = async (newStats: GameStats) => {
    try {
      await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStats)
      })
    } catch (e) {
      console.error('Error saving stats:', e)
    }
  }

  // Load settings from localStorage
  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('euchre-player-settings')
      if (saved) {
        const savedSettings = JSON.parse(saved)
        if (savedSettings.players) {
          setPlayerSettings({ ...playerSettings, ...savedSettings.players })
        } else {
          setPlayerSettings({ ...playerSettings, ...savedSettings })
        }
      } else {
        initializeRandomNPCs()
      }
    } catch (e) {
      console.error('Error loading settings:', e)
      initializeRandomNPCs()
    }
  }

  // Save settings to localStorage
  const saveSettings = (settings: AllPlayerSettings) => {
    try {
      localStorage.setItem('euchre-player-settings', JSON.stringify({ players: settings }))
      setPlayerSettings(settings)
    } catch (e) {
      console.error('Error saving settings:', e)
    }
  }

  // Initialize random NPC names
  const initializeRandomNPCs = () => {
    const newSettings = { ...playerSettings }
    ;(['north', 'east', 'west'] as PlayerPosition[]).forEach(player => {
      const profile = getRandomNPCProfile(player)
      newSettings[player] = profile
    })
    setPlayerSettings(newSettings)
    saveSettings(newSettings)
  }

  // Deal cards
  const dealCards = useCallback(() => {
    setShowDealButton(false)
    showMessage('Dealing cards...')

    setTimeout(() => {
      const newDeck = shuffle(createDeck())
      setDeck(newDeck)

      const dealerOrder: PlayerPosition[] = ['south', 'west', 'north', 'east']
      const dealerIndex = dealerOrder.indexOf(currentDealer)
      const dealOrder: PlayerPosition[] = []
      for (let i = 1; i <= 4; i++) {
        dealOrder.push(dealerOrder[(dealerIndex + i) % 4])
      }

      const newPlayers = { ...players }
      Object.keys(newPlayers).forEach(pos => {
        const position = pos as PlayerPosition
        newPlayers[position].cards = []
        newPlayers[position].tricks = 0
      })

      // Deal 5 cards to each player
      for (let i = 0; i < 5; i++) {
        dealOrder.forEach(pos => {
          newPlayers[pos].cards.push(newDeck.pop()!)
        })
      }

      const newFlippedCard = newDeck.pop()!
      const newKitty = [...newDeck]

      setPlayers(newPlayers)
      setFlippedCard(newFlippedCard)
      setKitty(newKitty)
      setCurrentTrick([])

      // Update stats
      const newStats = { ...stats, handsPlayed: stats.handsPlayed + 1 }
      setStats(newStats)
      saveStats(newStats)

      startTrumpSelection(newFlippedCard)
    }, 1000)
  }, [currentDealer, players, stats, showMessage])

  // Start trump selection
  const startTrumpSelection = (flipped: Card) => {
    setTrumpSelectionPhase(true)
    setTrumpSelectionRound(1)
    setPassedPlayers([])

    const dealerOrder: PlayerPosition[] = ['south', 'west', 'north', 'east']
    const dealerIndex = dealerOrder.indexOf(currentDealer)
    const leftOfDealer = dealerOrder[(dealerIndex + 1) % 4]

    const startIndex = dealerOrder.indexOf(leftOfDealer)
    const turnOrder: PlayerPosition[] = []
    for (let i = 0; i < 4; i++) {
      turnOrder.push(dealerOrder[(startIndex + i) % 4])
    }

    setTrumpTurnOrder(turnOrder)
    setTrumpSelectionPlayer(turnOrder[0])

    setTimeout(() => processTrumpSelection(turnOrder[0], 1, []), 500)
  }

  // Process trump selection
  const processTrumpSelection = useCallback((player: PlayerPosition, round: number, passed: PlayerPosition[]) => {
    if (player === 'south') {
      setShowTrumpDialog(true)
    } else {
      // AI turn
      const playerName = playerSettings[player].name
      if (round === 1) {
        showMessage(`${playerName} can ${player === 'north' ? '"assist"' : '"order it up"'} or pass...`)
      } else {
        showMessage(`${playerName} can name trump or pass...`)
      }
      setTimeout(() => aiTrumpSelection(player, round, passed), 1500)
    }
  }, [playerSettings, showMessage])

  // AI trump selection logic
  const aiTrumpSelection = (player: PlayerPosition, round: number, passed: PlayerPosition[]) => {
    const playerName = playerSettings[player].name
    const aggressiveness = difficulty === 'easy' ? 0.2 : difficulty === 'hard' ? 0.4 : 0.3

    if (round === 1) {
      if (Math.random() < aggressiveness && flippedCard) {
        selectTrump(flippedCard.suit, player)
        return
      } else {
        showMessage(`${playerName} passes.`)
      }
    } else {
      if (player === currentDealer && passed.length === 3 && flippedCard) {
        // Stick the dealer
        const availableSuits = ['♠', '♥', '♦', '♣'].filter(s => s !== flippedCard.suit)
        const chosenSuit = availableSuits[Math.floor(Math.random() * availableSuits.length)]
        selectTrump(chosenSuit, player)
        showMessage(`${playerName} is stuck and calls ${chosenSuit} trump!`)
        return
      } else if (Math.random() < (aggressiveness + 0.2) && flippedCard) {
        const availableSuits = ['♠', '♥', '♦', '♣'].filter(s => s !== flippedCard.suit)
        const chosenSuit = availableSuits[Math.floor(Math.random() * availableSuits.length)]
        selectTrump(chosenSuit, player)
        showMessage(`${playerName} called ${chosenSuit} trump!`)
        return
      } else {
        showMessage(`${playerName} passes.`)
      }
    }

    setTimeout(() => nextTrumpPlayer(player, round, passed), 1000)
  }

  // Next trump player
  const nextTrumpPlayer = (player: PlayerPosition, round: number, passed: PlayerPosition[]) => {
    const currentIndex = trumpTurnOrder.indexOf(player)
    const newPassed = [...passed, player]
    setPassedPlayers(newPassed)

    if (newPassed.length === 4) {
      if (round === 1) {
        setTrumpSelectionRound(2)
        setPassedPlayers([])
        showMessage('Second round of trump selection...')
        setTimeout(() => processTrumpSelection(trumpTurnOrder[0], 2, []), 1500)
      } else {
        showMessage('Everyone passed - redealing...')
        setTimeout(() => setShowDealButton(true), 2000)
      }
    } else if (round === 2 && newPassed.length === 3) {
      const dealerName = playerSettings[currentDealer].name
      showMessage(`Stick the dealer! ${dealerName} must choose trump.`)
      setTimeout(() => processTrumpSelection(currentDealer, 2, newPassed), 1500)
    } else {
      const nextPlayer = trumpTurnOrder[(currentIndex + 1) % 4]
      setTrumpSelectionPlayer(nextPlayer)
      processTrumpSelection(nextPlayer, round, newPassed)
    }
  }

  // Select trump
  const selectTrump = (suit: string, player: PlayerPosition = trumpSelectionPlayer!) => {
    setTrump(suit)
    setTrumpCaller(player)
    const team = getTeam(player)
    setTrumpCallerTeam(team)

    if (player === 'south') {
      setCanGoAlone(true)
      return
    }

    setTrumpSelectionPhase(false)
    setShowTrumpDialog(false)

    if (trumpSelectionRound === 1) {
      handleDealerPickup()
    } else {
      setTimeout(() => startPlay(), 1000)
    }
  }

  // Handle dealer pickup
  const handleDealerPickup = () => {
    if (currentDealer === 'south' && flippedCard) {
      setPlayers(prev => ({
        ...prev,
        south: { ...prev.south, cards: [...prev.south.cards, flippedCard] }
      }))
      setDealerDiscardPhase(true)
      setShowDealerDiscardDialog(true)
    } else if (flippedCard) {
      setPlayers(prev => {
        const newPlayers = { ...prev }
        newPlayers[currentDealer].cards.push(flippedCard)
        // AI discards lowest card
        newPlayers[currentDealer].cards.sort((a, b) =>
          getCardValue(a, trump, null) - getCardValue(b, trump, null)
        )
        newPlayers[currentDealer].cards.shift()
        return newPlayers
      })
      setTimeout(() => startPlay(), 1000)
    }
  }

  // Discard card (dealer)
  const discardCard = (cardIndex: number) => {
    setPlayers(prev => {
      const newPlayers = { ...prev }
      newPlayers.south.cards.splice(cardIndex, 1)
      return newPlayers
    })
    setDealerDiscardPhase(false)
    setShowDealerDiscardDialog(false)
    setTimeout(() => startPlay(), 500)
  }

  // Declare alone
  const declareAlone = () => {
    setPlayingAlone(true)
    setAlonePlayer('south')
    setTrumpSelectionPhase(false)
    setShowTrumpDialog(false)
    setCanGoAlone(false)

    if (trumpSelectionRound === 1) {
      handleDealerPickup()
    } else {
      setTimeout(() => startPlay(), 1000)
    }
  }

  // Continue with partner
  const continueWithPartner = () => {
    setTrumpSelectionPhase(false)
    setShowTrumpDialog(false)
    setCanGoAlone(false)

    if (trumpSelectionRound === 1) {
      handleDealerPickup()
    } else {
      setTimeout(() => startPlay(), 1000)
    }
  }

  // Pass trump
  const passTrump = () => {
    if (canGoAlone) {
      continueWithPartner()
    } else {
      setShowTrumpDialog(false)
      nextTrumpPlayer(trumpSelectionPlayer!, trumpSelectionRound, passedPlayers)
    }
  }

  // Start play
  const startPlay = () => {
    setGamePhase('play')

    setTimeout(() => {
      const dealerOrder: PlayerPosition[] = ['south', 'west', 'north', 'east']
      const dealerIndex = dealerOrder.indexOf(currentDealer)
      let nextPlayer = dealerOrder[(dealerIndex + 1) % 4]

      if (playingAlone && alonePlayer && nextPlayer === getPartner(alonePlayer)) {
        nextPlayer = dealerOrder[(dealerIndex + 2) % 4]
      }

      setCurrentPlayer(nextPlayer)

      if (players[nextPlayer].isAI) {
        setTimeout(() => aiPlay(nextPlayer), 1000)
      } else {
        showMessage("Your turn! Click a card to play.")
      }
    }, 1000)
  }

  // Play card
  const playCard = (player: PlayerPosition, cardIndex: number) => {
    if (trumpSelectionPhase || gamePhase !== 'play' || player !== currentPlayer) {
      showMessage("It's not your turn!")
      return
    }

    if (playingAlone && alonePlayer && player === getPartner(alonePlayer)) {
      showMessage("Your partner is playing alone!")
      return
    }

    const card = players[player].cards[cardIndex]

    // Check if must follow suit
    if (player === 'south' && currentTrick.length > 0) {
      const leadSuit = getEffectiveSuit(currentTrick[0].card, trump)
      const canFollow = canFollowSuit(players[player].cards, leadSuit, trump)
      const playedCardSuit = getEffectiveSuit(card, trump)

      if (canFollow && playedCardSuit !== leadSuit) {
        showMessage(`You must follow suit (${leadSuit})!`)
        return
      }
    }

    setPlayers(prev => {
      const newPlayers = { ...prev }
      newPlayers[player].cards.splice(cardIndex, 1)
      return newPlayers
    })

    setCurrentTrick(prev => [...prev, { player, card }])

    const expectedCards = playingAlone ? 3 : 4
    if (currentTrick.length + 1 === expectedCards) {
      setTimeout(() => evaluateTrick([...currentTrick, { player, card }]), 2000)
    } else {
      setTimeout(() => nextPlayer(player), 500)
    }
  }

  // AI play
  const aiPlay = (player: PlayerPosition) => {
    if (playingAlone && alonePlayer && player === getPartner(alonePlayer)) {
      nextPlayer(player)
      return
    }

    const cards = players[player].cards
    if (cards.length === 0) return

    let cardIndex = 0

    if (currentTrick.length > 0) {
      const leadSuit = getEffectiveSuit(currentTrick[0].card, trump)
      const followCards = cards.filter(card => getEffectiveSuit(card, trump) === leadSuit)

      if (followCards.length > 0) {
        cardIndex = cards.indexOf(followCards[0])
      }
    } else {
      cardIndex = Math.floor(cards.length / 2)
    }

    playCard(player, cardIndex)
  }

  // Next player
  const nextPlayer = (player: PlayerPosition) => {
    const playerOrder: PlayerPosition[] = ['south', 'west', 'north', 'east']
    const currentIndex = playerOrder.indexOf(player)
    let next = playerOrder[(currentIndex + 1) % 4]

    if (playingAlone && alonePlayer && next === getPartner(alonePlayer)) {
      next = playerOrder[(playerOrder.indexOf(next) + 1) % 4]
    }

    setCurrentPlayer(next)

    if (players[next] && players[next].isAI) {
      setTimeout(() => aiPlay(next), 1000)
    } else {
      showMessage("Your turn! Click a card to play.")
    }
  }

  // Evaluate trick
  const evaluateTrick = (trick: TrickPlay[]) => {
    const leadSuit = trick[0].card.suit
    let winner = trick[0]
    let highestValue = getCardValue(winner.card, trump, leadSuit)

    for (let i = 1; i < trick.length; i++) {
      const cardValue = getCardValue(trick[i].card, trump, leadSuit)
      if (cardValue > highestValue) {
        highestValue = cardValue
        winner = trick[i]
      }
    }

    setPlayers(prev => {
      const newPlayers = { ...prev }
      newPlayers[winner.player].tricks += 1
      return newPlayers
    })

    const winnerName = playerSettings[winner.player].name
    showMessage(`${winnerName} wins the trick!`)

    setTimeout(() => {
      setCurrentTrick([])

      if (players[winner.player].cards.length === 0) {
        endHand()
      } else {
        setCurrentPlayer(winner.player)
        if (players[winner.player].isAI) {
          setTimeout(() => aiPlay(winner.player), 500)
        } else {
          showMessage("Your turn! Click a card to play.")
        }
      }
    }, 2000)
  }

  // End hand
  const endHand = () => {
    const team1Tricks = (players.south?.tricks || 0) + (players.north?.tricks || 0)
    const team2Tricks = (players.east?.tricks || 0) + (players.west?.tricks || 0)

    let points = 0
    let message = ''
    let newTeam1Score = team1Score
    let newTeam2Score = team2Score

    if (playingAlone && alonePlayer) {
      if (alonePlayer === 'south' || alonePlayer === 'north') {
        if (team1Tricks === 5) {
          points = 4
          message = 'You marched alone! +4 points!'
          newTeam1Score += points
        } else if (team1Tricks >= 3) {
          points = 1
          message = 'You made it alone! +1 point!'
          newTeam1Score += points
        } else {
          points = 2
          message = 'You were euchred while alone! Opponents +2 points!'
          newTeam2Score += points
        }
      } else {
        if (team2Tricks === 5) {
          newTeam2Score += 4
          message = 'Opponents marched alone! +4 points!'
        } else if (team2Tricks >= 3) {
          newTeam2Score += 1
          message = 'Opponents made it alone! +1 point!'
        } else {
          newTeam1Score += 2
          message = 'Opponents euchred while alone! +2 points!'
        }
      }
    } else {
      if (team1Tricks >= 3) {
        points = team1Tricks === 5 ? 2 : 1
        message = team1Tricks === 5 ? 'You marched! +2 points!' : 'You made it! +1 point!'
        newTeam1Score += points
      } else {
        newTeam2Score += 2
        message = 'You were euchred! Opponents +2 points!'
      }
    }

    setTeam1Score(newTeam1Score)
    setTeam2Score(newTeam2Score)
    showMessage(message)

    if (newTeam1Score >= 10) {
      endGame(true)
    } else if (newTeam2Score >= 10) {
      endGame(false)
    } else {
      setRound(prev => prev + 1)
      setPlayingAlone(false)
      setAlonePlayer(null)
      rotateDealerChip()
      setTimeout(() => setShowDealButton(true), 3000)
    }
  }

  // End game
  const endGame = (team1Won: boolean) => {
    const newStats = {
      ...stats,
      gamesWon: team1Won ? stats.gamesWon + 1 : stats.gamesWon,
      gamesLost: !team1Won ? stats.gamesLost + 1 : stats.gamesLost
    }
    setStats(newStats)
    saveStats(newStats)
    setShowVictoryModal(true)
  }

  // New game
  const newGame = () => {
    setTeam1Score(0)
    setTeam2Score(0)
    setRound(1)
    setCurrentTrick([])
    setTrump(null)
    setTrumpCaller(null)
    setTrumpCallerTeam(null)
    setTrumpSelectionPhase(false)
    setTrumpSelectionPlayer(null)
    setTrumpSelectionRound(1)
    setFlippedCard(null)
    setPassedPlayers([])
    setPlayingAlone(false)
    setAlonePlayer(null)
    setKitty([])
    setCanGoAlone(false)
    setGamePhase('setup')
    setShowDealButton(true)
    setShowVictoryModal(false)
    setShowNewGameModal(false)

    const newPlayers = { ...players }
    Object.keys(newPlayers).forEach(pos => {
      const position = pos as PlayerPosition
      newPlayers[position].cards = []
      newPlayers[position].tricks = 0
    })
    setPlayers(newPlayers)
  }

  // Rotate dealer chip
  const rotateDealerChip = () => {
    const dealers: PlayerPosition[] = ['south', 'west', 'north', 'east']
    const currentIndex = dealers.indexOf(currentDealer)
    setCurrentDealer(dealers[(currentIndex + 1) % 4])
  }

  // Get team
  const getTeam = (player: PlayerPosition): number => {
    return (player === 'south' || player === 'north') ? 1 : 2
  }

  // Get partner
  const getPartner = (player: PlayerPosition): PlayerPosition => {
    const partners: Record<PlayerPosition, PlayerPosition> = {
      south: 'north',
      north: 'south',
      east: 'west',
      west: 'east'
    }
    return partners[player]
  }

  // Check if card is playable
  const isCardPlayable = (card: Card, player: PlayerPosition): boolean => {
    if (currentPlayer !== player) return false
    if (currentTrick.length === 0) return true

    const leadSuit = getEffectiveSuit(currentTrick[0].card, trump)
    const canFollow = canFollowSuit(players[player].cards, leadSuit, trump)

    if (!canFollow) return true

    const cardSuit = getEffectiveSuit(card, trump)
    return cardSuit === leadSuit
  }

  const value: GameContextType = {
    // State
    players,
    team1Score,
    team2Score,
    trump,
    trumpCaller,
    trumpCallerTeam,
    currentDealer,
    currentPlayer,
    currentTrick,
    round,
    difficulty,
    gamePhase,
    message,
    trumpSelectionPhase,
    trumpSelectionPlayer,
    trumpSelectionRound,
    flippedCard,
    passedPlayers,
    playingAlone,
    alonePlayer,
    dealerDiscardPhase,
    kitty,
    playerSettings,
    stats,
    showDealButton,
    showTrumpDialog,
    showVictoryModal,
    showDealerDiscardDialog,
    showHelpModal,
    showNewGameModal,
    canGoAlone,

    // Actions
    dealCards,
    selectTrump,
    passTrump,
    declareAlone,
    continueWithPartner,
    playCard,
    discardCard,
    newGame,
    setPlayerSettings,
    saveSettings,
    setShowHelpModal,
    setShowNewGameModal,
    setShowVictoryModal,
    isCardPlayable,
    getTeam,
    getPartner,
    showMessage
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
