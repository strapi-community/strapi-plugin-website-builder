'use strict';

const { getPluginService } = require('./getPluginService');

const normalizeEvents = (events) => {
	let eventModels = {};

	for (const { model, types } of events) {
		let eventPrefix = 'entry';

		// media model uses the media prefix for events
		if (model === 'media') {
			eventPrefix = 'media';
		}

		// add each model to their respective event type
		for (const eventType of types) {
			const eventKey = `${eventPrefix}.${eventType}`;
			if (!eventModels[eventKey]) {
				eventModels[eventKey] = [];
			}
			eventModels[eventKey].push(model);
		}
	}

	return eventModels;
};

/**
 * Setup function for event type trigger
 *
 */
const setupEventWebhook = (strapi, settings) => {
	const events = normalizeEvents(settings.trigger.events);

	for (const [event, eventModels] of Object.entries(events)) {
		strapi.eventHub.on(event, (data) => {
			// never trigger on 'log' because it causes an endless loop since the build always creates a log when it's done
			// don't trigger on 'file', because it will double fire on 'media' type files
			if (data.model !== 'log' && data.model !== 'file') {
				// build on any model update if event model is '*'
				// otherwise, build on matching models
				if (eventModels.includes('*') || eventModels.includes(data.model)) {
					getPluginService(strapi, 'buildService').build({
						record: data.entry,
						settings,
						trigger: { type: 'event', data: { type: event, ...data } },
					});
				}
			}
		});
	}
};

module.exports = {
	setupEventWebhook,
};
