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
			if (eventModels.includes(data.model)) {
				getPluginService(strapi, 'buildService').build({
					settings,
					trigger: { type: 'event', data: { type: event, ...data } },
				});
			}
		});
	}
};

module.exports = {
	setupEventWebhook,
};
