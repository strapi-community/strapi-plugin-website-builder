import pluginPkg from '../../../package.json';

export const pluginId = pluginPkg.name.replace(/^strapi-plugin-/i, '');

export const BUILD_LOG_TABLE_HEADERS = [
	{
		translation: 'log.table.header.id',
		value: 'id',
	},
	{
		translation: 'log.table.header.status',
		value: 'status',
	},
	{
		translation: 'log.table.header.timestamp',
		value: 'timestamp',
	},
];
