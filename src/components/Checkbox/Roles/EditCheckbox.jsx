// Author  : Abidzar Zulfa, Daniel Salim
// Version : 1.2.0 (26 Oktober 2023)
// Description : This component is used for checkbox list in Edit Role Pop Up

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const CheckBox = ({ isChecked, role, userId, isAllChecked, setIsAllChecked, isAllClicked, setIsAllClicked, TagsContainer, setTagsContainer, RoleContainer, setRoleContainer, allRole, displayedRoles, searchTerm }) => {
    const [isCheckedState, setIsCheckedState] = useState(isChecked);
    useEffect(() => {
        if (isAllChecked) {
            setIsCheckedState(true);
            if (TagsContainer) setTagsContainer(allRole);
            if (RoleContainer) setRoleContainer(displayedRoles.map((role) => role.id));
        }
        else if (!isAllChecked && isAllClicked) {
            setIsCheckedState(false);
            if (TagsContainer) setTagsContainer([]);
            if (RoleContainer) setRoleContainer([]);
        }
    }, [isAllChecked, searchTerm]);

    const handleCheckBoxClick = () => {
        setIsCheckedState(!isCheckedState);
        setIsAllClicked(false);
        if (isAllChecked) {
            setIsAllChecked(false);
        }
        if (TagsContainer) {
            if (isCheckedState) {
                const indexToRemove = TagsContainer.findIndex(item => item.name === role.name);
                if (indexToRemove !== -1) {
                    setTagsContainer(TagsContainer.filter(item => item.name !== role.name));
                }
            } else if (!isCheckedState && !TagsContainer.map((role) => role.name).includes(role.name)) {
                setTagsContainer([...TagsContainer, role]);
                if (allRole.length === TagsContainer.length + 1) {
                    setIsAllChecked(true);
                }
            }
        }
        else if (RoleContainer) {
            if (isCheckedState) {
                const indexToRemove = RoleContainer.findIndex(item => item === userId);
                if (indexToRemove !== -1) {
                    setRoleContainer(RoleContainer.filter(item => item !== userId));
                }
            } else if (!isCheckedState && !RoleContainer.map((role) => role.id).includes(userId)) {
                setRoleContainer([...RoleContainer, userId]);
                if (displayedRoles.length === RoleContainer.length + 1) {
                    setIsAllChecked(true);
                }
            }
        }
    }

    return (
        <label className={role ? "pl-5 flex relative items-center px-3 py-2 cursor-pointer hover:bg-low-container" : "flex justify-center relative items-center"}>
            <input
                id="default-checkbox"
                type="checkbox"
                value={role ? role.name : userId}
                checked={isCheckedState}
                className="w-4 h-4 z-100 appearance-none bg-transparent text-black border-2 rounded"
                onChange={handleCheckBoxClick}
            />
            <FontAwesomeIcon
                icon={faCheck}
                className={role ? `h-3 w-3 left-edit-user text-white absolute ${isCheckedState ? "opacity-100" : "opacity-0"}` : `h-3 w-3 text-center absolute ${isCheckedState ? "opacity-100" : "opacity-0"}`}
            />
            {role && <span className="ml-4 text-white">
                {role.name}
            </span>}
        </label>
    )
}

export default CheckBox;