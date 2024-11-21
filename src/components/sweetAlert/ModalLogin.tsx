"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Componentes MUI
import { Box, Button, ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import { lightTheme, darkTheme } from '@/ts/customTheme';

// Componente custom MUI
import Tabs from '@/components/MUI/Tabs';

const MySwal = withReactContent(Swal);

// Componente detro del modal
const ModalContent = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Detecta el modo de sistema
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Tabs />
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
        >
            Ingresa al Club
        </Button>
    );
};

export default Login;