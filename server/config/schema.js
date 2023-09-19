'use strict';

const yup = require('yup');

const pluginConfigSchema = yup
	.object()
	.shape({
		shared: yup.object(),
		hooks: yup.object(),
		builds: yup.array().of(
			yup.object().shape({
				enabled: yup.bool(),
				name: yup.string().required('A build name must be provided'),
				url: yup.string().required('A URL is required'),
				trigger: yup
					.object()
					.shape({
						type: yup.string().oneOf(['manual', 'cron', 'event']).required('A trigger type is required'),
						expression: yup.string().when('type', {
							is: 'cron',
							then: yup.string().required('A cron expression must be entered'),
						}),
						events: yup.array().when('type', {
							is: 'event',
							then: yup
								.array()
								.of(
									yup.object().shape({
										uid: yup.string().required('A uid is required'),
										actions: yup.mixed().test({
											name: 'actions',
											exclusive: true,
											message: '${path} must be an string or valid actions',
											test: (value) =>
												typeof value === 'string' ||
												yup
													.array()
													.of(yup.string().oneOf(['create', 'update', 'delete', 'publish', 'unpublish']))
													.required('uid actions are required')
													.isValid(value),
										}),
									})
								)
								.min(1, 'At least one event must be provided')
								.required('events is required'),
						}),
					})
					.required('A trigger is required'),
				params: yup.mixed().test({
					name: 'params',
					exclusive: true,
					message: '${path} must be an object or function',
					test: (value) => typeof value === 'function' || yup.object().isValid(value),
				}),
				headers: yup.mixed().test({
					name: 'headers',
					exclusive: true,
					message: '${path} must be an object or function',
					test: (value) => typeof value === 'function' || yup.object().isValid(value),
				}),
				body: yup.mixed().test({
					name: 'body',
					exclusive: true,
					message: '${path} must be an object or function',
					test: (value) => typeof value === 'function' || yup.object().isValid(value),
				}),
			})
		),
	})
	.required('A config is required');

module.exports = {
	pluginConfigSchema,
};
