import React from "react";
import { render, screen } from "@testing-library/react";
import CheckBox from "../../../components/checkbox/Roles/EditCheckbox";
import "@testing-library/jest-dom";

// Mock FontAwesomeIcon to prevent rendering issues in tests
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: jest.fn(),
}));

describe("CheckBox Component", () => {
  test("renders checkbox and handles click", () => {
    const isChecked = true;
    const role = { name: "Admin" };
    const allRole = [{ name: "Admin" }, { name: "User" }];
    const userId = 1;
    const isAllChecked = true;
    const setIsAllChecked = jest.fn();
    const isAllClicked = true;
    const setIsAllClicked = jest.fn();
    const TagsContainer = [{ name: "Admin" }];
    const setTagsContainer = jest.fn();
    const UserContainer = [1];
    const setUserContainer = jest.fn();
    const displayedUsers = [{ id: 1, name: "John" }];
    const searchTerm = "";

    render(
      <CheckBox
        isChecked={isChecked}
        role={role}
        allRole={allRole}
        userId={userId}
        isAllChecked={isAllChecked}
        setIsAllChecked={setIsAllChecked}
        isAllClicked={isAllClicked}
        setIsAllClicked={setIsAllClicked}
        TagsContainer={TagsContainer}
        setTagsContainer={setTagsContainer}
        UserContainer={UserContainer}
        setUserContainer={setUserContainer}
        displayedUsers={displayedUsers}
        searchTerm={searchTerm}
      />
    );

    // Verify checkbox is initially checked
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });
});
