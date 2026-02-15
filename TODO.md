# OpenCode Mobile Development TODO

This document tracks the development progress of the OpenCode Mobile React Native application.

## Project Overview

- **Goal**: Complete OpenCode client mobile application
- **Server Support**: Local + Remote (user configurable)
- **UI Library**: NativeBase
- **Priority**: Session Management + Overall Architecture

---

## Phase 1: Infrastructure Setup (1-2 days)

### Dependencies Installation

- [x] Install native-base and dependencies
  ```bash
  npm install native-base react-native-svg react-native-safe-area-context
  npm install react-native-vector-icons
  ```
- [x] Install navigation libraries
  ```bash
  npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
  npm install react-native-screens react-native-gesture-handler
  ```
- [x] Install SSE support
  ```bash
  npm install event-source-polyfill
  ```
- [x] Install additional utilities
  ```bash
  npm install @react-native-async-storage/async-storage
  npm install date-fns
  ```

### Project Structure Setup

- [x] Create services directory structure
- [x] Create hooks directory
- [x] Create types directory
- [x] Create constants directory
- [x] Create navigation directory
- [x] Create utils directory

### Critical Configuration Files

- [x] Create index.js entry point
- [x] Create metro.config.js
- [x] Update package.json with all dependencies
- [x] Verify TypeScript compilation
- [x] Verify ESLint checks

### NativeBase Configuration

- [x] Configure NativeBase Provider in App.tsx
- [x] Create custom theme configuration (src/constants/themes.ts)
- [x] Set up color scheme
- [ ] Test NativeBase components rendering

---

## Phase 2: Navigation and Layout Architecture (1 day)

### Navigation Setup

- [x] Create AppNavigator component (src/navigation/AppNavigator.tsx)
- [x] Configure Bottom Tab Navigator
  - Sessions tab (default home)
  - Messages tab
  - Files tab
  - Settings tab
- [x] Configure Stack Navigator for Sessions
- [x] Add navigation types (src/types/navigation.ts)

### Layout Components

- [ ] Create MainScreen wrapper component
- [ ] Create Header component
- [ ] Create Loading component
- [ ] Create Error component

### Navigation Configuration

- [ ] Set up screen options
- [ ] Configure tab icons
- [ ] Test navigation flow

---

## Phase 3: Session Management (2-3 days)

### SDK Service Layer

- [x] Create opencode service directory (src/services/opencode/)
- [x] Implement client.ts
  - createOpencodeClient()
  - Configure baseUrl and directory
  - Implement error handling
- [x] Implement session.ts
  - fetchSessions()
  - createSession(title)
  - deleteSession(id)
  - getSession(id)
  - updateSession(id, title)

### Custom Hooks

- [x] Implement useOpencodeClient.ts
  - Initialize SDK client
  - Manage connection state
  - Handle reconnection
- [x] Implement useSessions.ts
  - Manage sessions list state
  - Implement CRUD operations
  - Handle loading and error states

### Session UI Screens

- [x] Create SessionListScreen.tsx
  - Display sessions list
  - Pull-to-refresh functionality
  - FAB button for new session
  - Delete/Edit swipe actions
- [x] Create SessionDetailScreen.tsx (placeholder)
  - Display session info
  - Show session metadata
  - Session actions (delete, share, export)
  - Navigate to messages button
- [x] Create CreateSessionModal.tsx
  - Input field for session title
  - Create button
  - Validation

### Session Components

- [x] Create SessionItem.tsx
  - Display session title
  - Show timestamp
  - Show status indicator
  - Swipe actions

---

## Phase 4: Real-time Event System (2 days)

### SSE Event Handling

- [x] Implement event.ts service
  - connectEventStream()
  - Subscribe to global events
  - Handle different event types:
    - message.updated
    - session.created
    - session.updated
    - session.deleted
    - permission.updated
    - session.status
  - Implement auto-reconnect logic
  - Handle connection errors

### Event Hook

- [x] Implement useEventStream.ts
  - Manage SSE connection state
  - Dispatch events to state management
  - Handle reconnection with exponential backoff
  - Cleanup on unmount

### Context State Management

- [x] Create AppStateContext (partially - useOpencodeClient hook)
  - Global application state
  - Server configuration
  - Connection status

### Real-time UI Updates

