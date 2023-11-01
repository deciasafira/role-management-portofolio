import React from "react";

const Pagination = ({
  rolesPerPage,
  activePage,
  setActivePage,
  setIsLoading,
  displayedRoles
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(displayedRoles / rolesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (number) => {
    setIsLoading(true);
    setActivePage(number);
  };

  const handlePreviousPage = () => {
    setIsLoading(true);
    if (activePage > 1) {
      handlePageChange(activePage - 1);
    }
  };

  const handleNextPage = () => {
    setIsLoading(true);
    if (activePage < pageNumbers.length) {
      handlePageChange(activePage + 1);
    }
  };

  // Calculate the range of pages to display
  const maxPagesToShow = 5;
  const halfMaxPages = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, activePage - halfMaxPages);
  let endPage = Math.min(startPage + maxPagesToShow - 1, pageNumbers.length);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Calculate the range of entries being displayed
  const startEntry = (activePage - 1) * rolesPerPage + 1;
  const endEntry = Math.min(activePage * rolesPerPage, displayedRoles);

  return (
    <nav className="flex justify-between">
      <p className="text-white text-lg">
        Showing {startEntry} to {endEntry} of {displayedRoles} entries
      </p>
      <ul className="flex items-center">
        <li>
          <button
            className={`${activePage === 1 ? "text-gray-400" : "text-white"
              } w-fit h-0 text-lg mx-1 mr-2 rounded-md outline-none focus:outline-none`}
            onClick={handlePreviousPage}
            disabled={activePage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <li key={number}>
            <button
              className={`${activePage === number
                ? "text-white bg-primary"
                : "text-gray-400"
                } w-8 h-8 text-lg mx-1 rounded-md outline-none focus:outline-none`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`${activePage === pageNumbers.length ? "text-gray-400" : "text-white"
              } w-fit text-lg h-8 mx-1 ml-2 rounded-md outline-none focus:outline-none`}
            onClick={handleNextPage}
            disabled={activePage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
