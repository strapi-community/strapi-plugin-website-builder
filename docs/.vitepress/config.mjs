import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Strapi Plugin Website Builder',
	description:
		'A plugin for Strapi Headless CMS that provides the ability to trigger website builds manually, periodically or through model events.',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Quick Start', link: '/quick-start' },
			{ text: 'Configuration API', link: '/config-api' },
		],

		sidebar: [
			{
				items: [
					{ text: 'Quick Start', link: '/quick-start' },
					{ text: 'Build Triggers', link: '/build-triggers' },
					{ text: 'Configuration API', link: '/config-api' },
				],
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/ComfortablyCoding/strapi-plugin-website-builder' }],
	},
});
