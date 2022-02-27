# strapi-plugin-website-builder

A plugin for [Strapi](https://github.com/strapi/strapi) that provides the ability to trigger website builds manually, periodically or through model events.

## Requirements

The installation requirements are the same as Strapi itself and can be found in the documentation on the [Quick Start](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html) page in the Prerequisites info card.

### Supported Strapi versions

- v4.x.x

**NOTE**: While this plugin may work with the older Strapi versions, they are not supported, it is always recommended to use the latest version of Strapi.

## Installation

```sh
npm install strapi-plugin-website-builder
```

**or**

```sh
yarn add strapi-plugin-website-builder
```

## Configuration

The plugin configuration is stored in a config file located at `./config/plugins.js`.

The plugin has different structures depending on the type of trigger for the build. Each of the following sample configurations is the minimum needed for their respective trigger type.

### Manual Configuration

```javascript
module.exports = ({ env }) => ({
 'website-builder': {
    enabled: true,
    config: {
      url: 'https://link-to-hit-on-trigger.com',
      trigger: {
        type: 'manual',
      },
    }
  },
});
```

### Cron/Periodic Configuration

```javascript
module.exports = ({ env }) => ({
 'website-builder': {
    enabled: true,
    config: {
      url: 'https://link-to-hit-on-trigger.com',
      trigger: {
        type: 'cron',
        cron: '* * 1 * * *',
      },
    }
  },
});
```

### Event Configuration

```javascript
module.exports = ({ env }) => ({
 'website-builder': {
    enabled: true,
    config: {
      url: 'https://link-to-hit-on-trigger.com',
      trigger: {
        type: 'event',
        events: [
          {
            model: 'recipes',
            types: ['create', 'delete'],
          },
        ],
      },
    }
  },
});
```

**IMPORTANT NOTE**: Make sure any sensitive data is stored in env files.

#### The Complete Plugin Configuration  Object

| Property | Description | Type | Required |
| -------- | ----------- | ---- | -------- |
| url | The trigger URL for the website build. | String | Yes |
| headers | Any headers to send along with the request. | Object | No |
| body | Any body data to send along with the request. | Object | No |
| secret | Secret key to sign body of the request with. | Object | No |
| secret.hash | Algorith to use for signing e.g. sha1, sha256, etc. | string | Yes |
| secret.headerKey | Header key where the signature should be stored. | string | Yes |
| secret.secretKey | Secret key to sign body with. | string | Yes |
| trigger | The trigger conditions for the build.  | Object | Yes |
| trigger.type | The type of trigger. The current supported options are `manual`,`cron` and `event` | String | Yes |
| trigger.cron | The cron expression to use for cron trigger. The supported expressions are the same as in the [strapi docs](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/cronjobs.html#cron-jobs) | String | Only if the type is cron |
| trigger.events | The events to use for the event trigger. | Array | Only if the type is event |
| trigger.events.model | The model to listen for events on. | String | Yes |
| trigger.events.types | The model events to trigger on. The current supported events are `create`, `update` and `delete` | Array | Yes |

## Usage

Once the plugin has been installed and configured, it will show in the sidebar as `Website Builder`.
To trigger a manual build select the `Website Builder` menu item in the sidebar and click
the `Trigger Build` button to start a build process.

## Bugs
If any bugs are found please report them as a [Github Issue](https://github.com/ComfortablyCoding/strapi-plugin-website-builder/issues)