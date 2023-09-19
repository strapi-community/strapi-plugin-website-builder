/*
 *
 * BuildPage
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
	Switch,
	LinkButton,
	Button,
	Flex,
} from '@strapi/design-system';
import { EmptyDocuments, Stack, Play } from '@strapi/icons';
import { LoadingIndicatorPage } from '@strapi/helper-plugin';
import { PLUGIN_ID } from '../../../utils/constants';
import { useBuild } from '../../../hooks/useBuild';
import { getTrad } from '../../../utils/common';

const BuildPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [builds, setBuilds] = useState([]);
	const { formatMessage } = useIntl();
	const { triggerBuild, getBuilds } = useBuild();

	const { isLoading: isLoadingBuilds, data, isRefetching: isRefetchingBuilds } = getBuilds();

	useEffect(() => {
		setIsLoading(true);
		if (!isLoadingBuilds && !isRefetchingBuilds) {
			if (data) {
				setBuilds(data);
			}
			setIsLoading(false);
		}
	}, [isLoadingBuilds, isRefetchingBuilds]);

	function handleTriggerBuild(name) {
		triggerBuild({ name });
	}

	return (
		<Layout>
			<Main aria-busy={isLoading}>
				<HeaderLayout
					title={formatMessage({ id: getTrad('builds.header.title'), defaultMessage: 'Builds' })}
					primaryAction={
						<LinkButton variant="secondary" size="s" endIcon={<Stack />} to={`/plugins/${PLUGIN_ID}/logs`}>
							Logs
						</LinkButton>
					}
				/>
				<ContentLayout>
					{isLoading ? (
						<Box background="neutral0" padding={6} shadow="filterShadow" hasRadius>
							<LoadingIndicatorPage />
						</Box>
					) : builds.length > 0 ? (
						<Table colCount={5} rowCount={builds.length + 1}>
							<Thead>
								<Tr>
									<Th width="5%">
										<Typography variant="sigma" textColor="neutral600">
											{formatMessage({
												id: getTrad('builds.table.header.enabled'),
												defaultMessage: 'Enabled',
											})}
										</Typography>
									</Th>
									<Th width="5%">
										<Typography variant="sigma" textColor="neutral600">
											{formatMessage({
												id: getTrad('builds.table.header.trigger'),
												defaultMessage: 'Trigger',
											})}
										</Typography>
									</Th>
									<Th width="20%">
										<Typography variant="sigma" fontWeight="semiBold" textColor="neutral600">
											{formatMessage({
												id: getTrad('builds.table.header.name'),
												defaultMessage: 'Name',
											})}
										</Typography>
									</Th>
									<Th width="60%">
										<Typography variant="sigma" textColor="neutral600">
											{formatMessage({
												id: getTrad('builds.table.header.url'),
												defaultMessage: 'URL',
											})}
										</Typography>
									</Th>
									<Th width="10%">
										{formatMessage({
											id: getTrad('table.header.actions'),
											defaultMessage: 'Actions',
										})}
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								{builds.map((build) => (
									<Tr key={btoa(build.name)}>
										<Td>
											<Switch label="Build Enabled" selected={build.enabled} />
										</Td>
										<Td>
											<Typography textColor="neutral800">{build.trigger.type}</Typography>
										</Td>
										<Td>
											<Typography fontWeight="semiBold" textColor="neutral800">
												{build.name}
											</Typography>
										</Td>
										<Td>
											<Typography textColor="neutral800">{build.url}</Typography>
										</Td>
										<Td>
											<Flex gap={2}>
												{build.trigger.type === 'manual' && (
													<Button
														variant="default"
														size="S"
														disabled={build.enabled === false}
														endIcon={<Play />}
														onClick={() => handleTriggerBuild(build.name)}
													>
														Trigger
													</Button>
												)}
											</Flex>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					) : (
						<EmptyStateLayout
							icon={<EmptyDocuments width="160px" />}
							content={formatMessage({
								id: getTrad('builds.empty'),
								defaultMessage: 'No builds found',
							})}
						/>
					)}
				</ContentLayout>
			</Main>
		</Layout>
	);
};

export default memo(BuildPage);
