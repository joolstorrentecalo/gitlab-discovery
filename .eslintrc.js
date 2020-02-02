module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "quotemark": [true, "single"],
    "interface-name": false,
    "ordered-imports": false,
    "object-literal-sort-keys": false,
    "no-consecutive-blank-lines": false,
    "import-spacing": false,
    "strictPropertyInitialization": false,
    "strict": 2,
    "no-multi-spaces": [2, { exceptions: { "ImportDeclaration": true } }],
    'import/no-extraneous-dependencies': ["error", {"devDependencies": true, "optionalDependencies": true, "peerDependencies": true}],
    'class-methods-use-this': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
