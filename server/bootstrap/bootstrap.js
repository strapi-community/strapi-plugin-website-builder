'use strict';

const { getService } = require('../utils/common');
const { bootstrapCron } = require('./bootstrapCron');
const { bootstrapEvents } = require('./bootstrapEvents');

module.exports = async ({ strapi }) => {
	const builds = getService({ strapi, name: 'settings' }).get({ path: 'builds' });

	builds
		.filter((b) => b.enabled || typeof b.enabled === 'undefined')
		.forEach((build) => {
			if (build.trigger.type === 'cron') {
				bootstrapCron({ strapi, build });
			} else if (build.trigger.type === 'event') {
				bootstrapEvents({ strapi, build });
			}
			strapi.log.info(`[website builder] ${build.trigger.type} trigger enabled for ${build.name} build`);
		});
};
