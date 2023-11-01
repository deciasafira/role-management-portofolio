// Author  : Abidzar Zulfa, Daniel Salim
// Version : 1.2.0 (26 Oktober 2023)

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from "react";

const CheckBoxServices = ({
  isChecked,
  role,
  allRole,
  isAllServicesChecked,
  setIsAllServicesChecked,
  isAllClicked,
  setIsAllClicked,
  TagsContainer,
  setTagsContainer,
}) => {
  const [isCheckedState, setIsCheckedState] = useState(isChecked);
  useEffect(() => {
    if (isAllServicesChecked) {
      setIsCheckedState(true);
      const allTagsContainer = allRole;
      setTagsContainer(allTagsContainer);
    } else if (!isAllServicesChecked && isAllClicked) {
      setIsCheckedState(false);
      const newTagsContainer = [];
      setTagsContainer(newTagsContainer);
    }
  }, [isAllServicesChecked]);

  const handleCheckBoxClick = () => {
    setIsCheckedState(!isCheckedState);
    setIsAllServicesChecked(false);
    setIsAllClicked(false);
    if (isCheckedState) {
      const indexToRemove = TagsContainer.findIndex(
        (item) => item.name === role.name
      );
      if (indexToRemove !== -1) {
        setTagsContainer(
          TagsContainer.filter((item) => item.name !== role.name)
        );
        console.log("abis di filter jadi", TagsContainer);
      }
    } else if (
      !isCheckedState &&
      !TagsContainer.map((role) => role.name).includes(role.name)
    ) {
      setTagsContainer([...TagsContainer, role]);
      console.log("abis di tambah jadi", TagsContainer);
    }
  };

  return (
    <label className="pl-5 flex relative items-center px-3 py-2 cursor-pointer hover:bg-low-container">

      <input
        id="default-checkbox"
        type="checkbox"
        value={role.name}
        checked={isCheckedState}
        className="w-4 h-4 z-100 appearance-none bg-transparent text-black border-2 rounded"
        onChange={handleCheckBoxClick}
      />
      <FontAwesomeIcon
        icon={faCheck}
        className={role ? `h-3 w-3 left-edit-user text-white absolute ${isCheckedState ? "opacity-100" : "opacity-0"}` : `h-3 w-3 left-0.5 text-white absolute ${isCheckedState ? "opacity-100" : "opacity-0"}`}
      />
      <span className="ml-4">
        {role.name}
      </span>
    </label>
  );
};

export default CheckBoxServices;
