"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { Typography, useMediaQuery, CssBaseline } from '@mui/material'

// Temas para la página
import { lightTheme, darkTheme } from '@/ts/customTheme';
import { ThemeProvider } from '@emotion/react';
import jwtDecode from "jsonwebtoken";

// Alertas de SweetAlert
import { mostrarAlerta } from '@/components/sweetAlert/ModalAlerts';


export default function Home() {
    // Manejadores del tema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Detecta el modo de sistema
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    // Prueba token
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth="))
        ?.split("=")[1]; 

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Typography>Competidor</Typography>
                <p>Token: {token || "No se encontró el token"}</p>
            </CssBaseline>
        </ThemeProvider>
    );
}