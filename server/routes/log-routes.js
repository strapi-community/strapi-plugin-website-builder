'use strict';

module.exports = [
	{
		method: 'GET',
		path: '/logs',
		handler: 'logController.find',
	},
	{
		method: 'POST',
		path: '/logs',
		handler: 'logController.create',
	},
	{
		method: 'DELETE',
		path: '/logs/:id',
		handler: 'logController.delete',
	},
];
