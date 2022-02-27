import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { pluginId } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import pluginPkg from '../../package.json';

const name = pluginPkg.strapi.displayName;

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
	async registerTrads({ locales }) {
		const importedTrads = [];

		for (const locale of locales) {
			try {
				const { default: data } = await import(`./translations/${locale}.json`);
				importedTrads.push({
					data: prefixPluginTranslations(data, pluginId),
					locale,
				});
			} catch (error) {
				importedTrads.push({ data: {}, locale });
			}
		}

		return importedTrads;
	},
};
