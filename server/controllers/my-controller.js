'use strict';

module.exports = {
	index(ctx) {
		ctx.body = strapi
			.plugin('strapi-plugin-website-builder')
			.service('myService')
			.getWelcomeMessage();
	},
};
