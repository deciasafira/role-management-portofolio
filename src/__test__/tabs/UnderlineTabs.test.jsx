import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UnderlineTabs from '../../components/tabs/UnderlineTabs.jsx';
import { setIsActionSuccess } from '../../states/global/action';

// Mock Redux store
const mockStore = configureStore();

describe('UnderlineTabs Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      roles: [
        { total_record: 5 }, // You may customize the state as needed for your test
      ],
    });
  });

  // ... (previous tests)

  it('should toggle add role when clicking "Add Role" tab', () => {
    const setShowRoleListMock = jest.fn();
    const setShowAddRoleMock = jest.fn();
    const setActiveTabMock = jest.fn();
    const navigateMock = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UnderlineTabs
            setShowRoleList={setShowRoleListMock}
            setShowAddRole={setShowAddRoleMock}
            activeTab="Role List"
            setActiveTab={setActiveTabMock}
            tabRefs={{ 'Add Role': React.createRef(), 'Role List': React.createRef() }}
            setShowRoleMaxPopup={jest.fn()}
            data={[{ value: 'Add Role' }, { value: 'Role List' }]}
          />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Add Role'));

    expect(setActiveTabMock).toHaveBeenCalledWith('Add Role');
    expect(setShowAddRoleMock).toHaveBeenCalledWith(true);
    expect(setShowRoleListMock).toHaveBeenCalledWith(false);
    // Add more assertions if needed
  });

//   it('should dispatch setIsActionSuccess and show role max popup when rolesAmount is >= 100', () => {
//     const dispatchMock = jest.fn();
//     const setShowRoleMaxPopupMock = jest.fn();

//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <UnderlineTabs
//             setShowRoleList={jest.fn()}
//             setShowAddRole={jest.fn()}
//             activeTab="Role List"
//             setActiveTab={jest.fn()}
//             tabRefs={{ 'Add Role': React.createRef(), 'Role List': React.createRef() }}
//             setShowRoleMaxPopup={setShowRoleMaxPopupMock}
//             data={[{ value: 'Add Role' }, { value: 'Role List' }]}
//           />
//         </BrowserRouter>
//       </Provider>
//     );

//     fireEvent.click(screen.getByText('Add Role'));

//     // Instead of expecting 'go to role list', expect the action itself
//     expect(dispatchMock).toHaveBeenCalledWith({
//       type: 'SET_IS_ACTION_SUCCESS',
//       payload: { status: 'go to role list' },
//     });

//     expect(setShowRoleMaxPopupMock).toHaveBeenCalledWith(true);
//   });
});
