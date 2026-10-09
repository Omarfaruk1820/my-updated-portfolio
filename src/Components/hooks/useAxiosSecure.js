import { useMemo } from "react";
import axios from "axios";
import { auth } from "../Auth/firebase.config";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 15000,
      headers: {
        Accept: "application/json",
      },
    });

    instance.interceptors.request.use(
      async (config) => {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const token = await currentUser.getIdToken();

          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.error("Authentication failed. Please sign in again.");
        } else if (error.response?.status === 403) {
          console.error(
            "Access denied. You do not have permission for this resource.",
          );
        }

        return Promise.reject(error);
      },
    );

    return instance;
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
