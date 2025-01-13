"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { useMediaQuery, CssBaseline, Box } from '@mui/material'

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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Box marginBottom={2}>
                    <SimpleAppBar logoText='' avatarSrc="/LionAthlete.webp" />
                </Box>
                <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
                    <Box marginBottom={2} marginX={2} display="flex" justifyContent="center" maxHeight={isMobile ? "100%" : "40%"} maxWidth={isMobile ? "100%" : "40%"}>
                        <OptionCard
                            title="Eventos"
                            description="Ver e inscribirse a eventos"
                            image="/Event.webp"
                            redirectTo="/competidor/eventos"
                        />
                    </Box>
                    <Box marginBottom={2} marginX={2} display="flex" justifyContent="center" maxHeight={isMobile ? "100%" : "40%"} maxWidth={isMobile ? "100%" : "40%"}>
                        <OptionCard
                            title="Mis eventos"
                            description="Ver los eventos a los que estas inscritos"
                            image="/MyEvents.webp"
                            redirectTo="/competidor/eventos-inscritos"
                        />
                    </Box>
                    <Box marginBottom={2} marginX={2} display="flex" justifyContent="center" maxHeight={isMobile ? "100%" : "40%"} maxWidth={isMobile ? "100%" : "40%"}>
                        <OptionCard
                            title="Registros"
                            description="Ver tus registros a eventos"
                            image="/MyRecords.webp"
                            redirectTo="/registro"
                        />
                    </Box>
                    <Box marginBottom={2} marginX={2} display="flex" justifyContent="center" maxHeight={isMobile ? "100%" : "40%"} maxWidth={isMobile ? "100%" : "40%"}>
                        <OptionCard
                            title="Reconocimientos"
                            description="Ver tus reconocimientos"
                            image="/MyAchievements.webp"
                            redirectTo="/registro"
                        />
                    </Box>
                </Box>
            </CssBaseline>
        </ThemeProvider>
    );
}