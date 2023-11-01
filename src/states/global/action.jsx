const ActionType = {
    SET_IS_ACTION_SUCCESS: 'SET_IS_ACTION_SUCCESS',
    SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE',
}

/**
 * Action creator function to set the success status of a user action in the global state.
 *
 * @param {boolean} status - The success status of the user action.
 * @returns {Object} An action object with a type and payload.
 */
function setIsActionSuccess(status) {
    return {
        type: ActionType.SET_IS_ACTION_SUCCESS,
        payload: {
            status,
        },
    };
}

function setErrorMessage(message) {
    return {
        type: ActionType.SET_ERROR_MESSAGE,
        payload: {
            message,
        },
    };
}

export {
    ActionType,
    setIsActionSuccess,
    setErrorMessage,
}