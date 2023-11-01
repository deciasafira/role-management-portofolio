import React, { useState, useEffect, useRef } from "react";
import { asyncUpdateRoles } from "../../../states/roles/Action";

import { useDispatch, useSelector } from "react-redux";
import { setIsActionSuccess } from "../../../states/global/action";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import "./style.css";

import EditItem from "./EditItem";
import TagsContainer from "../../tags-container/TagsContainer";
import Button from "../../Button/Button";

// Checkbox
import CheckBoxAllWorksets from "../../checkbox/worksets/CheckboxAllWorkset";
import CheckBoxWorksets from "../../checkbox/worksets/CheckboxWorkset";
import CheckBoxAllServices from "../../checkbox/services/CheckboxAllService";
import CheckBoxServices from "../../checkbox/services/CheckboxService";

import EditConfirmation from "./EditConfirmation";

// Dropdown
import EditWorksetsDropdown from "./EditWorksetsDropdown";
import EditServicesDropdown from "./EditServicesDropdown";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../../index.scss";

const EditRole = ({ handleClose, details, worksetsList, servicesList }) => {
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

  const [editedRole, setRole] = useState(details.name);
  const [selectedTagsWorkset, setSelectedTagsWorkset] = useState(
    details.worksets.map((workset) => workset.workset)
  );
  const [selectedTagsService, setSelectedTagsService] = useState(
    details.services.map((services) => services.service)
  );

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
    selectedTagsService.length === 0;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
        <div ref={modalRef} className="relative my-6 mx-auto w-edit-roles">
          {/*content*/}
          <div className="px-20 py-12 rounded-2xl shadow-2xl relative flex flex-col bg-high-container outline-none focus:outline-none">
            {/*header*/}
            <div className="py-2.5 flex items-start justify-between">
              <h1 className="text-3xl font-bold text-white">Edit Role</h1>
            </div>
            {/*body*/}
            <div className="relative">
              <div>
                {/* Edit Role Name */}
                <EditItem
                  label="Role"
                  value={editedRole}
                  onChange={setRole}
                  minLength={2}
                />
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
                  <div className="flex flex-row gap-5 pb-2">
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
                  <div className="flex flex-row gap-5 pb-2">
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
