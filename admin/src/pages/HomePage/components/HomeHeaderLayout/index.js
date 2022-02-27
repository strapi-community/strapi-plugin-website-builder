import React from 'react';
import Publish from '@strapi/icons/Play';
import { HeaderLayout } from '@strapi/design-system/Layout';
import { Button } from '@strapi/design-system/Button';
import { useReactQuery } from '../../../../hooks/useReactQuery';

export const HomeHeaderLayout = () => {
	const { buildMutations } = useReactQuery();

	const handleTrigger = async () => buildMutations.create.mutate();
	return (
		<HeaderLayout
			primaryAction={
				<Button onClick={handleTrigger} variant="primary" startIcon={<Publish />} size="L">
					Trigger Build
				</Button>
			}
			title="Website Builder"
			subtitle="The right way to build websites."
		/>
	);
};
