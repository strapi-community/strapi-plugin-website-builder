/*
 *
 * Log Table
 *
 */

import React, { memo } from 'react';
import { useGlobalContext } from 'strapi-helper-plugin';

import { Table, Text } from '@buffetjs/core';

import getTrad from '../utils/getTrad';
import { BUILD_LOG_TABLE_HEADERS } from '../utils/constants';

const LogTable = ({ rows }) => {
	const { formatMessage } = useGlobalContext();

	// map log table headers back with their translated titles
	const headers = BUILD_LOG_TABLE_HEADERS.map(({ translation, value }) => ({
		name: formatMessage({ id: getTrad(translation) }),
		value,
	}));

	return (
		<div>
			<Text fontSize="lg">
				{formatMessage({
					id: getTrad('log.table.title'),
				})}
			</Text>
			<Table headers={headers} rows={rows} />
		</div>
	);
};

export default memo(LogTable);
