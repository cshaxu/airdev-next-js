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
      'vitest.config.mts',
      'plugins/**/*.js',
      'scripts/**/*.js',
      'src/generated/**/*.ts',
      'src/generated/**/*.tsx',
      'src/app/api/data/**/*.ts',
      'src/app/api/debug/**/*.ts',
      'src/app/api/inngest/route.ts',
      'src/app/api/jobs/**/*.ts',
      'src/app/api/webhooks/**/*.ts',
      'src/frontend/stores/**/*.ts',
      'airdev/**',
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
      'airdev/no-specific-paths': ['error', ['src/app/api']],
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
            excludedFiles: ['src/config/**.ts'],
          },
          {
            name: 'process.env.',
            notFollowedBy: 'NEXT_PUBLIC_',
            description: 'It must be followed by NEXT_PUBLIC here.',
            includedFiles: ['src/config/public.ts'],
          },
          {
            name: 'process.env.NEXT_PUBLIC_',
            description: 'Move it to src/config/public.ts.',
            includedFiles: ['src/config/private.ts', 'src/config.edge.ts'],
          },
          {
            name: 'prisma.',
            description: 'Replace it with corresponding Airent entity.',
            excludedFiles: ['prisma/seed.ts', 'src/backend/lib/nextauth.ts'],
          },
          {
            name: 'console.debug',
            description: 'Replace it with logDebug.',
            replacement: 'logDebug',
            includedFiles: [
              'src/app/api/**/*.ts',
              'src/backend/**/*.ts',
              'src/edge/**/*.ts',
            ],
          },
          {
            name: 'console.log',
            description: 'Add comment on why we need it for fe',
            includedFiles: [
              'src/app/**/*.ts',
              'src/app/**/*.tsx',
              'src/frontend/**/*.ts',
              'src/frontend/**/*.tsx',
            ],
          },
          {
            name: 'console.log',
            description: 'Replace it with logInfo.',
            replacement: 'logInfo',
            includedFiles: [
              'src/app/api/**/*.ts',
              'src/backend/**/*.ts',
              'src/edge/**/*.ts',
            ],
            excludedFiles: ['src/framework/logging.ts'],
          },
          {
            name: 'console.info',
            description: 'Replace it with logInfo.',
            replacement: 'logInfo',
            includedFiles: [
              'src/app/api/**/*.ts',
              'src/backend/**/*.ts',
              'src/edge/**/*.ts',
            ],
          },
          {
            name: 'console.warn',
            description: 'Replace it with logWarn.',
            replacement: 'logWarn',
            includedFiles: [
              'src/app/api/**/*.ts',
              'src/backend/**/*.ts',
              'src/edge/**/*.ts',
            ],
          },
          {
            name: 'console.error',
            description: 'Replace it with logError.',
            replacement: 'logError',
            includedFiles: [
              'src/app/api/**/*.ts',
              'src/backend/**/*.ts',
              'src/edge/**/*.ts',
            ],
          },
          {
            name: 'new Error',
            description: 'Replace it with createHttpError.',
            replacement: 'createHttpError.InternalServerError',
            includedFiles: [
              'src/app/api/**/*.ts',
              'src/backend/**/*.ts',
              'src/edge/**/*.ts',
            ],
          },
          {
            name: 'new Date()',
            description: 'Replace it with context.time.',
            replacement: 'context.time',
            includedFiles: ['src/backend/**/*.ts', 'src/edge/**/*.ts'],
            excludedFiles: [
              'src/**/framework.ts',
              'src/backend/sdks/**/*.ts',
              'src/backend/services/data/system-request-cache.ts',
              'src/backend/services/data/system-scheduled-job.ts',
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
    files: [
      'src/app/api/auth/**/*.ts',
      'src/app/api/edge/**/*.ts',
      'src/app/api/json/**/*.ts',
      'src/app/api/stream/**/*.ts',
      'src/app/api/form/**/*.ts',
    ],
    rules: { 'airdev/no-specific-paths': 'off' },
  },
  {
    files: ['src/**/*.tsx'],
    rules: {
      // 'airdev/next-require-next-props': 'error',
      'airdev/next-validate-use-param-from-url': 'error',
    },
  },
  {
    files: ['prisma/seed.ts', 'src/config/**/*.ts'],
    rules: { 'airdev/no-relative-parent-imports': 'off' },
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
      'src/config/component/**/*.tsx',
      'src/frontend/components/ui/**/*.tsx',
    ],
    rules: { 'airdev/next-require-export-default-function': 'off' },
  },
  {
    files: ['next-env.d.ts', 'prisma/**/*.ts', '*.config.ts', '*.config.js'],
    rules: { 'airdev/next-require-export-default-function': 'off' },
  },
];
