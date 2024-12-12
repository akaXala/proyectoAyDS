"use client"; // Deja usar el cliente
import * as React from 'react';

import { Button } from "@mui/material";

// Alertas de SweetAlert
import { mostrarAlerta } from '@/components/sweetAlert/ModalAlerts';

const Logout: React.FC = () => {
    // Cerrar sesión
    const handleLogout = async () => {
        try {
          const response = await fetch("/api/logout", { method: "POST" });
          if (response.ok) {
            window.location.href = "/"; // Redirigir al login
          } else {
            mostrarAlerta("Error al cerrar sesión", "No sabemos que ha pasado", "Aceptar", "error");
          }
        } catch (err) {
          mostrarAlerta("Error al conectar con el servidor", `${err}`, "Aceptar", "error");
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