import React from 'react';
import PropTypes from 'prop-types';
import { SingleCheckbox } from './SingleCheckbox';
import { CheckboxHeader } from './CheckboxHeader';

export function CheckboxGroup({ label, options, selected, handleSelection, searchTerm }) {
	return (
		<>
			<div className='mt-0.5 flex flex-col rounded-b-lg divide-none bg-container shadow-md max-h-40 overflow-y-auto'>
				{searchTerm.length === 0 && <CheckboxHeader label={label} options={options} selected={selected} handleSelection={handleSelection} />}
				{options.map((item) => (
					<SingleCheckbox
						key={item.id}
						label={item.name}
						checked={selected.includes(item.id)}
						onChange={(event) => {
							event.target.checked
								? handleSelection([...selected, item.id])
								: handleSelection(selected.filter((id) => id !== item.id));
						}}
					/>
				))}
			</div>
		</>
	);
}

CheckboxGroup.propTypes = {
	options: PropTypes.array,
	selected: PropTypes.array,
	handleSelection: PropTypes.func,
};
