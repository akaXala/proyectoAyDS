"use client";
import * as React from "react";

// Componentes
import Signup from "@/components/Signup";

// Componentes MUI
import { Box, Button, CssBaseline, ThemeProvider, useMediaQuery, Typography } from '@mui/material';

// Importar los temas personalizados
import { lightTheme, darkTheme } from '@/ts/customTheme';

export default function Home(){
    // Detecta el modo de color preferido del sistema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    // Modificador para los TextField
    const isMobile = useMediaQuery('(max-width:600px)');

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Box>
                    <Typography variant='h3' className='text-center'>
                        Registro Organizador
                    </Typography>
                </Box>
                <Box className='text-center' marginX={isMobile ? 5 : 30 }>
                    <Signup />
                </Box>
            </CssBaseline>
        </ThemeProvider>
    )
}