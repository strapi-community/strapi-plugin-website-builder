'use strict';

const yup = require('yup');

const pluginConfigSchema = yup
	.object()
	.shape({
		url: yup.string().url().required('url is required'),
		headers: yup.object(),
		body: yup.object(),
		secret: yup.object().shape({
			hash: yup.string().required('algorithm is required'),
			headerKey: yup.string().required('headerKey is required'),
			secretKey: yup.string().required('secretKey is required'),
		}),
		trigger: yup
			.object()
			.shape({
				type: yup.string().oneOf(['manual', 'cron', 'event']),
				cron: yup.string().when('type', {
					is: 'cron',
					then: yup.string().required('A cron expression must be entered'),
				}),
				events: yup
					.array()
					.of(
						yup.object().shape({
							model: yup.string().required('A model name is required'),
							types: yup
								.array()
								.of(yup.string().oneOf(['create', 'update', 'delete']))
								.required('types is required'),
						})
					)
					.when('type', {
						is: 'event',
						then: yup
							.array()
							.min(1, 'At least one event must be provided')
							.required('events is required'),
					}),
			})
			.required('trigger is required'),
	})
	.required('A config is required');

module.exports = {
	pluginConfigSchema,
};
