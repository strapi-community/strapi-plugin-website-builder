module.exports = {
	files: ['./admin/**/*'],
	$schema: 'https://json.schemastore.org/eslintrc',
	extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: { browser: true, es6: true },
	settings: {
		react: {
			version: 'detect',
		},
	},
};
