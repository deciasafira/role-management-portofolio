import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/button/Button.jsx';
import "@testing-library/jest-dom";

describe('Button Component', () => {
  it('renders Button component with default props', () => {
    render(<Button label="Click me" />);
    const buttonElement = screen.getByText('Click me');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
    expect(buttonElement).toHaveClass('text-white');
    // Add more assertions for default props if needed
  });

  it('renders Button component with custom props', () => {
    const clickHandlerMock = jest.fn();
    render(
      <Button
        label="Custom Button"
        className="custom-class"
        clickHandler={clickHandlerMock}
        disabled={true}
      />
    );
    const buttonElement = screen.getByText('Custom Button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('text-white custom-class');
    expect(buttonElement).toHaveAttribute('disabled');
    fireEvent.click(buttonElement);
    expect(clickHandlerMock).toHaveBeenCalled();
  });

  it('renders Button component with type "submit"', () => {
    render(<Button label="Submit" type="submit" />);
    const buttonElement = screen.getByText('Submit');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
