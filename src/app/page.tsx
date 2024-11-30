"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { CssBaseline, ThemeProvider, useMediaQuery, Grid2, Box, Typography } from '@mui/material';

// Componente personalizado
import ModalLogin from '@/components/sweetAlert/ModalLogin';

// DOM de NextJS
import Image from 'next/image';

// Importar los temas personalizados
import { lightTheme, darkTheme } from '@/ts/customTheme';

export default function Home() {
    // Detecta el modo de color preferido del sistema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center" margin={2} marginTop={2}>
                        <Typography variant="h3">Club de Leones</Typography>
                    </Grid2>
                </Box>
                <Box>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center" marginTop={6}>
                        <Image
                            src="/LOGO.png"
                            alt="Logo club de leones"
                            width={350}
                            height={350}
                            priority
                        />
                    </Grid2>
                </Box>
                <Box>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center" marginTop={6}>
                        <Typography variant="h6">Bienvenido al Club de Leones</Typography>
                    </Grid2>
                </Box>
                <Box>
                    <Grid2 container spacing={9} alignItems="center" justifyContent="center" marginTop={6}>
                        <ModalLogin />
                    </Grid2>
                </Box>
            </div>
        </ThemeProvider>
    );
}
