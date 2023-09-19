'use strict';

const { getService } = require('../utils/common');
const { FILE_UID, EMIT_ACTIONS } = require('../utils/constants');

function bootstrapEvents({ strapi, build }) {
	// build valid events
	const events = new Map();
	build.trigger.events.forEach((event) => {
		// setup actions
		let actions = new Set();
		if (event.actions === '*') {
			EMIT_ACTIONS.forEach((action) => actions.add(action));
		} else {
			event.actions.forEach((action) => actions.add(action));
		}

		// setup events
		if (event.uid === '*') {
			Object.keys(strapi.contentTypes)
				.filter((uid) => /^api::/.test(uid) || uid === FILE_UID)
				.forEach((uid) => {
					events.set(uid, actions);
				});
		} else {
			events.set(event.uid, actions);
		}
	});

	EMIT_ACTIONS.forEach((action) => {
		strapi.eventHub.on(`entry.${action}`, ({ uid, entry: record }) => {
			const entry = events.get(uid);
			if (entry && entry.has(action)) {
				getService({ strapi, name: 'build' }).trigger({
					name: build.name,
					record,
					trigger: { type: 'event' },
				});
			}
		});
	});
}

module.exports = {
	bootstrapEvents,
};
