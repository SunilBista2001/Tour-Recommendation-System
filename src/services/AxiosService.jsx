import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    // if (localStorage.getItem("token") === null) return config;
    config["headers"]["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
