import { pluginId } from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import PluginPkg from '../../package.json';

const name = PluginPkg.strapi.displayName;

export default {
	register(app) {
		app.addMenuLink({
			to: `/plugins/${pluginId}`,
			icon: PluginIcon,
			intlLabel: {
				id: `${pluginId}.plugin.name`,
				defaultMessage: name,
			},
			Component: async () => {
				const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

				return component;
			},
		});
		app.registerPlugin({
			id: pluginId,
			initializer: Initializer,
			isReady: false,
			name,
		});
	},
};
