import { request } from 'strapi-helper-plugin';
import getRequestURL from './getRequestURL';

/**
 * Helper function to make requests to plugin specific endpoints
 *
 * @param {String} endpoint plugin specific endpoint
 * @returns {Promise<object>} request response
 */
const pluginEndpointRequest = (endpoint, data) => {
	const prefixedEndpoint = getRequestURL(endpoint);
	return request(prefixedEndpoint, data);
};

export default pluginEndpointRequest;
