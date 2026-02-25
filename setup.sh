#!/bin/bash

# Autoleap AIR - Project Setup Script
# This script helps set up the project for development

echo "🚀 Setting up Autoleap AIR project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION is not supported. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version $(node -v) detected"

# Check if package manager is available
if command -v npm &> /dev/null; then
    PACKAGE_MANAGER="npm"
elif command -v yarn &> /dev/null; then
    PACKAGE_MANAGER="yarn"
elif command -v pnpm &> /dev/null; then
    PACKAGE_MANAGER="pnpm"
elif command -v bun &> /dev/null; then
    PACKAGE_MANAGER="bun"
else
    echo "❌ No package manager found. Please install npm, yarn, pnpm, or bun"
    exit 1
fi

echo "✅ Using $PACKAGE_MANAGER as package manager"

# Install dependencies
echo "📦 Installing dependencies..."
$PACKAGE_MANAGER install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies. Please check the error messages above."
    exit 1
fi

# Check if .env.local exists, if not create a template
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local template..."
    cat > .env.local << EOF
# Autoleap AIR Environment Variables
# Copy this file and update the values as needed

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Add your environment variables here
# EXAMPLE_API_KEY=your_api_key_here
# EXAMPLE_API_URL=https://api.example.com
EOF
    echo "✅ Created .env.local template"
fi

echo ""
echo "🎉 Setup complete! You can now start the development server:"
echo ""
echo "   $PACKAGE_MANAGER run dev"
echo ""
echo "Then open http://localhost:3000 in your browser."
echo ""
echo "Happy coding! 🚀"
