'use strict';

const { pluginId } = require('../utils/pluginId');

const uid = `plugin::${pluginId}.log`;

module.exports = ({ strapi }) => ({
	/**
	 * Returns the currently stored build logs
	 *
	 * @return {Promise<array>} logs
	 */
	find(options = {}) {
		return strapi.entityService.findMany(uid, options);
	},

	/**
	 * Returns the a specific stored build log
	 *
	 * @return {Promise<Object>} log
	 */
	findOne(id, options = {}) {
		return strapi.entityService.findOne(uid, id, options);
	},

	/**
	 * Create a build log
	 *
	 * @return {Promise<Object>} log
	 */
	create(log) {
		return strapi.entityService.create(uid, { data: log });
	},

	/**
	 * Update a build log
	 *
	 * @return {Promise<Object>} log
	 */
	update(id, log) {
		return strapi.entityService.update(uid, id, { data: log });
	},

	/**
	 * Deletes a build log
	 *
	 * @return {Promise<Object>} log
	 */
	delete(id) {
		return strapi.entityService.delete(uid, id);
	},
});
