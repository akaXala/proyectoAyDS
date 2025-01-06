import { createTheme } from '@mui/material/styles';
import '@fontsource/quicksand';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#D95A4E' },
        secondary: { main: '#ff5722' },
    },
    typography: {
        fontFamily: "'Quicksand', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#D95A4E', // Borde naranja
                        },
                        '&:hover fieldset': {
                            borderColor: '#dc776e', // Borde más claro al pasar el mouse
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#b7463b', // Borde más oscuro al enfocar
                        },
                    },
                },
            },
        },
        MuiModal: {
            styleOverrides: {
              root: {
                "& .MuiBox-root": {
                  maxHeight: "90vh", // Limita la altura
                  overflowY: "auto", // Permite scroll
                  msOverflowStyle: "none", // Oculta barra en IE y Edge
                  scrollbarWidth: "none", // Oculta barra en navegadores compatibles
                  "&::-webkit-scrollbar": {
                    display: "none", // Oculta barra en navegadores WebKit
                  },
                },
              },
            },
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#2196f3' },
        secondary: { main: '#ff9800' },
    },
    typography: {
        fontFamily: "'Quicksand', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#2196f3', // Borde azul
                        },
                        '&:hover fieldset': {
                            borderColor: '#64b5f6', // Borde más claro al pasar el mouse
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2', // Borde más oscuro al enfocar
                        },
                    },
                },
            },
        },
        MuiModal: {
            styleOverrides: {
              root: {
                "& .MuiBox-root": {
                  maxHeight: "90vh", // Limita la altura
                  overflowY: "auto", // Permite scroll
                  msOverflowStyle: "none", // Oculta barra en IE y Edge
                  scrollbarWidth: "none", // Oculta barra en navegadores compatibles
                  "&::-webkit-scrollbar": {
                    display: "none", // Oculta barra en navegadores WebKit
                  },
                },
              },
            },
        },
    },
});

export { lightTheme, darkTheme };
