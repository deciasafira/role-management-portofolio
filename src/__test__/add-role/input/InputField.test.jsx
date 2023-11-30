import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import InputField from "../../../components/add-role/Input/InputField.jsx"; // adjust the import path

describe("InputField Component", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <InputField placeholder="Test Placeholder" />
    );

    const inputField = getByPlaceholderText("Test Placeholder");

    expect(inputField).toBeInTheDocument();
  });

  // it("handles value change correctly", () => {
  //   const handleChange = jest.fn();

  //   const { getByPlaceholderText } = render(
  //     <InputField
  //       placeholder="Test Placeholder"
  //       value=""
  //       changeHandler={handleChange}
  //     />
  //   );

  //   const inputField = getByPlaceholderText("Test Placeholder");

  //   fireEvent.change(inputField, { target: { value: "test" } });

  //   expect(handleChange).toHaveBeenCalledTimes(1);
  //   expect(handleChange).toHaveBeenCalledWith("test");
  // });

  it("handles focus and blur events correctly", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    const { getByPlaceholderText } = render(
      <InputField
        placeholder="Test Placeholder"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );

    const inputField = getByPlaceholderText("Test Placeholder");

    fireEvent.focus(inputField);
    fireEvent.blur(inputField);

    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Add more test cases as needed
});
