import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNotification } from '@strapi/helper-plugin';
import { build, buildLogs, vercel } from '../api';
import { getTrad } from '../utils/getTrad';

const { triggerBuild } = build;
const { fetchBuildLogs, createBuildLog, deleteBuildLog } = buildLogs;
const { checkStates } = vercel;

const getQuerykey = ({ base }) => {
	return [base];
};

const useReactQuery = () => {
	const queryClient = useQueryClient();
	const toggleNotification = useNotification();

	// universal handlers
	const handleError = (error) => {
		const message = error.response ? error.response.error.message : error.message;
		toggleNotification({
			type: 'warning',
			message,
		});
	};

	const handleSuccess = ({ invalidate, notification }) => {
		if (invalidate) {
			queryClient.invalidateQueries(invalidate);
		}
		toggleNotification({
			type: notification.type,
			message: { id: getTrad(notification.tradId) },
		});
	};

	// build
	const buildMutations = {
		create: useMutation(triggerBuild, {
			onSuccess: () => {
				const querykey = getQuerykey({
					base: 'get-build-logs',
				});
				handleSuccess({
					invalidate: querykey,
					notification: {
						type: 'success',
						tradId: `build.notification.trigger.success`,
					},
				});
			},
			onError: (error) => handleError(error),
		}),
	};

	// build logs
	const buildLogQueries = {
		getBuildLogs: (params) => {
			const queryKey = getQuerykey({
				base: 'get-build-logs',
			});
			return useQuery(queryKey, () => fetchBuildLogs(params).then((r) => r.data));
		},
	};

	const buildLogMutations = {
		delete: useMutation(deleteBuildLog, {
			onSuccess: () => {
				const querykey = getQuerykey({
					base: 'get-build-logs',
				});
				handleSuccess({
					invalidate: querykey,
					notification: {
						type: 'success',
						tradId: `build-logs.notification.delete.success`,
					},
				});
			},
			onError: (error) => handleError(error),
		}),

		create: useMutation(createBuildLog, {
			onSuccess: () => {
				const querykey = getQuerykey({
					base: 'get-build-logs',
				});
				handleSuccess({
					invalidate: querykey,
				});
			},
			onError: (error) => handleError(error),
		}),
	};

	const vercelCheckStates = {
		create: useMutation(checkStates, {
			onSuccess: () => {
				const querykey = getQuerykey({
					base: 'get-build-logs',
				});
				handleSuccess({
					invalidate: querykey,
					notification: {
						type: 'success',
						tradId: `vercel.notification.update.success`,
					},
				});
			},
			onError: (error) => handleError(error),
		})
	}

	return { buildLogQueries, buildLogMutations, buildMutations, vercelCheckStates };
};

export { useReactQuery };
