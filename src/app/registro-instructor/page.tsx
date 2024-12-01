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

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Box>
                    <Typography variant='h3' className='text-center'>
                        Registro Instructor
                    </Typography>
                </Box>
                <Box className='text-center'>
                    <Signup />
                </Box>
            </CssBaseline>
        </ThemeProvider>
    )
}