# Atomic Design Architecture

This project follows **Atomic Design** methodology by Brad Frost for building a scalable, maintainable component architecture.

## 🔬 Atomic Design Principles

Atomic Design breaks UI components into 5 levels:

1. **Atoms** - Basic building blocks (buttons, inputs, labels)
2. **Molecules** - Simple groups of atoms (search form, card with text)
3. **Organisms** - Complex UI components (header, card grid, navigation)
4. **Templates** - Page layouts without real content
5. **Pages** - Templates with real content

## 📁 Project Structure

```
react-app/src/components/
├── atoms/              # Basic UI elements
│   ├── GameButton.tsx          # Styled Material-UI button
│   ├── PlayingCard.tsx         # Single card component
│   ├── PlayerAvatar.tsx        # Player avatar with dealer badge
│   └── index.ts
│
├── molecules/          # Combinations of atoms
│   ├── PlayerInfo.tsx          # Avatar + name + status
│   ├── CardHand.tsx            # Collection of playing cards
│   ├── ScoreDisplay.tsx        # Team score with progress bar
│   └── index.ts
│
├── organisms/          # Complex UI sections
│   ├── ScoreBoard.tsx          # Full scoreboard for both teams
│   ├── GamePlayer.tsx          # Complete player (cards + info)
│   ├── GameTable.tsx           # Game table with tricks
│   └── index.ts
│
├── templates/          # Page layouts
│   ├── GameTemplate.tsx        # Main game layout structure
│   └── index.ts
│
└── pages/              # Complete pages
    ├── GamePage.tsx            # Full game page with logic
    └── index.ts
```

## 🧩 Component Breakdown

### Atoms

#### `GameButton.tsx`
```typescript
// Basic styled button with Material-UI
<GameButton onClick={handleClick} icon={<Icon />}>
  Click Me
</GameButton>
```

**Props:**
- `icon?: ReactNode` - Optional icon
- All Material-UI `ButtonProps`

**Features:**
- Rounded corners (borderRadius: 5)
- Box shadow effects
- Hover animations (translateY)
- Consistent styling across app

---

#### `PlayingCard.tsx`
```typescript
// Single playing card (face up or back)
<PlayingCard
  card={card}
  faceUp={true}
  onClick={() => {}}
  playable={true}
  disabled={false}
/>
```

**Props:**
- `card?: Card` - Card data (rank, suit, color)
- `faceUp?: boolean` - Show front or back
- `onClick?: () => void` - Click handler
- `disabled?: boolean` - Disable interaction
- `playable?: boolean` - Visual playable state

**Features:**
- Traditional card design with corners
- Card back pattern
- Hover effects when playable
- Disabled visual state
- Box shadows

---

#### `PlayerAvatar.tsx`
```typescript
// Player avatar with optional dealer badge
<PlayerAvatar
  avatar="😊"
  isDealer={true}
  isActive={false}
  isSittingOut={false}
  onClick={() => {}}
/>
```

**Props:**
- `avatar: string` - Emoji avatar
- `isDealer?: boolean` - Show dealer badge
- `isActive?: boolean` - Golden border glow
- `isSittingOut?: boolean` - Reduced opacity
- `onClick?: () => void` - Click handler

**Features:**
- Gradient background
- Material-UI Badge for dealer chip
- Active state with golden glow
- Sitting out visual feedback

---

### Molecules

#### `PlayerInfo.tsx`
```typescript
// Avatar + Name combination
<PlayerInfo
  name="Player Name"
  avatar="😊"
  isDealer={false}
  isActive={false}
  isSittingOut={false}
  position="bottom"
  onAvatarClick={() => {}}
/>
```

**Props:**
- `name: string` - Player name
- `avatar: string` - Avatar emoji
- `isDealer?: boolean` - Dealer status
- `isActive?: boolean` - Current player
- `isSittingOut?: boolean` - Playing alone
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Layout direction
- `onAvatarClick?: () => void` - Avatar click handler

**Composition:**
- Uses `PlayerAvatar` atom
- Uses Material-UI `Typography`

