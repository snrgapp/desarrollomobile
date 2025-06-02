import { LoginForm, RegisterForm } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL =
  // Constants.expoConfig?.extra?.apiUrl ||
  // process.env.EXPO_PUBLIC_API_URL ||
  "http://localhost:3000/api";

console.log("API_BASE_URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // error handling for 401 Unauthorized
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await AsyncStorage.removeItem("authToken");
//       // Redirect to login - you might want to use router here
//     }
//     return Promise.reject(error);
//   }
// );

export const authAPI = {
  login: (credentials: LoginForm) => api.post("/auth/signin", credentials),
  register: (userData: RegisterForm) => api.post("/register", userData),
  logout: () => api.post("/logout"),
  getProfile: () => api.get("/profile"),
};

export default api;
