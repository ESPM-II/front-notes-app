import { Modal, Box, Typography, Button } from "@mui/material";
import React from "react";
import { Note } from "@/hooks/useNotes";

interface NoteViewModalProps {
  open: boolean;
  onClose: () => void;
  note: Note | null;
}

const NoteViewModal: React.FC<NoteViewModalProps> = ({
  open,
  onClose,
  note,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: 500 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        {note ? (
          <>
            <Typography variant="h6" mb={2}>
              {note.title}
            </Typography>
            <Typography variant="body1" mb={2}>
              {note.content}
            </Typography>
          </>
        ) : (
          <Typography variant="body1">No hay nota para mostrar.</Typography>
        )}
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default NoteViewModal;
