/**
 *
 * Initializer
 *
 */

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { PLUGIN_ID } from '../../utils/constants';

const Initializer = ({ setPlugin }) => {
	const ref = useRef();
	ref.current = setPlugin;

	useEffect(() => {
		ref.current(PLUGIN_ID);
	}, []);

	return null;
};

Initializer.propTypes = {
	setPlugin: PropTypes.func.isRequired,
};

export default Initializer;
