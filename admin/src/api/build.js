'use strict';

import { requestPluginEndpoint } from '../utils/requestPluginEndpoint';

const route = 'build';

const triggerBuild = () => {
	return requestPluginEndpoint(route, {
		method: 'POST',
	});
};

export { triggerBuild };
