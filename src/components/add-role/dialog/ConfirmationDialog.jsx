import React from 'react';
import { cn } from '../../../utils/cn';
import { Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';
import Button from '../Button2/Button';

export function ConfirmationDialog({ setShow, onSubmit }) {
	const darkMode = useSelector((state) => state.darkMode);
	return (
		<Dialog.Panel
			className={cn(
				'w-full max-w-md mx-auto rounded-2xl drop-shadow-lg p-10 bg-high-container'
			)}>
			<Dialog.Title className={cn('text-xl text-center font-bold mb-2 text-red-500')}>Save Role</Dialog.Title>
			<Dialog.Description
				className={cn('text-center font-semibold mb-4 text-white')}>
				Data from this Role will be saved.
			</Dialog.Description>

			<div className='flex items-center justify-center gap-2'>
				<Button
					clickHandler={() => setShow(false)}
					type='reset'
					className='py-2 font-semibold text-white bg-gray-500 rounded-md drop-shadow-lg min-w-[9rem]'>
					Cancel
				</Button>
				<Button
					clickHandler={() => onSubmit()}
					type='button'
					className='py-2 font-semibold text-white bg-main rounded-md drop-shadow-lg min-w-[9rem]'>
					Save
				</Button>
			</div>
		</Dialog.Panel>
	);
}
