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
	 * @return {Promise<object>} settings The configuration settings for the plugin
	 */
	get: () => {
		return strapi
			.store({
				type: 'plugin',
				name: 'website-builder_store',
			})
			.get({ key: 'settings' });
	},
};
