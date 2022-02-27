import React from 'react';
import { Table, Tbody } from '@strapi/design-system/Table';
import { LogTableHeaders } from './LogTableHeaders';
import { LogTableRow } from './LogTableRow';
import { LogTableRowEmpty } from './LogTableRowEmpty';
import { useReactQuery } from '../../hooks/useReactQuery';

export const LogTable = () => {
	const { buildLogQueries } = useReactQuery();

	const { isLoading, data } = buildLogQueries.getBuildLogs();

	return (
		<Table>
			<LogTableHeaders />
			<Tbody>
				{!isLoading && data.logs.length ? (
					data.logs.map((log) => <LogTableRow key={log.id} log={log} />)
				) : (
					<LogTableRowEmpty />
				)}
			</Tbody>
		</Table>
	);
};
