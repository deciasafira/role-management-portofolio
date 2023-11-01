import { merge } from "./merge-url";

const FetchRoles = (() => {
  const API_URL = process.env.API_URL;
  const AUTH_TOKEN = process.env.AUTH_TOKEN;

  /**
   * Fetches user data from the API based on the provided page number and items per page.
   *
   * @param {number} page - The page number to fetch data from.
   * @param {number} limit - The number of items to display per page.
   * @returns {Promise} A promise that resolves to the response data.
   */

  // Data Roles (show all)
  async function getDataRoles(page, limit) {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/roles/?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );
      const responseData = await response.json();
      const roleData = responseData.data;
      return roleData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  /**
   * Fetches the total number of users from the API.
   *
   * @returns {Promise} A promise that resolves to the total number of users.
   */

  // Data Worksets
  async function getDataWorksets() {
    try {
      const response = await fetch(`${API_URL}/api/v1/worksets/`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      const responseData = await response.json();
      const worksetsData = responseData.data;
      return worksetsData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Data Services
  async function getDataServices() {
    try {
      const response = await fetch(`${API_URL}/api/v1/services/`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      const responseData = await response.json();
      const servicesData = responseData.data;
      return servicesData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Delete Data (roles by id)
  async function deleteDataRoles(id) {
    const response = { message: "role deleted successfully" }
    while (id.length > 0) {
      try {
        if (Array.isArray(id)) {
          for (const roleId of id) {
            await fetch(`${API_URL}/api/v1/roles/${roleId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
              },
            });
          }
          return response;
        } else {
          const response = await fetch(`${API_URL}/api/v1/roles/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
            },
          });
          const responseData = await response.json();
          return responseData;
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  }

  // Get detail role by id
  async function getDetailsRole(id) {
    try {
      const response = await fetch(`${API_URL}/api/v1/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      const responseData = await response.json();
      const roleDetails = responseData.data;
      // console.log("anjay", roleDetails);
      return roleDetails;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Update data roles
  async function updateDataRoles({ id, name, services, worksets }) {
    try {
      const response = await fetch(`${API_URL}/api/v1/roles/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          id,
          name,
          services,
          worksets,
        }),
      });

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  return {
    getDataRoles,
    deleteDataRoles,
    getDetailsRole,
    updateDataRoles,
    getDataWorksets,
    getDataServices,
  };
})();

export default FetchRoles;
