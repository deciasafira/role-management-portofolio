import FetchRoles from "../../utils/FetchRoles";
import { setIsActionSuccess, setErrorMessage } from "../global/action";

const Action = {
  RECEIVE_ROLES: "RECEIVE_ROLES",
  DELETE_ROLES: "DELETE_ROLES",
  UPDATE_ROLES: "UPDATE_ROLES",
};

// RECEIVE ROLES
function receiveRolesActionCreator(roles, allRoles) {
  return {
    type: Action.RECEIVE_ROLES,
    payload: {
      roles,
      allRoles
    },
  };
}

// DELETE ROLES
function deleteRolesActionCreator(roleId) {
  return {
    type: Action.DELETE_ROLES,
    payload: {
      roleId,
    },
  };
}

// UPDATE ROLES
function updateRoleActionCreator(roles) {
  return {
    type: Action.UPDATE_ROLES,
    payload: {
      roles,
    },
  };
}

/**
 * Fetches role data from the API based on the provided page number and items per page.
 *
 * @param {number} page - The page number to fetch data from.
 * @param {number} limit - The number of items to display per page.
 * @returns {Promise} A promise that resolves to the response data.
 */
function asyncReceiverRoles(page, limit) {
  return async (dispatch) => {
    try {
      const response = await FetchRoles.getDataRoles(page, limit);
      const allRoles = await FetchRoles.getDataRoles(1, 100);
      dispatch(receiveRolesActionCreator(response, allRoles));
    } catch (error) {
      console.log(error);
    }
  };
}

function asyncDeleteRoles(roleId) {
  return async (dispatch) => {
    try {
      const responseDelete = await FetchRoles.deleteDataRoles(roleId);
      if (responseDelete.message === "role deleted successfully." || responseDelete.message === "role deleted successfully") {
        console.log("updatedRole.message", responseDelete.message)
        dispatch(setIsActionSuccess("delete role success"))
        dispatch(deleteRolesActionCreator(roleId));
      }
      else {
        console.log("error delete", responseDelete.error)
        dispatch(setIsActionSuccess("failed"))
        dispatch(setErrorMessage(responseDelete.error))
      }
    } catch (error) {
      console.log(error.message);
      dispatch(deleteRolesActionCreator(roleId));
    }
  };
}

function asyncUpdateRoles({ id, name, services, worksets }) {
  return async (dispatch) => {
    // console.log('asdasd')
    try {
      const updatedRole = await FetchRoles.updateDataRoles({
        id,
        name,
        services,
        worksets,
      });
      // console.log("asdasdasdsadasdasd", updatedRole)
      if (updatedRole.message === "role updated successfully.") {
        console.log("updatedRole.message", updatedRole.message);
        dispatch(setIsActionSuccess("success"));
      } else {
        console.log("updatedRole.message", updatedRole.error);
        dispatch(setIsActionSuccess("failed"));
        dispatch(setErrorMessage(updatedRole.error));
      }
      dispatch(updateRoleActionCreator(updatedRole));
    } catch (error) {
      console.log(error.message);
    }
  };
}

export {
  Action,
  receiveRolesActionCreator,
  deleteRolesActionCreator,
  updateRoleActionCreator,
  asyncDeleteRoles,
  asyncReceiverRoles,
  asyncUpdateRoles,
};
