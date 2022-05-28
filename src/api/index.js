import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_END_POINT,
  timeout: 2000,
  withCredentials: true,
};

export const createAxiosInstance = (config, useToken = false) => {
  const instance = axios.create(config);

  instance.interceptors.request.use(
    config => {
      const lsData = JSON.parse(localStorage.getItem("study-with-ai") ?? {});
      const token = lsData?.token;

      if (!useToken) return config;

      config.headers = {
        common: {
          Authorization: `Bearer ${token}`,
        },
      };

      return config;
    },

    error => {
      return Promise.reject(error);
    }
  )

  return instance;
}

export const tokenApi = createAxiosInstance(config, true);
