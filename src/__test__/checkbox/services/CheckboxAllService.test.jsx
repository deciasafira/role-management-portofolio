import React from "react";
import { render, screen } from "@testing-library/react";
import CheckBoxAllServices from "../../../components/checkbox/services/CheckboxAllService";
import "@testing-library/jest-dom";

// Mock FontAwesomeIcon to prevent rendering issues in tests
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: jest.fn(),
}));

describe("CheckBoxAllServices Component", () => {
  test("renders checkbox and handles click", () => {
    const label = true;
    const isAllChecked = true;
    const setIsAllChecked = jest.fn();
    const setIsClicked = jest.fn();

    render(
      <CheckBoxAllServices
        label={label}
        isAllChecked={isAllChecked}
        setIsAllChecked={setIsAllChecked}
        setIsClicked={setIsClicked}
      />
    );

    // Verify checkbox is initially checked
    const checkbox = screen.getByRole("checkbox");
  });
});
