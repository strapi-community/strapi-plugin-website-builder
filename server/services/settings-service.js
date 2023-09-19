'use strict';

const { PLUGIN_ID } = require('../utils/constants');

module.exports = ({ strapi }) => ({
	get({ path = '', defaultValue } = {}) {
		if (path.length) {
			path = `.${path}`;
		}

		return strapi.config.get(`plugin.${PLUGIN_ID}${path}`, defaultValue);
	},
	set({ path = '', value }) {
		return strapi.config.set(`plugin.website-builder${path}`, value);
	},
});
