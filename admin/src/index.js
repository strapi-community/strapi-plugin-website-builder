import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { PLUGIN_ID } from './utils/constants';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

const name = 'Website Builder';

export default {
	register(app) {
		app.addMenuLink({
			to: `/plugins/${PLUGIN_ID}`,
			icon: PluginIcon,
			intlLabel: {
				id: `${PLUGIN_ID}.plugin.name`,
				defaultMessage: name,
			},
			Component: async () => {
				const component = await import(/* webpackChunkName: "[website-builder-request]" */ './pages/App');

				return component;
			},
		});
		app.registerPlugin({
			id: PLUGIN_ID,
			initializer: Initializer,
			isReady: false,
			name,
		});
	},
	async registerTrads({ locales }) {
		const importedTrads = await Promise.all(
			locales.map((locale) => {
				return import(/* webpackChunkName: "translation-[website-builder-request]" */ `./translations/${locale}.json`)
					.then(({ default: data }) => {
						return {
							data: prefixPluginTranslations(data, PLUGIN_ID),
							locale,
						};
					})
					.catch(() => {
						return {
							data: {},
							locale,
						};
					});
			})
		);

		return Promise.resolve(importedTrads);
	},
};
