import React, { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";

interface FormularioBaseProps {
  fields: {
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    type: string;
  }[];
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
  snackbarMessage: string;
  openSnackbar: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  snackbarSeverity: "error" | "success" | "info" | "warning";
}

const BaseForm: React.FC<FormularioBaseProps> = ({
  fields,
  onSubmit,
  buttonText,
  snackbarMessage,
  openSnackbar,
  setOpenSnackbar,
  snackbarSeverity,
}) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {fields.map((field, index) => (
        <TextField
          key={index}
          label={field.label}
          variant="outlined"
          fullWidth
          margin="normal"
          value={field.value}
          onChange={field.onChange}
          type={field.type}
          required
        />
      ))}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        {buttonText}
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BaseForm;
