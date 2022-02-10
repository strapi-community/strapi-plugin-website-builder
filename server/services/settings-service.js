'use strict';

const { pluginId } = require('../utils/pluginId');

module.exports = ({ strapi }) => ({
	/**
	 * Returns the current plugin settings
	 *
	 * @return {Promise<Object>} settings
	 */
	get() {
		return strapi.config.get(`plugin.${pluginId}`);
	},
});
