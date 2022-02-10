'use strict';

const logRoutes = require('./log-routes');
const buildRoutes = require('./build-routes');

module.exports = [...logRoutes, ...buildRoutes];
