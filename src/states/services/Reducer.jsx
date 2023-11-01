import { Action } from "./Action";

function servicesReducer(services = [], action = {}) {
  switch (action.type) {
    case Action.RECEIVE_SERVICES:
      return action.payload.services;
    default:
      return services;
  }
}

export default servicesReducer;
