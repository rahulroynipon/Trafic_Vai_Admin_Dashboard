import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://traffic-vai.onrender.com/api/v1",
});
// http://localhost:5000/api/v1
// https://traffic-vai.onrender.com/api/v1
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
