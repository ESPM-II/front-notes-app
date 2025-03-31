'use client'; 

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Snackbar,
  Box,
  Card,
  CardContent,
  IconButton,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useNotes, { Note } from "@/hooks/useNotes";
import NoteModal from "@/components/NoteModal";
import NoteViewModal from "@/components/NoteViewModal";
import AddNotePanel from "@/components/AddNotePanel";
import Navbar from "@/components/Navbar";

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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchNotes();
    }
  }, [isClient]);

  const handleOpenEditModal = (note: Note) => {
    setSelectedNote(note);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedNote(null);
  };

  const handleOpenViewModal = (note: Note) => {
    setSelectedNote(note);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedNote(null);
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
  };

  const handleEdit = (id: number) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      handleOpenEditModal(noteToEdit);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Navbar/>
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
            gap={3}
          >
            {notes.map((note: Note) => (
              <Card
                key={note.id}
                onClick={() => handleOpenViewModal(note)}
                sx={{
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 8,
                    backgroundColor: "#f5f5f5", 
                  },
                  boxShadow: 4,
                  borderRadius: "16px", 
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: "#fff", 
                  marginBottom: "1rem", 
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#333" }}>
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" noWrap sx={{ fontSize: "0.9rem" }}>
                    {note.content}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(note.id);
                    }}
                    sx={{ color: "#6200EE", "&:hover": { color: "#3700B3" } }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                    sx={{ color: "#f44336", "&:hover": { color: "#d32f2f" } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
        )}

        <NoteModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          note={selectedNote}
          onUpdate={updateNote}
        />

        <NoteViewModal
          open={openViewModal}
          onClose={handleCloseViewModal}
          note={selectedNote}
        />

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
    </>
  );
};

export default Dashboard;
