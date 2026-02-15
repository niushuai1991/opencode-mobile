# OpenCode Mobile

A React Native mobile application built with the @opencode-ai/sdk.

## Prerequisites

- Node.js (LTS version)
- npm
- React Native development environment (Android Studio for Android, Xcode for iOS)

## Getting Started

```bash
# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (requires macOS)
npm run ios
```

## Development

```bash
# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Testing
npm test
npm run test:coverage
```

## Project Structure

See [AGENTS.md](./AGENTS.md) for detailed coding guidelines and best practices.

```
src/
  components/     # Reusable UI components
  screens/        # Screen-level components
  hooks/          # Custom React hooks
  utils/          # Helper functions
  services/       # API services and @opencode-ai/sdk integration
  types/          # TypeScript type definitions
  constants/      # App constants
  navigation/     # Navigation configuration
```

## SDK Integration

This project uses `@opencode-ai/sdk` for core functionality. See `src/services/` for implementation details.

## Code Style

All code must follow the guidelines in [AGENTS.md](./AGENTS.md). Key points:
- TypeScript with strict mode
- Functional components with hooks
- Explicit types for all functions
- Comprehensive error handling
- English-only comments and documentation
- Test coverage for all features

## License

ISC
