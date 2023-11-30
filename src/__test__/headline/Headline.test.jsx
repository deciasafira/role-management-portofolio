import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import { FaAngleRight } from 'react-icons/fa';
import Headline from "../../components/Headline/Headline";
import "@testing-library/jest-dom";

describe("Headline", () => {
  it("renders the title correctly", () => {
    const testTitle = "Test Title";
    const { getByText } = render(<Headline title={testTitle} />);
    const titleElement = getByText(testTitle);

    expect(titleElement).toBeInTheDocument();
  });

  it("calls the goToMap function when the button is clicked", () => {
    const mockSetShowMap = jest.fn();
    const { getByText } = render(
      <Headline title="Test Title" setShowMap={mockSetShowMap} />
    );

    fireEvent.click(getByText("Back to main Map"));

    expect(mockSetShowMap).toHaveBeenCalledWith(true);
  });
});
