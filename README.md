# Autoleap AIR - AI Voice Assistant Dashboard

A modern Next.js application built with React, TypeScript, and TailwindCSS for managing AI voice assistant calls and analytics.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended: 20.x)
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Extract the project files** to your desired directory
2. **Navigate to the project directory:**
   ```bash
   cd air
   ```

3. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Tech Stack

- **Framework:** Next.js 15.5.2
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **UI Components:** Radix UI + Custom Components
- **Animations:** Framer Motion, GSAP
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod validation
- **3D Graphics:** Three.js + React Three Fiber

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   └── (app)/             # Main application pages
├── components/            # Reusable UI components
│   ├── dashboard/         # Dashboard-specific components
│   ├── shared/            # Shared components
│   └── ui/                # Base UI components
├── features/              # Feature-based modules
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── providers/             # Context providers
└── types/                 # TypeScript type definitions
```

## 🔧 Configuration

The project uses:
- **TailwindCSS v4** for styling
- **ESLint** for code linting
- **TypeScript** for type safety
- **Next.js** with App Router

## 🚨 Troubleshooting

### Common Issues:

1. **Node version compatibility:** Ensure you're using Node.js 18+ 
2. **Package manager conflicts:** Clear node_modules and reinstall if needed
3. **Port conflicts:** If port 3000 is busy, Next.js will automatically use the next available port

### If you encounter issues:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with yarn
rm -rf node_modules yarn.lock
yarn install
```

## 📝 Notes

- This project uses mock data for development
- All API calls are currently mocked in the `/server/mock/` directory
- The project is configured for development and ready for production deployment

## 🤝 Contributing

Please follow the existing code style and patterns when contributing to this project.
