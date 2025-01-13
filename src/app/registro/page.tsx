"use client"; // Deja usar el cliente
import * as React from 'react';

// Funcionalidades Next.js
import { useRouter } from "next/navigation";

// Componentes de MUI
import { Typography, useMediaQuery, CssBaseline, Button, Box } from '@mui/material'

// Temas para la página
import { lightTheme, darkTheme } from '@/ts/customTheme';
import { ThemeProvider } from '@emotion/react';

// Barra de navegación
import SimpleAppBar from '@/components/MUI/SimpleAppBar';

// Tarjetas de opciones
import OptionCard from '@/components/MUI/OptionCard';

export default function Home() {
    // Manejadores del tema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Detecta el modo de sistema
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);
    const isMobile = useMediaQuery('(max-width:600px)');

    const router = useRouter();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Box marginBottom={2}>
                  <SimpleAppBar logoText="REGISTRAR" avatarSrc="/LionAdmin.webp" />
                </Box>
                <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
                  <Box marginBottom={2} marginX={2} display="flex" justifyContent="center" maxHeight={isMobile ? "100%" : "40%"} maxWidth={isMobile ? "100%" : "40%"}>
                      <OptionCard
                        title="Administrador"
                        description="Registar un nuevo administrador"
                        image="/LionAdmin.webp"
                        redirectTo="/registro/administrador"
                      />
                  </Box>
                  <Box marginBottom={2} marginX={2} display="flex" justifyContent="center" maxHeight={isMobile ? "100%" : "40%"} maxWidth={isMobile ? "100%" : "40%"}>
                      <OptionCard
                        title="Organizador"
                        description="Registar un nuevo organizador"
                        image="/LionOrganizer.webp"
                        redirectTo="/registro/organizador"
                      />
                  </Box>
                  <Box marginBottom={2} marginX={2} display="flex" justifyContent="center" maxHeight={isMobile ? "100%" : "40%"} maxWidth={isMobile ? "100%" : "40%"}>
                      <OptionCard
                        title="Instructor"
                        description="Registar un nuevo instructor"
                        image="/LionTrainer.webp"
                        redirectTo="/registro/instructor"
                      />
                  </Box>
                </Box>
            </CssBaseline>
        </ThemeProvider>
    );
}