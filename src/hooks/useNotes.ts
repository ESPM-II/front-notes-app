import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

const errorMessages: Record<string, string> = {
  "Note not found": "Error: Nota no encontrada.",
  "You cannot edit this note":
    "Error: No tienes permiso para editar esta nota.",
  "The note has been previously modified":
    "Error: La nota fue modificada previamente. Recarga la página.",
  "Network Error": "Error de red. Verifica tu conexión a internet.",
  Unauthorized: "Token inválido o expirado. Redirigiendo al login.",
  default: "Hubo un error. Por favor, intenta de nuevo.",
};

export interface Note {
  id: number;
  title: string;
  content: string;
  user_id: number;
  version: number;
}

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const router = useRouter();

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Obtener todas las notas
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axiosInstance.get("/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        showSnackbar(errorMessages["Unauthorized"], "error");
        router.push("/");
      } else {
        showSnackbar(errorMessages["default"], "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Crear una nota
  const createNote = async (title: string, content: string) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axiosInstance.post(
        "/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prevNotes) => [...prevNotes, response.data]);
      showSnackbar("Nota creada correctamente.", "success");
    } catch (err: any) {
      if (err.response?.status === 401) {
        showSnackbar(errorMessages["Unauthorized"], "error");
        router.push("/");
      } else {
        showSnackbar("Error al crear la nota.", "error");
      }
    }
  };

  // Eliminar una nota
  const deleteNote = async (id: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axiosInstance.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
      showSnackbar("Nota eliminada correctamente.", "success");
    } catch (err: any) {
      if (err.response?.status === 401) {
        showSnackbar(errorMessages["Unauthorized"], "error");
        router.push("/");
      } else {
        showSnackbar("Error al eliminar la nota.", "error");
      }
    }
  };

  // Actualizar una nota
  const updateNote = async (id: number, title: string, content: string) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const noteToUpdate = notes.find((note) => note.id === id);
      if (!noteToUpdate) throw new Error("Note not found");

      const response = await axiosInstance.put(
        `/notes/${id}`,
        { title, content, version: noteToUpdate.version },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotes(
        notes.map((note) =>
          note.id === id
            ? { ...note, title, content, version: response.data.version }
            : note
        )
      );
      showSnackbar("Nota actualizada correctamente.", "success");
    } catch (err: any) {
      if (err.response?.status === 401) {
        showSnackbar(errorMessages["Unauthorized"], "error");
        router.push("/");
      } else {
        const errorDetail = err.response?.data?.detail || "default";
        showSnackbar(
          errorMessages[errorDetail] || errorMessages["default"],
          "error"
        );
      }
    }
  };

  return {
    notes,
    fetchNotes,
    loading,
    createNote,
    deleteNote,
    updateNote,
    snackbarMessage,
    snackbarSeverity,
    openSnackbar,
    setOpenSnackbar,
  };
};

export default useNotes;
