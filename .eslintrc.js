module.exports = {
  extends: [
    "airbnb-base",
  ],
  plugins: ['jest'],
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    "jest/globals": true,
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
}
