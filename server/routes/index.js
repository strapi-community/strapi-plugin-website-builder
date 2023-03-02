'use strict';

const logRoutes = require('./log-routes');
const buildRoutes = require('./build-routes');
const vercelRoutes = require('./vercel-routes');

module.exports = [...logRoutes, ...buildRoutes, ...vercelRoutes];
