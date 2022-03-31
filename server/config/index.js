'use strict';

const { pluginConfigSchema } = require('./schema.js');

module.exports = {
	validator: (config) => pluginConfigSchema.validate(config),
};
