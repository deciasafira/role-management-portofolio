import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../../components/modals/Modal";

describe("Modal component", () => {
    render(<Modal />);
})

it("renders a modal with provided children, label, and applies the provided className to button component inside", () => {
    const handleClose = jest.fn();
    const label = "Click Me";
    const className = "custom-class";

    const { getByText } = render(
        <Modal handleClose={handleClose} label={label} className={className}>
            <p>Modal Content</p>
        </Modal>
    )

    expect(getByText("Modal Content")).toBeInTheDocument();
    expect(getByText(label)).toBeInTheDocument();
});
