'use strict';

const { getPluginService } = require('../utils/getPluginService');
module.exports = ({ strapi }) => ({
	/**
	 * Trigger a website rebuild
	 *
	 * @return {Object}
	 */
	async checkStates(ctx) {
		try {
			const settings = await getPluginService(strapi, 'settingsService').get();

			const vercelStates = await getPluginService(strapi, 'vercelService').checkStates({
				settings
			});

			ctx.send({ data: { status: vercelStates } });
		} catch (error) {
			ctx.badRequest();
		}
	},
});
