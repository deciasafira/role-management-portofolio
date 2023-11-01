import { cn } from '../../../utils/cn';
import PropTypes from 'prop-types';

export const TagsContainer = ({ values, className }) => {
	return (
		<div className={cn('flex items-center justify-start flex-wrap gap-2 py-2', className)}>
			{values.map((item) => (
				<p key={item.id} className='rounded-full bg-tags-container text-gray-800 py-1.5 px-3 text-sm'>
					{item.name}
				</p>
			))}
		</div>
	);
};

TagsContainer.propTypes = {
	values: PropTypes.array,
	classname: PropTypes.string,
};
