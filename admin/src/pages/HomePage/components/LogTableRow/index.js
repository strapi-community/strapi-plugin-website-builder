import React from 'react';
import PropTypes from 'prop-types';
import { Tr, Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { IconButton } from '@strapi/design-system/IconButton';
import Trash from '@strapi/icons/Trash';

const LogTableRow = ({ log, handleDelete }) => {
	return (
		<Tr key={log.id}>
			<Td>
				<Typography textColor="neutral800">{log.id}</Typography>
			</Td>
			<Td>
				<Typography textColor="neutral800">{log.status}</Typography>
			</Td>
			<Td>
				<Typography textColor="neutral800">{log.trigger}</Typography>
			</Td>
			<Td>
				<Typography textColor="neutral800">{log.createdAt}</Typography>
			</Td>
			<Td>
				<IconButton onClick={() => handleDelete(log.id)} label="Delete" noBorder icon={<Trash />} />
			</Td>
		</Tr>
	);
};

LogTableRow.propTypes = {
	log: PropTypes.shape({
		id: PropTypes.string.isRequired,
		status: PropTypes.number.isRequired,
		trigger: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
	}).isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export { LogTableRow };
