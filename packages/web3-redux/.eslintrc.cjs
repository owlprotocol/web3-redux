// eslint-disable-next-line import/no-commonjs
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
    plugins: ['@typescript-eslint', 'prettier', 'import', 'react-hooks' /*'@jambit/typed-redux-saga'*/],
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
        'import/extensions': ['warn', 'ignorePackages', { json: 'always' }],
        'import/no-named-as-default': 'error',
        'import/no-commonjs': 'error',
        'import/no-anonymous-default-export': 'error',
        'import/no-cycle': 'error',
        'import/no-self-import': 'error',
        'import/no-unresolved': ['error', { ignore: ['.js$'] }],
        'import/no-internal-modules': [
            'off',
            {
                allow: ['.json$'],
            },
        ],
        //https://dev.to/diballesteros/how-to-quickly-configure-eslint-for-import-sorting-2h73
        'import/order': [
            'warn',
            {
                groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
            },
        ],
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
        },
        'import/ignore': ['@reduxjs/toolkit'],
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
        },
    ],
};
