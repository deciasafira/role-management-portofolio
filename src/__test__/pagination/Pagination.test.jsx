import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../../components/pagination/Pagination';
import "@testing-library/jest-dom";

describe('Pagination Component', () => {
    const mockProps = {
        usersPerPage: 10,
        activePage: 1,
        setActivePage: jest.fn(),
        setIsLoading: jest.fn(),
        displayedUsers: 30,
    };

    it('renders correctly with given props', () => {
        const { getByText } = render(<Pagination {...mockProps} />);

        expect(getByText('Showing 1 to 10 of 30 entries')).toBeInTheDocument();
        // You can add more assertions based on your component's expected initial state
    });

    it('disables Previous button on the first page', () => {
        const { getByText } = render(<Pagination {...mockProps} />);
        const previousButton = getByText('Previous');

        fireEvent.click(previousButton);
        expect(mockProps.setActivePage).not.toHaveBeenCalled();
    });

    it('changes active page on button click', () => {
        const { getByText } = render(<Pagination {...mockProps} />);
        const pageTwoButton = getByText('2');

        fireEvent.click(pageTwoButton);
        expect(mockProps.setActivePage).toHaveBeenCalledWith(2);
        expect(mockProps.setIsLoading).toHaveBeenCalledWith(true);
    });
    // Add more test cases based on your component's functionality
});
