const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      // Override the base recommended rules
      ...js.configs.recommended.rules,

      // Critical error prevention rules (will block commits)
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      curly: 'error',

      // Style rules (warnings only - won't block commits)
      'no-console': 'warn',
    },
  },
];
