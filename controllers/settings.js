'use strict';

/**
 * settings.js controller
 *
 * @description: A set of functions called "actions" of the `website-builder` plugin.
 */

const { pluginId } = require('../utils/constants');
module.exports = {
	/**
	 * Fetch the current plugin settings
	 *
	 * @return {Object}
	 */
	get: async (ctx) => {
		try {
			const settings = await strapi.plugins[pluginId].services.settings.get();

			ctx.send({
				data: settings,
			});
		} catch (error) {
			ctx.send({
				data: null,
				error:{
					name: error.name,
					message:error.message
				}
			});
		}
	},
};
