import axios from "axios";

// const API_URL = "http://localhost:5000";
export const API_URL = "https://emmanuelserver.onrender.com";


const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/// Login API.
export const login = async (userName, password) => {
  try {
    const response = await api.post("/auth/login", { userName, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login Failed";
  }
};

/// Register API for new user.
export const register = async (userName, password, role, name) => {
  try {
    const response = await api.post("/auth/register", {
      userName,
      password,
      role,
      name,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration Failed";
  }
};

/// News Fetch API.
export const fetchNews = async () => {
  try {
    const response = await api.get("/fetch_news?latest=true");
    return response.data.news;
  } catch (error) {
    throw new Error("Failed to fetch news. Please try again later.");
  }
};
