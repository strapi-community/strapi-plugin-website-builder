import App from './containers/App';
import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import trads from './translations';

import pluginPkg from '../../package.json';
const pluginId = pluginPkg.name.replace(/^strapi-plugin-/i, '');
const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
const icon = pluginPkg.strapi.icon;
const name = pluginPkg.strapi.name;
const isStrapiRequired = pluginPkg.strapi.required || false;

export default (strapi) => {
	const plugin = {
		blockerComponent: null,
		blockerComponentProps: {},
		description: pluginDescription,
		icon,
		id: pluginId,
		initializer: Initializer,
		injectedComponents: [],
		isReady: false,
		isRequired: isStrapiRequired,
		layout: null,
		lifecycles,
		mainComponent: App,
		name,
		preventComponentRendering: false,
		trads,
		menu: {
			pluginsSectionLinks: [
				{
					destination: `/plugins/${pluginId}`,
					icon,
					label: {
						id: pluginId,
						defaultMessage: 'Website Builder',
					},
					name,
				},
			],
		},
	};

	return strapi.registerPlugin(plugin);
};
