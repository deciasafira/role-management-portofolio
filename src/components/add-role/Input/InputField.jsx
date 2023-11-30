import React from 'react';
import { cn } from '../../../utils/cn';

const InputField = ({ type = 'text', value, changeHandler, placeholder, className, name, onFocus, onBlur }) => {
	return (
		<input
			type={type}
			value={value}
			onChange={changeHandler}
			placeholder={placeholder}
			name={name}
			className={cn('h-12 p-4 text-lg font-normal rounded-md border', className)}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	);
};

export default InputField;
