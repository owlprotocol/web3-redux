module.exports = {
    env: {
        node: true,
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended',
        'plugin:import/typescript',
        'plugin:storybook/recommended',
    ],
    plugins: ['@typescript-eslint', 'import', 'react-hooks'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        semi: 0,
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        'no-console': 'off',
        'no-unused-vars': 'off',
        'no-empty': 'warn',
        'import/no-named-as-default': 'off',
        'import/no-anonymous-default-export': 'off',
        'import/no-cycle': 'error',
        'import/no-self-import': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        'react/prop-types': 0,
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        //https://dev.to/diballesteros/how-to-quickly-configure-eslint-for-import-sorting-2h73
        'import/order': [
            1,
            {
                groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
            },
        ],
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx', '**/*.stories.*'],
        },
    ],
};
