'use strict';

const logController = require('./log-controller');
const buildController = require('./build-controller');
const vercelController = require('./vercel-controller');

module.exports = {
	logController,
	buildController,
	vercelController
};
