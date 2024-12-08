"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { Typography, useMediaQuery, CssBaseline, Button } from '@mui/material'

// Temas para la página
import { lightTheme, darkTheme } from '@/ts/customTheme';
import { ThemeProvider } from '@emotion/react';

// Alertas de SweetAlert
import { mostrarAlerta } from '@/components/sweetAlert/ModalAlerts';


export default function Home() {
    // Manejadores del tema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Detecta el modo de sistema
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Typography>Organizador</Typography>
                <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </Button>
            </CssBaseline>
        </ThemeProvider>
    );
}