import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteRoles } from "../../../states/roles/Action";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { setIsActionSuccess } from "../../../states/global/action";

import { ToastContainer, toast, style } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

import Button from "../../Button/Button";
import Modal from "../../modals/Modal";

const DeleteRole = ({ handleClose, setRoleContainer, details, isAll }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.globalState.errorMessage);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState("");
  const isDeleteSuccess = useSelector(
    (state) => state.globalState.isActionSuccess
  );

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

  useEffect(() => {
    if (isDeleteSuccess === "failed") {
      setShowDeleteSuccess("failed");
      setRoleContainer([]);
      dispatch(setIsActionSuccess(""));
    }
  }, [isDeleteSuccess]);

  if (showDeleteSuccess === "failed") {
    return (
      <Modal
        label="Close"
        className="dark-error hover:bg-error-hover"
        handleClose={handleClose}
      >
        <div className="flex gap-2 text-center items-center justify-center">
          <BsFillXCircleFill className="text-dark-error w-6 h-6" />
          <h1 className="text-3xl font-bold">Delete Failed!</h1>
        </div>
        <div className="py-2 flex justify-center text-center items-center">
          <div className="w-80 font-bold text-center">{errorMessage}</div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div ref={modalRef} className={`relative my-6 mx-auto`}>
          {/*content*/}
          <div className="px-20 py-8 rounded-2xl shadow-2xl flex flex-col bg-dark-main-blue">
            {/*header*/}
            <div className="flex text-center items-center justify-center">
              <h1 className="text-3xl font-bold text-light-error">
                {
                  Array.isArray(details) // Check if details is an array
                    ? `Delete ${details.length} role(s)?` // If it's an array
                    : `Delete "${details.name}" ?` // If it's an object
                }
              </h1>
            </div>
            {/*body*/}
            <div className="py-2 flex justify-center text-center items-center">
              <div className="w-80 font-bold text-center text-white">
                This role will be permanently deleted from this list
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center gap-6">
              <Button
                label="Cancel"
                clickHandler={handleClose}
                className="bg-dark-secondary hover:bg-secondary-hover shadow-2xl"
              />
              <Button
                label="Delete"
                clickHandler={(e) => {
                  e.preventDefault();
                  if (Array.isArray(details)) {
                    dispatch(asyncDeleteRoles(details, isAll));
                  } else {
                    dispatch(asyncDeleteRoles(details.id, isAll));
                  }
                  setRoleContainer([]);
                  handleClose();
                }}
                className="bg-dark-error hover:bg-error-hover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className="opacity-80 fixed z-10 inset-0 bg-gray-800"></div>
    </>
  );
};

export default DeleteRole;
