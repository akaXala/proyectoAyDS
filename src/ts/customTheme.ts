import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4caf50', // Color para el tema claro
    },
    secondary: {
      main: '#ff5722',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#4caf50', // Borde verde para tema claro
            },
            '&:hover fieldset': {
              borderColor: '#81c784',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#388e3c',
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
    primary: {
      main: '#2196f3', // Color para el tema oscuro
    },
    secondary: {
      main: '#ff9800',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#2196f3', // Borde azul para tema oscuro
            },
            '&:hover fieldset': {
              borderColor: '#64b5f6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
            },
          },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
