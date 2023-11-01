import React from "react";
import { cn } from '../../../utils/cn';

const EditItem = ({ label, value, className, onChange }) => {
  const handleChange = (e) => {
    const pattern = /^[A-Za-z]*$/;;
    if (pattern.test(e.target.value)) {
      onChange(e.target.value);
    };
  };

  return (
    <div className={`pt-5 flex justify-between ${className}`}>
      <input
        type="yahoo"
        className="w-full h-12 justify-end p-2.5 rounded-lg bg-high-container block font-thin overflow-y-auto border border-white"
        placeholder={label}
        value={value}
        onChange={handleChange} // Add the onChange handler
      />
    </div>
  );
};

export default EditItem;