- [x] Integrate event stream into SessionsScreen
  - Listen for session.created events
  - Listen for session.updated events
  - Listen for session.deleted events
  - Listen for session.status events
  - Auto-refresh on events
- [x] Create ConnectionStatus component
  - Visual connection indicator
  - Status colors and icons
- [x] Enhanced Settings screen with navigation
- [x] Create ServerConfig screen
  - Server URL configuration
  - Directory configuration
  - Connection testing
  - Local/Remote toggle

---

## Phase 5: Message System (2-3 days)

### Message Service

- [ ] Implement message.ts
  - fetchMessages(sessionId)
  - sendMessage(sessionId, content)
  - streamMessage(sessionId, content)
  - getMessage(sessionId, messageId)

### Message Components

- [ ] Create MessageBubble.tsx
  - Support text messages
  - Support reasoning parts
  - Support file attachments
  - Support tool calls
  - Support agent switches
  - Code syntax highlighting
  - Timestamp display
  - Message status indicators

### Message UI

- [ ] Create MessageListScreen.tsx
  - FlatList with virtualization
  - Auto-scroll to latest message
  - Pull-to-refresh
  - Loading states
  - Error states
- [ ] Create MessageInput.tsx
  - Multiline text input
  - Send button
  - Character count
  - File attachment button
  - Disable while sending
- [ ] Create ToolCallRenderer.tsx
  - Display tool name
  - Show tool status
  - Display tool output
  - Expandable details

### Message Features

- [ ] Implement real-time message updates
- [ ] Handle streaming responses
- [ ] Support message retry
- [ ] Implement message copy
- [ ] Add message sharing

---

## Phase 6: Configuration and Settings (1-2 days) ✅

### Storage Service

- [x] Implement async-storage.ts
  - saveServerConfig(config)
  - getServerConfig()
  - saveUserPreferences(prefs)
  - getUserPreferences()
  - clearAllData()

### Settings Screens

- [x] Create SettingsScreen.tsx
  - Server address input
  - Local/Remote toggle
  - Connection test button
  - Directory configuration
- [x] Create ServerConfigScreen.tsx
  - Base URL input
  - Validation
  - Save button
  - Test connection
- [x] Create AppSettingsScreen.tsx
  - Theme toggle (dark/light/system)
  - Font size selection (small/medium/large)
  - Auto-scroll to bottom toggle
  - Show timestamps toggle
  - Notifications toggle
  - Reset settings button
  - About section

### Configuration Management

- [x] Create initial config setup flow
- [x] Implement config validation
- [x] Add config migration handling
- [x] Handle missing config gracefully

---

## Phase 7: File Browser (1-2 days) ✅

### File Service

- [x] Implement file.ts service
  - listFiles(path)
  - readFile(path)
  - getFileStatus()
  - getFileIcon() - Get file icon by type
  - formatFileSize() - Format bytes to human-readable
  - isDirectory() - Check if file item is directory

### File Browser UI

- [x] Create FileBrowserScreen.tsx
  - File tree display
  - Navigate directories (tap to open, navigate up)
  - File icons (colored by type)
  - Search functionality
  - Pull-to-refresh
  - Loading and error states
  - Empty state handling
- [x] Create FileViewerScreen.tsx
  - Display file content
  - Line numbers (monospace font)
  - Character and line count
  - Copy button (placeholder)
  - Loading and error states
  - Empty file handling
- [ ] Create FileDiffViewer.tsx
  - Display file changes
  - Color-coded diffs
  - Before/after comparison

---

## Phase 8: Terminal Emulator (Optional, 1-2 days)

### PTY Service

- [ ] Implement pty.ts service
  - listPtySessions()
  - createPtySession(command, args, cwd)
  - getPtySession(id)
  - deletePtySession(id)

### Terminal UI

- [ ] Create TerminalScreen.tsx
  - Terminal output display
  - Command input
  - Color support
  - Scroll functionality
- [ ] Create PtyListScreen.tsx
  - List active sessions
  - Create new session
  - Delete session
  - Session status

---

## Phase 9: Permission Management (1 day) ✅

### Permission Service

- [x] Implement permission.ts service
  - Permission request/response types
  - Send permission response to server
  - Auto-approve based on history
  - Format permission messages
  - Get permission icons and colors
