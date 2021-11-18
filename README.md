# Strapi plugin website-builder

A plugin for [Strapi Headless CMS](https://github.com/strapi/strapi) that provides the ability to manually trigger website builds

## Installation

```bash
npm install strapi-plugin-website-builder
```

**or**

```bash
yarn add strapi-plugin-website-builder
```

## Configuration

Generate a config file at `config/plugins.js` with the following structure,

```javascript
module.exports = ({ env }) => ({
	'website-builder': {
		url: 'https://link-to-hit-on-trigger.com', // This is the URL that will be POST to on trigger. Required
		headers: {
			'Content-Type': 'application/json',
		}, // Object of any headers you might need. Optional
		maxNumOfLogs: 5, // Max number of logs to store. Defaults to 5
	},
});
```

**IMPORTANT NOTE**: Make sure any sensitive data is stored in env files.

## Usage

Once the plugin has been installed and the configuration set the plugin will show in the sidebar as `Website Builder`. When you want to trigger a manual build click the `Website Builder` menu item in the sidebar and click `Trigger Build` to start the build process.
