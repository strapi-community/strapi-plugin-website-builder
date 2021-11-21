# Strapi plugin website-builder

A plugin for [Strapi](https://github.com/strapi/strapi) that provides the ability to manually trigger website builds

## Requirements

Complete installation requirements the same as Strapi itself and can be found in the documentation under [Quick Start Guide](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html) Prerequisites info card.

**Supported Strapi versions**:

- Strapi v3.6.8

(ThWhile this plugin may work with the older Strapi versions, they are not supported.)

**It is recommended to always use the latest version of Strapi when starting new projects**.

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
  // This is the URL that will be POST to on trigger. Required
  url: 'https://link-to-hit-on-trigger.com',
  // Object of any headers you might need. Optional
  headers: {
   'Content-Type': 'application/json',
  },
  // Max number of logs to store. Defaults to 5
  maxNumOfLogs: 5,
 },
});
```

**IMPORTANT NOTE**: Make sure any sensitive data is stored in env files.

## Usage

Once the plugin has been installed and configured, it will show in the sidebar as `Website Builder`.
To trigger a manual build select the `Website Builder` menu item in the sidebar and click
the `Trigger Build` button to start the build process.