**Features:**
- Flexible layout based on position
- Active player highlighting (golden text)
- Text shadow effects

---

#### `CardHand.tsx`
```typescript
// Collection of cards
<CardHand
  cards={cards}
  faceUp={true}
  onCardClick={(index) => {}}
  isCardPlayable={(card) => true}
  orientation="horizontal"
/>
```

**Props:**
- `cards: Card[]` - Array of cards
- `faceUp?: boolean` - Show all face up
- `onCardClick?: (index: number) => void` - Card click handler
- `isCardPlayable?: (card: Card) => boolean` - Playability check
- `orientation?: 'horizontal' | 'vertical'` - Layout direction

**Composition:**
- Maps over `PlayingCard` atoms

**Features:**
- Overlapping card layout (negative gap)
- Responsive spacing
- Playability states

---

#### `ScoreDisplay.tsx`
```typescript
// Team score with tricks progress
<ScoreDisplay
  teamName="Team A"
  score={5}
  tricks={3}
  maxTricks={5}
/>
```

**Props:**
- `teamName: string` - Team name
- `score: number` - Current score
- `tricks: number` - Tricks won
- `maxTricks?: number` - Max tricks (default 5)

**Features:**
- Material-UI `LinearProgress` bar
- Golden score highlighting
- Glass morphism effect
- Animated progress

---

### Organisms

#### `ScoreBoard.tsx`
```typescript
// Complete scoreboard for both teams
<ScoreBoard
  team1Name="You & North"
  team1Score={5}
  team1Tricks={3}
  team2Name="East & West"
  team2Score={4}
  team2Tricks={2}
/>
```

**Composition:**
- Two `ScoreDisplay` molecules
- Material-UI `Divider`

**Features:**
- Side-by-side team scores
- Vertical divider with glow
- Glass morphism background

---

#### `GamePlayer.tsx`
```typescript
// Complete player with cards and info
<GamePlayer
  position="south"
  name="You"
  avatar="😊"
  cards={cards}
  isDealer={false}
  isActive={true}
  isSittingOut={false}
  isHuman={true}
  onCardClick={(index) => {}}
  isCardPlayable={(card) => true}
  onAvatarClick={() => {}}
/>
```

**Composition:**
- `CardHand` molecule
- `PlayerInfo` molecule

**Props:**
- `position: PlayerPosition` - north/south/east/west
- `name: string` - Player name
- `avatar: string` - Avatar emoji
- `cards: Card[]` - Player's cards
- `isDealer: boolean` - Dealer status
- `isActive: boolean` - Current turn
- `isSittingOut: boolean` - Playing alone
- `isHuman: boolean` - Show face up cards
- `onCardClick?: (index: number) => void`
- `isCardPlayable?: (card: Card) => boolean`
- `onAvatarClick?: () => void`

**Features:**
- Absolute positioning based on position
- Automatic layout adjustment (vertical/horizontal)
- Face up cards for human player only

---

#### `GameTable.tsx`
```typescript
// Central game table with tricks
<GameTable
  currentTrick={trick}
  trumpDisplay={<>Trump: ♠</>}
  message="Your turn!"
  centerContent={<DealButton />}
  playerSettings={settings}
/>
```

**Composition:**
- `PlayingCard` atoms for tricks
- Material-UI components

**Features:**
- Green felt background (radial gradient)
- Trump display at bottom
- Message overlay
- Center content area
- Trick cards display

---

### Templates

#### `GameTemplate.tsx`
```typescript
// Main game layout
<GameTemplate
  team1Name="You & North"
  team1Score={5}
  team1Tricks={3}
  team2Name="East & West"
  team2Score={4}
  team2Tricks={2}
  onNewGame={() => {}}
  onShowHelp={() => {}}
>
  {children}
</GameTemplate>
```

**Composition:**
- `ScoreBoard` organism
- `GameButton` atoms
- Material-UI layout components

**Features:**
- Fixed header controls
- Scoreboard positioning
- Responsive container
- Footer

---

### Pages

#### `GamePage.tsx`
```typescript
// Complete game page with state
export const GamePage: FC = () => {
  const game = useGame()
  // ... render logic
}
```

