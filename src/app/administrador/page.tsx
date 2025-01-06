"use client"; // Deja usar el cliente
import * as React from 'react';

// Funcionalidades Next.js
import { useRouter } from "next/navigation";

// Componentes de MUI
import { useMediaQuery, CssBaseline, Button, ThemeProvider, Box } from '@mui/material'

// Temas para la página
import { lightTheme, darkTheme } from '@/ts/customTheme';

// Barra de navegación
import SimpleAppBar from '@/components/MUI/SimpleAppBar';

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
                <Box marginBottom={2}>
                  <SimpleAppBar logoText="ADMINISTRADOR" avatarSrc="/LionAdmin.webp" />
                </Box>
                <Button 
                  onClick={() => {
                    router.push('/registro'); // Navega a registro
                  }}
                  variant="contained"
                  className="button"
                >
                  Registros
                </Button>
            </CssBaseline>
        </ThemeProvider>
    );
}