# Configuration API

- default

```json
{
	"shared": {},
	"builds": [],
	"hooks": {}
}
```

## shared

- type: `object`

> default values between all builds

- example

```json
{
	"headers": {
		"X-Powered-By": "Strapi CMS"
	}
}
```

### headers

- type: `function` or `object`
- arguments: `{ record }`
- description: The default headers to be sent with the request for all builds. Any build specific headers with the same nproperty ame will override these. A record is only provided to the function for event triggers.

### params

- type: `function` or `object`
- arguments: `{ record }`
- description: The default parameters to be sent with the request for all builds. Any build specific params with the same property name will override these. A record is only provided to the function for event triggers.

## build

- type `array`

> build configurations

### name

- type: `string`
- description: The name for the build. **MUST BE UNIQUE**.

### url

- type: `string`
- description: The url for the build.

### trigger

- type: `object`
- description: The trigger configuration for the build.

  - #### type

    - type: `string`
    - description: The trigger type for the build. It can be `manual`,`cron`, or `event`.

  - #### expression

    - type: `string`
    - description: The cron expression to use for the `cron` tigger type. Required for the `cron` trigger type only.

  - #### events

    - type: `array`
    - description: The events to trigger new build on. Required for the `event` trigger type only.

      - ##### uid

        - type: `string`
        - description: The uid of the content type to watch mutations on.

      - ##### actions

        - type: `actions`
        - description: The actions/mutations to listen for on the content type. Possible values are `create`,`update`,`delete`,`publish`,`unpublish`. `publish` and `unpublish` are only available on content types, not media mutations.

### method

- type: `string`
- default: `POST`
- description: The method to use for the request that triggers the build. Supported methods are `GET` and `POST`.

### headers

- type: `function` or `object`
- arguments: `{ record }`
- description: The headers to be sent with the request. A record is only provided to the function for event triggers.
- example

:::: code-group

```js [function]
{
	headers: () => ({
		'X-Powered-By': 'Lorem Ipsum',
	});
}
```

```js [object]
{
	headers: {
		'X-Powered-By': 'Lorem Ipsum',
	};
}
```

::::

### params

- type: `function` or `object`
- arguments: `{ record }`
- description: The parameters to be sent with the request. A record is only provided to the function for event triggers.
- example

:::: code-group

```js [function]
{
	params: () => ({
		lorem: 'ipsum',
	});
}
```

```js [object]
{
	params: {
		'lorem': 'ipsum',
	};
}
```

::::

### body

- type: `function` or `object`
- arguments: `{ record }`
- description: The parameters to be sent with the request. A record is only provided to the function for event triggers.
- example

:::: code-group

```js [function]
{
	body: () => ({
		lorem: 'ipsum',
	});
}
```

```js [object]
{
	body: {
		'lorem': 'ipsum',
	};
}
```

::::

## hooks

- type: `object`

> hook into specific areas to extend functionality

### beforeRequest

- type: `function`
- arguments: `requestConfig`
- description: Mutate the request before it is sent out
- example

```js
{
	hooks: {
		beforeRequest: (requestConfig) => {
			requestConfig.headers.custom = 'custom_value';
			return config;
		};
	}
}
```
