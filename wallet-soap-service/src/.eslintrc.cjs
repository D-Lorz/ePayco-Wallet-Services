module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'standard',
        'plugin:import/recommended',
        'plugin:json/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'import',
        'sort-keys-fix'
    ],
    root: true,
    rules: {
        'import/no-named-as-default': 'off',
        'import/no-unresolved': 'off',
        'import/order': [
            'error',
            {
                alphabetize: {
                    caseInsensitive: true,
                    order: 'asc'
                },
                groups: ['builtin', 'external', 'internal'],
                'newlines-between': 'always',
                pathGroups: [
                    {
                        group: 'external',
                        pattern: 'react',
                        position: 'before'
                    }
                ],
                pathGroupsExcludedImportTypes: ['react']
            }
        ],
        'import/prefer-default-export': 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'jsx-a11y/anchor-is-valid': 'off',
        'no-confusing-arrow': 'error',
        'no-else-return': 'error',
        'no-eq-null': 'error',
        'no-extend-native': 'off',
        'no-unused-vars': ['warn', { caughtErrors: 'none' }],
        'no-var': 'error',
        quotes: 'off',
        'sort-keys-fix/sort-keys-fix': 'warn'
    }
}
