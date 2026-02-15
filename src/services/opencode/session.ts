/**
 * Session service
 * Handles all session-related operations
 */

import { opencodeService } from './client';
import { logger } from '../../utils/logger';
import type { Session } from '../../types';

class SessionService {
  /**
   * Fetch all sessions
   */
  async fetchSessions(directory?: string): Promise<Session[]> {
    try {
      const client = opencodeService.getClient();
      const result = await client.session.list({
        query: directory ? { directory } : undefined,
      });

      if (result.error) {
        throw new Error(
          (result.error as any).message || 'Failed to fetch sessions'
        );
      }

      logger.info('Sessions fetched successfully', {
        count: result.data?.length || 0,
      });

      return result.data || [];
    } catch (error) {
      logger.error('Failed to fetch sessions', error);
      throw error;
    }
  }

  /**
   * Create a new session
   */
  async createSession(
    title: string,
    directory?: string,
    parentID?: string
  ): Promise<Session> {
    try {
      const client = opencodeService.getClient();
      const result = await client.session.create({
        body: { title, parentID },
        query: directory ? { directory } : undefined,
      });

      if (result.error) {
        throw new Error(
          (result.error as any).message || 'Failed to create session'
        );
      }

      logger.info('Session created successfully', {
        sessionId: result.data?.id,
      });

      return result.data!;
    } catch (error) {
      logger.error('Failed to create session', error);
      throw error;
    }
  }

  /**
   * Get session by ID
   */
  async getSession(sessionId: string, directory?: string): Promise<Session> {
    try {
      const client = opencodeService.getClient();
      const result = await client.session.get({
        path: { id: sessionId },
        query: directory ? { directory } : undefined,
      });

      if (result.error) {
        throw new Error(
          (result.error as any).message || 'Failed to fetch session'
        );
      }

      logger.info('Session fetched successfully', { sessionId });

      return result.data!;
    } catch (error) {
      logger.error('Failed to fetch session', error);
      throw error;
    }
  }

  /**
   * Update session title
   */
  async updateSession(
    sessionId: string,
    title: string,
    directory?: string
  ): Promise<Session> {
    try {
      const client = opencodeService.getClient();
      const result = await client.session.update({
        path: { id: sessionId },
        body: { title },
        query: directory ? { directory } : undefined,
      });

      if (result.error) {
        throw new Error(
          (result.error as any).message || 'Failed to update session'
        );
      }

      logger.info('Session updated successfully', { sessionId });

      return result.data!;
    } catch (error) {
      logger.error('Failed to update session', error);
      throw error;
    }
  }

  /**
   * Delete a session
   */
  async deleteSession(sessionId: string, directory?: string): Promise<void> {
    try {
      const client = opencodeService.getClient();
      const result = await client.session.delete({
        path: { id: sessionId },
        query: directory ? { directory } : undefined,
      });

      if (result.error) {
        throw new Error(
          (result.error as any).message || 'Failed to delete session'
        );
      }

      logger.info('Session deleted successfully', { sessionId });
    } catch (error) {
      logger.error('Failed to delete session', error);
      throw error;
    }
  }

  /**
   * Get session status
   */
  async getSessionStatus(
    directory?: string
  ): Promise<Record<string, { type: 'idle' | 'busy' | 'retry' }>> {
    try {
      const client = opencodeService.getClient();
      const result = await client.session.status({
        query: directory ? { directory } : undefined,
      });

      if (result.error) {
        throw new Error(
          (result.error as any).message || 'Failed to fetch session status'
        );
      }

      return result.data || {};
    } catch (error) {
      logger.error('Failed to fetch session status', error);
      throw error;
    }
  }
}

// Export singleton instance
export const sessionService = new SessionService();
