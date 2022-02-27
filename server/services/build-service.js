'use strict';

const axios = require('axios').default;
const { getPluginService } = require('../utils/getPluginService');

module.exports = ({ strapi }) => ({
	/**
	 * Builds the build request configuration
	 *
	 * @param {object} options
	 * @param {object} options.settings The plugin setting
	 * @param {string} options.trigger The type of trigger that started the build
	 *
	 * @return {object} requestConfig The request configuration for the build request
	 */
	buildRequestConfig({ settings, trigger }) {
		let requestConfig = { method: 'POST', data: {}, url: settings.url };
		if (settings.headers) {
			requestConfig.headers = settings.headers;
		}

		if (settings.body) {
			requestConfig.data = settings.body;
		}

		// check any event settings overrides for the event model
		if (trigger.type !== 'event') {
			return requestConfig;
		}

		const eventSettings = settings.trigger.events.find((e) => e.model === trigger.data.model);

		if (!eventSettings) {
			return requestConfig;
		}

		if (eventSettings.url) {
			requestConfig.url = eventSettings.url;
		}

		if (eventSettings.params) {
			requestConfig.params = eventSettings.params;
		}

		return requestConfig;
	},
	/**
	 * Makes a request to the url specified in the plugin config
	 *
	 * @param {object} options
	 * @param {object} options.settings The plugin setting
	 * @param {string} options.trigger The type of trigger that started the build
	 *
	 * @return {Promise<object>} response The response data from the url
	 */
	async build({ settings, trigger }) {
		let status = 500;
		try {
			let requestConfig = this.buildRequestConfig({ settings, trigger });
			const buildResponse = await axios(requestConfig);
			status = buildResponse.status;
		} catch (error) {
			if (error.response) {
				status = error.response.status;
			}
		} finally {
			getPluginService(strapi, 'logService').create({
				trigger: trigger.type,
				status,
				timestamp: Date.now(),
			});
		}
		return { status };
	},
});
