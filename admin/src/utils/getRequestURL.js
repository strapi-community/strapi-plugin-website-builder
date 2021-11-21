import { pluginId } from './constants';

/**
 * Auto prefix URLs with the plugin id
 *
 * @param {String} endpoint plugin specific endpoint
 * @returns {String} plugin id prefixed endpoint
 */
const getRequestURL = (endpoint) => `/${pluginId}/${endpoint}`;

export default getRequestURL;
