const { getPluginService } = require('./getPluginService');

/**
 * Setup function for cron type trigger
 *
 */
const setupCronWebhook = (strapi, settings) => {
	strapi.cron.add({
		[settings.trigger.cron]: ({ strapi }) => {
			getPluginService(strapi, 'buildService').build({ settings, trigger: { type: 'cron' } });
		},
	});
};

const setupCronVercelStates = (strapi, settings) => {
	strapi.cron.add({
		['*/1 * * * *']: ({ strapi }) => {
			getPluginService(strapi, 'vercelService').checkStates({ settings });
		},
	});
};

module.exports = {
	setupCronWebhook,
	setupCronVercelStates
};
