/**
 * Custom hook to manage OpenCode SDK client
 */

import { useState, useEffect, useCallback } from 'react';
import { opencodeService } from '../services/opencode/client';
import { storageService } from '../services/storage/async-storage';
import type { ServerConfig, ConnectionStatus } from '../types';

interface UseOpencodeClientResult {
  isInitialized: boolean;
  connectionStatus: ConnectionStatus;
  serverConfig: ServerConfig | null;
  initialize: (config: ServerConfig) => Promise<void>;
  disconnect: () => void;
  error: Error | null;
}

export const useOpencodeClient = (): UseOpencodeClientResult => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('disconnected');
  const [serverConfig, setServerConfig] = useState<ServerConfig | null>(null);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Initialize SDK client with server configuration
   */
  const initialize = useCallback(async (config: ServerConfig) => {
    try {
      setError(null);
      setConnectionStatus('connecting');

      await opencodeService.initialize(config);
      await storageService.saveServerConfig(config);

      setServerConfig(config);
      setIsInitialized(true);
      setConnectionStatus('connected');
    } catch (err) {
      const initError =
        err instanceof Error ? err : new Error('Failed to initialize client');
      setError(initError);
      setConnectionStatus('error');
      setIsInitialized(false);
      throw initError;
    }
  }, []);

  /**
   * Disconnect from server
   */
  const disconnect = useCallback(() => {
    opencodeService.disconnect();
    setIsInitialized(false);
    setConnectionStatus('disconnected');
    setServerConfig(null);
    setError(null);
  }, []);

  /**
   * Load saved configuration on mount
   */
  useEffect(() => {
    const loadSavedConfig = async () => {
      try {
        const savedConfig = await storageService.getServerConfig();
        if (savedConfig) {
          await initialize(savedConfig);
        }
      } catch (err) {
        console.error('Failed to load saved config:', err);
      }
    };

    loadSavedConfig();
  }, [initialize]);

  return {
    isInitialized,
    connectionStatus,
    serverConfig,
    initialize,
    disconnect,
    error,
  };
};
