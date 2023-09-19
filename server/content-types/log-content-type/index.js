'use strict';

module.exports = {
	kind: 'collectionType',
	collectionName: 'logs',
	info: {
		singularName: 'log',
		pluralName: 'logs',
		displayName: 'logs',
	},
	pluginOptions: {
		'content-manager': {
			visible: false,
		},
		'content-type-builder': {
			visible: false,
		},
	},
	options: {
		draftAndPublish: false,
	},
	attributes: {
		status: {
			type: 'integer',
		},
		build: {
			type: 'string',
		},
		trigger: {
			type: 'string',
		},
		method: {
			type: 'string',
		},
		response: {
			type: 'json',
		},
	},
};
