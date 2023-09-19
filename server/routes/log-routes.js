'use strict';

module.exports = [
	{
		method: 'GET',
		path: '/logs',
		handler: 'log.find',
	},
	{
		method: 'DELETE',
		path: '/logs/:id',
		handler: 'log.delete',
	},
];
