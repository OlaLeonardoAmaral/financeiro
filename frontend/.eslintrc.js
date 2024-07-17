const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: ['next'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "@typescript-eslint/unbound-method": "off",
  },
};
