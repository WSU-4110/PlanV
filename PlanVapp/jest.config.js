module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: {
    '@testing-library/jest-native/extend-expect'
    ],
    transofrmIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|react-navigation|@react-navigation)'
      ]
};
