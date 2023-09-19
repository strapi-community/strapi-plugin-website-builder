import { useMutation, useQuery } from 'react-query';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';

import { PLUGIN_ID } from '../utils/constants';
import { getTrad } from '../utils/common';

export const useBuild = () => {
	const { post, get } = useFetchClient();
	const toggleNotification = useNotification();

	function getBuilds() {
		return useQuery({
			queryKey: [PLUGIN_ID, 'builds'],
			queryFn: function () {
				return get(`/${PLUGIN_ID}/builds`);
			},
			select: function ({ data }) {
				return data.data || false;
			},
		});
	}

	const { mutateAsync: triggerBuild } = useMutation({
		mutationFn: function (data) {
			return post(`/${PLUGIN_ID}/builds`, { data });
		},
		onSuccess: () => {
			toggleNotification({
				type: 'success',
				message: { id: getTrad('build.notification.trigger.success') },
			});
		},
		onError: (error) => {
			toggleNotification({
				type: 'warning',
				message: error.response?.error?.message || error.message || { id: 'notification.error' },
			});
		},
	});

	return {
		triggerBuild,
		getBuilds,
	};
};
