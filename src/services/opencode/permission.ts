/**
 * Permission service
 * Handles permission requests and responses
 */

import { opencodeService } from './client';

/**
 * Permission request data
 */
export interface PermissionRequest {
  id: string;
  sessionID: string;
  type: string;
  message?: string;
  data?: {
    tool?: string;
    path?: string;
    command?: string;
    [key: string]: unknown;
  };
  timestamp: number;
}

/**
 * Permission response
 */
export type PermissionResponse = 'once' | 'always' | 'reject';

/**
 * Permission history entry
 */
export interface PermissionHistory {
  id: string;
  sessionID: string;
  type: string;
  response: PermissionResponse;
  timestamp: number;
}

/**
 * Send permission response to server
 */
export async function respondToPermission(
  sessionId: string,
  permissionId: string,
  response: PermissionResponse
): Promise<{
  success: boolean;
  error: Error | null;
}> {
  try {
    const client = opencodeService.getClient();
    const result = await client.postSessionIdPermissionsPermissionId({
      path: {
        id: sessionId,
        permissionID: permissionId,
      },
      body: {
        response,
      },
    });

    if (result.error) {
      return {
        success: false,
        error: new Error(
          (result.error as any).data?.message ||
            'Failed to send permission response'
        ),
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error('Error responding to permission:', error);
    return {
      success: false,
      error: error as Error,
    };
  }
}

/**
 * Check if permission should be auto-approved based on history
 */
export function shouldAutoApprove(
  permissionRequest: PermissionRequest,
  history: PermissionHistory[]
): boolean {
  // Find matching permissions from history with "always" response
  const matchingPermissions = history.filter(
    h =>
      h.sessionID === permissionRequest.sessionID &&
      h.type === permissionRequest.type &&
      h.response === 'always'
  );

  return matchingPermissions.length > 0;
}

/**
 * Format permission request for display
 */
export function formatPermissionMessage(request: PermissionRequest): string {
  if (request.message) {
    return request.message;
  }

  const { type, data } = request;

  switch (type) {
    case 'tool':
      return `Allow OpenCode to use tool "${data?.tool || 'unknown'}"?`;
    case 'file':
      return data?.path
        ? `Allow OpenCode to access "${data.path}"?`
        : 'Allow OpenCode to access this file?';
    case 'command':
      return data?.command
        ? `Allow OpenCode to execute command: ${data.command}?`
        : 'Allow OpenCode to execute this command?';
    case 'network':
      return 'Allow OpenCode to make network requests?';
    case 'shell':
      return 'Allow OpenCode to access shell commands?';
    default:
      return `Allow OpenCode to perform action: ${type}?`;
  }
}

/**
 * Get permission type icon
 */
export function getPermissionIcon(type: string): string {
  switch (type) {
    case 'tool':
      return 'build';
    case 'file':
      return 'insert-drive-file';
    case 'command':
      return 'terminal';
    case 'network':
      return 'wifi';
    case 'shell':
      return 'code';
    default:
      return 'security';
  }
}

/**
 * Get permission color
 */
export function getPermissionColor(type: string): string {
  switch (type) {
    case 'tool':
      return '#FF9800';
    case 'file':
      return '#2196F3';
    case 'command':
      return '#F44336';
    case 'network':
      return '#4CAF50';
    case 'shell':
      return '#9C27B0';
    default:
      return '#607D8B';
  }
}
