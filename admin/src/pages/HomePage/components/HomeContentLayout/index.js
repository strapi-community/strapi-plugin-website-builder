import React from 'react';
import { ContentLayout } from '@strapi/design-system/Layout';
import { Stack } from '@strapi/design-system/Stack';
import { LogTable } from '../LogTable';

export const HomeContentLayout = () => (
	<ContentLayout>
		<Stack size={4}>
			<LogTable />
		</Stack>
	</ContentLayout>
);
