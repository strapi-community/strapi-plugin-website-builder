import React from 'react';
import PropTypes from 'prop-types';
import { Tr, Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { IconButton } from '@strapi/design-system/IconButton';
import Trash from '@strapi/icons/Trash';
import { useReactQuery } from '../../../hooks/useReactQuery';

const LogTableRow = ({ log }) => {
	const { id, status, trigger, createdAt } = log;
	const { buildLogMutations } = useReactQuery();

	const handleBuildLogDelete = async (id) => {
		try {
			await buildLogMutations.delete.mutate({ id });
		} catch (error) {
			console.error(error);
		}
	};

	const isSuccessFullBuild = status >= 200 && 400 > status;

	return (
		<Tr>
			<Td>
				<Typography textColor="neutral900">{id}</Typography>
			</Td>
			<Td>
				<Typography textColor={isSuccessFullBuild ? 'success500' : 'danger500'}>
					{status}
				</Typography>
			</Td>
			<Td>
				<Typography textColor="neutral900">{trigger}</Typography>
			</Td>
			<Td>
				<Typography textColor="neutral900">{createdAt}</Typography>
			</Td>
			<Td>
				<IconButton
					onClick={() => handleBuildLogDelete(id)}
					label="Delete"
					noBorder
					icon={<Trash />}
				/>
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
};

export { LogTableRow };
