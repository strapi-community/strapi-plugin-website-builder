/*
 *
 * LogsPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
	Layout,
	Main,
	HeaderLayout,
	ContentLayout,
	Box,
	Table,
	Thead,
	Th,
	Tr,
	Tbody,
	Td,
	EmptyStateLayout,
	Typography,
	VisuallyHidden,
	IconButton,
} from '@strapi/design-system';
import { EmptyDocuments, Trash } from '@strapi/icons';
import { LoadingIndicatorPage } from '@strapi/helper-plugin';
import { useLogs } from '../../../hooks/useLogs';
import { getTrad } from '../../../utils/common';

const LogsPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [logs, setLogs] = useState([]);
	const { formatMessage } = useIntl();
	const { getLogs, deleteLog } = useLogs();

	const { isLoading: isLoadingLogs, data: response, isRefetching: isRefetchingLogs } = getLogs({ page: 1 });

	useEffect(() => {
		setIsLoading(true);
		if (!isLoadingLogs && !isRefetchingLogs) {
			if (response && !response.error) {
				setLogs(response.data);
			}
			setIsLoading(false);
		}
	}, [isLoadingLogs, isRefetchingLogs]);

	function isSuccessStatus(status) {
		return status >= 200 && 400 > status;
	}

	function handleLogDelete(id) {
		deleteLog(id);
	}

	return (
		<Layout>
			<Main aria-busy={isLoading}>
				<HeaderLayout title={formatMessage({ id: getTrad('logs.header.title'), defaultMessage: 'Build Logs' })} />
				<ContentLayout>
					{isLoading ? (
						<Box background="neutral0" padding={6} shadow="filterShadow" hasRadius>
							<LoadingIndicatorPage />
						</Box>
					) : logs.length > 0 ? (
						<>
							<Table colCount={5} rowCount={logs.length + 1}>
								<Thead>
									<Tr>
										<Th>
											<Typography variant="sigma" textColor="neutral600">
												{formatMessage({
													id: getTrad('logs.table.header.id'),
													defaultMessage: 'ID',
												})}
											</Typography>
										</Th>
										<Th>
											<Typography variant="sigma" textColor="neutral600">
												{formatMessage({
													id: getTrad('logs.table.header.build'),
													defaultMessage: 'Build',
												})}
											</Typography>
										</Th>
										<Th>
											<Typography variant="sigma" textColor="neutral600">
												{formatMessage({
													id: getTrad('logs.table.header.trigger'),
													defaultMessage: 'Trigger',
												})}
											</Typography>
										</Th>
										<Th>
											<Typography variant="sigma" textColor="neutral600">
												{formatMessage({
													id: getTrad('logs.table.header.status'),
													defaultMessage: 'Status',
												})}
											</Typography>
										</Th>
										<Th>
											<Typography variant="sigma" fontWeight="semiBold" textColor="neutral600">
												{formatMessage({
													id: getTrad('logs.table.header.timestamp'),
													defaultMessage: 'Timestamp',
												})}
											</Typography>
										</Th>
										<Th>
											<VisuallyHidden>
												{formatMessage({
													id: getTrad('table.header.actions'),
													defaultMessage: 'Actions',
												})}
											</VisuallyHidden>
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{logs.map((log) => (
										<Tr key={log.id}>
											<Td>
												<Typography textColor="neutral800">{log.id}</Typography>
											</Td>
											<Td>
												<Typography textColor="neutral800">{log.attributes.trigger}</Typography>
											</Td>
											<Td>
												<Typography textColor="neutral800">{log.attributes.build || 'unknown'}</Typography>
											</Td>
											<Td>
												<Typography
													fontWeight="semiBold"
													textColor={isSuccessStatus(log.attributes.status) ? 'success500' : 'danger500'}
												>
													{log.attributes.status}
												</Typography>
											</Td>
											<Td>
												<Typography textColor="neutral800">{log.attributes.createdAt}</Typography>
											</Td>
											<Td>
												<IconButton onClick={() => handleLogDelete(log.id)} label="Delete" noBorder icon={<Trash />} />
											</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</>
					) : (
						<EmptyStateLayout
							icon={<EmptyDocuments width="160px" />}
							content={formatMessage({
								id: getTrad('logs.empty'),
								defaultMessage: 'No logs found',
							})}
						/>
					)}
				</ContentLayout>
			</Main>
		</Layout>
	);
};

export default memo(LogsPage);
