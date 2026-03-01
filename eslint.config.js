// eslint.config.js — универсальный конфиг
import globals from 'globals'

import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.node },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // ✅ Core rules (как на Hexlet)
      'arrow-parens': ['error', 'as-needed'],
      'brace-style': ['error', '1tbs'],
      'operator-linebreak': ['error', 'before'],

      // ✅ Stylistic plugin rules (дублируем для надёжности)
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/operator-linebreak': ['error', 'before'],

      // ✅ Остальные ваши правила
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/padded-blocks': ['error', 'never'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: '*' },
      ],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: ['node_modules/', 'coverage/', '__fixtures__/'],
  },
]
