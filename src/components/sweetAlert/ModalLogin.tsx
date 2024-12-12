"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Componentes MUI
import { Box, Button, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';

// Componente custom MUI
import Tabs from '@/components/MUI/Tabs';

// Importar los temas personalizados
import { lightTheme, darkTheme } from '@/ts/customTheme';

const MySwal = withReactContent(Swal);

// Componente dentro del modal
const ModalContent = () => {
    // Detecta el modo de color preferido del sistema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Box>
                    <Tabs />
                </Box>
            </CssBaseline>
        </ThemeProvider>
    );
};

const Login = () => {
    const handleButtonClick = () => {
        MySwal.fire({
            html: <ModalContent />,
            showConfirmButton: false,
            background: "transparent",
        });
    };

    return (
        <Button
            onClick={handleButtonClick}
            className="button px-4 py-2 rounded"
            variant="contained"
            color="primary"
        >
            Ingresa al Club
        </Button>
    );
};

export default Login;
