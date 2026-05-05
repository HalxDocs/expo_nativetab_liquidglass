module.exports = function (api) {
  // Cache per caller so each Metro caller (which carries routerRoot, platform, etc.)
  // gets its own compiled config. Using api.cache(true) here can cause expo-router's
  // babel plugin to receive a stale/undefined routerAbsoluteRoot when the config is
  // reused across callers that differ in routerRoot.
  const callerName = api.caller((c) => c?.name ?? 'unknown');
  const routerRoot = api.caller((c) => c?.routerRoot ?? 'app');
  const platform   = api.caller((c) => c?.platform ?? '');
  api.cache.using(() => `${callerName}:${routerRoot}:${platform}:${process.env.NODE_ENV}`);

  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
