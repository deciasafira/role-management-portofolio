import { Action } from "./Action";

function worksetsReducer(worksets = [], action = {}) {
  switch (action.type) {
    case Action.RECEIVE_WORKSETS:
      return action.payload.worksets;
    default:
      return worksets;
  }
}

export default worksetsReducer;
