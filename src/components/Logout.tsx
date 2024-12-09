"use client"; // Deja usar el cliente
import * as React from 'react';

import { Button } from "@mui/material";

const Logout: React.FC = () => {
    // Cerrar sesión
    const handleLogout = async () => {
        try {
          const response = await fetch("/api/logout", { method: "POST" });
          if (response.ok) {
            window.location.href = "/"; // Redirigir al login
          } else {
            console.error("Error al cerrar sesión");
          }
        } catch (err) {
          console.error("Error al conectar con el servidor:", err);
        }
    };

    return(
        <Button
            type="submit"
            variant="contained"
            color="error"
            onClick={handleLogout}
        >
            Cerrar sesión
        </Button>
    );
};

export default Logout;