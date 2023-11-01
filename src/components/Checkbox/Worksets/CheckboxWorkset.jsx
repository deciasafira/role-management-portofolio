// Author  : Abidzar Zulfa, Daniel Salim
// Version : 1.2.0 (26 Oktober 2023)

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const CheckBoxWorksets = ({
  isChecked,
  role,
  allRole,
  isAllWorksetsChecked,
  setIsAllWorksetsChecked,
  isAllClicked,
  setIsAllClicked,
  TagsContainer,
  setTagsContainer,
  // setdelete_this,
  // setcreate_this,
}) => {
  const [isCheckedState, setIsCheckedState] = useState(isChecked);

  useEffect(() => {
    if (isAllWorksetsChecked) {
      setIsCheckedState(true);
      const allTagsContainer = allRole;
      setTagsContainer(allTagsContainer);
    } else if (!isAllWorksetsChecked && isAllClicked) {
      setIsCheckedState(false);
      const newTagsContainer = [];
      setTagsContainer(newTagsContainer);
    }
  }, [isAllWorksetsChecked]);

  const handleCheckBoxClick = () => {
    setIsCheckedState(!isCheckedState);
    setIsAllWorksetsChecked(false);
    setIsAllClicked(false);
    if (isCheckedState) {
      const indexToRemove = TagsContainer.findIndex(
        (item) => item.name === role.name
      );
      if (indexToRemove !== -1) {
        setTagsContainer(
          TagsContainer.filter((item) => item.name !== role.name)
        );
        // console.log("abis di filter jadi", TagsContainer);
      }
    } else if (
      !isCheckedState &&
      !TagsContainer.map((role) => role.name).includes(role.name)
    ) {
      setTagsContainer([...TagsContainer, role]);
      // console.log("abis di tambah jadi", TagsContainer);
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
      <span className="ml-4 text-white">
        {role.name}
      </span>
    </label>
  );
};

export default CheckBoxWorksets;
