import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/cn';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export function CheckboxHeader({ label, options, selected, handleSelection }) {
	const darkMode = useSelector((state) => state.darkMode);

	return (
		<label className="pl-5 bg-container flex relative items-center px-3 py-2 cursor-pointer hover:bg-low-container">
			<input
				id="default-checkbox"
				type="checkbox"
				value=""
				checked={selected.length === options.length}
				className="w-4 h-4 z-100 appearance-none bg-transparent text-black border-2 rounded"
				onChange={(event) => {
					event.target.checked ? handleSelection(options.map((item) => item.id)) : handleSelection([]);
				}}
			/>
			<FontAwesomeIcon
				icon={faCheck}
				className={`h-3 w-3 left-edit-user text-white absolute ${selected.length === options.length ? "opacity-100" : "opacity-0"}`}
			/>
			<span
				className="ml-4"
			>
				All
			</span>
		</label>
	);
}

CheckboxHeader.propTypes = {
	label: PropTypes.string,
	options: PropTypes.array,
	selected: PropTypes.array,
	handleSelection: PropTypes.func,
};
