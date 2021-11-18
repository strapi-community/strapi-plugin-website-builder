import { pluginId } from './constants';

/**
 * Auto prefix translations with plugin id
 *
 * @param {String} id Translation key
 * @returns {String}
 */
const getTrad = (id) => `${pluginId}.${id}`;

export default getTrad;
