"use client";

import { useState } from "react";
import { Box, Container, Typography, Snackbar, Alert } from "@mui/material";
import BaseForm from "../components/BaseForm";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    handleLogin,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity,
  } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  const fields = [
    {
      label: "Username",
      value: username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
      type: "text",
    },
    {
      label: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      type: "password",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
        padding: 2,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" align="center" mb={3}>
          Iniciar sesión
        </Typography>

        <BaseForm
          fields={fields}
          onSubmit={handleSubmit}
          buttonText="Iniciar sesión"
          snackbarMessage={snackbarMessage}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          snackbarSeverity={snackbarSeverity}
        />

        <Typography mt={2} align="center">
          ¿No tienes una cuenta?{" "}
          <a href="/signup" style={{ textDecoration: "underline" }}>
            Crea una aquí
          </a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
