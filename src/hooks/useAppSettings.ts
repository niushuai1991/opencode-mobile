/**
 * Hook for managing app preferences
 */

import { useState, useEffect } from 'react';
import type { AppPreferences } from '@/types';
import {
  loadPreferences,
  updatePreferences as updatePreferencesAction,
  resetPreferences as resetPreferencesAction,
} from '@/services/storage/settings';

const DEFAULT_PREFERENCES: AppPreferences = {
  themeMode: 'system',
  fontSize: 'medium',
  autoScrollToBottom: true,
  showMessageTimestamps: true,
  notificationsEnabled: true,
};

export function useAppSettings() {
  const [preferences, setPreferences] =
    useState<AppPreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load preferences on mount
  useEffect(() => {
    loadPreferencesData();
  }, []);

  const loadPreferencesData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await loadPreferences();
      if (data) {
        setPreferences(data);
      }
    } catch (err) {
      setError(err as Error);
      console.error('Failed to load preferences:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (
    updates: Partial<AppPreferences>
  ): Promise<boolean> => {
    try {
      setError(null);
      const success = await updatePreferencesAction(updates);
      if (success) {
        setPreferences(prev => ({ ...prev, ...updates }));
      }
      return success;
    } catch (err) {
      setError(err as Error);
      console.error('Failed to update preferences:', err);
      return false;
    }
  };

  const resetPreferences = async (): Promise<boolean> => {
    try {
      setError(null);
      const success = await resetPreferencesAction();
      if (success) {
        setPreferences(DEFAULT_PREFERENCES);
      }
      return success;
    } catch (err) {
      setError(err as Error);
      console.error('Failed to reset preferences:', err);
      return false;
    }
  };

  return {
    preferences,
    isLoading,
    error,
    updatePreferences,
    resetPreferences,
    reload: loadPreferencesData,
  };
}
