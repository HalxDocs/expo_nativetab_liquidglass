const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...(config.resolver ?? {}),
  extraNodeModules: {
    ...(config.resolver?.extraNodeModules ?? {}),
    // npm can leave an empty scoped folder at expo-router/node_modules/@expo,
    // which causes Metro to miss the hoisted runtime package.
    '@expo/metro-runtime': path.resolve(__dirname, 'node_modules/@expo/metro-runtime'),
  },
};

module.exports = config;
