# AGENTS.md

This document contains guidelines for agentic coding assistants working on the OpenCode Mobile React Native application.

**Important:** If `AGENTS.local.md` exists, it contains local-only configuration that complements this document. Always read both files together.

## Essential Commands

### Development
```bash
npm start              # Start Metro bundler
npm run android        # Run on Android device/emulator
npm run ios            # Run on iOS device/simulator (requires macOS)
```

### Testing
```bash
npm test                           # Run all tests
npm test -- --listTests            # List all test files
npm test -- path/to/test.test.ts   # Run a single test file
npm test -- -t "test name"         # Run tests matching pattern
npm test -- --watch                # Watch mode
npm run test:coverage              # Generate coverage report
```

### Code Quality
```bash
npm run lint          # Check code style
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format code with Prettier
npm run typecheck     # TypeScript type checking
```

### Pre-commit Workflow
Before committing changes, always run:
```bash
npm run lint
npm run typecheck
npm test
```

## Code Style Guidelines

### File Structure
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

### Import Organization
Imports must be ordered:
1. React & React Native imports
2. Third-party libraries
3. Internal imports (with @ alias)
4. Type imports

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types/user';
```

### Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useUserData.ts`)
- **Utilities/Services**: camelCase (`apiClient.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Type interfaces**: PascalCase (`UserData`, `ApiResponse`)

### TypeScript Rules
- **Always use explicit types for function parameters**
- **Prefer interfaces over types for object shapes**
- **Use type assertions sparingly; prefer type guards**
- **No `any` types - use `unknown` when type is truly unknown**
- **Export types used in multiple places**

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

// Bad
async function fetchUser(id: any): Promise<any> {
  return await api.get(`/users/${id}`);
}
```

### Error Handling
- **Always handle errors in async functions**
- **Use try-catch blocks with descriptive error messages**
- **Log errors appropriately for debugging**
- **Show user-friendly error messages in UI**

```typescript
// Good
async function loadUserData() {
  try {
    const user = await fetchUser(userId);
    setUser(user);
  } catch (error) {
    console.error('Failed to load user:', error);
    setError('Unable to load user data. Please try again.');
  } finally {
    setLoading(false);
  }
}

// Bad
async function loadUserData() {
  const user = await fetchUser(userId);
  setUser(user);
}
```

### React Best Practices
- **Use functional components with hooks**
- **Follow Rules of Hooks: only call hooks at top level**
- **Use useMemo/useCallback for performance optimization**
- **Avoid inline functions/object definitions in render**
- **Prefer props composition over complex prop drilling**

```typescript
// Good
const MemoizedComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => processData(data), [data]);
  const handleClick = useCallback(() => {
    console.log('Clicked', data.id);
  }, [data.id]);

  return <Button onPress={handleClick} />;
});

// Bad
const Component = ({ data }) => {
  return (
    <Button
      onPress={() => {
        console.log('Clicked', data.id);
      }}
    />
  );
};
```

### Component Structure
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ComponentProps } from './types';

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState<string>('');

  // Event handlers
  const handlePress = () => {
    // logic
  };

  // Effects
  useEffect(() => {
    // effect logic
  }, []);

  // Render helper functions
  const renderContent = () => {
    return <Text>Content</Text>;
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### Comments and Documentation
- **Use JSDoc for complex functions**
- **Add TODO comments for temporary solutions**
- **Comment "why" not "what"**
- **See AGENTS.local.md for language requirements**

```typescript
/**
 * Fetches user data from the API and updates local state
 * @param userId - The unique identifier of the user
 * @throws {Error} When user is not found or API fails
 */
async function loadUser(userId: string) {
  // TODO: Add retry logic for failed requests
}
```

### Git Commit Messages
- **See AGENTS.local.md for language requirements and format**
- Commit types: feat, fix, refactor, style, docs, test, chore


### @opencode-ai/sdk Integration
- Import SDK from `@opencode-ai/sdk`
- Initialize SDK in a singleton service pattern
- Handle SDK errors gracefully with user-friendly messages
- Use TypeScript types from the SDK when available
- Mock SDK calls in tests for reliability

### Platform-Specific Code
- Use `.android.tsx` and `.ios.tsx` file extensions for platform-specific components
- Use `Platform.OS` for runtime checks
- Keep platform-specific code minimal and well-documented

### Performance
- Avoid unnecessary re-renders with React.memo, useMemo, useCallback
- Use FlatList instead of ScrollView for long lists
- Optimize images: compress and use appropriate formats
- Monitor bundle size and remove unused dependencies
- Use Hermes JavaScript engine for Android

### Security
- Never commit API keys, secrets, or sensitive data
- Use environment variables for configuration
- Validate and sanitize user inputs
- Keep dependencies updated
- Use AsyncStorage securely for sensitive data

## Testing Guidelines

### Unit Tests
- Test files: `*.test.ts` or `*.spec.ts`
- Co-locate test files with source files
- Test business logic, not implementation details
- Mock external dependencies (API, SDK)
- Aim for 80%+ code coverage

### Component Tests
- Use `@testing-library/react-native`
- Test user interactions and behavior
- Test accessibility features
- Avoid testing internal state

### Example Test
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress} title="Click" />);

    fireEvent.press(getByText('Click'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

## Agent-Specific Instructions

When working on this codebase:
1. Always run `npm run typecheck` before making changes
2. Run `npm test -- -t "test name"` to run specific tests
3. Check existing code patterns before creating new abstractions
4. Prefer composition over inheritance
5. Keep components small and focused (single responsibility)
6. Write tests for new features and bug fixes
7. Update documentation when changing APIs
8. Always read AGENTS.local.md (if exists) together with this file
9. Follow the existing code style; don't introduce new patterns without discussion
10. When in doubt, ask for clarification rather than making assumptions
