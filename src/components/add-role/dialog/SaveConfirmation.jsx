import React, { useRef, useEffect } from "react";
import Button from "../../Button/Button";
import "react-toastify/dist/ReactToastify.css";
import "../../popup/edit-role/style.css";

const SaveConfirmation = ({ handleCancel, handleConfirm }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCancel]);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div ref={modalRef} className={`relative my-6 mx-auto`}>
          {/*content*/}
          <div className="px-20 py-8 rounded-2xl shadow-2xl flex flex-col bg-high-container">
            {/*header*/}
            <div className="flex text-center items-center justify-center">
              <h1 className="text-3xl font-bold text-light-error">Save Role</h1>
            </div>
            {/*body*/}
            <div className="py-2 flex justify-center text-center items-center">
              <div className="w-80 font-bold text-gray-200">
                Data from this Role will be saved.
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center gap-6">
              <Button
                label="Cancel"
                clickHandler={() => handleCancel(false)}
                className="bg-dark-secondary hover:bg-secondary-hover shadow-2xl"
              />
              <Button
                label="Save"
                clickHandler={handleConfirm}
                className="bg-primary hover:bg-light-primary shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-80 fixed z-10 inset-0 bg-gray-800"></div>
    </>
  );
};

export default SaveConfirmation;
