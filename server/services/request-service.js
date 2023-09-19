'use strict';

const axios = require('axios').default;
const { defu } = require('defu');
const { getService, resolveValue } = require('../utils/common');

module.exports = ({ strapi }) => ({
	async build({ name, record, trigger }) {
		let request = {};
		const { shared, builds } = getService({ strapi, name: 'settings' }).get();

		const build = builds.find((b) => b.name === name);

		if (!build) {
			return;
		}

		// method
		request.method = build.method || 'POST';

		// url
		request.url = build.url;

		// body
		if (build.body) {
			request.data = await resolveValue({ value: build.body, args: { record, trigger } });
		}

		// params
		if (shared.params) {
			request.params = await resolveValue({ value: shared.params, args: { record, trigger } });
		}

		if (build.params) {
			const paramsValue = await resolveValue({ value: build.params, args: { record, trigger } });

			request.params = defu(paramsValue, request.params || {});
		}

		// headers
		if (shared.headers) {
			request.headers = await resolveValue({ value: shared.headers, args: { record, trigger } });
		}

		if (build.headers) {
			const headerValue = await resolveValue({ value: build.headers, args: { record, trigger } });
			request.headers = defu(headerValue, request.headers || {});
		}

		return request;
	},
	async execute(request) {
		const hooks = getService({ strapi, name: 'settings' }).get({ path: 'hooks' });

		if (hooks.beforeRequest) {
			axios.interceptors.request.use(hooks.beforeRequest);
		}

		return axios(request);
	},
});
