import React from 'react';
import { cn } from '../../../utils/cn';

const InputField = ({ type = 'text', value, changeHandler, placeholder, className, name, maxCharacters }) => {
	const handleInputChange = (e) => {
		const inputValue = e.target.value;
		if (inputValue.length <= maxCharacters) {
			changeHandler(e)
		}
	}
	return (
		<input
			type={type}
			value={value}
			onChange={handleInputChange}
			placeholder={placeholder}
			name={name}
			maxLength={maxCharacters}
			className={cn('h-12 p-4 text-lg font-normal rounded-md border', className)}
		/>

	);
};

export default InputField;
