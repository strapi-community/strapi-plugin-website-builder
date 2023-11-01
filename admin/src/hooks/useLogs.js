import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';

import { PLUGIN_ID } from '../utils/constants';
import { getTrad } from '../utils/common';

export const useLogs = () => {
	const { get, del } = useFetchClient();
	const toggleNotification = useNotification();
	const queryClient = useQueryClient();

	function getLogs({ page }) {
		return useQuery({
			queryKey: [PLUGIN_ID, 'logs'],
			queryFn: function () {
				return get(`/${PLUGIN_ID}/logs`, { params: { sort: ['id:desc'], pagination: { page } } });
			},
			select: function ({ data }) {
				return { ...data } || false;
			},
		});
	}

	const { mutateAsync: deleteLog } = useMutation({
		mutationFn: function (id) {
			return del(`/${PLUGIN_ID}/logs/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries([PLUGIN_ID, 'logs']);
			toggleNotification({
				type: 'success',
				message: { id: getTrad('log.notification.delete.success') },
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
		getLogs,
		deleteLog,
	};
};
