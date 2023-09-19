'use strict';

const log = require('./log-service');
const build = require('./build-service');
const settings = require('./settings-service');
const request = require('./request-service');

module.exports = {
	log,
	build,
	settings,
	request,
};