- [x] Implement permission-history.ts storage
  - Load/save permission history
  - Add permission decisions
  - Get session-specific history
  - Clear history

### Permission UI

- [x] Create PermissionModal.tsx
  - Display permission request with icon
  - Show tool/file details
  - Approve Once button
  - Approve Always (remember) button
  - Deny button
  - Loading state
- [x] Implement usePermissions hook
  - Permission state management
  - Auto-approve logic
  - Permission history management
- [x] Integrate with MessageListScreen
  - Listen for permission.request events
  - Show permission modal
  - Handle permission responses

---

## Phase 10: UI Polish and Testing (1-2 days) ✅

### Loading States

- [x] Create LoadingScreen component
- [x] Create Skeleton components (Session, Message, File)
- [x] Create PullToRefresh wrapper
- [x] Add loading states to all screens

### Error Handling

- [x] Create ErrorBoundary component
- [x] Create ErrorScreen component
- [x] Create ToastAlert component
- [x] Create toast notification utility
- [x] Add retry mechanisms to all screens

### Empty States

- [x] Create EmptyState component
- [x] Design empty session list
- [x] Design empty message list
- [x] Design empty file list

### Responsive Design

- [x] Safe area handling for iOS notch
- [x] Platform-specific tab bar heights
- [x] Responsive layouts
- [x] MaxWidth constraints on centered content

### Platform Adaptation

- [x] iOS-specific tab bar padding
- [x] Platform-specific screen options
- [x] Safe area integration in headers
- [x] Back button handling

---

## Additional Tasks

### Documentation

- [ ] Update README.md with features
- [ ] Add screenshots to README
- [ ] Create user guide
- [ ] Document API usage

### Testing

- [ ] Write unit tests for services
- [ ] Write component tests
- [ ] Write integration tests
- [ ] Add E2E tests
- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test on physical devices

### Performance

- [ ] Profile app performance
- [ ] Optimize bundle size
- [ ] Optimize image assets
- [ ] Implement lazy loading
- [ ] Optimize list rendering

### Accessibility

- [ ] Add screen reader support
- [ ] Add accessibility labels
- [ ] Test with VoiceOver/TalkBack
- [ ] Keyboard navigation

---

## Key Considerations

### Security

- Never commit API keys or sensitive configuration
- Use secure storage for credentials
- Validate all user inputs
- Handle file paths safely
- Implement certificate pinning for production

### Network Handling

- Implement SSE reconnection logic
- Handle network timeouts gracefully
- Add offline support
- Cache session data locally
- Implement exponential backoff for retries

### React Native Best Practices

- Use FlatList for long lists
- Clean up subscriptions and listeners
- Avoid heavy computations on JS thread
- Optimize bundle size
- Use Hermes for Android
- Enable Fast Refresh for development

### SDK Usage Notes

```typescript
// 1. Client creation
const client = createOpencodeClient({
  baseUrl: 'http://localhost:8080',
  directory: '/path/to/project',
});

// 2. API calls
const sessions = await client.session.list({
  query: { directory: '/path/to/project' },
});

// 3. Event subscription
const eventSource = await client.global.event({
  onSseEvent: event => {
    // Handle event
  },
});

// 4. Send message
await client.session.prompt({
  path: { id: sessionId },
  body: { content: 'Hello' },
});
```

### Common Pitfalls

- **directory parameter**: Most API calls require directory parameter
- **SSE reconnection**: Must implement manual reconnection logic
- **Event types**: Need to handle various event types correctly
- **Error handling**: SDK returns {data, error} format, check for error
- **Type safety**: Leverage TypeScript types

---

## Development Priority Order

1. ✅ Infrastructure & Architecture (Phases 1-2)
2. ✅ Session Management (Phase 3)
3. ✅ Message System (Phase 5)
4. ✅ Real-time Events (Phase 4)
5. ✅ Configuration (Phase 6)
6. ✅ File Browser (Phase 7)
7. ✅ Permission Management (Phase 9)
8. ✅ UI Polish & Testing (Phase 10)
9. ⏳ Terminal Emulator (Phase 8 - Optional)

---

## Notes

- Always run `npm run typecheck` before committing
- Always run `npm run lint` before committing
- Always run tests before committing
- Update this TODO as tasks are completed
- Follow AGENTS.md guidelines for code style
- All code comments must be in English
- Commit messages must be in English
