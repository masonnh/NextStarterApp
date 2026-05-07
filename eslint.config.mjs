import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  /**
   * Global ignores
   */
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.js',
      '*.config.cjs',
    ],
  },

  /**
   * Base JS rules
   */
  js.configs.recommended,

  /**
   * TypeScript rules
   */
  ...tseslint.configs.recommended,

  /**
   * App source files
   */
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      '@next/next': nextPlugin,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      /**
       * Next.js
       */
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      /**
       * React Hooks
       */
      ...reactHooks.configs.recommended.rules,

      /**
       * Import Sorting
       */
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effects (CSS etc)
            ['^\\u0000'],

            // Node built-ins
            ['^node:', '^(fs|path|os|crypto|util)$'],

            // React / Next
            ['^react$', '^react-dom$', '^next'],

            // External packages
            ['^@?\\w'],

            // Internal aliases
            ['^@/'],

            // Parent imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

            // Same-folder imports
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],

      'simple-import-sort/exports': 'error',

      /**
       * Cleanup
       */
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      /**
       * Hooks
       */
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  /**
   * Prettier LAST
   */
  prettier,
];
