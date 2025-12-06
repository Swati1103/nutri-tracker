// Load API URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const getAPIUrl = () => BACKEND_URL;
export const getFullURL = (endpoint) => `${BACKEND_URL}${endpoint}`;

export default {
  BACKEND_URL,
  getAPIUrl,
  getFullURL,
};
