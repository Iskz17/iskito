// api/postData.js
import axiosInstance from "./axiosInstance";

export const postData = async (data) => {
  try {
    const response = await axiosInstance.post("/submit", data); // Make a POST request
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error for higher-level error handling
  }
};
