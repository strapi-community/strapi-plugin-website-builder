'use strict';

const { getPluginService } = require('../utils/getPluginService');

module.exports = ({ strapi }) => ({
	/**
	 *  Fetch the current logs
	 *
	 * @return {Array} logs
	 */
	async find(ctx) {
		const logs = await getPluginService(strapi, 'logService').find({
			sort: { createdAt: 'DESC' },
		});

		ctx.send({ data: { logs } });
	},

	/**
	 *  Create a log
	 *
	 * @return {Object} log
	 */
	async create(ctx) {
		const { body } = ctx.request;
		const createdLog = await getPluginService(strapi, 'logService').create(body);

		ctx.send({ data: { log: createdLog } });
	},

	/**
	 *  Delete a log
	 *
	 * @return {Object} log
	 */
	async delete(ctx) {
		const { id } = ctx.params;
		const log = await getPluginService(strapi, 'logService').findOne(id);

		if (!log) {
			return ctx.notFound('log not found');
		}

		const deletedLog = await getPluginService(strapi, 'logService').delete(id);

		ctx.send({ data: { log: deletedLog } });
	},
});
