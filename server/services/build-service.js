'use strict';

const { getService } = require('../utils/common');

module.exports = ({ strapi }) => ({
	async trigger({ name, record, trigger }) {
		let log = { trigger: trigger.type, status: 500, build: name };

		try {
			const request = await getService({ strapi, name: 'request' }).build({
				name,
				record,
				trigger,
			});
			const response = await getService({ strapi, name: 'request' }).execute(request);
			log.status = response.status;
			log.response = response.data;
		} catch (error) {
			if (error.response) {
				log.status = error.response.status;
			} else if (error.request) {
				log.response = {};
			} else {
				log.response = error.message;
			}
		}

		getService({ strapi, name: 'log' }).create({ data: log });

		return { status: log.status };
	},
});
