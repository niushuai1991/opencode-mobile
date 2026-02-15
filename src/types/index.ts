/**
 * Application type definitions
 */

// Navigation types
export type RootStackParamList = {
  Main: undefined;
  SessionDetail: { sessionId: string };
  MessageList: { sessionId: string };
  FileBrowser: { path?: string };
  FileViewer: { path: string };
  Settings: undefined;
  ServerConfig: undefined;
  AppSettings: undefined;
};

export type MainTabParamList = {
  Sessions: undefined;
  Messages: undefined;
  Files: undefined;
  Settings: undefined;
};

// Session types (from SDK)
export type Session = {
  id: string;
  projectID: string;
  directory: string;
  parentID?: string;
  title: string;
  version: string;
  share?: {
    url: string;
  };
  time: {
    created: number;
    updated: number;
  };
};

// Message types (from SDK)
export type Message = {
  id: string;
  sessionID: string;
  role: 'user' | 'assistant';
  time: {
    created: number;
    completed?: number;
  };
  content?: string;
  parts?: Part[];
  error?: {
    name: string;
    data: {
      message: string;
    };
  };
};

export type Part = {
  type: string;
  [key: string]: unknown;
};

// Server configuration types
export type ServerConfig = {
  baseUrl: string;
  directory?: string;
  isLocal: boolean;
};

// App state types
export type ConnectionStatus =
  | 'connected'
  | 'connecting'
  | 'disconnected'
  | 'error';

export type AppState = {
  serverConfig: ServerConfig | null;
  connectionStatus: ConnectionStatus;
  isInitialized: boolean;
};

// User preference types
export type ThemeMode = 'light' | 'dark' | 'system';

export type FontSize = 'small' | 'medium' | 'large';

export type AppPreferences = {
  themeMode: ThemeMode;
  fontSize: FontSize;
  autoScrollToBottom: boolean;
  showMessageTimestamps: boolean;
  notificationsEnabled: boolean;
};

// Toast notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info';
