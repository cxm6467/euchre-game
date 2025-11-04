// Get random NPC profile for AI players
export const getRandomNPCProfile = (player) => {
  const profiles = {
    north: [
      { name: 'Alex Thunder', avatar: '⚡' },
      { name: 'Maya Starlight', avatar: '🌟' },
      { name: 'Robo Carl', avatar: '🤖' },
      { name: 'Drama Queen', avatar: '🎭' },
      { name: 'Lightning Lou', avatar: '⚡' },
      { name: 'Stellar Sue', avatar: '🌟' },
      { name: 'Tech Titan', avatar: '🤖' },
      { name: 'Mystic Mike', avatar: '🎭' }
    ],
    east: [
      { name: 'Bullseye Betty', avatar: '🎯' },
      { name: 'Fire Fox', avatar: '🔥' },
      { name: 'Diamond Dan', avatar: '💎' },
      { name: 'Sharp Shooter', avatar: '🎯' },
      { name: 'Blaze Master', avatar: '🔥' },
      { name: 'Gem Hunter', avatar: '💎' },
      { name: 'Ace Archer', avatar: '🎯' },
      { name: 'Flame Wizard', avatar: '🔥' }
    ],
    west: [
      { name: 'Rocket Rita', avatar: '🚀' },
      { name: 'Circus Sam', avatar: '🎪' },
      { name: 'Lucky Dice', avatar: '🎲' },
      { name: 'Space Cadet', avatar: '🚀' },
      { name: 'Ring Master', avatar: '🎪' },
      { name: 'Game Changer', avatar: '🎲' },
      { name: 'Cosmic Kate', avatar: '🚀' },
      { name: 'Carnival King', avatar: '🎪' }
    ]
  }

  const playerProfiles = profiles[player] || profiles.north
  const randomProfile = playerProfiles[Math.floor(Math.random() * playerProfiles.length)]

  return {
    name: player === 'north' ? `${randomProfile.name} (Partner)` : randomProfile.name,
    avatar: randomProfile.avatar
  }
}
