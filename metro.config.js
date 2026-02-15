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

module.exports = config;
