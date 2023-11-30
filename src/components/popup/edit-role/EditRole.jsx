import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../../utils/cn";
import { asyncUpdateRoles } from "../../../states/roles/Action";

import { useDispatch, useSelector } from "react-redux";
import { setIsActionSuccess } from "../../../states/global/action";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

import InputField from "../../add-role/Input/InputField";
import TagsContainer from "../../tags-container/TagsContainer";
import Button from "../../Button/Button";

import EditConfirmation from "./EditConfirmation";

// Dropdown
import EditWorksetsDropdown from "./EditWorksetsDropdown";
import EditServicesDropdown from "./EditServicesDropdown";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../../index.scss";

const inputState = {
  EMPTY: "EMPTY",
  INIT: "INIT",
  VALID: "VALID",
  INVALID_SYMBOL: "INVALID_SYMBOL",
  INVALID_DOUBLE: "INVALID_DOUBLE",
  INVALID_STEP: "INVALID_STEP",
  INVALID_QUANTITY: "INVALID_QUANTITY",
};

const EditRole = ({ handleClose, details, worksetsList, servicesList }) => {
  const wordQuantityPattern = /^(?=\w{1,20}$)/;
  const fullNameSymbolPattern = /^[a-zA-Z0-9]+$/;

  const modalRef = useRef(null);
  const [editedRole, setRole] = useState(details.name);
  const [selectedTagsWorkset, setSelectedTagsWorkset] = useState(
    details.worksets.map((workset) => workset.workset)
  );
  const [selectedTagsService, setSelectedTagsService] = useState(
    details.services.map((services) => services.service)
  );
  const roles = useSelector((state) => state.roles[1].roles);
  const [nameState, setNameState] = useState(inputState.INIT);
  const [cooldown, setCooldown] = useState(false);
  const [isRoleFocused, setIsRoleFocused] = useState(false);

  // Checked Worksets
  const [isAllWorksetsChecked, setIsAllWorksetsChecked] = useState(false);
  const [isAllWorksetsCheckBoxClicked, setIsAllWorksetsCheckBoxClicked] =
    useState(false);

  // Checked Services
  const [isAllServicesChecked, setIsAllServicesChecked] = useState(false); // State for "Select All" checkbox
  const [isAllServicesCheckBoxClicked, setIsAllServicesCheckBoxClicked] =
    useState(false);

  // Show Edit Comnfirmation
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const dispatch = useDispatch();

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

  const setNameHandler = (value) => {
    const pattern = /^[A-Za-z0-9]*$/;
    const hasNumbersOrSymbols = !pattern.test(value);

    if (hasNumbersOrSymbols) {
      if (!cooldown) {
        // Show a toast notification for numbers or symbols
        // toast.error("Role name cannot contain symbols or whitespace", {
        //   theme: "colored",
        //   autoClose: 2500,
        // });
        // Set a cooldown for 3 seconds
        setCooldown(true);
        setTimeout(() => {
          setCooldown(false);
        }, 3000);
      }
    } else if (value.length > 20) {
      // Truncate the value if it exceeds 20 characters
      const truncatedSearchTerm = value.substring(0, 20);
      setRole(truncatedSearchTerm);

      if (!cooldown) {
        // Show a toast notification if the role name exceeds 20 characters
        // toast.error("Role name cannot exceed 20 characters", {
        //   theme: "colored",
        //   autoClose: 2500,
        // });
        // Set a cooldown for 2 seconds
        setCooldown(true);
        setTimeout(() => {
          setCooldown(false);
        }, 2000);
      }
    } else {
      setRole(value);
    }
  };

  useEffect(() => {
    if (
      roles.find(
        (role) => role.name === editedRole && editedRole !== details.name
      )
    ) {
      setNameState(inputState.INVALID_DOUBLE);
    } else if (editedRole.length === 0) {
      setNameState(inputState.EMPTY);
    } else if (!fullNameSymbolPattern.test(editedRole)) {
      setNameState(inputState.INVALID_SYMBOL);
    } else if (!wordQuantityPattern.test(editedRole)) {
      setNameState(inputState.INVALID_QUANTITY);
    } else if (editedRole === details.name) {
      setNameState(inputState.INIT);
    } else {
      setNameState(inputState.VALID);
    }
  }, [editedRole, roles]);

  function getDeletedTags(selectedTags, initial) {
    let deletedTags = [];

    for (let i = 0; i < initial.length; i++) {
      if (!selectedTags.includes(initial[i])) {
        deletedTags.push(initial[i]);
      }
    }

    return deletedTags;
  }

  // Delete Worksets
  const deleteWorksets = getDeletedTags(
    selectedTagsWorkset.map((workset) => workset.id),
    details.worksets
      .map((workset) => workset.workset)
      .map((workset) => workset.id)
  );

  const editedWorksets = {
    create_this: selectedTagsWorkset
      .map((workset) => workset.id)
      .filter(
        (id) =>
          !details.worksets.map((workset) => workset.workset.id).includes(id)
      ),
    delete_this: deleteWorksets,
  };

  // Delete Services
  const deleteService = getDeletedTags(
    selectedTagsService.map((service) => service.id),
    details.services
      .map((service) => service.service)
      .map((service) => service.id)
  );

  // Edit Services
  const editedServices = {
    create_this: selectedTagsService
      .map((service) => service.id)
      .filter(
        (id) =>
          !details.services.map((service) => service.service.id).includes(id)
      ),
    delete_this: deleteService,
  };

  const handleSaveCLick = () => {
    setShowEditConfirmation(true);
    modalRef.current = null;
  };

  useEffect(() => {
    setSelectedTagsWorkset(details.worksets.map((workset) => workset.workset));
    setSelectedTagsService(
      details.services.map((services) => services.service)
    );
  }, [details]);

  const isEditSuccess = useSelector(
    (state) => state.globalState.isActionSuccess
  );

  const handleEdit = () => {
    const updatedRole = {
      id: details.id,
      name: editedRole,
      worksets: editedWorksets,
      services: editedServices,
    };
    try {
      dispatch(asyncUpdateRoles(updatedRole));
      if (isEditSuccess === "success") {
        toast.success("Role has been saved.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: <BsFillCheckCircleFill className="w-6 h-6" />,
          closeButton: (
            <FaTimes style={{ color: "#FFFFFF" }} className="w-6 h-6" />
          ),
        });
        handleClose();
        dispatch(setIsActionSuccess(""));
      }
    } catch (error) {
      console.log("error dispatching update role", error);
    }
  };

  const isButtonDisabled =
    editedRole.trim() === "" ||
    selectedTagsWorkset.length === 0 ||
    selectedTagsService.length === 0 ||
    nameState === inputState.INVALID_DOUBLE;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
        <div ref={modalRef} className="relative my-6 mx-auto w-edit-roles">
          {/*content*/}
          <div className="px-20 py-12 rounded-2xl shadow-2xl relative flex flex-col bg-high-container outline-none focus:outline-none">
            {/*header*/}
            <div className="py-2.5 flex items-start justify-between">
              <h1 className="text-3xl pb-4 font-bold text-white">Edit Role</h1>
            </div>
            {/*body*/}
            <div className="relative">
              <div>
                {/* Edit Role Name */}
                <div className="mb-3">
                  <InputField
                    className={cn(
                      "py-3 w-full rounded-md outline-none ring-0 ring-offset-0 border transition-transform duration-200",
                      "bg-high-container text-variant-on-surface",
                      nameState === inputState.VALID &&
                        `border-green-400 ${
                          isRoleFocused ? "" : "border-green-400"
                        }`,
                      nameState === inputState.INVALID_QUANTITY &&
                        "border-error",
                      nameState === inputState.INVALID_DOUBLE && "border-error",
                      nameState === inputState.INVALID_DOUBLE && "border-error",
                      nameState === inputState.INVALID_SYMBOL && "border-error",
                      nameState === inputState.INIT &&
                        "border-variant-on-surface",
                      nameState === inputState.EMPTY &&
                        `border-error form-row-field-input ${
                          isRoleFocused ? "border-light-primary" : ""
                        }`
                    )}
                    value={editedRole}
                    changeHandler={(e) => setNameHandler(e.target.value)}
                    onBlur={() => setIsRoleFocused(!isRoleFocused)}
                    onFocus={() => setIsRoleFocused(!isRoleFocused)}
                  />
                  <label
                    className={cn(
                      "ml-4 text-sm transition-all duration-300",
                      nameState === inputState.VALID &&
                        `text-green-400 ${
                          isRoleFocused ? "" : "text-green-400"
                        }`,
                      nameState === inputState.INVALID_QUANTITY && "text-error",
                      nameState === inputState.INVALID_DOUBLE && "text-error",
                      nameState === inputState.INVALID_SYMBOL && "text-error",
                      nameState === inputState.INVALID_DOUBLE && "text-error",
                      nameState === inputState.INIT &&
                        "border-variant-on-surface form-row-field-input",
                      nameState === inputState.INVALID_STEP && "text-error",
                      nameState === inputState.EMPTY &&
                        `text-error ${
                          isRoleFocused ? "text-light-primary" : ""
                        }`
                    )}
                  >
                    <span
                      className={cn(
                        "absolute right-2 text-sm",
                        nameState === inputState.INIT &&
                          " text-variant-on-surface",
                        nameState === inputState.VALID &&
                          `text-green-500 ${
                            isRoleFocused ? "" : "text-green-400"
                          }`,
                        nameState === inputState.INVALID_QUANTITY &&
                          "text-error",
                        nameState === inputState.INVALID_DOUBLE && "text-error",
                        nameState === inputState.INVALID_DOUBLE && "text-error",
                        nameState === inputState.INVALID_SYMBOL && "text-error",
                        nameState === inputState.EMPTY &&
                          `text-error ${
                            isRoleFocused ? "text-light-primary" : ""
                          }`
                      )}
                    >
                      {editedRole.length}/20
                    </span>
                    {(() => {
                      if (nameState === inputState.INVALID_SYMBOL) {
                        return "Role can't contain symbols (!@#$%^&*,./)!";
                      } else if (nameState === inputState.INVALID_QUANTITY) {
                        return "Role must be between 3 and 32 characters!";
                      } else if (nameState === inputState.INVALID_DOUBLE) {
                        return "Role name already exist!";
                      } else if (nameState === inputState.INVALID_STEP) {
                        return "Role name is required!";
                      } else if (nameState === inputState.EMPTY) {
                        return "Role cannot be empty.";
                      } else if (nameState === inputState.VALID) {
                        return "Role can be used.";
                      } else {
                        return "";
                      }
                    })()}
                  </label>
                  <label
                    htmlFor="name"
                    className={cn(
                      "absolute top-0 left-2 translate-y-5 transition-all duration-300 px-2",
                      editedRole.length === 0 &&
                        "top-3 text-variant-on-surface",
                      editedRole.length > 0 &&
                        "-top-2 text-variant-on-surface -translate-y-4 bg-high-container text-sm",
                      nameState === inputState.VALID &&
                        `text-green-500 ${
                          isRoleFocused ? "" : "border-green-400"
                        }`,
                      nameState === inputState.INVALID_QUANTITY &&
                        "text-error text-sm",
                      nameState === inputState.INVALID_DOUBLE &&
                        "text-error text-sm ",
                      nameState === inputState.INVALID_SYMBOL &&
                        "text-error text-sm",
                      nameState === inputState.EMPTY &&
                        `text-error ${
                          isRoleFocused ? "text-light-primary" : ""
                        }`
                    )}
                  >
                    Role Name
                  </label>
                </div>
                {/* Worksets Checkbox */}
                <EditWorksetsDropdown
                  roleList={worksetsList}
                  DropdownWidth={"full"}
                  isAllWorksetsChecked={isAllWorksetsChecked}
                  setIsAllWorksetsChecked={setIsAllWorksetsChecked}
                  setIsClicked={setIsAllWorksetsCheckBoxClicked}
                  isAllClicked={isAllWorksetsCheckBoxClicked}
                  setIsAllClicked={setIsAllWorksetsCheckBoxClicked}
                  TagsContainer={selectedTagsWorkset}
                  setTagsContainer={setSelectedTagsWorkset}
                />
                {/* Worksets Tags Group */}
                <div className="pt-3 flex flex-nowrap overflow-x-auto">
                  <div className="flex flex-row gap-5">
                    {Array.isArray(selectedTagsWorkset) &&
                    selectedTagsWorkset.length !== 0 ? (
                      selectedTagsWorkset.map((worksets) => (
                        <TagsContainer
                          key={worksets.id}
                          value={worksets.name}
                        />
                      ))
                    ) : (
                      <TagsContainer value="Please Select Role" />
                    )}
                  </div>
                </div>
                {/* Services Checkbox */}
                <EditServicesDropdown
                  roleList={servicesList}
                  DropdownWidth={"full"}
                  isAllServicesChecked={isAllServicesChecked}
                  setIsAllServicesChecked={setIsAllServicesChecked}
                  setIsClicked={setIsAllServicesCheckBoxClicked}
                  isAllClicked={isAllServicesCheckBoxClicked}
                  setIsAllClicked={setIsAllServicesCheckBoxClicked}
                  TagsContainer={selectedTagsService}
                  setTagsContainer={setSelectedTagsService}
                />
                {/* Services Tags Group */}
                <div className="pt-3 flex flex-nowrap overflow-x-auto">
                  <div className="flex flex-row gap-5">
                    {Array.isArray(selectedTagsService) &&
                    selectedTagsService.length !== 0 ? (
                      selectedTagsService.map((services) => (
                        <TagsContainer
                          key={services.id}
                          value={services.name}
                        />
                      ))
                    ) : (
                      <TagsContainer value="Please Select Role" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/*Footer Button*/}
            <div className="mt-5 flex items-center justify-end">
              <div className="flex items-center gap-5 justify-end">
                <Button
                  label="Cancel"
                  clickHandler={handleClose}
                  className="bg-dark-secondary hover:bg-secondary-hover shadow-2xl"
                />
                <Button
                  label="Save"
                  clickHandler={handleSaveCLick}
                  className={`shadow-2xl ${
                    isButtonDisabled
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-primary hover:bg-light-primary"
                  }`}
                  disabled={isButtonDisabled}
                />
              </div>
            </div>
          </div>
        </div>
        {showEditConfirmation && (
          <EditConfirmation
            handleClose={handleClose}
            handleCancel={() => setShowEditConfirmation(false)}
            handleConfirm={handleEdit}
            roles={details.name}
          />
        )}
      </div>
      <div className="opacity-80 fixed z-10 inset-0 bg-gray-800"></div>
    </>
  );
};

export default EditRole;
