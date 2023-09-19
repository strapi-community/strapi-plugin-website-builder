'use strict';

const { pluginConfigSchema } = require('./schema.js');

module.exports = {
	default: () => ({
		shared: {},
		builds: [],
		hooks: {},
	}),
	validator: async (config) => await pluginConfigSchema.validate(config),
};
