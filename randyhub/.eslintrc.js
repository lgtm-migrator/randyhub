module.exports = {
  extends: ['eslint-config-airbnb'],
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    requireConfigFile: false,
  },
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
