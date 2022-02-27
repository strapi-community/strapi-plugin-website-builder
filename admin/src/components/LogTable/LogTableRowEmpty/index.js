import React from 'react';
import { Tr, Td } from '@strapi/design-system/Table';
import { NoContent } from '@strapi/helper-plugin';

const LogTableRowEmpty = () => {
	return (
		<Tr>
			<Td colSpan={5}>
				<NoContent
					content={{
						id: 'Settings.apiTokens.emptyStateLayout',
						defaultMessage: 'No Build logs',
					}}
				/>
			</Td>
		</Tr>
	);
};

export { LogTableRowEmpty };
