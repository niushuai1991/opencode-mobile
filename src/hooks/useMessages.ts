/**
 * Custom hook to manage messages
 */

import { useState, useCallback, useEffect } from 'react';
import { messageService } from '../services/opencode/message';
import { opencodeService } from '../services/opencode/client';
import type { Message } from '../types';

interface UseMessagesResult {
  messages: Message[];
  loading: boolean;
  error: Error | null;
  refreshing: boolean;
  refresh: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
}

export const useMessages = (sessionId: string): UseMessagesResult => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch messages from server
   */
  const refresh = useCallback(async () => {
    if (!opencodeService.isInitialized()) {
      return;
    }

    try {
      setRefreshing(true);
      setError(null);
      const data = await messageService.fetchMessages(sessionId);
      setMessages(data);
    } catch (err) {
      const fetchError =
        err instanceof Error ? err : new Error('Failed to fetch messages');
      setError(fetchError);
      throw fetchError;
    } finally {
      setRefreshing(false);
    }
  }, [sessionId]);

  /**
   * Send a new message
   */
  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      if (!opencodeService.isInitialized()) {
        throw new Error('Client not initialized');
      }

      try {
        setError(null);
        setLoading(true);

        const userMessage = await messageService.sendMessage(
          sessionId,
          content
        );

        // Add user message immediately
        setMessages(prev => [...prev, userMessage]);
      } catch (err) {
        const sendError =
          err instanceof Error ? err : new Error('Failed to send message');
        setError(sendError);
        throw sendError;
      } finally {
        setLoading(false);
      }
    },
    [sessionId]
  );

  /**
   * Auto-fetch on mount
   */
  useEffect(() => {
    if (opencodeService.isInitialized()) {
      refresh();
    }
  }, [refresh]);

  return {
    messages,
    loading,
    error,
    refreshing,
    refresh,
    sendMessage,
  };
};
