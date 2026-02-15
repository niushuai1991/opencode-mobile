/**
 * Custom hook to manage sessions
 */

import { useState, useCallback, useEffect } from 'react';
import { sessionService } from '../services/opencode/session';
import { opencodeService } from '../services/opencode/client';
import type { Session } from '../types';

interface UseSessionsResult {
  sessions: Session[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  createSession: (title: string) => Promise<Session>;
  deleteSession: (sessionId: string) => Promise<void>;
  updateSession: (sessionId: string, title: string) => Promise<Session>;
}

export const useSessions = (directory?: string): UseSessionsResult => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch sessions from server
   */
  const refresh = useCallback(async () => {
    if (!opencodeService.isInitialized()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await sessionService.fetchSessions(directory);
      setSessions(data);
    } catch (err) {
      const fetchError =
        err instanceof Error ? err : new Error('Failed to fetch sessions');
      setError(fetchError);
      throw fetchError;
    } finally {
      setLoading(false);
    }
  }, [directory]);

  /**
   * Create a new session
   */
  const createSession = useCallback(
    async (title: string): Promise<Session> => {
      if (!opencodeService.isInitialized()) {
        throw new Error('Client not initialized');
      }

      try {
        setError(null);
        const newSession = await sessionService.createSession(title, directory);
        setSessions(prev => [newSession, ...prev]);
        return newSession;
      } catch (err) {
        const createError =
          err instanceof Error ? err : new Error('Failed to create session');
        setError(createError);
        throw createError;
      }
    },
    [directory]
  );

  /**
   * Delete a session
   */
  const deleteSession = useCallback(
    async (sessionId: string): Promise<void> => {
      if (!opencodeService.isInitialized()) {
        throw new Error('Client not initialized');
      }

      try {
        setError(null);
        await sessionService.deleteSession(sessionId, directory);
        setSessions(prev => prev.filter(s => s.id !== sessionId));
      } catch (err) {
        const deleteError =
          err instanceof Error ? err : new Error('Failed to delete session');
        setError(deleteError);
        throw deleteError;
      }
    },
    [directory]
  );

  /**
   * Update session title
   */
  const updateSession = useCallback(
    async (sessionId: string, title: string): Promise<Session> => {
      if (!opencodeService.isInitialized()) {
        throw new Error('Client not initialized');
      }

      try {
        setError(null);
        const updatedSession = await sessionService.updateSession(
          sessionId,
          title,
          directory
        );
        setSessions(prev =>
          prev.map(s => (s.id === sessionId ? updatedSession : s))
        );
        return updatedSession;
      } catch (err) {
        const updateError =
          err instanceof Error ? err : new Error('Failed to update session');
        setError(updateError);
        throw updateError;
      }
    },
    [directory]
  );

  /**
   * Auto-refresh on mount and when client initializes
   */
  useEffect(() => {
    if (opencodeService.isInitialized()) {
      refresh();
    }
  }, [refresh]);

  return {
    sessions,
    loading,
    error,
    refresh,
    createSession,
    deleteSession,
    updateSession,
  };
};
