module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['prettier', 'airbnb'],
	plugins: ['svelte3', '@typescript-eslint', 'prettier'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
