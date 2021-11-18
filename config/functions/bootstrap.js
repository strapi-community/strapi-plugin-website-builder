const { pluginId } = require('../../utils/constants');

module.exports = async () => {
	// init plugin store
	const store = strapi.store({
		type: 'plugin',
		name: pluginId,
	});

	// seed initial data from config
	let { url, headers, maxNumOfLogs } = strapi.plugins[pluginId].config;

	// set defaults
	if (!maxNumOfLogs) {
		maxNumOfLogs = 5;
	}

	// account for 0 indexed array
	const normalizedMaxNumOfLogs = maxNumOfLogs - 1;

	await store.set({
		key: 'settings',
		value: {
			url,
			headers,
			maxNumOfLogs: normalizedMaxNumOfLogs,
		},
	});

	await store.set({
		key: 'logs',
		value: [],
	});
};
