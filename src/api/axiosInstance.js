import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for adding authorization header (JWT token) to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token"); // Retrieve token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Return rejected promise for further handling
  }
);

// Response Interceptor to handle common response error (e.g., 401 unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error (e.g., log out the user)
      console.error("Unauthorized! Redirecting to login...");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
