import React, { useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { MdOutlineCancel } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

// // Components
import Button from "./Button2/Button";
import InputField from "./Input/InputField";
import Modal from "../modals/Modal";
import CheckboxDropdown from "./CheckboxDropdown";
import SaveConfirmation from "./dialog/SaveConfirmation";

import { ToastContainer, toast } from "react-toastify";

// // Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addRoles,
  getAllServices,
  getAllWorksets,
} from "../../states/redux/RolesAction/action";
import { setIsActionSuccess } from "../../states/global/action";

const inputState = {
  EMPTY: "EMPTY",
  VALID: "VALID",
  INVALID_QUANTITY: "INVALID_QUANTITY",
  INVALID_SYMBOL: "INVALID_SYMBOL",
  INVALID_DOUBLE: "INVALID_DOUBLE",
};

const AddRole = ({
  name,
  setName,
  selectedServices,
  setSelectedServices,
  selectedWorksets,
  setSelectedWorksets,
}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  const roles = useSelector((state) => state.roles[1].roles);
  const services = useSelector((state) => state.services);
  const worksets = useSelector((state) => state.worksets);
  const isAddSuccess = useSelector(
    (state) => state.globalState.isActionSuccess
  );
  const rolesAmount = useSelector(
    (state) => state.roles.map((role) => role.total_record)[1]
  );
  let isRolesMax = false;
  if (rolesAmount != undefined) {
    isRolesMax = rolesAmount === 100;
  }
  console.log(services);
  console.log(worksets);
  const [showModal, setShowModal] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [nameState, setNameState] = useState(inputState.EMPTY);
  const [cooldown, setCooldown] = useState(false);
  const [isRoleFocused, setIsRoleFocused] = useState(false);

  const wordQuantityPattern = /^(?=\w{1,20}$)/;
  const fullNameSymbolPattern = /^[a-zA-Z0-9]+$/;

  const setNameHandler = (value) => {
    const pattern = /^[A-Za-z0-9]*$/;
    const hasNumbersOrSymbols = !pattern.test(value);

    if (hasNumbersOrSymbols) {
      if (!cooldown) {
        // Show a toast notification for numbers or symbols
        // toast.error("Role name cannot contain symbols or whitespace", {
        // 	theme: "colored",
        // 	autoClose: 2500,
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
      setName(truncatedSearchTerm);

      if (!cooldown) {
        // Show a toast notification if the role name exceeds 20 characters
        // toast.error("Role name cannot exceed 20 characters", {
        // 	theme: "colored",
        // 	autoClose: 2500,
        // });
        // Set a cooldown for 2 seconds
        setCooldown(true);
        setTimeout(() => {
          setCooldown(false);
        }, 2000);
      }
    } else {
      setName(value);
    }
  };

  useEffect(() => {
    dispatch(getAllWorksets());
    dispatch(getAllServices());
  }, []);

  useEffect(() => {
    // Listen for changes in isEditSuccess and update showEditSuccess accordingly
    if (isAddSuccess === "add role failed") {
      setShowModalFailed(true);
      setShowModal(false);
      onResetHandler();
      dispatch(setIsActionSuccess(""));
    }
  }, [isAddSuccess]);

  useEffect(() => {
    if (roles?.find((role) => role.name === name)) {
      setNameState(inputState.INVALID_DOUBLE);
    } else if (name.length === 0) {
      setNameState(inputState.EMPTY);
    } else if (!fullNameSymbolPattern.test(name)) {
      setNameState(inputState.INVALID_SYMBOL);
    } else if (!wordQuantityPattern.test(name)) {
      setNameState(inputState.INVALID_QUANTITY);
    } else {
      setNameState(inputState.VALID);
    }
  }, [name, roles]);

  const submitData = (e) => {
    const data = {
      name: name,
      services: selectedServices,
      worksets: selectedWorksets,
    };
    setShowModal(false);
    dispatch(addRoles(data, darkMode, null));
    onResetHandler();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    toast.dismiss();
    const errors = [];
    if (nameState === inputState.INVALID) errors.push("Name already exist!");
    if (name.length > 20) errors.push("Name is too long!");
    if (errors.length > 0) {
      toast.error(errors.join("\n"), {
        autoClose: 3000,
        closeOnClick: true,
        hideProgressBar: true,
        position: "bottom-center",
      });
      return;
    }
    setShowModal(true);
  };

  const onResetHandler = () => {
    setName("");
    setSelectedServices([]);
    setSelectedWorksets([]);
  };

  return (
    <div className={"w-full px-20 py-6 rounded-md bg-high-container"}>
      <form
        onReset={onResetHandler}
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full gap-8 py-7"
      >
        <div className="flex gap-8">
          <div className="flex flex-col w-full">
            <div className="relative pb-7">
              <InputField
                className={cn(
                  "py-3 w-full rounded-md outline-none ring-0 ring-offset-0 border transition-transform duration-200",
                  "bg-high-container text-variant-on-surface",
                  nameState === inputState.VALID &&
                    `border-green-400 ${
                      isRoleFocused ? "" : "border-green-400"
                    }`,
                  nameState === inputState.INVALID_QUANTITY && "border-error",
                  nameState === inputState.INVALID_DOUBLE && "border-error",
                  nameState === inputState.INVALID_SYMBOL && "border-error",
                  nameState === inputState.EMPTY &&
                    `form-row-field-input ${
                      isRoleFocused ? "border-light-primary" : " "
                    }`
                )}
                value={name}
                changeHandler={(e) => setNameHandler(e.target.value)}
                onBlur={() => setIsRoleFocused(!isRoleFocused)}
                onFocus={() => setIsRoleFocused(!isRoleFocused)}
              />
              {nameState !== inputState.EMPTY && (
                <label
                  className={cn(
                    "ml-4 text-sm transition-all duration-300",
                    nameState === inputState.VALID &&
                      `text-green-400 ${
                        isRoleFocused ? "" : "border-green-400"
                      }`,
                    nameState === inputState.INVALID_QUANTITY && "text-error",
                    nameState === inputState.INVALID_DOUBLE && "text-error",
                    nameState === inputState.INVALID_SYMBOL && "text-error",
                  )}
                >
                  {name.length > 0 && (
                    <span
                      className={`absolute right-2 ${
                        nameState === inputState.VALID
                          ? `text-green-400 ${
                              isRoleFocused ? "" : "border-green-400"
                            }`
                          : "text-error"
                      } text-sm`}
                    >
                      {name.length}/20
                    </span>
                  )}
                  {(() => {
                    if (nameState === inputState.INVALID_SYMBOL) {
                      return "Name must be alphabet!";
                    } else if (nameState === inputState.INVALID_QUANTITY) {
                      return "Role must be between 1 and 20 characters!";
                    } else if (nameState === inputState.INVALID_DOUBLE) {
                      return "Role Already Exists!";
                    } else if (nameState === inputState.VALID) {
                      return "Role can be used.";
                    } else {
                      return "";
                    }
                  })()}
                </label>
              )}
              <label
                htmlFor="name"
                className={cn(
                  "absolute top-0 left-2 translate-y-5 transition-all duration-300 px-2",
                  name.length === 0 && "top-3 text-variant-on-surface",
                  name.length > 0 &&
                    "-top-2 text-variant-on-surface -translate-y-4 bg-high-container  text-text-sm",
                  nameState === inputState.VALID &&
                    `text-green-400 text-sm ${
                      isRoleFocused ? "" : "border-green-400"
                    }`,
                  nameState === inputState.INVALID_QUANTITY &&
                    "text-error text-sm",
                  nameState === inputState.INVALID_DOUBLE &&
                    "text-error text-sm",
                  nameState === inputState.INVALID_SYMBOL &&
                    "text-error text-sm",
                  nameState === inputState.EMPTY &&
                    ` ${isRoleFocused ? "text-light-primary" : " "}`
                )}
              >
                Role Name
              </label>
            </div>
            <div className="pb-2">
              <CheckboxDropdown
                label="Worksets"
                roleList={worksets}
                selected={selectedWorksets}
                handleSelection={setSelectedWorksets}
                DropdownWidth={"full"}
              />
            </div>
            <div className="pb-3">
              <CheckboxDropdown
                label="Services"
                roleList={services}
                selected={selectedServices}
                handleSelection={setSelectedServices}
                DropdownWidth={"full"}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5 ">
          <Button
            type="reset"
            className="w-28 h-12 shadow-2xl font-semibold bg-dark-secondary hover:bg-secondary-hover text-white rounded-lg"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={
              isRolesMax ||
              nameState !== inputState.VALID ||
              nameState === inputState.INVALID_DOUBLE ||
              selectedWorksets.length === 0 ||
              selectedServices.length === 0
            }
            clickHandler={() => setShowModal(true)}
            className={`w-28 h-12 shadow-2xl font-semibold text-white rounded-lg ${
              isRolesMax ||
              nameState !== inputState.VALID ||
              selectedWorksets.length === 0 ||
              selectedServices.length === 0
                ? "bg-gray-600"
                : "bg-primary hover:bg-light-primary"
            }`}
          >
            Save
          </Button>
        </div>
      </form>
      {showModal && (
        <SaveConfirmation
          handleCancel={() => setShowModal(false)}
          handleConfirm={submitData}
        />
      )}
      {showModalFailed && (
        <Modal
          label="Close"
          className="dark-error hover:bg-error-hover"
          handleClose={() => setShowModalFailed(false)}
        >
          <div className="flex gap-2 text-center items-center justify-center">
            <MdOutlineCancel className="text-dark-error w-6 h-6" />
            <h1 className="text-3xl font-bold">Save Failed!</h1>
          </div>
          <div className="py-2 flex justify-center text-center items-center">
            <div className="w-80 font-bold text-center">Data Invalid</div>
          </div>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddRole;
