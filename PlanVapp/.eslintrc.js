module.exports = {
  root: true,
  parser: '@babel/eslint-parser', // Use Babel parser for modern JS features
  parserOptions: {
    requireConfigFile: false, // Allows using Babel without a separate config file
    ecmaVersion: 2020, // Enable ES2020 features
    sourceType: 'module', // Allow the use of imports
  },
  extends: [
    '@react-native', // Extend the default React Native rules
    'eslint:recommended', // Include ESLint's recommended rules
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    // Place to specify ESLint rules, e.g., "quotes": ["error", "double"]
  },
};
