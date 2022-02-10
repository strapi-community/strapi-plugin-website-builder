'use strict';

const { pluginConfigSchema } = require('./schema.js');

module.exports = {
	validator: async (config) => {
		await pluginConfigSchema.validate(config);
	},
};
