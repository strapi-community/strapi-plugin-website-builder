'use strict';

import { requestPluginEndpoint } from '../utils/requestPluginEndpoint';

const route = 'vercelCheckStates';

const checkStates = () => {
	return requestPluginEndpoint(route, {
		method: 'GET',
	});
};

export { checkStates };
