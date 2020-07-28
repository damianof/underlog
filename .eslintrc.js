module.exports = {
  root: false,
  env: {
    node: true,
  },
  extends: [],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'off', // process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': 'off', // process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'interface-name-prefix': 0,
    semi: 0,
    'member-delimiter-style': 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
}
