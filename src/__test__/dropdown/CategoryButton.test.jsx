import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import CategoryButton from '../../components/dropdown/CategoryButton.jsx';

describe('CategoryButton', () => {
    const mockProps = {
        selectedCategory: 'All Categories',
        setSelectedCategory: jest.fn(),
        isCategoryClicked: false,
        setIsCategoryClicked: jest.fn(),
    };

    it('renders the CategoryButton component', () => {
        const { getByText } = render(<CategoryButton {...mockProps} />);
        const filterButton = getByText(/Filter by/i);
        expect(filterButton).toBeInTheDocument();
    });

    it('displays the dropdown when the button is clicked', () => {
        const { getByText } = render(<CategoryButton {...mockProps} />);
        const filterButton = getByText(/Filter by/i);
        fireEvent.click(filterButton);
        const allCategoriesOption = getByText(/All Categories/i);
        expect(allCategoriesOption).toBeInTheDocument();
    });

    it('closes the dropdown when clicking outside', () => {
        const { getByText, queryByText, container } = render(<CategoryButton {...mockProps} />);
        const filterButton = getByText(/Filter by/i);

        // Open the dropdown
        fireEvent.click(filterButton);

        // Check that the dropdown is open
        expect(queryByText(/All Categories/i)).toBeInTheDocument();

        // Click outside the dropdown
        const outsideElement = container.firstChild;
        fireEvent.mouseDown(outsideElement);

        // Check that the dropdown is closed
        expect(queryByText(/All Categories/i)).not.toBeInTheDocument();
    });
});
