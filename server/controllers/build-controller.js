'use strict';

const { getService } = require('../utils/common');

module.exports = ({ strapi }) => ({
	/**
	 * Trigger a website build
	 *
	 * @return {Object}
	 */
	async trigger(ctx) {
		try {
			const { status } = await getService({ strapi, name: 'build' }).trigger({
				name: ctx.request.body.data.name,
				trigger: { type: 'manual' },
			});

			ctx.send({ data: { status } });
		} catch (error) {
			ctx.badRequest();
		}
	},

	/**
	 * Get all builds
	 *
	 * @return {Object}
	 */
	async find(ctx) {
		ctx.send({ data: getService({ strapi, name: 'settings' }).get({ path: 'builds' }) });
	},
});
