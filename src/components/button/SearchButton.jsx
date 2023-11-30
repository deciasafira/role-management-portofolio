// Author  : Abidzar Zulfa, Daniel Salim
// Version : 1.2.0 (17 Oktober 2023)
// Description : This component is used to search roles in role table based on selected category 

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchButton = ({ searchTerm, setSearchTerm }) => {
  const [cooldown, setCooldown] = useState(false);

  const handleSearchChange = (value) => {
    const pattern = /^[A-Za-z0-9\s]*$/;
    const hasSymbols = !pattern.test(value);

    if (hasSymbols) {
      if (!cooldown) {
        // Show a toast notification for symbols
        // toast.error("Search value cannot contain symbols", {
        //   theme: "colored",
        //   autoClose: 2500,
        // });
        // Set a cooldown for 5 seconds
        setCooldown(true);
        setTimeout(() => {
          setCooldown(false);
        }, 2000);
      }
    } else if (value.length > 20) {
      // Truncate the value if it exceeds 20 characters
      const truncatedSearchTerm = value.substring(0, 20);
      setSearchTerm(truncatedSearchTerm);

      if (!cooldown) {
        // Show a toast notification if the search term exceeds 20 characters
        // toast.error("Search value cannot characters", {
        //   theme: "colored",
        //   autoClose: 2500,
        // });
        // Set a cooldown for 5 seconds
        setCooldown(true);
        setTimeout(() => {
          setCooldown(false);
        }, 2000);
      }
    } else {
      setSearchTerm(value);
    }
  };


  return (
    <div className="relative flex items-center w-search mr-auto ml-7">
      <div className="absolute inset-y-0 left-0 pl-3 ml-2 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
      </div>
      <input
        id="search"
        type="yahoo"
        className="w-full text-lg text-white fontfamily-montserrat pl-12 h-14 pr-3 py-2 border border-white rounded-md shadow-md bg-container"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pl-3 ml-2 flex items-center">
        <p className="h-5 w-5 mr-7 mt-5 text-xs text-white"> {searchTerm.length}/20</p>
      </div>
    </div>
  );
};

export default SearchButton;