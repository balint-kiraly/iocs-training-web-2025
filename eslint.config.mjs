import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import readableTailwind from 'eslint-plugin-readable-tailwind';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintParserTypeScript from '@typescript-eslint/parser';
import globals from 'globals';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  {
    ignores: ['**/.prettierrc.js', '**/node_modules', '**/.idea', '**/.next'],
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'next/core-web-vitals'
  ),
  {
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
      'readable-tailwind': readableTailwind,
    },
  },

  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true
      },
      globals: {
        ...globals.node,
      },
    }
  },
  {
    files: ["**/*.{jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.node,
      },
    },

    rules: {
      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      camelcase: [
        'error',
        {
          properties: 'never',
        },
      ],

      eqeqeq: 'error',
      'max-depth': 'error',
      'max-lines': 'error',
      'no-alert': 'error',
      'no-array-constructor': 'error',

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      'no-eval': 'error',
      'no-implicit-coercion': 'error',
      'no-lonely-if': 'error',
      'no-nested-ternary': 'error',
      'no-negated-condition': 'error',
      'no-unneeded-ternary': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'error',
      'no-useless-concat': 'error',
      'no-void': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-template': 'error',
      yoda: 'error',
      'no-unused-vars': 'off',

      ...readableTailwind.configs.warning.rules,
      "readable-tailwind/multiline": ["warn", { printWidth: 120 }]
    },
  },
];

export default eslintConfig;
