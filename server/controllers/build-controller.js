'use strict';

const { getPluginService } = require('../utils/getPluginService');
module.exports = ({ strapi }) => ({
	/**
	 * Trigger a website rebuild
	 *
	 * @return {Object}
	 */
	async build(ctx) {
		try {
			const settings = await getPluginService(strapi, 'settingsService').get();

			const buildStatus = await getPluginService(strapi, 'buildService').build({
				settings,
				trigger: 'manual',
			});

			ctx.send({ data: { status: buildStatus } });
		} catch (error) {
			ctx.badRequest();
		}
	},
});
