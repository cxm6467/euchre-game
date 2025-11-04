# Euchre Game - React + Ruby Implementation

A complete reimplementation of the classic Euchre card game using **React**, **TypeScript**, **Material-UI** for the frontend and **Ruby (Sinatra)** for the backend.

Built with **Atomic Design** principles and configured for **LAN access**.

## 🚀 Tech Stack

### Frontend
- **React 18.3** - Modern UI library with hooks
- **TypeScript 5.5** - Type-safe JavaScript
- **Material-UI 5.15** - React component library
- **Vite** - Fast build tool and dev server
- **Context API** - Global state management
- **Atomic Design** - Component architecture methodology

### Backend
- **Ruby 3.x** - Server-side language
- **Sinatra 4.0** - Lightweight web framework
- **WEBrick** - Ruby web server
- **JSON** - Data format for API

## 📚 Documentation

- **[ATOMIC-DESIGN.md](./ATOMIC-DESIGN.md)** - Complete guide to the atomic design architecture
- **[LAN-ACCESS.md](./LAN-ACCESS.md)** - How to access the game on your local network

## 📁 Project Structure

```
euchre-game/
├── react-app/              # TypeScript React frontend
│   ├── src/
│   │   ├── components/     # Atomic Design components
│   │   │   ├── atoms/           # Basic building blocks
│   │   │   │   ├── GameButton.tsx
│   │   │   │   ├── PlayingCard.tsx
│   │   │   │   └── PlayerAvatar.tsx
│   │   │   ├── molecules/       # Simple combinations
│   │   │   │   ├── PlayerInfo.tsx
│   │   │   │   ├── CardHand.tsx
│   │   │   │   └── ScoreDisplay.tsx
│   │   │   ├── organisms/       # Complex sections
│   │   │   │   ├── ScoreBoard.tsx
│   │   │   │   ├── GamePlayer.tsx
│   │   │   │   └── GameTable.tsx
│   │   │   ├── templates/       # Page layouts
│   │   │   │   └── GameTemplate.tsx
│   │   │   └── pages/           # Full pages
│   │   │       └── GamePage.tsx
│   │   ├── context/        # State management
│   │   │   └── GameContext.tsx
│   │   ├── types/          # TypeScript types
│   │   │   └── game.ts
│   │   ├── utils/          # Helper functions
│   │   │   ├── cardUtils.ts
│   │   │   └── playerUtils.ts
│   │   ├── styles/         # CSS styles
│   │   │   └── main.css
│   │   ├── App.tsx         # Root component
│   │   └── main.tsx        # Entry with MUI theme
│   └── index.html
├── backend/                # Ruby Sinatra backend
│   ├── server.rb           # Main server file (LAN enabled)
│   ├── Gemfile             # Ruby dependencies
│   ├── config.ru           # Rack configuration
│   └── game-stats.json     # Persistent stats storage
├── vite.config.js          # Vite configuration (LAN enabled)
├── tsconfig.json           # TypeScript configuration
├── package-react.json      # React + Material-UI dependencies
├── ATOMIC-DESIGN.md        # Atomic design documentation
├── LAN-ACCESS.md           # LAN access guide
└── README-REACT-RUBY.md    # This file
```

## 🎮 Game Features

- ✅ Complete Euchre rules implementation
- ✅ 4-player gameplay (1 human + 3 AI)
- ✅ Trump selection with "order up" and "stick the dealer"
- ✅ "Going Alone" mechanic
- ✅ Proper bower system (right & left bowers)
- ✅ AI opponents with difficulty settings
- ✅ Persistent game statistics
- ✅ Professional card design
- ✅ Responsive layout
- ✅ Victory/defeat screens
- ✅ Help system with rules

## 🛠️ Installation

### Prerequisites

- **Node.js** 16+ (for React/Vite)
- **Ruby** 3.0+ (for Sinatra backend)
- **Bundler** (Ruby package manager)

### Setup Instructions

#### 1. Install Frontend Dependencies

```bash
# Install Node dependencies
npm install --package-lock-only
mv package.json package-original.json
mv package-react.json package.json
npm install
```

#### 2. Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install Ruby gems
bundle install
```

#### 3. Run the Application

You need to run both the frontend and backend servers:

**Terminal 1 - Ruby Backend:**
```bash
cd backend
bundle exec ruby server.rb
```

The Ruby server will start on `http://localhost:4567`

**Terminal 2 - React Frontend:**
```bash
# From the root directory
npm run dev
```

The Vite dev server will start on `http://localhost:3000`

#### 4. Build for Production

```bash
# Build React app
npm run build

# The built files will be in the 'dist' directory
# The Ruby server will serve these static files
```

Then start only the Ruby server:
```bash
cd backend
bundle exec ruby server.rb
```

