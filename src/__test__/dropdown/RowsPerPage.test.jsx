import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RowsPerPage from '../..//components/dropdown/RowsPerPage.jsx';
import "@testing-library/jest-dom";

// Mock the useEffect hook
jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect);

describe('RowsPerPage Component', () => {
    test('renders dropdown and handles selection', () => {
        const selectedItemsPerPage = '10';
        const setSelectedItemsPerPage = jest.fn();
        const setActivePage = jest.fn();
        render(
            <RowsPerPage
                selectedItemsPerPage={selectedItemsPerPage}
                setSelectedItemsPerPage={setSelectedItemsPerPage}
                setActivePage={setActivePage}
            />
        );

        // Verify that the initial selected items per page is displayed
        const selectedPerPageText = screen.getByText(selectedItemsPerPage);
        expect(selectedPerPageText).toBeInTheDocument();

        // Simulate clicking the dropdown button
        const dropdownButton = screen.getByRole('button');
        fireEvent.click(dropdownButton);

        // Verify that the dropdown options are displayed
        const dropdownOptions = screen.getAllByRole('listitem');
        expect(dropdownOptions).toHaveLength(3); // Assuming three itemsPerPage options are rendered

        // Simulate clicking one of the options
        fireEvent.click(dropdownOptions[1]);

        // Verify that setSelectedItemsPerPage and setActivePage are called with the correct arguments
        expect(setSelectedItemsPerPage).toHaveBeenCalledWith('25');
        expect(setActivePage).toHaveBeenCalledWith(1);
    });
});
