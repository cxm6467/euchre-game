# 🚀 Quick Start Guide

Get the Euchre game running in 5 minutes!

## Prerequisites Check

```bash
# Check Node.js (need 16+)
node --version

# Check Ruby (need 3.0+)
ruby --version

# Check if bundler is installed
bundle --version

# If bundler is not installed:
gem install bundler
```

## Installation Steps

### 1. Install Frontend Dependencies

```bash
# From the project root
npm install --package-lock-only
mv package.json package-original.json
mv package-react.json package.json
npm install
```

**Expected output:**
```
added 250 packages in 30s
```

### 2. Install Backend Dependencies

```bash
cd backend
bundle install
```

**Expected output:**
```
Bundle complete! 4 Gemfile dependencies, 11 gems now installed.
```

## Running the Application

### Option A: Development Mode (Recommended)

Open **two terminal windows**:

**Terminal 1 - Ruby Backend:**
```bash
cd backend
bundle exec ruby server.rb
```

You should see:
```
╔════════════════════════════════════════╗
║      EUCHRE GAME RUBY SERVER           ║
╠════════════════════════════════════════╣
║  Server running at:                    ║
║  http://localhost:4567                 ║
╚════════════════════════════════════════╝
```

**Terminal 2 - React Frontend:**
```bash
# From project root
npm run dev
```

You should see:
```
  VITE v5.4.2  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.100:3000/
```

**Open your browser:** `http://localhost:3000`

### Option B: Production Mode

```bash
# Build the React app
npm run build

# Start Ruby server (serves both API and built React app)
cd backend
bundle exec ruby server.rb
```

**Open your browser:** `http://localhost:4567`

## LAN Access (Play on Phone/Tablet)

### 1. Find Your Computer's IP

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address" (e.g., 192.168.1.100)
```

**Mac/Linux:**
```bash
hostname -I
# or
ifconfig | grep "inet "
```

### 2. Start Servers (Development Mode)

Both servers must be running (see Option A above).

### 3. Access from Mobile Device

On your phone/tablet (connected to **same WiFi**):

```
http://YOUR_IP:3000
```

Example: `http://192.168.1.100:3000`

## Troubleshooting

### "Could not find gem 'sinatra'"

**Solution:**
```bash
cd backend
bundle install
```

### "Port 3000 is already in use"

**Solution:**
```bash
# Kill the process using port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Cannot GET /"

**Solution:** Make sure both servers are running:
- Backend on port 4567
- Frontend on port 3000

### Can't Access from Phone

**Checklist:**
- [ ] Both servers are running
- [ ] Phone is on same WiFi network
- [ ] Using correct IP address (not 127.0.0.1)
- [ ] Firewall allows ports 3000 and 4567

**Quick test:**
```bash
# From your phone's browser, first try:
http://YOUR_IP:3000/
```

### Bundler Warning: "Don't run Bundler as root"

This is a warning, not an error. The gems still install correctly. To avoid it:

**Linux/Mac:**
```bash
# Run without sudo
bundle install
```

## Verify Installation

### Test Backend API:

```bash
curl http://localhost:4567/health
```

**Expected response:**
```json
{"status":"ok","timestamp":1699123456}
```

### Test Frontend:

Open browser: `http://localhost:3000`

You should see:
- Green card table
- "Deal Cards" button
- Score displays (both at 0)
- Four player positions

## Next Steps

- **Read full setup guide:** `README-REACT-RUBY.md`
- **Learn atomic design:** `ATOMIC-DESIGN.md`
- **Configure LAN access:** `LAN-ACCESS.md`

## Quick Commands Reference

```bash
# Development mode
npm run dev                    # Start React dev server
cd backend && bundle exec ruby server.rb  # Start Ruby server

# Production mode
npm run build                  # Build React app
cd backend && bundle exec ruby server.rb  # Start Ruby (serves everything)

# Testing
npm test                       # Run tests (if configured)

# Linting
npm run lint                   # Check code quality
```

## Default Ports

| Service | Port | URL |
|---------|------|-----|
| React Dev | 3000 | http://localhost:3000 |
| Ruby API | 4567 | http://localhost:4567 |

## Environment Variables

None required! The game works out of the box.

## File Structure Overview

```
euchre-game/
├── backend/              # Ruby Sinatra server
│   ├── server.rb        # Main server file
│   └── Gemfile          # Ruby dependencies
├── react-app/           # React TypeScript app
│   └── src/
│       └── components/  # Atomic design components
├── package-react.json   # Node dependencies
└── vite.config.js       # Vite configuration
```

## Support

Having issues? Check:
1. README-REACT-RUBY.md (main documentation)
2. ATOMIC-DESIGN.md (architecture guide)
3. LAN-ACCESS.md (network setup)

## Success!

If you see the game board with cards, you're ready to play! 🎉

**Happy gaming! 🃏🎮**
