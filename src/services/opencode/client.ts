/**
 * OpenCode SDK Client Service
 * Manages connection to OpenCode server
 */

import { createOpencodeClient, OpencodeClient } from '@opencode-ai/sdk';
import { logger } from '../../utils/logger';
import { validateServerConfig } from '../../utils/validation';
import type { ServerConfig } from '../../types';

class OpencodeService {
  private client: OpencodeClient | null = null;
  private config: ServerConfig | null = null;

  /**
   * Initialize SDK client with server configuration
   */
  async initialize(config: ServerConfig): Promise<void> {
    try {
      // Validate configuration
      const validation = validateServerConfig(config);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Create SDK client
      this.client = createOpencodeClient({
        baseUrl: config.baseUrl,
        directory: config.directory,
      });

      this.config = config;

      logger.info('OpenCode client initialized', {
        baseUrl: config.baseUrl,
        directory: config.directory,
      });
    } catch (error) {
      logger.error('Failed to initialize OpenCode client', error);
      throw error;
    }
  }

  /**
   * Get current client instance
   */
  getClient(): OpencodeClient {
    if (!this.client) {
      throw new Error('Client not initialized. Call initialize() first.');
    }
    return this.client;
  }

  /**
   * Check if client is initialized
   */
  isInitialized(): boolean {
    return this.client !== null;
  }

  /**
   * Get current configuration
   */
  getConfig(): ServerConfig | null {
    return this.config;
  }

  /**
   * Test connection to server
   */
  async testConnection(): Promise<boolean> {
    try {
      const client = this.getClient();
      await client.path.get();
      logger.info('Connection test successful');
      return true;
    } catch (error) {
      logger.error('Connection test failed', error);
      return false;
    }
  }

  /**
   * Disconnect and cleanup
   */
  disconnect(): void {
    this.client = null;
    this.config = null;
    logger.info('OpenCode client disconnected');
  }
}

// Export singleton instance
export const opencodeService = new OpencodeService();
