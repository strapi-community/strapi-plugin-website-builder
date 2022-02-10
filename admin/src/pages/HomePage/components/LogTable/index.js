import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Table, Tbody } from '@strapi/design-system/Table';
import { LogTableHeaders } from '../LogTableHeaders';
import { LogTableRow } from '../LogTableRow';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { requestPluginEndpoint } from '../../../../utils/requestPluginEndpoint';

const deleteLog = async (id) =>
	requestPluginEndpoint(`logs/${id}`, {
		method: 'DELETE',
	});

const fetchLogs = () => requestPluginEndpoint('logs');

export const LogTable = () => {
	const queryClient = useQueryClient();

	const query = useQuery('build-logs', () => fetchLogs());

	const mutation = useMutation(deleteLog, {
		onSuccess: () => {
			queryClient.invalidateQueries('build-logs');
		},
	});

	const handleLogDelete = (id) => {
		mutation.mutate(id);
	};

	useEffect(() => {
		fetchLogs();
	}, []);

	return (
		<Table>
			<LogTableHeaders />
			<Tbody>
				{!query.isLoading && query.data.data.logs.length ? (
					query.data.data.logs.map((log) => (
						<LogTableRow key={log.id} log={log} handleDelete={handleLogDelete} />
					))
				) : (
					<EmptyStateLayout />
				)}
			</Tbody>
		</Table>
	);
};
