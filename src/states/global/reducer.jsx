import { ActionType } from "./action";

const initialState = {
    isActionSuccess: "",
    errorMessage: "",
}

/**
 * Reducer function for the global state in Redux.
 *
 * @param {Object} state - The current state of the global reducer.
 * @param {Object} action - The action object dispatched to update the state.
 * @returns {Object} The updated state based on the action type and payload.
 */
function globalReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ActionType.SET_IS_ACTION_SUCCESS:
            return {
                ...state,
                isActionSuccess: action.payload.status,
            };
        case ActionType.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload.message,
            }
        default:
            return state;
    }
}

export default globalReducer;