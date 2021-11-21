/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import { Header } from '@buffetjs/custom';
import { Padded } from '@buffetjs/core';
import LogTable from '../../components/LogTable';

import pluginEndpointRequest from '../../utils/pluginEndpointRequest';
import getTrad from '../../utils/getTrad';

const HomePage = () => {
	const { formatMessage } = useGlobalContext();
	const [logs, setLogs] = useState([]);

	async function handlePublish() {
		let logs;
		try {
			await pluginEndpointRequest('publish', {
				method: 'POST',
			});
			strapi.notification.success(getTrad('publish.success'));

			const time = Date.now();
			logs = await pluginEndpointRequest('logs', {
				method: 'POST',
				params: {
					id: time,
					status: 'Success',
					timestamp: time,
				},
			});
		} catch (error) {
			strapi.notification.error(getTrad('publish.error'));
			logs = await pluginEndpointRequest('logs', {
				method: 'POST',
				params: {
					id: time,
					status: 'Error',
					timestamp: time,
				},
			});
		} finally {
			setLogs(logs.data);
		}
	}

	// set initial state for logs
	useEffect(() => {
		async function getBuildLogs() {
			try {
				const response = await pluginEndpointRequest('logs', {
					method: 'GET',
				});
				setLogs(response.data);
			} catch (error) {
				strapi.notification.error(getTrad('logs.get.error'));
			}
		}

		getBuildLogs();

		return () => {
			let ignore = true;
		};
	}, []);

	return (
		<div>
			<Padded size="md" top left bottom right>
				<Header
					title={{ label: formatMessage({ id: getTrad('home.title') }) }}
					content={formatMessage({ id: getTrad('home.description') })}
					actions={[
						{
							label: formatMessage({
								id: getTrad('home.button.trigger'),
							}),
							onClick: handlePublish,
							color: 'success',
							type: 'submit',
						},
					]}
				/>
				<LogTable rows={logs} />
			</Padded>
		</div>
	);
};

export default memo(HomePage);
