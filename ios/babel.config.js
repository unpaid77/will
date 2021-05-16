module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@src': './src',
          '@helpers': './src/_helpers',
          '@action': './src/actions',
          '@reducers': './src/reducers',
          '@screen': './src/screens',
          '@util': './src/util',
        },
      },
    ],
  ],
};
