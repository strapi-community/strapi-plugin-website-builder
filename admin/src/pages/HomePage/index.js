/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Box } from '@strapi/design-system/Box';
import { HomeHeaderLayout } from './components/HomeHeaderLayout';
import { HomeContentLayout } from './components/HomeContentLayout';

const client = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const HomePage = () => {
	return (
		<QueryClientProvider client={client}>
			<Box>
				<HomeHeaderLayout />
				<HomeContentLayout />
			</Box>
		</QueryClientProvider>
	);
};

export default memo(HomePage);
