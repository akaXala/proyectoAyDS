"use client"; // Deja usar el cliente
import * as React from 'react';

// Funcionalidades Next.js
import { useRouter } from "next/navigation";

// Componentes de MUI
import { useMediaQuery, CssBaseline, Box } from '@mui/material'

// Temas para la página
import { lightTheme, darkTheme } from '@/ts/customTheme';
import { ThemeProvider } from '@emotion/react';

// Barra de navegación
import SimpleAppBar from '@/components/MUI/SimpleAppBar';

// Tarjetas de opciones
import OptionCard from '@/components/MUI/OptionCard';

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
                  <SimpleAppBar logoText="COMPETIDOR" avatarSrc="/LionAthlete.webp" />
                </Box>
                <Box marginBottom={2} marginX={2} display="flex" justifyContent="center">
                    <OptionCard
                        title="Eventos"
                        description="Ver e inscribirse a eventos"
                        image=""
                        redirectTo="/competidor/eventos"
                    />
                </Box>
                <Box marginBottom={2} marginX={2} display="flex" justifyContent="center">
                    <OptionCard
                        title="Registros"
                        description="Ver tus registros a eventos"
                        image=""
                        redirectTo="/registro"
                    />
                </Box>
                <Box marginBottom={2} marginX={2} display="flex" justifyContent="center">
                    <OptionCard
                        title="Reconocimientos"
                        description="Ver tus reconocimientos"
                        image=""
                        redirectTo="/registro"
                    />
                </Box>
            </CssBaseline>
        </ThemeProvider>
    );
}