'use strict';

const logService = require('./log-service');
const buildService = require('./build-service');
const settingsService = require('./settings-service');
const vercelService = require('./vercel-service');

module.exports = {
	logService,
	buildService,
	settingsService,
	vercelService
};
