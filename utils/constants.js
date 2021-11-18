const pluginPkg = require('../package.json');

module.exports = {
	pluginId: pluginPkg.name.replace(/^strapi-plugin-/i, ''),
	pluginDescription: pluginPkg.strapi.description || pluginPkg.description,
	icon: pluginPkg.strapi.icon,
	name: pluginPkg.strapi.name,
	isStrapiRequired: pluginPkg.strapi.required || false,
};
