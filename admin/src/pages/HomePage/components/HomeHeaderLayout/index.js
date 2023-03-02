import React from 'react';
import Publish from '@strapi/icons/Play';
import Refresh from '@strapi/icons/Refresh';
import { HeaderLayout } from '@strapi/design-system/Layout';
import { Button } from '@strapi/design-system/Button';
import { useReactQuery } from '../../../../hooks/useReactQuery';

export const HomeHeaderLayout = () => {
	const { buildMutations, vercelCheckStates } = useReactQuery();

	const handleTriggerBuild = async () => buildMutations.create.mutate();
	const handleVercelCheckStates = async () => vercelCheckStates.create.mutate();
	return (
		<HeaderLayout
			primaryAction={
				<Button onClick={handleTriggerBuild} variant="primary" startIcon={<Publish />} size="L">
					Trigger Build
				</Button>
			}
			secondaryAction={
				<Button onClick={handleVercelCheckStates} variant="secondary" startIcon={<Refresh />} size="L">
					Update Vercel States
				</Button>
			}
			title="Website Builder"
			subtitle="The right way to build websites."
		/>
	);
};
