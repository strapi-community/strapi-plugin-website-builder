# Quick Start

## Installation & Configuration

::: info
This plugin is compatible with Strapi v4.x only. While it may work with the older Strapi versions, they are not supported. It is recommended to always use the latest version of Strapi.
:::

1. Install the plugin in the root directory of your strapi project.

:::: code-group

```bash [npm]
npm i strapi-plugin-website-builder
```

```bash [yarn]
yarn add strapi-plugin-website-builder
```

::::

2. Enable the plugin at `./config/plugins.js`.

```js
module.exports = ({ env }) => ({
  // ...
  'website-builder': {
    enabled: true,
    config: {
      builds: [
        {
          url: 'https://link-to-hit-on-trigger.com'
          trigger: {
            type: 'manual'
          },
        },
      ],
    },
  },
  // ...
});
```

## Usage

Once the plugin has been installed and configured, it should show in the sidebar as `Website Builder`. To trigger a manual build select the `Website Builder` menu item in the sidebar and click the `Trigger` button fr the build process you wish to start.

::: warning
If the plugin does not show in the admin sidebar after the plugin is enabled then a clean rebuild of the admin is required. This can be done by deleting the generated `.cache` and `build` folders and re-running the develop command.
:::
