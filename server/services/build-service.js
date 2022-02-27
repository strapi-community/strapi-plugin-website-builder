'use strict';

const axios = require('axios').default;
const crypto = require('crypto');
const { getPluginService } = require('../utils/getPluginService');

module.exports = ({ strapi }) => ({
	/**
	 * Makes a request to the url specified in the plugin config
	 *
	 * @param {object} options
	 * @param {object} options.settings The plugin setting
	 * @param {string} options.trigger The type of trigger that started the build
	 *
	 * @return {Promise<object>} response The response data from the url
	 */
	build: async ({ settings, trigger }) => {
		let status = 500;
		try {
			let requestConfig = { method: 'POST', data: {}, url: settings.url };
			if (settings.headers) {
				requestConfig.headers = settings.headers;
			}

			if (settings.body) {
				requestConfig.data = settings.body;
			}

			if (settings.secret) {
				const { hash, headerKey, secretKey } = settings.secret;
				const normalizedHash = hash.toLowerCase();
				requestConfig.headers = {
					...(requestConfig.headers || {}),
					[headerKey]: `${normalizedHash}=${crypto
						.createHmac(normalizedHash, secretKey)
						.update(JSON.stringify(requestConfig.data))
						.digest('hex')}`,
				};
			}

			const buildResponse = await axios(requestConfig);
			status = buildResponse.status;
		} catch (error) {
			if (error.response) {
				status = error.response.status;
			}
		} finally {
			getPluginService(strapi, 'logService').create({
				trigger,
				status,
				timestamp: Date.now(),
			});
		}
		return { status };
	},
});
