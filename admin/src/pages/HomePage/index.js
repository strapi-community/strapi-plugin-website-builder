/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { Box } from '@strapi/design-system/Box';
import { HomeHeaderLayout } from './components/HomeHeaderLayout';
import { HomeContentLayout } from './components/HomeContentLayout';

const HomePage = () => {
	return (
		<Box>
			<HomeHeaderLayout />
			<HomeContentLayout />
		</Box>
	);
};

export default memo(HomePage);
