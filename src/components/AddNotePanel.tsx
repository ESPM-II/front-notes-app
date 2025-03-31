import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; 
import BaseForm from "./BaseForm"; 

interface AddNotePanelProps {
  onCreateNote: (title: string, content: string) => void;
}

const AddNotePanel: React.FC<AddNotePanelProps> = ({ onCreateNote }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onCreateNote(title, content);
      setTitle("");
      setContent("");
      setOpen(false);
      setSnackbarMessage("Nota creada correctamente.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage("Por favor, completa todos los campos.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const fields = [
    {
      label: "Título",
      value: title,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
      type: "text",
    },
    {
      label: "Contenido",
      value: content,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value),
      type: "text",
    },
  ];

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          borderRadius: "50%",
          padding: "16px",
          boxShadow: 4, 
          backgroundColor: "#6200EE", 
          "&:hover": {
            backgroundColor: "#3700B3", 
            boxShadow: 6,
          },
        }}
      >
        <AddCircleOutlineIcon sx={{ fontSize: "2rem", color: "white" }} />
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Crear Nota</DialogTitle>
        <DialogContent>
          <BaseForm
            fields={fields}
            onSubmit={handleSubmit}
            buttonText="Crear"
            snackbarMessage={snackbarMessage}
            openSnackbar={openSnackbar}
            setOpenSnackbar={setOpenSnackbar}
            snackbarSeverity={snackbarSeverity}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNotePanel;
