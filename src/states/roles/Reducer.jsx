import { Action } from "./Action";

function rolesReducer(roles = [], action = {}) {
  switch (action.type) {
    case Action.RECEIVE_ROLES:
      return [{...action.payload.roles}, {...action.payload.allRoles}];
    case Action.DELETE_ROLES:
      return roles.filter((role) => role.id !== action.payload.roleId);
    case Action.UPDATE_ROLES:
      return roles.map((role) => {
        if (role.id === action.payload.role.data.id) {
          return {...action.payload.role.data};
        } else {
          return {...role};
        }
      });
    default:
      return roles;
  }
}

export default rolesReducer;
