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
	 * @return {Promise<array>} logs
	 */
	get: () => {
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
	 * @param {array} logs The new set of build logs to update to.
	 *
	 * @return {Promise<array>} logs
	 */

	update: (logs) => {
		return strapi
			.store({
				type: 'plugin',
				name: 'website-builder_store',
			})
			.set({ key: 'build_logs', value: logs });
	},
};
