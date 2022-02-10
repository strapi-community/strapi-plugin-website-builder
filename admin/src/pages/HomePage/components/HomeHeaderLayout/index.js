import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Publish from '@strapi/icons/Play';
import { HeaderLayout } from '@strapi/design-system/Layout';
import { Button } from '@strapi/design-system/Button';
import { requestPluginEndpoint } from '../../../../utils/requestPluginEndpoint';

const triggerBuild = () =>
	requestPluginEndpoint('build', {
		method: 'POST',
	});

export const HomeHeaderLayout = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation(triggerBuild, {
		onSuccess: () => {
			queryClient.invalidateQueries('build-logs');
		},
	});

	const handleTrigger = async () => mutation.mutate();
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
