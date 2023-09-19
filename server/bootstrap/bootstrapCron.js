'use strict';

const { getService } = require('../utils/common');

function bootstrapCron({ strapi, build }) {
	// create cron check
	strapi.cron.add({
		[build.name]: {
			options: {
				rule: build.trigger.expression,
			},
			task: () => {
				getService({ strapi, name: 'build' }).trigger({ name: build.name, trigger: { type: 'cron' } });
			},
		},
	});
}

module.exports = {
	bootstrapCron,
};
