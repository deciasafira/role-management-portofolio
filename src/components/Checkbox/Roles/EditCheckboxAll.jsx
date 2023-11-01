// Author  : Abidzar Zulfa, Daniel Salim
// Version : 1.2.0 (26 Oktober 2023)

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const CheckboxAll = ({ label, isAllChecked, setIsAllChecked, setIsClicked }) => {
    const handleCheckBoxClick = () => {
        setIsAllChecked(!isAllChecked);
        setIsClicked(true);
    };

    return (
        <label className={label ? "pl-5 flex relative items-center px-3 py-2 cursor-pointer hover:bg-low-container" : "flex items-center justify-center gap-2 cursor-pointer"}>
            <input
                id="default-checkbox"
                type="checkbox"
                value=""
                checked={isAllChecked}
                className="w-4 h-4 z-100 appearance-none bg-transparent text-black border-2 rounded"
                onChange={handleCheckBoxClick}
            />
            <FontAwesomeIcon
                icon={faCheck}
                className={label ? `h-3 w-3 left-edit-user text-white absolute ${isAllChecked ? "opacity-100" : "opacity-0"}` : `h-3 w-3 text-center absolute ${isAllChecked ? "opacity-100" : "opacity-0"}`}
            />
            {label &&
                <span className="ml-4">
                    All
                </span>
            }
        </label >
    );
};

export default CheckboxAll;