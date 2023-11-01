import FetchRoles from "../../utils/FetchRoles";

const Action = {
  RECEIVE_SERVICES: "RECEIVE_SERVICES",
};

// RECEIVE SERVICES
function receiverServicesActionCreator(services) {
  return {
    type: Action.RECEIVE_SERVICES,
    payload: {
      services,
    },
  };
}

function asyncReceiverServices() {
  return async (dispatch) => {
    try {
      const response = await FetchRoles.getDataServices();
      // console.log(response, "response ");
      dispatch(receiverServicesActionCreator(response));
    } catch (error) {
      console.log(error);
    }
  };
}

export { Action, receiverServicesActionCreator, asyncReceiverServices };
