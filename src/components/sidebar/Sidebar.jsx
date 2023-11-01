import React from "react";
import RoleManagementIcon from "../../assets/RoleManagementIcon.svg";
import UserManagementIcon from "../../assets/UserManagementIcon.svg";

const Sidebar = ({
  setShowRoleManagement,
  setShowUserManagement,
  showRoleManagement,
  showUserManagement,
}) => {
  // Role Management
  const toggleRoleManagement = () => {
    setShowRoleManagement(true);
    setShowUserManagement(false);
  };

  // User Management
  const toggleUserManagement = () => {
    setShowUserManagement(true);
    setShowRoleManagement(false);
  };

  return (
    <div className="w-sidebar sticky top-0 h-screen flex flex-col justify-center items-center bg-primary-container ">
      <div className="w-full">
        <img
          src={UserManagementIcon}
          alt="User Management Icon"
          className={`py-1 w-full h-14 mb-5 transition-all duration-300 hover:bg-low-container hover:cursor-pointer rounded-md ${showUserManagement ? "bg-low-container" : ""}`}
          onClick={toggleUserManagement}
        />
      </div>
      <div className="text-white w-full h-10">
        <img
          src={RoleManagementIcon}
          alt="Role Management Icon"
          className={`py-1 w-full h-14 transition-all duration-300 hover:bg-low-container hover:cursor-pointer rounded-md ${showRoleManagement ? "bg-low-container" : ""}`}
          onClick={toggleRoleManagement}
        />
      </div>
    </div>
  );
};

export default Sidebar;