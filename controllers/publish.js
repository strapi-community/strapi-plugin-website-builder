'use strict';

/**
 * publish.js controller
 *
 * @description: A set of functions called "actions" of the `website-builder` plugin.
 */

const { pluginId } = require('../utils/constants');
module.exports = {
	/**
	 * Trigger a website rebuild
	 *
	 * @return {Object}
	 */
	index: async (ctx) => {
		try {
			const settings = await strapi.plugins[pluginId].services.settings.get();
			const response = await strapi.plugins[pluginId].services.publish.index(settings);

			ctx.send({
				data: response.body,
			});
		} catch (error) {
			ctx.send({
				data: null,
				error: {
					code: error.code,
					name: error.name,
					message: error.message,
				},
			});
		}
	},
};
