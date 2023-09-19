/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import { PLUGIN_ID } from '../../utils/constants';
import Builds from '../Builds/ListView';
import BuildLogs from '../Logs/ListView';

const App = () => {
	return (
		<Switch>
			<Route path={`/plugins/${PLUGIN_ID}`} component={Builds} exact />
			<Route path={`/plugins/${PLUGIN_ID}/logs`} component={BuildLogs} exact />
			<Route component={NotFound} />
		</Switch>
	);
};

export default App;
