module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'module:metro-react-native-babel-preset',
        {
          enableBabelRuntime: false,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-transform-private-property-in-object',
      '@babel/plugin-transform-class-properties',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  };
};
