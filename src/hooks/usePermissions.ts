/**
 * Hook for managing permissions
 */

import { useState, useCallback } from 'react';
import type {
  PermissionRequest,
  PermissionResponse,
  PermissionHistory,
} from '@/services/opencode/permission';
import {
  respondToPermission,
  shouldAutoApprove,
  formatPermissionMessage,
  getPermissionIcon,
  getPermissionColor,
} from '@/services/opencode/permission';
import {
  loadPermissionHistory,
  addPermissionDecision,
} from '@/services/storage/permission-history';

export function usePermissions(_sessionId: string) {
  const [pendingPermission, setPendingPermission] =
    useState<PermissionRequest | null>(null);
  const [history, setHistory] = useState<PermissionHistory[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isResponding, setIsResponding] = useState(false);

  // Load permission history on mount
  const loadHistory = useCallback(async () => {
    try {
      setIsLoadingHistory(true);
      const h = await loadPermissionHistory();
      setHistory(h);
    } catch (error) {
      console.error('Failed to load permission history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  // Handle permission request (from SSE or manual)
  const handlePermissionRequest = useCallback(
    (request: PermissionRequest): boolean => {
      // Check if should auto-approve
      if (shouldAutoApprove(request, history)) {
        // Auto-approve without showing modal
        respondToPermission(request.sessionID, request.id, 'always');
        return true;
      }

      // Show permission modal
      setPendingPermission(request);
      return false;
    },
    [history]
  );

  // Respond to permission
  const respond = useCallback(
    async (response: PermissionResponse): Promise<boolean> => {
      if (!pendingPermission) {
        return false;
      }

      try {
        setIsResponding(true);

        // Send response to server
        const result = await respondToPermission(
          pendingPermission.sessionID,
          pendingPermission.id,
          response
        );

        if (result.success) {
          // Add to history if "always" or "reject"
          if (response === 'always' || response === 'reject') {
            const decision: PermissionHistory = {
              id: pendingPermission.id,
              sessionID: pendingPermission.sessionID,
              type: pendingPermission.type,
              response,
              timestamp: Date.now(),
            };
            await addPermissionDecision(decision);

            // Reload history
            await loadHistory();
          }

          // Clear pending permission
          setPendingPermission(null);
          return true;
        }

        return false;
      } catch (error) {
        console.error('Error responding to permission:', error);
        return false;
      } finally {
        setIsResponding(false);
      }
    },
    [pendingPermission, loadHistory]
  );

  // Cancel permission request (deny)
  const deny = useCallback(async (): Promise<boolean> => {
    return await respond('reject');
  }, [respond]);

  // Approve once (don't remember)
  const approveOnce = useCallback(async (): Promise<boolean> => {
    return await respond('once');
  }, [respond]);

  // Approve always (remember decision)
  const approveAlways = useCallback(async (): Promise<boolean> => {
    return await respond('always');
  }, [respond]);

  // Dismiss permission modal without responding
  const dismiss = useCallback(() => {
    setPendingPermission(null);
  }, []);

  return {
    pendingPermission,
    history,
    isLoadingHistory,
    isResponding,
    loadHistory,
    handlePermissionRequest,
    respond,
    deny,
    approveOnce,
    approveAlways,
    dismiss,
    // Utility functions
    formatMessage: formatPermissionMessage,
    getIcon: getPermissionIcon,
    getColor: getPermissionColor,
  };
}
