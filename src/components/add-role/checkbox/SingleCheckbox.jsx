import { cn } from '../../../utils/cn';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export const SingleCheckbox = ({ label, checked, onChange }) => {
	const darkMode = useSelector((state) => state.darkMode);

	return (
		<label className="pl-5 flex relative items-center px-3 py-2 cursor-pointer hover:bg-low-container">
			<input
				id="default-checkbox"
				type='checkbox'
				className="w-4 h-4 z-100 appearance-none bg-transparent text-black border-2 rounded"
				checked={checked}
				onChange={onChange}
			/>
			<FontAwesomeIcon
				icon={faCheck}
				className={`h-3 w-3 left-edit-user text-white absolute ${checked ? "opacity-100" : "opacity-0"}`}
			/>
			<span className="ml-4">
				{label}
			</span>
		</label>
	);
};

SingleCheckbox.propTypes = {
	label: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
};
