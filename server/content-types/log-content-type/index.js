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
		comment: '',
	},
	attributes: {
		status: {
			type: 'integer',
		},
		trigger: {
			type: 'enumeration',
			enum: ['manual', 'cron', 'event'],
			default: 'manual',
		},
		vercelDeploymentUid: {
			type: 'string',
		},
		vercelStatus: {
			type: 'string',
		},
		vercelStatusUpdatedAt: {
			type: 'string',
		}
	},
};
