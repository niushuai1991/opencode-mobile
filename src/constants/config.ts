/**
 * Application configuration constants
 */

export const CONFIG = {
  // Default server configuration
  DEFAULT_SERVER_URL: 'http://localhost:8080',
  DEFAULT_REMOTE_SERVER: 'https://api.opencode.ai',

  // Storage keys
  STORAGE_KEYS: {
    SERVER_CONFIG: '@opencode_server_config',
    USER_PREFERENCES: '@opencode_user_preferences',
    SESSIONS_CACHE: '@opencode_sessions_cache',
  },

  // App settings
  APP_NAME: 'OpenCode Mobile',
  APP_VERSION: '1.0.0',

  // Network settings
  REQUEST_TIMEOUT: 30000, // 30 seconds
  SSE_RECONNECT_DELAY: 1000, // 1 second
  SSE_MAX_RECONNECT_ATTEMPTS: 5,

  // UI settings
  MAX_MESSAGE_LENGTH: 10000,
  MAX_TITLE_LENGTH: 100,
  SESSIONS_PAGE_SIZE: 20,
  MESSAGES_PAGE_SIZE: 50,

  // Feature flags
  FEATURES: {
    TERMINAL: true,
    FILE_BROWSER: true,
    PERMISSIONS: true,
  },
};

export const ROUTES = {
  SESSIONS: 'Sessions',
  MESSAGES: 'Messages',
  FILES: 'Files',
  SETTINGS: 'Settings',
  SESSION_DETAIL: 'SessionDetail',
  MESSAGE_LIST: 'MessageList',
  FILE_BROWSER: 'FileBrowser',
} as const;

export const ERRORS = {
  NETWORK_ERROR:
    'Network connection failed. Please check your internet connection.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  SESSION_NOT_FOUND: 'Session not found.',
  INVALID_CONFIG: 'Invalid server configuration.',
  UNAUTHORIZED: 'Authentication required. Please check your credentials.',
};
