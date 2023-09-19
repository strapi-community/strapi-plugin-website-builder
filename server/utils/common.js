'use strict';

function getService({ strapi, name, plugin = 'website-builder' }) {
	return strapi.plugin(plugin).service(name);
}

async function resolveValue({ value, args }) {
	if (typeof value === 'function') {
		return await value(args);
	}

	return value;
}

module.exports = {
	getService,
	resolveValue,
};
