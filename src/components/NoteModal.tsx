import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

interface Note {
  id: number;
  title: string;
  content: string;
  user_id: number;
  version: number;
}

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  note: Note | null;
  onUpdate: (id: number, title: string, content: string) => void;
}

const NoteModal = ({ open, onClose, note, onUpdate }: NoteModalProps) => {
  const [editedTitle, setEditedTitle] = useState(note?.title || "");
  const [editedContent, setEditedContent] = useState(note?.content || "");

  const handleSave = () => {
    if (note) {
      onUpdate(note.id, editedTitle, editedContent);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Editar Nota
        </Typography>
        <TextField
          fullWidth
          label="Título"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Contenido"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          margin="normal"
          multiline
          rows={4}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};

export default NoteModal;