Visit `http://localhost:4567` to play the production build.

## 📡 API Endpoints

The Ruby backend provides the following REST API endpoints:

### GET `/api/stats`
Get current game statistics.

**Response:**
```json
{
  "handsPlayed": 15,
  "gamesWon": 3,
  "gamesLost": 2
}
```

### POST `/api/stats`
Update game statistics.

**Request Body:**
```json
{
  "handsPlayed": 16,
  "gamesWon": 4,
  "gamesLost": 2
}
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "handsPlayed": 16,
    "gamesWon": 4,
    "gamesLost": 2
  }
}
```

### POST `/api/stats/reset`
Reset statistics to zero.

**Response:**
```json
{
  "success": true,
  "stats": {
    "handsPlayed": 0,
    "gamesWon": 0,
    "gamesLost": 0
  }
}
```

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": 1234567890
}
```

## 🎯 How to Play

### Game Objective
Be the first team to score **10 points** by winning tricks with trump cards!

### Card Hierarchy
**Trump Suit (Highest to Lowest):**
1. Right Bower (Jack of trump suit)
2. Left Bower (Jack of same color as trump)
3. Ace, King, Queen, 10, 9 of trump

**Non-Trump:** A, K, Q, J, 10, 9

### Game Flow
1. **Deal:** 5 cards each, flip one for trump
2. **Trump Selection:** Players can "order up" or pass
3. **Play Tricks:** Follow suit if possible, highest trump wins
4. **Score:** Team that called trump needs 3+ tricks to score

### Scoring
- **Make it:** 3-4 tricks = 1 point
- **March:** All 5 tricks = 2 points
- **Euchred:** Opponents get 2 points if you fail
- **Alone March:** All 5 tricks alone = 4 points

### Going Alone
If you're confident, declare "alone" and play without your partner for bonus points!

## 🏗️ Architecture

### Frontend (React)

The React app uses a context-based architecture:

- **GameContext** - Centralized state management for all game logic
- **Components** - Reusable UI components following React best practices
- **Hooks** - Custom hooks for game state (useGame)
- **Utils** - Pure functions for card logic and player utilities

### Backend (Ruby/Sinatra)

The Sinatra backend is lightweight and focuses on:

- **RESTful API** - JSON-based API for game statistics
- **Persistence** - File-based storage for game stats
- **Static Serving** - Serves the built React app in production
- **CORS Support** - Allows frontend development server to call API

### Communication

- Development: React dev server (port 3000) proxies API calls to Sinatra (port 4567)
- Production: Sinatra serves both static files and API from port 4567

## 🧪 Development

### React Development
```bash
npm run dev
```

Hot reload is enabled - changes to React components will update immediately.

### Ruby Development

The Ruby server must be restarted when code changes:
```bash
cd backend
bundle exec ruby server.rb
```

Or use a gem like `rerun` for auto-restart:
```bash
gem install rerun
rerun "ruby server.rb"
```

## 📦 Dependencies

### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.2"
  }
}
```

### Backend (Gemfile)
```ruby
gem 'sinatra', '~> 4.0'
gem 'sinatra-cors', '~> 2.0'
gem 'webrick', '~> 1.8'
gem 'json', '~> 2.7'
gem 'rackup', '~> 2.1'
```

## 🎨 Styling

The game uses the original CSS from the vanilla JavaScript version, providing:

- Professional card table design
- Smooth animations and transitions
- Responsive layout for all screen sizes
- Dark theme with green felt table
- Glowing effects and shadows

## 🔧 Configuration

### Vite Configuration (vite.config.js)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4567',
        changeOrigin: true
      }
    }
  }
})
```

This configuration:
- Runs React dev server on port 3000
- Proxies API requests to Ruby backend on port 4567
- Enables hot module replacement

## 🚀 Deployment

### Option 1: Separate Deployment

Deploy React and Ruby separately:

**Frontend:**
- Build: `npm run build`
- Deploy `dist/` folder to any static hosting (Netlify, Vercel, S3)
- Update API calls to point to Ruby backend URL

**Backend:**
- Deploy to Heroku, Railway, or any Ruby hosting
- Ensure Gemfile and config.ru are present

### Option 2: Combined Deployment

Deploy as a single app:

1. Build React app: `npm run build`
2. Ruby server serves both static files and API
3. Deploy entire app to Heroku/Railway with Ruby buildpack

## 🤝 Contributing

This is a reimplementation of the original Euchre game using React and Ruby. The game logic has been carefully ported to maintain feature parity with the original while leveraging modern React patterns.

## 📄 License

This project is part of the Euchre Game repository by Chris M.

## 🎮 Enjoy Playing!

Have fun playing Euchre! The game combines classic card game mechanics with modern web technologies.

---

**Built with ❤️ using React & Ruby**
