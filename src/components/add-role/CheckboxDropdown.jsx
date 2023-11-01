// Author  : Daniel Salim,
// Version : 1.1.0 (6 Oktober 2023)

import { useEffect, useState, useRef } from "react";
import "../../index.scss";
import { cn } from "../../utils/cn";
import { CheckboxGroup } from "./checkbox/CheckboxGroup";
import { TagsContainer } from './tag/TagsContainer';

const CheckboxDropdown = ({
    label,
    roleList,
    selected,
    handleSelection,
    DropdownWidth
}) => {
    const modalRef = useRef(null);
    const buttonRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [text, setText] = useState('');
    const [filteredRoleList, setFilteredRoleList] = useState(roleList);

    const filterRoles = (inputValue) => {
        const filteredRoles = roleList.filter((option) =>
            option.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredRoleList(filteredRoles);
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 8) {
            setText(e.target.value);
            filterRoles(inputValue);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                setShowDropdown(false);
                return
            }
        };

        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);

    return (
        <div className="mt-3 flex flex-col relative">
            <label className="relative">
                <input
                    type="yahoo"
                    ref={buttonRef}
                    className={`w-${DropdownWidth} text-lg font-normal pl-4 h-12 bg-transparent border border-white ${showDropdown ? "rounded-t-lg border-light-primary" : "rounded-lg"}`}
                    value={text}
                    placeholder={showDropdown && "Search " + label}
                    onChange={handleInputChange}
                    onClick={() => setShowDropdown(!showDropdown)}
                />
                <span
                    htmlFor="text"
                    className={cn(
                        "ml-0.5 absolute left-3 transition-all duration-200 px-1 bg-high-container",
                        text.length === 0 && `top-3 ${showDropdown ? " -top-2 left-2.5 text-sm" : ""}`,
                        text.length > 0 && `-top-2 left-2.5 text-sm ${showDropdown && "text-light-primary"}`,
                    )}
                >
                    {showDropdown ? `Selected ${label} [${selected.length}/${roleList.length}]` : `Select ${label}`}
                </span>
                <div className="absolute inset-y-0 right-0 mr-2 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 mr-3 ${showDropdown ? "transform rotate-180" : ""}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.2031 16.5141L4.82815 10.1391C4.38752 9.69844 4.38752 8.98594 4.82815 8.55L5.88752 7.49062C6.32815 7.05 7.04065 7.05 7.47659 7.49062L11.9953 12.0094L16.5141 7.49062C16.9547 7.05 17.6672 7.05 18.1031 7.49062L19.1625 8.55C19.6031 8.99062 19.6031 9.70312 19.1625 10.1391L12.7875 16.5141C12.3563 16.9547 11.6438 16.9547 11.2031 16.5141Z" fill="white" />
                    </svg>
                </div>
            </label>
            {/* </button> */}
            {showDropdown && (
                <div ref={modalRef}>
                    {filteredRoleList.length !== 0 ? (
                        <>
                            <CheckboxGroup
                                options={filteredRoleList}
                                selected={selected}
                                handleSelection={handleSelection}
                                searchTerm={text}
                            />
                        </>
                    ) : (
                        <p className="pl-4 px-3 py-2 rounded-b-lg divide-none bg-container shadow-md ">
                            {label === 'Worksets' ? "No workset available" : "No service available"}
                        </p>
                    )}
                </div>
            )}
            <div className="mt-2">
                <TagsContainer values={filteredRoleList.filter((item) => selected.includes(item.id))} />
            </div>
        </div>
    );
};

export default CheckboxDropdown;