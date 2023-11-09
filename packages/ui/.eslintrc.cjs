module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'standard-with-typescript',
        'plugin:storybook/recommended',
        'prettier',
    ],
    overrides: [],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.js', 'postcss.config.js'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', '@typescript-eslint', 'react', 'react-hooks', 'prettier', 'storybook'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'react/jsx-key': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-console': 'warn',
    },
}