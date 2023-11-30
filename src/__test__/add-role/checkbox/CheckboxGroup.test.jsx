import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxGroup from "../../../components/add-role/checkbox/CheckboxGroup.jsx"; // Adjust the path accordingly

describe("CheckboxGroup", () => {
  const label = "Test Label";
  const options = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ];
  const selected = [1];
  const handleSelection = jest.fn();
  const searchTerm = "";

  test("renders CheckboxGroup with options", () => {
    render(
      <CheckboxGroup
        label={label}
        options={options}
        selected={selected}
        handleSelection={handleSelection}
        searchTerm={searchTerm}
      />
    );

    // Ensure that the CheckboxHeader component is rendered with the correct props
    expect(screen.getByText(label)).toBeInTheDocument();

    // Ensure that the SingleCheckbox component is rendered for each option
    options.forEach((item) => {
      expect(screen.getByLabelText(item.name)).toBeInTheDocument();
    });
  });

  test("handles checkbox changes", () => {
    render(
      <CheckboxGroup
        label={label}
        options={options}
        selected={selected}
        handleSelection={handleSelection}
        searchTerm={searchTerm}
      />
    );

    // Trigger a change in the checkbox
    fireEvent.click(screen.getByLabelText("Option 1"));

    // Ensure that the handleSelection function is called with the updated selection
    expect(handleSelection).toHaveBeenCalledWith([]);
  });
});
