/**
 * Hook for managing file browser
 */

import { useState, useCallback } from 'react';
import { listFiles } from '@/services/opencode/file';

export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  modified?: number;
}

export function useFiles(initialPath: string = '/') {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string>(initialPath);
  const [pathHistory, setPathHistory] = useState<string[]>([initialPath]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadFiles = useCallback(async (path: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await listFiles(path);

      if (result.error) {
        setError(result.error);
        setFiles([]);
        return false;
      }

      if (result.data) {
        setFiles(result.data as FileItem[]);
      }

      return true;
    } catch (err) {
      setError(err as Error);
      setFiles([]);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const navigateToPath = useCallback(
    async (path: string) => {
      const success = await loadFiles(path);
      if (success) {
        setCurrentPath(path);
        setPathHistory(prev => [...prev, path]);
      }
    },
    [loadFiles]
  );

  const navigateUp = useCallback(async () => {
    const parentPath =
      currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';

    const success = await loadFiles(parentPath);
    if (success) {
      setCurrentPath(parentPath);
      setPathHistory(prev => [...prev, parentPath]);
    }
  }, [currentPath, loadFiles]);

  const navigateBack = useCallback(async () => {
    if (pathHistory.length <= 1) return;

    const newHistory = [...pathHistory];
    newHistory.pop(); // Remove current path
    const previousPath = newHistory[newHistory.length - 1];

    const success = await loadFiles(previousPath);
    if (success) {
      setCurrentPath(previousPath);
      setPathHistory(newHistory);
    }
  }, [pathHistory, loadFiles]);

  const refresh = useCallback(async () => {
    await loadFiles(currentPath);
  }, [currentPath, loadFiles]);

  return {
    files,
    currentPath,
    pathHistory,
    isLoading,
    error,
    loadFiles,
    navigateToPath,
    navigateUp,
    navigateBack,
    refresh,
  };
}
