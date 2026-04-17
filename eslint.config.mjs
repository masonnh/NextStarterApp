import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default [
  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript support
  ...tseslint.configs.recommended,

  // Next.js rules
  {
    plugins: {
      '@next/next': nextPlugin,
      'simple-import-sort': simpleImportSort,
      'react-hooks': reactHooks,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactHooks.configs.recommended.rules,
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Node builtins
            ['^node:', `^(fs|path|os|crypto|util)$`],

            // 2. React / Next
            ['^react', '^next'],

            // 3. External packages
            ['^@?\\w'],

            // 4. Internal aliases (your "@/..." paths)
            ['^@/'],

            // 5. Relative imports
            ['^\\.'],

            // 6. Side effect imports (CSS, etc.)
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },

  // Disable ESLint rules that conflict with Prettier
  prettier,

  // Your custom rules
  {
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
