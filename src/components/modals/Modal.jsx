import React, { useEffect, useRef } from "react";
import Button from "../Button/Button";

const Modal = ({ handleClose, children, label, className }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div ref={modalRef} className={`relative my-6 mx-auto`}>
          {/*content*/}
          <div className="px-20 py-10 gap-2 text-gray-300 rounded-2xl shadow-2xl flex flex-col bg-dark-main-blue">
            {children}
            <div className="flex items-center justify-center gap-6">
              <Button
                label={label}
                clickHandler={handleClose}
                className={`bg-${className} shadow-2xl`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-80 fixed z-10 inset-0 bg-gray-800"></div>
    </>
  );
};

export default Modal;
