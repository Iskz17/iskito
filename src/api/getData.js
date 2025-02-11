// api/getData.js
import axiosInstance from "./axiosInstance";

export const fetchData = async () => {
  try {
    const response = await axiosInstance.get("/data"); // Make a GET request
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error for higher-level error handling
  }
};
