// Create a Euchre deck (24 cards: 9, 10, J, Q, K, A in each suit)
export const createDeck = () => {
  const suits = ['♠', '♥', '♦', '♣']
  const ranks = ['9', '10', 'J', 'Q', 'K', 'A']
  const deck = []

  for (let suit of suits) {
    for (let rank of ranks) {
      const color = (suit === '♥' || suit === '♦') ? '#e74c3c' : '#2c3e50'
      deck.push({ rank, suit, color })
    }
  }

  return deck
}

// Shuffle deck
export const shuffle = (deck) => {
  const newDeck = [...deck]
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]
  }
  return newDeck
}

// Get effective suit (considering bower rules)
export const getEffectiveSuit = (card, trump) => {
  if (!trump || !card) return card?.suit || ''

  // Right bower (Jack of trump suit) is trump
  if (card.rank === 'J' && card.suit === trump) {
    return trump
  }

  // Left bower (Jack of same color as trump) becomes trump
  if (card.rank === 'J') {
    const sameColor = (trump === '♠' && card.suit === '♣') ||
                    (trump === '♣' && card.suit === '♠') ||
                    (trump === '♥' && card.suit === '♦') ||
                    (trump === '♦' && card.suit === '♥')
    if (sameColor) {
      return trump
    }
  }

  return card.suit
}

// Check if player can follow suit
export const canFollowSuit = (hand, leadSuit, trump) => {
  return hand.some(card => getEffectiveSuit(card, trump) === leadSuit)
}

// Get card value for comparison
export const getCardValue = (card, trump, leadSuit) => {
  // Jacks in Euchre
  if (card.rank === 'J') {
    if (card.suit === trump) {
      return 1000 // Right bower
    }
    // Left bower
    const sameColor = (trump === '♠' && card.suit === '♣') ||
                    (trump === '♣' && card.suit === '♠') ||
                    (trump === '♥' && card.suit === '♦') ||
                    (trump === '♦' && card.suit === '♥')
    if (sameColor) {
      return 999 // Left bower
    }
  }

  // Trump suit
  if (card.suit === trump && card.rank !== 'J') {
    const values = { 'A': 900, 'K': 800, 'Q': 700, '10': 600, '9': 500 }
    return values[card.rank]
  }

  // Following lead suit
  if (card.suit === leadSuit && card.suit !== trump) {
    const values = { 'A': 400, 'K': 300, 'Q': 200, 'J': 150, '10': 100, '9': 50 }
    return values[card.rank]
  }

  // Off suit
  return 0
}
