import axios from "axios";
import { toast } from "react-toastify";
import { formStorage } from "../lib";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

http.interceptors.request.use(
  (config) => {
    const token = formStorage("cmstoken");
    if (token) {
      config.headers.Authorization = Bearer ${token};
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;