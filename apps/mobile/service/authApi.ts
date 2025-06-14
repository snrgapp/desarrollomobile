import { LoginForm, RegisterForm } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

const getApiBaseUrl = () => {
  if (__DEV__) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // Production
  return (
    Constants.expoConfig?.extra?.apiUrl ||
    process.env.EXPO_PUBLIC_API_URL ||
    "https://production-api.com/api"
  );
};

const API_BASE_URL = getApiBaseUrl();
console.log("API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Error retrieving auth token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Error handling for 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.removeItem("authToken");
        // dispatch a logout action here
        // or use a navigation service to redirect to login
      } catch (e) {
        console.log("Error removing auth token:", e);
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials: LoginForm) => api.post("/login", credentials),
  register: (userData: RegisterForm) => api.post("/user", userData),
  googleLogin: (email: string) => api.post("/signin", { email }),
  logout: () => api.post("/auth/signout"),
};

export default api;
