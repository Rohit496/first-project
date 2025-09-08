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
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        prompt: 'readonly',
      },
    },
    rules: {
      // Error prevention rules
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-console': 'warn',

      // Code style rules
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',

      // Best practices
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      curly: 'error',
    },
  },
];
