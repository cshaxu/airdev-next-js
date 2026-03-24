const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const unusedImports = require('eslint-plugin-unused-imports');
const airdevPlugin = require('@airdev/eslint');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  {
    ignores: [
      '.next/**',
      'coverage/**',
      'dist/**',
      '*.js',
      '*.mjs',
      'src/config-contracts.d.ts',
    ],
  },
  ...require('eslint-config-next/core-web-vitals'),
  ...compat.extends('plugin:prettier/recommended'),
  {
    plugins: {
      'unused-imports': unusedImports,
      airdev: airdevPlugin,
    },

    rules: {
      '@next/next/no-img-element': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/refs': 'off',
      'unused-imports/no-unused-imports': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/set-state-in-effect': 'off',

      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      curly: 'error',

      'prettier/prettier': ['error', { endOfLine: 'auto' }],

      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never', propElementValues: 'always' },
      ],

      'airdev/airent-no-raw-response': 'error',
      'airdev/no-negative-names': 'error',
      'airdev/no-relative-parent-imports': 'error',
      'airdev/require-relative-child-imports': 'error',
      'airdev/next-require-export-default-function': 'error',

      'airdev/no-specific-string': [
        'error',
        [
          { name: ' == ', description: '', replacement: ' === ' },
          { name: ' != ', description: '', replacement: ' !== ' },
          {
            name: 'process.env',
            description:
              'Move it to a config file and import the variable from there.',
            excludedFiles: ['eslint.config.js'],
          },
          {
            name: 'console.debug',
            description: 'Replace it with logDebug.',
            replacement: 'logDebug',
            includedFiles: ['src/backend/**/*.ts', 'src/framework/**/*.ts'],
          },
          {
            name: 'console.log',
            description: 'Add comment on why we need it for fe',
            includedFiles: [
              'src/frontend/**/*.ts',
              'src/frontend/**/*.tsx',
            ],
          },
          {
            name: 'console.log',
            description: 'Replace it with logInfo.',
            replacement: 'logInfo',
            includedFiles: ['src/backend/**/*.ts', 'src/framework/**/*.ts'],
          },
          {
            name: 'console.info',
            description: 'Replace it with logInfo.',
            replacement: 'logInfo',
            includedFiles: ['src/backend/**/*.ts', 'src/framework/**/*.ts'],
          },
          {
            name: 'console.warn',
            description: 'Replace it with logWarn.',
            replacement: 'logWarn',
            includedFiles: ['src/backend/**/*.ts', 'src/framework/**/*.ts'],
          },
          {
            name: 'console.error',
            description: 'Replace it with logError.',
            replacement: 'logError',
            includedFiles: ['src/backend/**/*.ts', 'src/framework/**/*.ts'],
          },
          {
            name: 'new Error',
            description: 'Replace it with createHttpError.',
            replacement: 'createHttpError.InternalServerError',
            includedFiles: ['src/backend/**/*.ts', 'src/framework/**/*.ts'],
          },
          {
            name: 'new Date()',
            description: 'Replace it with context.time.',
            replacement: 'context.time',
            includedFiles: ['src/backend/**/*.ts'],
            excludedFiles: [
              'src/**/framework.ts',
              'src/backend/service/**/*.ts',
            ],
          },
        ],
      ],
      'airdev/require-await': 'error',
    },

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'module',
      parser: require('@typescript-eslint/parser'),
      parserOptions: { project: './tsconfig.json' },
    },
  },
  {
    files: ['src/**/*.tsx'],
    rules: {
      'airdev/next-validate-use-param-from-url': 'error',
    },
  },
  {
    files: [
      'src/**/*.ts',
      'src/**/error.tsx',
      'src/**/layout.tsx',
      'src/**/loading.tsx',
      'src/**/not-found.tsx',
      'src/**/page.tsx',
      'src/**/hooks/**/*.tsx',
      'src/**/context/**/*.tsx',
      'src/frontend/components/ErrorBoundary.tsx',
      'src/frontend/components/ui/**/*.tsx',
    ],
    rules: { 'airdev/next-require-export-default-function': 'off' },
  },
  {
    files: ['*.config.ts', '*.config.js', 'eslint.config.js'],
    rules: { 'airdev/next-require-export-default-function': 'off' },
  },
  {
    files: ['src/frontend/components/shell/NotFound.tsx'],
    rules: { 'airdev/no-negative-names': 'off' },
  },
];