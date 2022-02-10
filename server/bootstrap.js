'use strict';

const { getPluginService } = require('./utils/getPluginService');
const { setupCronWebhook } = require('./utils/setupCronWebhook');
const { setupEventWebhook } = require('./utils/setupEventWebhook');

module.exports = async ({ strapi }) => {
	const settings = getPluginService(strapi, 'settingsService').get();

	// complete any required webhook setup
	if (settings.trigger.type === 'cron') {
		setupCronWebhook(strapi, settings);
	} else if (settings.trigger.type === 'event') {
		setupEventWebhook(strapi, settings);
	}
};
