import { pluginId } from './constants';

/**
 * Auto prefix URLs with the plugin id
 *
 * @param {String} id Translation key
 * @returns {String}
 */
const getRequestURL = (endpoint) => `/${pluginId}/${endpoint}`;

export default getRequestURL;
