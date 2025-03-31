import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface ErrorResponse {
  detail?: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (
      error.response?.data?.detail === "No se pudo validar las credenciales"
    ) {
      return Promise.reject("TOKEN_EXPIRED");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
