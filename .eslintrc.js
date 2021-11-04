module.exports = {
    env: {
        node: true,
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    plugins: ['@typescript-eslint', 'prettier', 'import', 'react-hooks', '@jambit/typed-redux-saga'],
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
        'no-console': 'warn',
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
        '@jambit/typed-redux-saga/use-typed-effects': ['error', 'macro'],
        '@jambit/typed-redux-saga/delegate-effects': 'error',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
        },
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
        },
    ],
};
