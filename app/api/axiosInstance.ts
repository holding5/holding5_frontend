import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstace = axios.create({
  baseURL: "http://211.188.61.113:8080",
});

axiosInstace.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstace;
