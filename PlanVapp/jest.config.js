module.exports = {
  preset: 'react-native',
    "testTimeout": 10000
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|react-navigation|@react-navigation)'
      ]
};
