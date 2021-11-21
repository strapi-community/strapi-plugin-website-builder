'use strict';

/**
 * logs.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
	/**
	 * Returns the currently stored logs
	 *
	 * @return {Array} logs
	 */
	get: async () => {
		return strapi
			.store({
				type: 'plugin',
				name: 'website-builder_store',
			})
			.get({ key: 'logs' });
	},
	/**
	 * Adds a new set of logs
	 *
	 * @return {Array} logs
	 */

	add: async (logs) => {
		return strapi
			.store({
				type: 'plugin',
				name: 'website-builder_store',
			})
			.set({ key: 'logs', value: logs });
	},
};
