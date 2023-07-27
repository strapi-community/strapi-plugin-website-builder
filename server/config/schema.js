'use strict';

const yup = require('yup');
const { isURL } = require('../utils/isURL');

const pluginConfigSchema = yup
	.object()
	.shape({
		url: yup
			.string()
			.test((value) => isURL(value))
			.required('A valid url is required'),
		headers: yup.object(),
		body: yup.object(),
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
							url: yup.string(),
							params: yup.mixed().test({
								name: 'params',
								exclusive: true,
								message: '${path} must be an object or function',
								test: async (value) => {
									if (typeof value !== 'function') {
										const isObject = await yup.object().isValid(value);
										return isObject;
									}

									return true;
								},
							}),
							headers: yup.mixed().test({
								name: 'headers',
								exclusive: true,
								message: '${path} must be an object or function',
								test: async (value) => {
									if (typeof value !== 'function') {
										const isObject = await yup.object().isValid(value);
										return isObject;
									}

									return true;
								},
							}),
							model: yup.string().required('A model name is required'),
							types: yup
								.array()
								.of(yup.string().oneOf(['create', 'update', 'delete', 'publish', 'unpublish']))
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
