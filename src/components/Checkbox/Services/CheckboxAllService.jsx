// Author  : Abidzar Zulfa, Daniel Salim
// Version : 1.2.0 (26 Oktober 2023)

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const CheckBoxAllServices = ({ isAllServicesChecked, setIsAllServicesChecked, setIsClicked }) => {
    const handleCheckBoxClick = () => {
        setIsAllServicesChecked(!isAllServicesChecked);
        setIsClicked(true);
    };

    return (
        <label className="pl-5 flex relative items-center px-3 py-2 cursor-pointer hover:bg-low-container">
            <input
                id="default-checkbox"
                type="checkbox"
                value=""
                checked={isAllServicesChecked}
                className="w-4 h-4 z-100 appearance-none bg-transparent text-black border-2 rounded"
                onChange={handleCheckBoxClick}
            />
            <FontAwesomeIcon
                icon={faCheck}
                className={`h-3 w-3 left-edit-user text-white absolute ${isAllServicesChecked ? "opacity-100" : "opacity-0"}`}
            />
            <span
                className="ml-4"
            >
                All
            </span>
        </label>
    );
};

export default CheckBoxAllServices;