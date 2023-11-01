import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({ to, children, className, state, onClick }) => {
	return (
		<Link
			to={to}
			className={`py-2 px-4 flex justify-center items-center gap-2 font-medium text-base ${className}`}
			state={state}
			onClick={onClick}>
			{children}
		</Link>
	);
};

export default LinkButton;
