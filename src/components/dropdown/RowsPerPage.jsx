import { useState, useRef, useEffect } from "react";

const RowsPerPage = ({
  selectedItemsPerPage,
  setSelectedItemsPerPage,
  setActivePage,
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
    setSelectedItemsPerPage(option);
    setActivePage(1);
    setShowDropdown(false);
  };

  const itemsPerPage = ["10", "25", "50"];

  return (
    <div className="flex items-center justify-right w-fit">
      <div className="ml-2 mr-4 text-lg text-white">Rows per page: </div>
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="h-8 w-rows-per-page text-right items-right border bg-container focus:border-light-primary border-white rounded-md shadow-md sm:text-sm"
        type="button"
      >
        <div className="ml-2 flex items-center border-white">
          <div className="truncate text-right tracking-wide text-base text-white"> {selectedItemsPerPage} </div>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 ml-2 ${showDropdown ? "transform rotate-180" : ""}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11.2031 16.5141L4.82815 10.1391C4.38752 9.69844 4.38752 8.98594 4.82815 8.55L5.88752 7.49062C6.32815 7.05 7.04065 7.05 7.47659 7.49062L11.9953 12.0094L16.5141 7.49062C16.9547 7.05 17.6672 7.05 18.1031 7.49062L19.1625 8.55C19.6031 8.99062 19.6031 9.70312 19.1625 10.1391L12.7875 16.5141C12.3563 16.9547 11.6438 16.9547 11.2031 16.5141Z" fill="white" />
          </svg>
        </div >
      </button>
      {showDropdown && (
        <ul ref={modalRef} className="absolute z-20 rounded-md mt-28 ml-items-per-page w-rows-per-page bg-container border-white border divide-none divide-gray-400 shadow-md">
          {itemsPerPage.map((option, i) => (
            <li
              key={i}
              onClick={() => handleOptionClick(option)}
              className="px-3 cursor-pointer hover:bg-low-container"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RowsPerPage;
