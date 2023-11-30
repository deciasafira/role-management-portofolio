import React from "react";
import { cn } from '../../../utils/cn';

const EditItem = ({ label, value, className, onChange, maxCharacters }) => {
  const handleChange = (e) => {
    const pattern = /^[A-Za-z]*$/;
    if (pattern.test(e.target.value)) {
      onChange(e.target.value);
    };
  };

  return (
    <input
      type="yahoo"
      value={value}
      onChange={handleChange} // Add the onChange handler
      placeholder={label}
      maxLength={maxCharacters}
      className={cn('w-full h-12 justify-end p-2.5 rounded-lg bg-high-container block font-thin overflow-y-auto border border-white', className)}
    />
  );
};

export default EditItem;