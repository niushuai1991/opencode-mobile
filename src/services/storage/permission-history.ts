/**
 * Permission history storage service
 * Manages local persistence of permission decisions
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PermissionHistory } from '@/services/opencode/permission';

const STORAGE_KEY = '@opencode_permission_history';

/**
 * Load permission history from storage
 */
export async function loadPermissionHistory(): Promise<PermissionHistory[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as PermissionHistory[];
    }
    return [];
  } catch (error) {
    console.error('Failed to load permission history:', error);
    return [];
  }
}

/**
 * Save permission history to storage
 */
export async function savePermissionHistory(
  history: PermissionHistory[]
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Failed to save permission history:', error);
    return false;
  }
}

/**
 * Add permission decision to history
 */
export async function addPermissionDecision(
  decision: PermissionHistory
): Promise<boolean> {
  try {
    const history = await loadPermissionHistory();
    history.push(decision);
    return await savePermissionHistory(history);
  } catch (error) {
    console.error('Failed to add permission decision:', error);
    return false;
  }
}

/**
 * Clear permission history
 */
export async function clearPermissionHistory(): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear permission history:', error);
    return false;
  }
}

/**
 * Get permission history for a specific session
 */
export async function getSessionPermissionHistory(
  sessionId: string
): Promise<PermissionHistory[]> {
  try {
    const history = await loadPermissionHistory();
    return history.filter(h => h.sessionID === sessionId);
  } catch (error) {
    console.error('Failed to get session permission history:', error);
    return [];
  }
}
