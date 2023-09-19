module.exports = {
	$schema: 'https://json.schemastore.org/eslintrc',
	root: true,
	overrides: [require('./.eslintrc.backend.js'), require('./.eslintrc.frontend.js')],
};
