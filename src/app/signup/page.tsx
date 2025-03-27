"use client";

import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import BaseForm from "../../components/BaseForm";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    handleSignUp,
    snackbarMessage,
    snackbarSeverity,
    openSnackbar,
    setOpenSnackbar,
  } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await handleSignUp(username, email, password);

      if (response && response.success) {
        setOpenSnackbar(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      setOpenSnackbar(true);
    }
  };

  const fields = [
    {
      label: "Nombre de usuario",
      value: username,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value),
      type: "text",
    },
    {
      label: "Correo electrónico",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      type: "email",
    },
    {
      label: "Contraseña",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      type: "password",
    },
    {
      label: "Confirmar contraseña",
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setConfirmPassword(e.target.value),
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
          Crear cuenta
        </Typography>

        <BaseForm
          fields={fields}
          onSubmit={handleSubmit}
          buttonText="Crear cuenta"
          snackbarMessage={snackbarMessage}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          snackbarSeverity={snackbarSeverity}
        />

        <Typography mt={2} align="center">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" style={{ textDecoration: "underline" }}>
            Inicia sesión aquí
          </a>
        </Typography>
      </Container>
    </Box>
  );
};

export default SignUp;
