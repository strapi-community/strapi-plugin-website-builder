'use strict';

/**
 * logs.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
	/**
	 * Returns the currently stored build logs
	 *
	 * @return {Array} logs
	 */
	get: async () => {
		return strapi
			.store({
				type: 'plugin',
				name: 'website-builder_store',
			})
			.get({ key: 'build_logs' });
	},
	/**
	 * Updates the build logs to a new set
	 *
	 * @return {Array} logs
	 */

	update: async (logs) => {
		return strapi
			.store({
				type: 'plugin',
				name: 'website-builder_store',
			})
			.set({ key: 'build_logs', value: logs });
	},
};
