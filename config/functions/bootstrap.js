const { pluginId } = require('../../utils/constants');

module.exports = async () => {
	// init plugin store
	const store = strapi.store({
		type: 'plugin',
		name: `${pluginId}_store`,
	});

	// seed initial data from config
	let { url, headers, maxNumOfLogs = 5 } = strapi.plugins[pluginId].config;

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
