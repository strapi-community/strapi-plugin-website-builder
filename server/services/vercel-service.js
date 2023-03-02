'use strict';

const axios = require('axios').default;
const { getPluginService } = require('../utils/getPluginService');

module.exports = ({ strapi }) => ({
	getDeployHookId(settings) {
		return settings.url.substring(settings.url.lastIndexOf('/') + 1);
	},

	async getFirstEmptyLog(strapi) {
		const logs = await getPluginService(strapi, 'logService').find({
			filters: {
				vercelDeploymentUid: {
					$null: true,
				}
			},
			sort: {
				createdAt: 'ASC'
			},
			start: 0,
			limit: 1,
		});

		if(logs.length === 1) {
			return {
				...logs[0],
				createdAtTimestamp: new Date(logs[0].createdAt).getTime()
			};
		}
	},

	async getLogToUpdate(strapi) {
		return await getPluginService(strapi, 'logService').find({
			filters: {
				$and: [
					{
						vercelDeploymentUid: {
							$notNull: true,
						}
					},
					{
						vercelStatus: {
							$notIn: ['READY', 'CANCELED', 'ERROR'],
						}
					},
				]
			},
			sort: {
				createdAt: 'ASC'
			},
			start: 0,
			limit: 10,
		});
	},

	async getVercelDeployments(settings, since) {
		let params = {
				app: settings.vercel.app,
				teamId: settings.vercel.teamId
		};

		if(since) {
			params.since = since;
		}

		const deployments = await axios({
			method: 'GET',
			url: 'https://api.vercel.com/v6/deployments',
			data: {},
			headers: { Authorization: `Bearer ${settings.vercel.accessToken}` },
			params
		});

		return deployments.data.deployments.filter((item) => {
			return item.meta.deployHookId === this.getDeployHookId(settings)
		})
	},

	async getVercelDeploymentBuildStatus(settings, deploymentUid) {
		let params = {
				app: settings.vercel.app,
				teamId: settings.vercel.teamId
		};

		const deployments = await axios({
			method: 'GET',
			url: `https://api.vercel.com/v11/deployments/${deploymentUid}/builds`,
			data: {},
			headers: { Authorization: `Bearer ${settings.vercel.accessToken}` },
			params
		});

		if(deployments.data.builds.length > 0)
			return deployments.data.builds[0]
	},

	async updateLogs(settings) {
		const logs = await this.getLogToUpdate(strapi);

		await logs.forEach(async(log) =>  {
			const vercelDeploymentBuildStatus = await this.getVercelDeploymentBuildStatus(settings, log.vercelDeploymentUid);

			if(vercelDeploymentBuildStatus) {
				getPluginService(strapi, 'logService').update(log.id, {
					vercelStatus: vercelDeploymentBuildStatus.readyState,
					vercelStatusUpdatedAt: (new Date()).toISOString(),
				});
			}
		});
	},

	async checkEmptyLogs(settings) {
		let log;

		while(log = await this.getFirstEmptyLog(strapi)) {
			const vercelDeployments = await this.getVercelDeployments(settings, log.createdAtTimestamp);

			getPluginService(strapi, 'logService').update(log.id, {
				vercelDeploymentUid: vercelDeployments[vercelDeployments.length - 1].uid,
				vercelStatus: vercelDeployments[vercelDeployments.length - 1].state,
				vercelStatusUpdatedAt: (new Date()).toISOString(),
			});
		}
	},

	async checkStates({ record, settings }) {
		try {
			await this.updateLogs(settings);
			await this.checkEmptyLogs(settings);
		} catch (error) {
			console.log(error);
		}
	},
});
