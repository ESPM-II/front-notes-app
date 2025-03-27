import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Objeto para definir las respuestas que mostraré al cliente según la respuesta del servidor
const errorMessages: Record<string, string> = {
  "Invalid credentials": "Credenciales inválidas. Verifica tus datos.",
  "User not found": "Usuario no encontrado. Verifica el nombre de usuario.",
  "Internal server error": "Error interno del servidor. Intenta más tarde.",
  "Network Error": "Error de red. Verifica tu conexión a internet.",
  "Email already registered": "El correo ya está registrado. Usa otro.",
  "Username already taken": "El nombre de usuario ya está en uso.",
  default: "Hubo un error. Por favor, intenta de nuevo.",
};

const useAuth = () => {
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  ); // Controlando el severity de la respuesta para mostrar en snackbar
  const router = useRouter();

  // Función para iniciar sesión
  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      setSnackbarMessage("Por favor, ingresa todos los campos.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          username,
          password,
        }
      );

      if (response.data?.access_token) {
        localStorage.setItem("jwtToken", response.data.access_token);
        router.push("/dashboard");
      } else {
        setSnackbarMessage("No se pudo iniciar sesión. Intenta de nuevo.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error: any) {
      const errorDetail = error.response?.data?.detail || "default";
      setSnackbarMessage(
        errorMessages[errorDetail] || errorMessages["default"]
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Función para registrarse
  const handleSignUp = async (
    username: string,
    email: string,
    password: string
  ) => {
    if (!username || !email || !password) {
      return { success: false, detail: "Todos los campos son obligatorios." };
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 201) {
        setSnackbarMessage(
          "Cuenta creada exitosamente. Ahora puedes iniciar sesión."
        );
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        return { success: true, detail: "Cuenta creada exitosamente." };
      }
    } catch (error: any) {
      const errorDetail = error.response?.data?.detail || "default";
      const message = errorMessages[errorDetail] || errorMessages["default"];
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return { success: false, detail: message };
    }
  };

  return {
    handleLogin,
    handleSignUp,
    error,
    successMessage,
    openSnackbar,
    setOpenSnackbar,
    setError,
    setSuccessMessage,
    snackbarMessage,
    snackbarSeverity,
  };
};

export default useAuth;
