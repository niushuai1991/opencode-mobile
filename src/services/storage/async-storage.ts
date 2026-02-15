/**
 * Async Storage service
 * Handles local data persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from '../../utils/logger';
import { CONFIG } from '../../constants/config';
import type { ServerConfig } from '../../types';

class StorageService {
  /**
   * Save server configuration
   */
  async saveServerConfig(config: ServerConfig): Promise<void> {
    try {
      const jsonValue = JSON.stringify(config);
      await AsyncStorage.setItem(CONFIG.STORAGE_KEYS.SERVER_CONFIG, jsonValue);
      logger.info('Server config saved', { baseUrl: config.baseUrl });
    } catch (error) {
      logger.error('Failed to save server config', error);
      throw error;
    }
  }

  /**
   * Get server configuration
   */
  async getServerConfig(): Promise<ServerConfig | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(
        CONFIG.STORAGE_KEYS.SERVER_CONFIG
      );
      if (jsonValue) {
        return JSON.parse(jsonValue);
      }
      return null;
    } catch (error) {
      logger.error('Failed to get server config', error);
      return null;
    }
  }

  /**
   * Clear server configuration
   */
  async clearServerConfig(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CONFIG.STORAGE_KEYS.SERVER_CONFIG);
      logger.info('Server config cleared');
    } catch (error) {
      logger.error('Failed to clear server config', error);
      throw error;
    }
  }

  /**
   * Save user preferences
   */
  async saveUserPreferences<T>(prefs: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(prefs);
      await AsyncStorage.setItem(
        CONFIG.STORAGE_KEYS.USER_PREFERENCES,
        jsonValue
      );
      logger.info('User preferences saved');
    } catch (error) {
      logger.error('Failed to save user preferences', error);
      throw error;
    }
  }

  /**
   * Get user preferences
   */
  async getUserPreferences<T>(): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(
        CONFIG.STORAGE_KEYS.USER_PREFERENCES
      );
      if (jsonValue) {
        return JSON.parse(jsonValue);
      }
      return null;
    } catch (error) {
      logger.error('Failed to get user preferences', error);
      return null;
    }
  }

  /**
   * Cache sessions data
   */
  async cacheSessions(sessions: any[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(sessions);
      await AsyncStorage.setItem(CONFIG.STORAGE_KEYS.SESSIONS_CACHE, jsonValue);
      logger.debug('Sessions cached');
    } catch (error) {
      logger.error('Failed to cache sessions', error);
    }
  }

  /**
   * Get cached sessions
   */
  async getCachedSessions(): Promise<any[] | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(
        CONFIG.STORAGE_KEYS.SESSIONS_CACHE
      );
      if (jsonValue) {
        return JSON.parse(jsonValue);
      }
      return null;
    } catch (error) {
      logger.error('Failed to get cached sessions', error);
      return null;
    }
  }

  /**
   * Clear all data
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
      logger.info('All storage cleared');
    } catch (error) {
      logger.error('Failed to clear storage', error);
      throw error;
    }
  }
}

// Export singleton instance
export const storageService = new StorageService();
