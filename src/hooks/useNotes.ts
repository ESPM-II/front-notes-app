import { useState } from "react";
import axios from "axios";

interface Note {
  id: number;
  title: string;
  content: string;
  user_id: number;
  version: number;
}

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:8000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ha ocurrido un error desconocido.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:8000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ha ocurrido un error desconocido.");
      }
    }
  };

  const updateNote = async (id: number, title: string, content: string) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.put(
        `http://localhost:8000/api/notes/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(
        notes.map((note) =>
          note.id === id ? { ...note, title, content } : note
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ha ocurrido un error desconocido.");
      }
    }
  };

  return { notes, fetchNotes, loading, error, deleteNote, updateNote };
};

export default useNotes;
