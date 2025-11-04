#!/bin/bash

echo "🎮 Starting Euchre Game - React + Ruby"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if Ruby is installed
if ! command -v ruby &> /dev/null; then
    echo "❌ Ruby is not installed. Please install Ruby 3.0+ first."
    exit 1
fi

# Check if bundle is installed
if ! command -v bundle &> /dev/null; then
    echo "❌ Bundler is not installed. Installing now..."
    gem install bundler
fi

echo "📦 Installing dependencies..."
echo ""

# Install Node dependencies
if [ ! -f "package-react.json" ]; then
    echo "❌ package-react.json not found!"
    exit 1
fi

echo "Installing Node.js dependencies..."
if [ -f "package.json" ]; then
    mv package.json package-original.json
fi
cp package-react.json package.json
npm install

# Install Ruby dependencies
echo ""
echo "Installing Ruby dependencies..."
cd backend
bundle install
cd ..

echo ""
echo "✅ Dependencies installed successfully!"
echo ""
echo "🚀 Starting servers..."
echo ""
echo "Instructions:"
echo "1. Backend (Ruby/Sinatra) will run on http://localhost:4567"
echo "2. Frontend (React/Vite) will run on http://localhost:3000"
echo ""
echo "Opening two terminal windows is recommended:"
echo ""
echo "Terminal 1 - Ruby Backend:"
echo "  cd backend && bundle exec ruby server.rb"
echo ""
echo "Terminal 2 - React Frontend:"
echo "  npm run dev"
echo ""
echo "Or build for production:"
echo "  npm run build"
echo "  cd backend && bundle exec ruby server.rb"
echo ""
echo "Press any key to continue and view the full README..."
read -n 1 -s

cat README-REACT-RUBY.md
