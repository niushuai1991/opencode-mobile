/**
 * Message service
 * Handles all message-related operations
 */

import { opencodeService } from './client';
import { logger } from '../../utils/logger';
import type { Message } from '../../types';

class MessageService {
  /**
   * Fetch messages for a session
   */
  async fetchMessages(sessionId: string): Promise<Message[]> {
    try {
      const client = opencodeService.getClient();
      const result = await client.session.messages({
        path: { id: sessionId },
      });

      if (result.error) {
        throw new Error(
          (result.error as any).message || 'Failed to fetch messages'
        );
      }

      logger.info('Messages fetched successfully', {
        sessionId,
        count: result.data?.length || 0,
      });

      // Transform SDK format to our Message type
      const messages: Message[] = (result.data || []).map((item: any) => ({
        id: item.info.id,
        sessionID: item.info.sessionID,
        role: item.info.role,
        time: item.info.time,
        content: item.info.content,
        parts: item.parts,
        error: item.info.error,
      }));

      return messages;
    } catch (error) {
      logger.error('Failed to fetch messages', error);
      throw error;
    }
  }

  /**
   * Send a message to a session
   */
  async sendMessage(sessionId: string, content: string): Promise<Message> {
    try {
      const client = opencodeService.getClient();
      const result = await client.session.prompt({
        path: { id: sessionId },
        body: {
          parts: [
            {
              type: 'text',
              text: content,
            },
          ],
        },
      });

      if (result.error) {
        throw new Error(
          (result.error as any).message || 'Failed to send message'
        );
      }

      logger.info('Message sent successfully', { sessionId });

      // Return a placeholder message - real message will come through SSE
      return {
        id: `local-${Date.now()}`,
        sessionID: sessionId,
        role: 'user',
        time: {
          created: Date.now(),
        },
        content,
      };
    } catch (error) {
      logger.error('Failed to send message', error);
      throw error;
    }
  }

  /**
   * Get a specific message by ID
   */
  async getMessage(sessionId: string, messageId: string): Promise<Message> {
    try {
      const client = opencodeService.getClient();
      const result = await client.session.message({
        path: { id: sessionId, messageID: messageId },
      });

      if (result.error) {
        throw new Error(
          (result.error as any).message || 'Failed to fetch message'
        );
      }

      logger.info('Message fetched successfully', { messageId });

      // Transform SDK format to our Message type
      const message: Message = {
        id: result.data.info.id,
        sessionID: result.data.info.sessionID,
        role: result.data.info.role,
        time: result.data.info.time,
        parts: result.data.parts,
      };

      return message;
    } catch (error) {
      logger.error('Failed to fetch message', error);
      throw error;
    }
  }
}

// Export singleton instance
export const messageService = new MessageService();
