/**
 * Application theme configuration
 * Based on NativeBase theme system
 */

import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    // Primary colors
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
    // Accent colors
    accent: {
      50: '#fce4ec',
      100: '#f8bbd9',
      200: '#f48fb1',
      300: '#f06292',
      400: '#ec407a',
      500: '#e91e63',
      600: '#d81b60',
      700: '#c2185b',
      800: '#ad1457',
      900: '#880e4f',
    },
    // Status colors
    success: {
      500: '#4caf50',
    },
    error: {
      500: '#f44336',
    },
    warning: {
      500: '#ff9800',
    },
    info: {
      500: '#2196f3',
    },
  },
  config: {
    // Changing initial color mode to match system default
    initialColorMode: 'system',
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'md',
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Input: {
      baseStyle: {
        rounded: 'md',
      },
    },
    Card: {
      baseStyle: {
        rounded: 'md',
        shadow: '2',
      },
    },
  },
});

export type ThemeType = typeof theme;
