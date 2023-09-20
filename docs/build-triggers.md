# Builds

The plugin supports multiple builds and build configurations to cover as many use cases as possible. Each build at minimum must specify a name,url and trigger type to be valid.

Their are currently three supported trigger types `manual`,`cron`, and `event`.

## Manual Trigger

The manual trigger will start a build whenever the trigger button in the admin panel is pressed for the respective build.

```javascript
module.exports = ({ env }) => ({
  // ...
  'website-builder': {
    enabled: true,
    config: {
      builds: [
        {
          name: 'production',
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

## Periodic Trigger

The periodic trigger will start a build at the interval specified by the cron expressions. The following example triggers a new build every hour.

```javascript
module.exports = ({ env }) => ({
  // ...
  'website-builder': {
    enabled: true,
    config: {
      builds: [
        {
          name: 'production',
          url: 'https://link-to-hit-on-trigger.com'
          trigger: {
            type: 'cron',
            expression: '0 */1 * * *'
          },
        },
      ],
    },
  },
  // ...
});
```

## Event Trigger

The event trigger wull start a build whenever one of the specific actions of the defined uid is emitted. The following example triggers a build every time a new article is created.

```javascript
module.exports = ({ env }) => ({
	// ...
  'website-builder': {
    enabled: true,
    config: {
      builds: [
        {
          name: 'production',
          url: 'https://link-to-hit-on-trigger.com'
          trigger: {
            type: 'event',
            events: [
              {
                uid: 'api::articles.articles',
                actions: ['create'],
              },
            ],
          },
        },
      ],
    },
  },
  // ...
});
```

::: info
To trigger builds for image mutations use the uid `plugin::upload.file`.
:::

## Multiple Builds

The plugin supports as many build configurations as you wish to use.

```javascript
module.exports = ({ env }) => ({
  // ...
  'website-builder': {
    enabled: true,
    config: {
      builds: [
        {
          name: 'production-manual'
          url: 'https://link-to-hit-on-trigger.com',
          trigger: {
            type: 'manual'
          },
        },
        {
          name: 'development',
          enabled: env('NODE_ENV') !== 'production',
          url: 'https://link-to-hit-on-trigger.com',
          trigger: {
            type: 'manual'
          },
        },
        {
          name: 'production-edge'
          url: 'https://link-to-hit-on-trigger.com',
          trigger: {
            type: 'cron',
            expression: '0 */1 * * *'
          },
        },
        {
          name: 'production-automated'
          url: 'https://link-to-hit-on-trigger.com'
          trigger: {
            type: 'event',
            events: [
              {
                uid: 'api::articles.articles',
                actions: ['create'],
              },
            ],
          },
        },
      ],
    },
  },
  // ...
});
```
