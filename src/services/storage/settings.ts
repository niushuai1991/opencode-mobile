/**
 * Settings storage service
 * Handles persistence of user preferences and app settings
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppPreferences } from '@/types';

const STORAGE_KEYS = {
  PREFERENCES: '@opencode_preferences',
  SERVER_CONFIG: '@opencode_server_config',
} as const;

/**
 * Load user preferences from storage
 */
export async function loadPreferences(): Promise<AppPreferences | null> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (data) {
      return JSON.parse(data) as AppPreferences;
    }
    return null;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return null;
  }
}

/**
 * Save user preferences to storage
 */
export async function savePreferences(
  preferences: AppPreferences
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.PREFERENCES,
      JSON.stringify(preferences)
    );
    return true;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    return false;
  }
}

/**
 * Update specific preference fields
 */
export async function updatePreferences(
  updates: Partial<AppPreferences>
): Promise<boolean> {
  try {
    const current = await loadPreferences();
    const updated: AppPreferences = current
      ? { ...current, ...updates }
      : {
          themeMode: 'system',
          fontSize: 'medium',
          autoScrollToBottom: true,
          showMessageTimestamps: true,
          notificationsEnabled: true,
          ...updates,
        };
    return await savePreferences(updated);
  } catch (error) {
    console.error('Failed to update preferences:', error);
    return false;
  }
}

/**
 * Reset preferences to defaults
 */
export async function resetPreferences(): Promise<boolean> {
  try {
    const defaults: AppPreferences = {
      themeMode: 'system',
      fontSize: 'medium',
      autoScrollToBottom: true,
      showMessageTimestamps: true,
      notificationsEnabled: true,
    };
    return await savePreferences(defaults);
  } catch (error) {
    console.error('Failed to reset preferences:', error);
    return false;
  }
}

/**
 * Clear all settings data
 */
export async function clearAllSettings(): Promise<boolean> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.PREFERENCES,
      STORAGE_KEYS.SERVER_CONFIG,
    ]);
    return true;
  } catch (error) {
    console.error('Failed to clear settings:', error);
    return false;
  }
}
