/**
 * Metro configuration for React Native
 * @type {import('metro-config').MetroConfig}
 */

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add path alias support
config.resolver.alias = {
  '@': './src',
};

// Prefer React-native and browser versions over Node.js
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
