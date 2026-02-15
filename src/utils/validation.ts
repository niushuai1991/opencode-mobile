/**
 * Validation utilities
 */

import { ERRORS } from '../constants/config';

/**
 * Validate server URL
 */
export const validateServerUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Validate directory path
 */
export const validateDirectory = (path: string): boolean => {
  if (!path || path.trim().length === 0) {
    return false;
  }
  // Basic validation - can be enhanced
  return path.startsWith('/') || path.startsWith('./');
};

/**
 * Validate session title
 */
export const validateSessionTitle = (title: string): boolean => {
  if (!title || title.trim().length === 0) {
    return false;
  }
  return title.trim().length <= 100;
};

/**
 * Validate message content
 */
export const validateMessageContent = (content: string): boolean => {
  if (!content || content.trim().length === 0) {
    return false;
  }
  return content.trim().length <= 10000;
};

/**
 * Get error message from error object
 */
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  if (error?.data?.message) {
    return error.data.message;
  }

  return ERRORS.SERVER_ERROR;
};

/**
 * Validate server configuration
 */
export const validateServerConfig = (config: {
  baseUrl: string;
  directory?: string;
}): { valid: boolean; error?: string } => {
  if (!validateServerUrl(config.baseUrl)) {
    return { valid: false, error: ERRORS.INVALID_CONFIG };
  }

  if (config.directory && !validateDirectory(config.directory)) {
    return { valid: false, error: ERRORS.INVALID_CONFIG };
  }

  return { valid: true };
};
