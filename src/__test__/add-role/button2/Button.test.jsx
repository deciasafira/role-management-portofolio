import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

import Button from '../../components/add-role/Button2/Button.jsx';

describe('Button component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls the clickHandler function when clicked', () => {
    const clickHandler = jest.fn();
    const { getByText } = render(<Button clickHandler={clickHandler}>Click me</Button>);
    
    fireEvent.click(getByText('Click me'));

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    const { getByText } = render(<Button disabled>Click me</Button>);
    expect(getByText('Click me')).toBeDisabled();
  });

  it('applies custom class name', () => {
    const { container } = render(<Button className="custom-class">Click me</Button>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
