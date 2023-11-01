import React from "react";

const Button = ({ type = "button", label, clickHandler, className, disabled }) => {
    return (
        <button
            className={`text-white rounded-lg shadow-2xl font-semibold px-6 py-2 text-lg outline-none focus:outline-none ${className}`}
            type="button"
            onClick={clickHandler}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;