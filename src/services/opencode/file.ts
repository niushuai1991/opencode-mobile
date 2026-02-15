/**
 * File service
 * Handles file operations via @opencode-ai/sdk
 */

import { opencodeService } from './client';

/**
 * List files in a directory
 */
export async function listFiles(path: string): Promise<{
  data: any[] | null;
  error: Error | null;
}> {
  try {
    const client = opencodeService.getClient();
    const response = await client.file.list({
      query: { path },
    });

    if (response.error) {
      return {
        data: null,
        error: new Error(
          (response.error as any).data?.message || 'Failed to list files'
        ),
      };
    }

    return {
      data: (response as any).data,
      error: null,
    };
  } catch (error) {
    console.error('Error listing files:', error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

/**
 * Read file content
 */
export async function readFile(path: string): Promise<{
  data: any | null;
  error: Error | null;
}> {
  try {
    const client = opencodeService.getClient();
    const response = await client.file.read({
      query: { path },
    });

    if (response.error) {
      return {
        data: null,
        error: new Error(
          (response.error as any).data?.message || 'Failed to read file'
        ),
      };
    }

    return {
      data: (response as any).data,
      error: null,
    };
  } catch (error) {
    console.error('Error reading file:', error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

/**
 * Get file status (diff info)
 */
export async function getFileStatus(): Promise<{
  data: any | null;
  error: Error | null;
}> {
  try {
    const client = opencodeService.getClient();
    const response = await client.file.status();

    if (response.error) {
      return {
        data: null,
        error: new Error(
          (response.error as any).data?.message || 'Failed to get file status'
        ),
      };
    }

    return {
      data: (response as any).data,
      error: null,
    };
  } catch (error) {
    console.error('Error getting file status:', error);
    return {
      data: null,
      error: error as Error,
    };
  }
}

/**
 * Get file icon based on file type
 */
export function getFileIcon(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';

  const iconMap: Record<string, string> = {
    // Code files
    js: 'javascript',
    ts: 'typescript',
    jsx: 'react',
    tsx: 'react',
    py: 'code',
    java: 'code',
    cpp: 'code',
    c: 'code',
    cs: 'code',
    go: 'code',
    rs: 'code',
    php: 'code',
    rb: 'code',
    swift: 'code',
    kt: 'code',

    // Markup & Style
    html: 'web',
    css: 'css',
    scss: 'css',
    sass: 'css',
    less: 'css',

    // Data
    json: 'data-object',
    xml: 'code',
    yaml: 'data-object',
    yml: 'data-object',
    csv: 'table-chart',

    // Config
    md: 'description',
    txt: 'description',
    log: 'description',

    // Images
    png: 'image',
    jpg: 'image',
    jpeg: 'image',
    gif: 'image',
    svg: 'image',
    ico: 'image',
    webp: 'image',

    // Archives
    zip: 'folder-zip',
    rar: 'folder-zip',
    tar: 'folder-zip',
    gz: 'folder-zip',
    '7z': 'folder-zip',

    // Other
    pdf: 'picture-as-pdf',
    default: 'insert-drive-file',
  };

  return iconMap[ext] || iconMap.default;
}

/**
 * Check if file item is a directory
 */
export function isDirectory(file: any): boolean {
  return file.type === 'directory';
}

/**
 * Get file size in human-readable format
 */
export function formatFileSize(bytes?: number): string {
  if (!bytes || bytes === 0) return '';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
