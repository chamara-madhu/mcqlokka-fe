import axios from "axios";
import { LOGIN_PATH } from "../constants/routes";

// Create an Axios instance
const axiosInstance = axios.create();

// Set the base URL for all requests
axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL;

// Add a request interceptor to include the Authorization header with the token
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("auth_token"); // Retrieve the auth token from localStorage

    if (authToken) {
      // Set the Authorization header if the token exists
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }

    return config; // Return the modified config object
  },
  (error) => {
    // Handle errors if necessary
    return Promise.reject(error);
  }
);

// ✅ Response interceptor for catching 401
axiosInstance.interceptors.response.use(
  (response) => response, // pass successful responses through
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear auth data
      localStorage.removeItem("auth_token");

      // clear other stored user data
      localStorage.removeItem("user_data");

      // Redirect to login page
      window.location.href = LOGIN_PATH;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
