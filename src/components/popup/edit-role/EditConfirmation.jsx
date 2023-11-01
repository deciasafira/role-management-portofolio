import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../Button/Button";
import Modal from "../../modals/Modal";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { setIsActionSuccess } from "../../../states/global/action";
import { ToastContainer, toast, style } from "react-toastify";
import { FaTimes } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const EditConfirmation = ({
  handleClose,
  handleCancel,
  handleConfirm,
  roles,
}) => {
  const [showEditSuccess, setShowEditSuccess] = useState("");
  const isEditSuccess = useSelector(
    (state) => state.globalState.isActionSuccess
  );
  const errorMessage = useSelector((state) => state.globalState.errorMessage);
  const dispatch = useDispatch();

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
    if (isEditSuccess === "success") {
      setShowEditSuccess("success");
      dispatch(setIsActionSuccess(""));
    } else if (isEditSuccess === "failed") {
      setShowEditSuccess("failed");
      dispatch(setIsActionSuccess(""));
    }
  }, [isEditSuccess]);

  const handleEditConfirm = async (e) => {
    e.preventDefault();
    await handleConfirm(e);
  };

  if (showEditSuccess === "success") {
    toast.success("Role has been saved.", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: <BsFillCheckCircleFill className="w-6 h-6" />,
      closeButton: <FaTimes style={{ color: "#FFFFFF" }} className="w-6 h-6" />,
    });
    handleClose();
    return (
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    );
  }

  else if (showEditSuccess === "failed") {
    return (
      <Modal label="Close" className="error" handleClose={handleClose}>
        <div className="flex gap-2 text-center items-center justify-center">
          <BsFillXCircleFill className="text-error w-6 h-6" />
          <h1 className="text-3xl font-bold">Update Failed!</h1>
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
          <div className="px-20 py-8 rounded-2xl shadow-2xl flex flex-col bg-high-container">
            {/*header*/}
            <div className="flex text-center items-center justify-center">
              <h1 className="text-3xl font-bold text-light-error">
                Update "{roles}" data ?
              </h1>
            </div>
            {/*body*/}
            <div className="py-2 flex justify-center text-center items-center">
              <div className="w-80 font-bold text-gray-200">
                Data from this user will be updated.
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center gap-6">
              <Button
                label="Cancel"
                clickHandler={handleCancel}
                className="bg-dark-secondary hover:bg-secondary-hover shadow-2xl"
              />
              <Button
                label="Update"
                clickHandler={handleEditConfirm}
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

export default EditConfirmation;
