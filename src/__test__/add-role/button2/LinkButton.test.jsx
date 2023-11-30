import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LinkButton from '../../../components/add-role/Button2/LinkButton.jsx';
import "@testing-library/jest-dom";

describe('LinkButton', () => {
  test('renders LinkButton with correct text and attributes', () => {
    const to = '/example';
    const buttonText = 'Click Me';
    const className = 'custom-class';
    const state = { someState: 'value' };
    const onClick = jest.fn();

    render(
      <MemoryRouter>
        <LinkButton to={to} className={className} state={state} onClick={onClick}>
          {buttonText}
        </LinkButton>
      </MemoryRouter>
    );

    const linkButton = screen.getByText(buttonText);
    
    // Ensure that the LinkButton has the correct attributes
    expect(linkButton).toHaveAttribute('href', to);
    expect(linkButton).toHaveClass(className);

    // Simulate a click event and check if the onClick callback is called
    fireEvent.click(linkButton);
    expect(onClick).toHaveBeenCalled();
  });
});
