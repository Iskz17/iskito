// api/updateData.js
import axiosInstance from './axiosInstance';

export const updateData = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/data/${id}`, updatedData); // Make a PUT request
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error for higher-level error handling
  }
};
