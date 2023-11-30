import React from "react";
import { render } from "@testing-library/react";
import TagsContainer from "../../components/tags-container/TagsContainer";
import "@testing-library/jest-dom";

describe("TagsContainer", () => {
  it("renders with the provided value", () => {
    const testValue = "Test Tag";
    const { getByText } = render(<TagsContainer value={testValue} />);
    const tagElement = getByText(testValue);

    expect(tagElement).toBeInTheDocument();
  });
});
