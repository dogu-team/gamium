module.exports = {
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./protocol/tsconfig.json', './client/typescript/*/tsconfig.json', './utils/typescript/*/tsconfig.json', './projects/*/tsconfig.json'],
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  rules: {
    quotes: 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-inner-declarations': 'off',
  },
};
