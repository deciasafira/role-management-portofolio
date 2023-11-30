// Author  : Abidzar Zulfa, Daniel Salim
// Version : 1.2.0 (25 Oktober 2023)

import { useState, useRef, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

const CategoryButton = ({
  selectedCategory,
  setSelectedCategory,
  isCategoryClicked,
  setIsCategoryClicked
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedCategory(option);
    setShowDropdown(false);
    setIsCategoryClicked(true)
  };

  const categories = ['All Categories', 'Role Name', 'Workset', 'Services'];

  return (
    <div className="flex relative w-72 items-center gap-7">
      <FaFilter className="text-white w-6 h-6" />
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="z-11 pr-1 py-2 h-14 w-full text-left bg-container border-white focus:border-light-primary rounded-md shadow-md border sm:text-sm"
        type="button"
      >
        <div className="ml-5 flex justify-between items-center">
          <span className="font-medium text-lg font">{isCategoryClicked ? selectedCategory : "Filter by"}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 mr-3 ${showDropdown ? "transform rotate-180" : ""}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11.2031 16.5141L4.82815 10.1391C4.38752 9.69844 4.38752 8.98594 4.82815 8.55L5.88752 7.49062C6.32815 7.05 7.04065 7.05 7.47659 7.49062L11.9953 12.0094L16.5141 7.49062C16.9547 7.05 17.6672 7.05 18.1031 7.49062L19.1625 8.55C19.6031 8.99062 19.6031 9.70312 19.1625 10.1391L12.7875 16.5141C12.3563 16.9547 11.6438 16.9547 11.2031 16.5141Z" fill="white" />
          </svg>
        </div>
      </button>
      {showDropdown && (
        <ul ref={modalRef} className="absolute w-category-list z-20 mt-56 ml-12 rounded-md bg-container border-white border divide-none divide-gray-400 shadow-md">
          {categories.map((option, i) => (
            <li
              key={i}
              onClick={() => handleOptionClick(option)}
              className="px-3 py-2 cursor-pointer hover:bg-low-container"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryButton;
