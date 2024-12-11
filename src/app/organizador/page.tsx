"use client"; // Deja usar el cliente
import * as React from 'react';

// Funcionalidades Next.js
import { useRouter } from "next/navigation";

// Componentes de MUI
import { Typography, useMediaQuery, CssBaseline, Button } from '@mui/material'

// Temas para la página
import { lightTheme, darkTheme } from '@/ts/customTheme';
import { ThemeProvider } from '@emotion/react';

// Cerrar sesión
import Logout from '@/components/Logout';

// Alertas de SweetAlert
import { mostrarAlerta } from '@/components/sweetAlert/ModalAlerts';


export default function Home() {
    // Manejadores del tema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Detecta el modo de sistema
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    const router = useRouter();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Typography>Organizador</Typography>
                <Button 
                  onClick={() => {
                    router.push('/eventos'); // Navega a modificar
                  }}
                  variant="contained"
                  className="button"
                >
                  Eventos
                </Button>
                <br/>
                <Logout />
            </CssBaseline>
        </ThemeProvider>
    );
}