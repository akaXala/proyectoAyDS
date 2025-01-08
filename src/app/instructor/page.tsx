"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { useMediaQuery, CssBaseline, Box } from '@mui/material'

// Temas para la página
import { lightTheme, darkTheme } from '@/ts/customTheme';
import { ThemeProvider } from '@emotion/react';

// Barra de navegación
import SimpleAppBar from '@/components/MUI/SimpleAppBar';

// Alertas de SweetAlert
import { mostrarAlerta } from '@/components/sweetAlert/ModalAlerts';


export default function Home() {
    // Manejadores del tema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Detecta el modo de sistema
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Box marginBottom={2}>
                  <SimpleAppBar logoText="INSTRUCTOR" avatarSrc="/LionTrainer.webp" />
                </Box>
            </CssBaseline>
        </ThemeProvider>
    );
}