"use client";
import * as React from "react";
import { Box, TextField, Button } from "@mui/material";

const Login: React.FC = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = React.useState({
    email: "",
    contrasena: "",
  });

  // Estado para manejar errores
  const [error, setError] = React.useState<string | null>(null);

  // Manejador para capturar los datos de los campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Manejador para enviar el formulario
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reinicia el error

    try {
      // Envía los datos al backend
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convierte el objeto a JSON
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Sesión iniciada correctamente");
      } else {
        setError(data.error || "Error desconocido");
      }
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      setError("Error de conexión. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <Box margin={2}>
          <TextField
            id="email"
            label="Correo Electrónico"
            variant="outlined"
            size="small"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box margin={2}>
          <TextField
            id="contrasena"
            label="Contraseña"
            type="password"
            variant="outlined"
            size="small"
            value={formData.contrasena}
            onChange={handleInputChange}
            required
          />
        </Box>
        {error && (
          <Box margin={2} color="red">
            {error}
          </Box>
        )}
        <Box margin={2}>
          <Button type="submit" variant="contained" className="button">
            Ingresar
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
