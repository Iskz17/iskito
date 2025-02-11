// api/deleteData.js
import axiosInstance from "./axiosInstance";

export const deleteData = async (id) => {
  try {
    const response = await axiosInstance.delete(`/data/${id}`); // Make a DELETE request
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error for higher-level error handling
  }
};
