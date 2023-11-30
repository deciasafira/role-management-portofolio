import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";

// ADD ROLE PAGE
import AddRole from "../components/add-role/AddRole";

// Component Role Management
import Headline from "../components/Headline/Headline";
import UnderlineTabs from "../components/Tabs/UnderlineTabs";
import RowsPerPage from "../components/Dropdown/RowsPerPage";
import CategoryButton from "../components/Dropdown/CategoryButton";
import SearchButton from "../components/Button/SearchButton";
import RoleTable from "../components/Table/RoleTable";
import Pagination from "../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
// import UserManagement from "./UserManagement";

// BE Integration W/ Redux
import { asyncReceiverRoles } from "../states/roles/Action";
import { asyncReceiverServices } from "../states/services/Action";
import { asyncReceiverWorksets } from "../states/worksets/Action";
import { useDispatch, useSelector } from "react-redux";
import { setIsActionSuccess } from "../states/global/action";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const RoleManagement = ({ showMap, setShowMap }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showRoleMaxPopup, setShowRoleMaxPopup] = useState(false);

  //Underline Tabs
  const [showRoleList, setShowRoleList] = useState(true);
  const [showAddRole, setShowAddRole] = useState(false);

  //Category Button
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCategoryClicked, setIsCategoryClicked] = useState(false);

  //Search Button
  const [searchTerm, setSearchTerm] = useState("");

  //Rows Per Page Dropdown
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState("10");

  // Loading State used for rendering user table upon changing pages
  const [isLoading, setIsLoading] = useState(true);
  const pageNumbers = [];

  // Init add role forms
  const [name, setName] = useState(name || "");
  const [selectedServices, setSelectedServices] = useState(selectedServices || []);
  const [selectedWorksets, setSelectedWorksets] = useState(selectedWorksets || []);

  const {
    roles = [],
    services = [],
    worksets = [],
    // response = []
  } = useSelector((states) => states);

  const isActionSuccess = useSelector(
    (states) => states.globalState.isActionSuccess
  );

  const [activePage, setActivePage] = useState(1);
  const [isTableEmpty, setIsTableEmpty] = useState(false);
  const [displayedRoles, setDisplayedRoles] = useState();
  const [RolesCountInPage, setRolesCountInPage] = useState();
  const [isAllUserChecked, setIsAllUserChecked] = useState(false);

  const [activeTab, setActiveTab] = useState("Role List");
  const tabs = [{ value: "Role List" }, { value: "Add Role" }];

  const tabRefs = tabs.reduce((acc, { value }) => {
    acc[value] = useRef(null);
    return acc;
  }, {});

  const simulateClickTab = (value) => {
    // Trigger the click event of the tab with the specified value
    if (tabRefs[value] && tabRefs[value].current) {
      tabRefs[value].current.click();
    }
  };

  const showSuccessToast = (text) => {
    toast.success(text, {
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
    dispatch(setIsActionSuccess(""));
  };

  const navigateToRoleList = () => {
    simulateClickTab("Role List");
    navigate("/role-management/role-list");
    if (!showRoleMaxPopup) {
      showSuccessToast("Add role success");
    }
    dispatch(setIsActionSuccess(""));
  };

  useEffect(() => {
    dispatch(asyncReceiverRoles(activePage, selectedItemsPerPage)).then(() => {
      setIsLoading(false); // Turn off loading indicator when data is loaded
    });
    dispatch(asyncReceiverServices());
    dispatch(asyncReceiverWorksets());
    if (isActionSuccess === 'delete role success') {
      showSuccessToast('Delete success')
      if (isAllUserChecked) {
        if (activePage > 1) {
          setIsAllUserChecked(false)
          setIsLoading(true);
          setActivePage(activePage - 1)
        } else {
          setIsAllUserChecked(false)
          setIsLoading(true);
          setActivePage(1)
        }
      }
      else if (RolesCountInPage === 1 && activePage > 1) {
        setIsLoading(true);
        setActivePage(activePage - 1)
      }
    }
    else if (isActionSuccess === 'delete all role success') {
      showSuccessToast('Delete all roles success')
      setIsLoading(true);
      setActivePage(1)
    }
    else if (isActionSuccess === "go to role list" && isLoading === false) {
      navigateToRoleList();
    }
  }, [dispatch, activePage, selectedItemsPerPage, isLoading, isActionSuccess]);

  const renderAddRole = () => {
    return (
      <div className="w-full h-full pb-14">
        <AddRole
          name={name}
          setName={setName}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          selectedWorksets={selectedWorksets}
          setSelectedWorksets={setSelectedWorksets}
        />
      </div>
    );
  };

  const renderRoleList = () => (
    <div>
      <div className="flex justify-between">
        <CategoryButton
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isCategoryClicked={isCategoryClicked}
          setIsCategoryClicked={setIsCategoryClicked}
        />
        <SearchButton searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <RowsPerPage
          selectedItemsPerPage={selectedItemsPerPage}
          setSelectedItemsPerPage={setSelectedItemsPerPage}
          setActivePage={setActivePage}
        />
      </div>
      <div className="w-full mt-10">
        {!isLoading && (
          <RoleTable
            roles={roles.map((role) => role.roles)[0]}
            services={services}
            worksets={worksets}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            selectedItemsPerPage={selectedItemsPerPage}
            activePage={activePage}
            allRoles={roles.map((role) => role.roles)[1]}
            showRoleMaxPopup={showRoleMaxPopup}
            setShowRoleMaxPopup={setShowRoleMaxPopup}
            setIsTableEmpty={setIsTableEmpty}
            isTableEmpty={isTableEmpty}
            setDisplayedRoles={setDisplayedRoles}
            setRolesCountInPage={setRolesCountInPage}
            isAllUserChecked={isAllUserChecked}
            setIsAllUserChecked={setIsAllUserChecked}
          />
        )}
      </div>
      <div className="w-pagination fixed z-0 bottom-10">
        {!isLoading && !isTableEmpty && (
          <Pagination
            rolesPerPage={selectedItemsPerPage}
            activePage={activePage}
            setActivePage={setActivePage}
            setIsLoading={setIsLoading}
            displayedRoles={displayedRoles}
            pageNumbers={pageNumbers}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col w-full px-20 mx-auto">
      <Headline
        title="Role Management"
        showMap={showMap}
        setShowMap={setShowMap}
      />
      <UnderlineTabs
        showRoleList={showRoleList}
        setShowRoleList={setShowRoleList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showAddRole={showAddRole}
        setShowAddRole={setShowAddRole}
        data={tabs}
        tabRefs={tabRefs}
        setShowRoleMaxPopup={setShowRoleMaxPopup}
      />
      <Routes>
        {showRoleList && <Route path="/role-list" element={renderRoleList()} />}
        {showAddRole && (
          <Route path="/add-role" element={showAddRole && renderAddRole()} />
        )}
      </Routes>
      {/* {showRoleList && renderRoleList()}
        {showAddRole && <UserManagement />} */}
    </div>
  );
};

export default RoleManagement;
