import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { Note } from "@/hooks/useNotes";

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  note: Note | null;
  onUpdate: (id: number, title: string, content: string) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  open,
  onClose,
  note,
  onUpdate,
}) => {
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");

  useEffect(() => {
    setEditedTitle("");
    setEditedContent("");
  }, [note]);

  const handleSave = () => {
    if (note) {
      const titleToSave = editedTitle.trim() === "" ? note.title : editedTitle;
      const contentToSave =
        editedContent.trim() === "" ? note.content : editedContent;
      onUpdate(note.id, titleToSave, contentToSave);
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
          width: { xs: "90%", md: 400 },
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
          placeholder={note?.title}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Contenido"
          placeholder={note?.content}
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
