import React, { useState, useEffect } from "react";
import {
  MdManageSearch,
  MdOutlineEdit,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import {
  sortByRoleName,
  sortByWorkset,
  sortByServices,
} from "../../utils/Sort";

// Pop Up & Modals
import DeleteRole from "../popup/delete-role/DeleteRole";
import EditRole from "../popup/edit-role/EditRole";
import DetailRole from "../popup/detail-role/DetailRole";
import Modal from "../modals/Modal";
import { BsFillXCircleFill } from "react-icons/bs";

// Checkbox Delete Role
import EditCheckboxAll from "../checkbox/roles/EditCheckboxAll";
import EditCheckbox from "../checkbox/roles/EditCheckbox";

// Button
import Button from "../Button/Button.jsx";

// API
import FetchRoles from "../../utils/FetchRoles";

const RoleTable = ({
  roles,
  services,
  worksets,
  selectedCategory,
  searchTerm,
  selectedItemsPerPage,
  activePage,
  allRoles,
  showRoleMaxPopup,
  setShowRoleMaxPopup,
  setIsTableEmpty,
  isTableEmpty,
  setDisplayedRoles,
  setRolesCountInPage,
  isAllUserChecked,
  setIsAllUserChecked
}) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // State Pop Up
  const [showPopupType, setShowPopupType] = useState("none");
  const [selectedData, setSelectedData] = useState({});

  // Delete CheckBox
  const [isAllUserCheckboxClicked, setIsAllUserCheckboxClicked] =
    useState(false);

  // User Container
  const [RoleContainer, setRoleContainer] = useState([]);
  // console.log("user container: ", RoleContainer)
  // Logic Show Pop-Up
  const handleShowPopup = (type, setSelectedRow) => {
    setSelectedData(setSelectedRow);
    if (type === "delete") {
      setShowPopupType("delete");
    } else if (type === "detail") {
      setShowPopupType("detail");
    } else if (type === "edit") {
      setShowPopupType("edit");
    }
  };

  //  Logic Close Pop-Up
  const handleClosePopup = () => {
    setShowPopupType("none");
  };

  const handleCloseRoleMaxPopup = () => {
    setShowRoleMaxPopup(false);
  };

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedAndPaginatedRoles = () => {
    let filteredRoles = roles || [];
    let allRole = allRoles || [];

    // Initialize startIndex
    let startIndex;

    if (searchTerm) {
      if (selectedCategory === "All Categories") {
        filteredRoles = allRole.filter(
          (role) =>
            role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            role.worksets.some((workset) =>
              workset.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) ||
            role.services.some((service) =>
              service.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
        );
      } else if (selectedCategory === "Role Name") {
        filteredRoles = allRole.filter((role) =>
          role.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (selectedCategory === "Workset") {
        filteredRoles = allRole.filter((role) =>
          role.worksets.some(
            (workset) =>
              workset.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          )
        );
      } else if (selectedCategory === "Services") {
        filteredRoles = allRole.filter((role) =>
          role.services.some(
            (service) =>
              service.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          )
        );
      }
      startIndex = (activePage - 1) * selectedItemsPerPage;
    } else {
      startIndex = 0;
    }

    // Sort the filtered Roles
    let sortedRoles;
    switch (sortField) {
      case "role_name":
        sortedRoles = sortByRoleName(filteredRoles, sortDirection);
        break
      case "workset":
        sortedRoles = sortByWorkset(filteredRoles, sortDirection);
        break
      case "services":
        sortedRoles = sortByServices(filteredRoles, sortDirection);
        break
      default:
        sortedRoles = filteredRoles;
    }
    const endIndex = startIndex + selectedItemsPerPage;
    const paginatedRoles = sortedRoles.slice(startIndex, endIndex);

    return { paginatedRoles, sortedRoles };
  };

  const { paginatedRoles, sortedRoles } = sortedAndPaginatedRoles();
  const displayedRoles = paginatedRoles;
  setRolesCountInPage(displayedRoles.length || 0)

  if (searchTerm) {
    setDisplayedRoles(sortedRoles.length || 0);
  }
  else if (allRoles) (
    setDisplayedRoles(allRoles.length || 0)
  )

  if (displayedRoles.length === 0) {
    setIsTableEmpty(true);
  } else {
    setIsTableEmpty(false);
  }

  // Calculate the starting index based on the current page and items per page
  const startIndex = (activePage - 1) * selectedItemsPerPage + 1;

  useEffect(() => {
    if (RoleContainer && displayedRoles) {
      const updatedRoleContainer = RoleContainer.filter(roleId =>
        displayedRoles.some(role => role.id === roleId)
      );
      setRoleContainer(updatedRoleContainer);
    }
  }, [searchTerm, selectedItemsPerPage, activePage]);
  return (
    <div>
      <div
        className="max-w-full table-wrapper"
        style={{ maxHeight: "444.4px", overflowY: "auto", overflowX: "hidden" }}
      >
        <table className="min-w-full table-fixed">
          <thead className="bg-primary sticky top-0 z-10">
            <tr>
              <th className="flex px-3 flex-row justify-center py-2 text-center items-center text-white border-white">
                <EditCheckboxAll
                  isAllChecked={isAllUserChecked}
                  setIsAllChecked={setIsAllUserChecked}
                  setIsClicked={setIsAllUserCheckboxClicked}
                />
                &nbsp;All
              </th>
              <th className="py-2 text-start text-white">
                No
              </th>
              <th className="text-left pl-14 text-white">
                Role Name
                <button
                  title="Sort by role name"
                  className="text-white hover:text-gray-300 ml-2"
                  onClick={() => toggleSort("role_name")}
                >
                  {sortField === "role_name" && sortDirection === "asc" ? (
                    <FaSortAlphaDownAlt />
                  ) : (
                    <FaSortAlphaDown />
                  )}
                </button>
              </th>
              <th className="text-left pl-16 text-white">
                Workset
                <button
                  title="Sort by workset"
                  className="text-white hover:text-gray-300 ml-2"
                  onClick={() => toggleSort("workset")}
                >
                  {sortField === "workset" && sortDirection === "asc" ? (
                    <FaSortAlphaDownAlt />
                  ) : (
                    <FaSortAlphaDown />
                  )}
                </button>
              </th>
              <th className="text-left pl-24 text-white">
                Services
                <button
                  title="Sort by services"
                  className="text-white hover:text-gray-300 ml-2"
                  onClick={() => toggleSort("services")}
                >
                  {sortField === "services" && sortDirection === "asc" ? (
                    <FaSortAlphaDownAlt />
                  ) : (
                    <FaSortAlphaDown />
                  )}
                </button>
              </th>
              <th className="text-right pr-12 text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-high-container">
            {displayedRoles.map((role, index) => (
              <tr key={role.id} className="text-white">
                <td className="text-center border-b border-white">
                  <EditCheckbox
                    className="text-center"
                    isChecked={false}
                    userId={role.id}
                    isAllChecked={isAllUserChecked}
                    setIsAllChecked={setIsAllUserChecked}
                    isAllClicked={isAllUserCheckboxClicked}
                    setIsAllClicked={setIsAllUserCheckboxClicked}
                    RoleContainer={RoleContainer}
                    setRoleContainer={setRoleContainer}
                    allRole={allRoles}
                    displayedRoles={displayedRoles}
                    searchTerm={searchTerm}
                  />
                </td>
                <td className="py-1 text-center border-b border-white">
                  {startIndex + index}
                </td>
                <td className="py-1 text-left pl-14 border-b border-white">
                  {role.name}
                </td>
                <td className="py-1 max-w-sm truncate text-left pl-16 border-b border-white">
                  {/* {role.worksets
                    .map((workset) => workset.workset.name)
                    // .map((workset) => workset.name)
                    .join(", ")} */}
                  {role.worksets
                    ? role.worksets.map((workset) => workset.name).join(", ")
                    : ""}
                </td>
                <td className="w-1/3 max-w-sm truncate overflow-x-auto py-1 text-left pl-24 border-b border-white">
                  {/* {role.services
                    .map((service) => service.service.name)
                    // .map((service) => service.name)
                    .join(", ")} */}
                  {role.services
                    ? role.services.map((service) => service.name).join(", ")
                    : ""}
                </td>
                <td className="py-1 text-right pr-6 border-b border-white">
                  {/* Detail Icon */}
                  <button
                    title="Detail"
                    className="text-black-500 hover:text-gray-500 mx-2"
                    onClick={async () =>
                      handleShowPopup(
                        "detail",
                        await FetchRoles.getDetailsRole(role.id)
                      )
                    }
                  // onClick={() => handleShowPopup("detail", role)}
                  >
                    <MdManageSearch className="w-6 h-6" />
                  </button>
                  {/* Edit Icon */}
                  <button
                    title="Edit"
                    className="text-black-500 hover:text-gray-500 mx-2"
                    onClick={async () =>
                      handleShowPopup(
                        "edit",
                        await FetchRoles.getDetailsRole(role.id)
                      )
                    }
                  >
                    <MdOutlineEdit className="w-6 h-6" />
                  </button>
                  {/* Delete Icon */}
                  <button
                    title="Delete"
                    className="text-error hover:text-red-700"
                    onClick={() => handleShowPopup("delete", role)}
                  >
                    <MdOutlineDeleteForever className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isTableEmpty && (
          <div className="bg-high-container text-white text-center items-center font-medium py-2">
            No data available in table
          </div>
        )}
      </div>
      <div className="items-end bottom-20 right-20 fixed pb-5">
        {RoleContainer.length > 0 && (
          <Button
            label="Delete Selected Item"
            clickHandler={() => handleShowPopup("delete", RoleContainer)}
            className="bg-dark-error hover:bg-error-hover mr-3 shadow-2xl"
          />
        )}
        {displayedRoles.length > 0 && (
          <Button
            label="Delete All"
            clickHandler={() => handleShowPopup("delete", allRoles.map((role) => role.id))
            }
            className="bg-dark-error hover:bg-error-hover shadow-2xl"
          />
        )}
      </div>
      {showPopupType === "detail" && (
        <DetailRole details={selectedData} handleClose={handleClosePopup} />
      )}
      {showPopupType === "delete" && (
        <DeleteRole
          details={selectedData}
          handleClose={handleClosePopup}
          setRoleContainer={setRoleContainer}
          isAll={selectedData.length > displayedRoles.length}
        />
      )}
      {showPopupType === "edit" && (
        <EditRole
          details={selectedData}
          handleClose={handleClosePopup}
          servicesList={services}
          worksetsList={worksets}
        />
      )}
      {showRoleMaxPopup && (
        <Modal
          label="Close"
          className="dark-error hover:bg-error-hover"
          handleClose={handleCloseRoleMaxPopup}
        >
          <div className="flex gap-2 text-center items-center justify-center">
            <BsFillXCircleFill className="text-dark-error w-6 h-6" />
            <h1 className="text-3xl font-bold">Roles Limit Reached!</h1>
          </div>
          <div className="py-2 flex justify-center text-center items-center">
            <div className="w-80 font-bold text-center">
              Delete some roles first
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RoleTable;
