/**
 * Toast notification utility
 * Provides consistent toast notifications across the app
 */

import type { ToastType } from '@/types';

/**
 * Show a toast notification
 * @param type - Type of toast (success, error, warning, info)
 * @param title - Title of the toast
 * @param description - Optional description message
 */
export function showToast(
  type: ToastType,
  title: string,
  description?: string
): void {
  // Store toast data for component to pick up
  // In a real implementation, this would use a toast library or context
  // eslint-disable-next-line no-console
  console.log(`[Toast ${type}] ${title}: ${description || ''}`);
}

/**
 * Show success toast
 */
export function showSuccessToast(title: string, description?: string): void {
  showToast('success', title, description);
}

/**
 * Show error toast
 */
export function showErrorToast(title: string, description?: string): void {
  showToast('error', title, description);
}

/**
 * Show warning toast
 */
export function showWarningToast(title: string, description?: string): void {
  showToast('warning', title, description);
}

/**
 * Show info toast
 */
export function showInfoToast(title: string, description?: string): void {
  showToast('info', title, description);
}
