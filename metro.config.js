const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Fix pnpm + Windows node_modules resolution
config.resolver.nodeModulesPaths = [path.resolve(__dirname, 'node_modules')];

module.exports = withNativeWind(config, { input: './global.css' });
