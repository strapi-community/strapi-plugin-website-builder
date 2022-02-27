import React from 'react';
import { Thead, Tr, Th } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils/getTrad';

const headers = ['ID', 'Status', 'Trigger', 'Timestamp', 'Actions'];

export const LogTableHeaders = () => {
	const { formatMessage } = useIntl();
	return (
		<Thead>
			<Tr>
				{headers.map((header, i) => (
					<Th key={i}>
						<Typography variant="sigma">
							{formatMessage({
								id: getTrad(`log-table.header.${header.toLowerCase()}`),
								defaultMessage: header,
							})}
						</Typography>
					</Th>
				))}
			</Tr>
		</Thead>
	);
};
