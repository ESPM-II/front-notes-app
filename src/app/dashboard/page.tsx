"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Snackbar,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
} from "@mui/material";
import useNotes, { Note } from "@/hooks/useNotes";
import NoteModal from "@/components/NoteModal";
import AddNotePanel from "@/components/AddNotePanel";


const Dashboard = () => {
  const {
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
  } = useNotes();

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchNotes();
    }
  }, [isClient]);

  const handleOpenModal = (note: Note) => {
    setSelectedNote(note);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNote(null);
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
  };

  const handleEdit = (id: number) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      handleOpenModal(noteToEdit);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" mb={3}>
        Mis Notas
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={2}
        >
          {notes.map((note: Note) => (
            <Card
              key={note.id}
              sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
                boxShadow: 3,
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {note.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleEdit(note.id)}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleDelete(note.id)}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      <NoteModal open={openModal} onClose={handleCloseModal} note={selectedNote} onUpdate={updateNote} />

      <AddNotePanel onCreateNote={createNote} />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