**Composition:**
- `GameTemplate` template
- `GameTable` organism
- Multiple `GamePlayer` organisms

**Features:**
- Game state integration
- Event handlers
- Modal management
- Complete game rendering

---

## 🎯 Benefits of Atomic Design

### 1. **Reusability**
Components can be reused across the application:
```typescript
// Use GameButton everywhere
<GameButton>Deal Cards</GameButton>
<GameButton>Go Alone</GameButton>
<GameButton>Pass</GameButton>
```

### 2. **Testability**
Each level can be tested in isolation:
```typescript
test('PlayingCard renders correctly', () => {
  render(<PlayingCard card={card} faceUp />)
  expect(screen.getByText('A')).toBeInTheDocument()
})
```

### 3. **Scalability**
Easy to add new features:
```typescript
// Add new atom
export const GameIcon: FC = ({ icon }) => <Icon>{icon}</Icon>

// Use in molecules
<PlayerInfo icon={<GameIcon icon="🎯" />} />
```

### 4. **Maintainability**
Changes propagate automatically:
```typescript
// Update GameButton styling once
// All buttons update everywhere
```

### 5. **Consistency**
Shared components ensure consistent UI:
```typescript
// Same button style everywhere
<GameButton>Action 1</GameButton>
<GameButton>Action 2</GameButton>
```

---

## 📚 Best Practices

### Atom Guidelines
- ✅ Single responsibility
- ✅ No business logic
- ✅ Highly reusable
- ✅ Style variants via props
- ❌ No API calls
- ❌ No state management

### Molecule Guidelines
- ✅ Combine 2-5 atoms
- ✅ Simple composition
- ✅ Reusable patterns
- ❌ Complex logic
- ❌ Direct API calls

### Organism Guidelines
- ✅ Complex functionality
- ✅ Multiple molecules
- ✅ Business logic
- ✅ Local state OK
- ❌ Page-specific code

### Template Guidelines
- ✅ Page structure
- ✅ Layout only
- ✅ Reusable across pages
- ❌ Real data
- ❌ API calls

### Page Guidelines
- ✅ Real content
- ✅ Data fetching
- ✅ Global state
- ✅ Route-specific logic

---

## 🔄 Component Flow

```
Page (GamePage)
  ↓
Template (GameTemplate)
  ↓
Organisms (ScoreBoard, GameTable, GamePlayer)
  ↓
Molecules (PlayerInfo, CardHand, ScoreDisplay)
  ↓
Atoms (GameButton, PlayingCard, PlayerAvatar)
  ↓
Material-UI Primitives (Box, Typography, Button, etc.)
```

---

## 🎨 Styling Approach

All components use Material-UI's `sx` prop for styling:

```typescript
<Box
  sx={{
    padding: 2,
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 2,
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }}
>
```

**Benefits:**
- TypeScript support
- Theme integration
- Responsive helpers
- Pseudo-selectors
- Dynamic styling

---

## 🚀 Adding New Components

### 1. Identify the Level
- Is it a basic element? → Atom
- Does it combine atoms? → Molecule
- Is it a major section? → Organism
- Is it a layout? → Template
- Is it a full page? → Page

### 2. Create the Component
```typescript
// components/atoms/NewAtom.tsx
import { FC } from 'react'

interface NewAtomProps {
  // props
}

export const NewAtom: FC<NewAtomProps> = ({ }) => {
  return <div>New Atom</div>
}
```

### 3. Export from Index
```typescript
// components/atoms/index.ts
export { NewAtom } from './NewAtom'
```

### 4. Use in Higher Levels
```typescript
// components/molecules/NewMolecule.tsx
import { NewAtom } from '../atoms'

export const NewMolecule: FC = () => {
  return <NewAtom />
}
```

---

## 📖 Further Reading

- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [Pattern Lab](https://patternlab.io/)
- [Component-Driven Development](https://www.componentdriven.org/)
- [Material-UI Best Practices](https://mui.com/material-ui/guides/composition/)

---

**Built with Atomic Design principles for maximum scalability and maintainability! 🎯**
