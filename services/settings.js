'use strict';

/**
 * settings.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
	/**
	 * Returns the current settings object
	 *
	 * @return {Object} settings The configuration settings for the plugin
	 */
	get: async () => {
		return strapi
			.store({
				type: 'plugin',
				name: 'website-builder',
			})
			.get({ key: 'settings' });
	},
};
