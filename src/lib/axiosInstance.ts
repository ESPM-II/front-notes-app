import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface ErrorResponse {
  detail?: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
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
