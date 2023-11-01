import FetchRoles from "../../utils/FetchRoles";

const Action = {
  RECEIVE_WORKSETS: "RECEIVE_WORKSETS",
};

// RECEIVE WORKSETS
function receiveWorksetsActionCreator(worksets) {
  return {
    type: Action.RECEIVE_WORKSETS,
    payload: {
      worksets,
    },
  };
}

function asyncReceiverWorksets() {
  return async (dispatch) => {
    try {
      const response = await FetchRoles.getDataWorksets();
      dispatch(receiveWorksetsActionCreator(response));
    } catch (error) {
      console.log(error);
    }
  };
}

export { Action, receiveWorksetsActionCreator, asyncReceiverWorksets };
