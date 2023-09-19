module.exports = {
	files: ['./server/**/*'],
	$schema: 'https://json.schemastore.org/eslintrc',
	extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
	globals: {
		strapi: 'readonly',
	},
};
