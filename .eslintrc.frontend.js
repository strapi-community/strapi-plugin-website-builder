module.exports = {
	$schema: 'https://json.schemastore.org/eslintrc',
	parser: '@babel/eslint-parser',
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	plugins: ['react'],
	extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
	},
	settings: {
		react: {
			version: '16.5.2',
		},
	},
};
