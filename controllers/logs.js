'use strict';

/**
 * logs.js controller
 *
 * @description: A set of functions called "actions" of the `website-builder` plugin.
 */

const { pluginId } = require('../utils/constants');
module.exports = {
	/**
	 *  Fetch the current logs
	 *
	 * @return {Array} logs
	 */

	get: async (ctx) => {
		try {
			const logs = await strapi.plugins[pluginId].services.logs.get();

			ctx.send({
				data: logs,
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

	/**
	 * Add a new log
	 *
	 * @return {Object}
	 */
	update: async (ctx) => {
		const log = ctx.query;
		try {
			const logs = await strapi.plugins[pluginId].services.logs.get();

			// ensure we always have no more than maxNumOfLogs
			const { maxNumOfLogs } = await strapi.plugins[pluginId].services.settings.get();
			const values = logs.slice(-maxNumOfLogs);
			values.push(log);

			await strapi.plugins[pluginId].services.logs.update(values);

			ctx.send({
				data: values,
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
