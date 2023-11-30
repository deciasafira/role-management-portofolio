import React from "react";
import { render } from "@testing-library/react";
import RoleTable from "../../components/table/RoleTable.jsx";
import "@testing-library/jest-dom";

// Mock the FetchRoles module
jest.mock("../../utils/FetchRoles", () => ({
  getDetailsRole: jest.fn((roleId) =>
    Promise.resolve({ id: roleId, name: `Role-${roleId}` })
  ),
}));

describe("RoleTable component", () => {
  const roles = [
    {
      id: 1,
      name: "Role1",
      worksets: [{ name: "Workset1" }],
      services: [{ name: "Service1" }],
    },
    {
      id: 2,
      name: "Role2",
      worksets: [{ name: "Workset2" }],
      services: [{ name: "Service2" }],
    },
    // Add more sample roles as needed
  ];

  const services = [
    { id: 1, name: "Service1" },
    { id: 2, name: "Service2" },
    // Add more sample services as needed
  ];

  const worksets = [
    { id: 1, name: "Workset1" },
    { id: 2, name: "Workset2" },
    // Add more sample worksets as needed
  ];

  const defaultProps = {
    roles,
    services,
    worksets,
    selectedCategory: "All Categories",
    searchTerm: "",
    selectedItemsPerPage: 10,
    activePage: 1,
    allRoles: roles,
    showRoleMaxPopup: false,
    setShowRoleMaxPopup: jest.fn(),
    setIsTableEmpty: jest.fn(),
    isTableEmpty: false,
    setDisplayedRoles: jest.fn(),
    setRolesCountInPage: jest.fn(),
    isAllUserChecked: false,
    setIsAllUserChecked: jest.fn(),
  };

  test("renders RoleTable component", () => {
    const { getByText } = render(<RoleTable {...defaultProps} />);

    // Check if the role names are rendered
    roles.forEach((role) => {
      expect(getByText(role.name)).toBeInTheDocument();
    });

    // Check if the services and worksets are rendered
    services.forEach((service) => {
      expect(getByText(service.name)).toBeInTheDocument();
    });

    worksets.forEach((workset) => {
      expect(getByText(workset.name)).toBeInTheDocument();
    });
  });

  // Add more test cases as needed for different functionalities in your component
});
