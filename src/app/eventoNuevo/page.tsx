"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { Grid2, Box, Typography, TextField, MenuItem, useMediaQuery, FormControl, FormControlLabel, Checkbox, Button } from '@mui/material'

// Temas para la página
import { lightTheme, darkTheme } from '@/ts/customTheme';

// Componentes MUI X
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { ThemeProvider } from '@emotion/react';

// Opciones para sexo
const EventoClub = [
    { value: "1", label: "Acuatlón bajo techo" },
    { value: "2", label: "Rodada in-doors" },
    { value: "3", label: "Carrera 5k en cinta" },
    { value: "4", label: "Carrera 5k en exterior" },
    { value: "5", label: "Triatlon in-doors" },
  ];

export default function Home() {
    // Estados para cada fecha
    const [fechaInicioEvento, setFechaInicioEvento] = React.useState<Dayjs | null>(null);
    const [fechaFinEvento, setFechaFinEvento] = React.useState<Dayjs | null>(null);
    const [fechaInicioInscripcion, setFechaInicioInscripcion] = React.useState<Dayjs | null>(null);
    const [fechaFinInscripcion, setFechaFinInscripcion] = React.useState<Dayjs | null>(null);

    // Manejador del botón
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Por favor seleccione el evento.");
    };

    // Manejadores del tema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Detecta el modo de sistema
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={2} alignItems="center" justifyContent="center" margin={2} marginTop={4}>
                    <Typography variant='h3'>
                        Registrar evento
                    </Typography>
                </Grid2>
                <form onSubmit={handleSubmit}>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center">
                        <Box margin={2}>
                            <TextField
                                id="evento"
                                select
                                label="Evento del club"
                                size="small"
                                className='text-field'
                                required
                            >
                                {EventoClub.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Grid2>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center">
                        <Box margin={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha inicio evento"
                                value={fechaInicioEvento}
                                onChange={(newDate) => setFechaInicioEvento(newDate)}
                                className="text-field"
                                slotProps={{
                                textField: {
                                    size: "small",
                                    required: true,
                                },
                                }}
                            />
                            </LocalizationProvider>
                        </Box>
                    </Grid2>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center">
                        <Box margin={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha fin evento"
                                value={fechaFinEvento}
                                onChange={(newDate) => setFechaFinEvento(newDate)}
                                className="text-field"
                                slotProps={{
                                textField: {
                                    size: "small",
                                    required: true,
                                },
                                }}
                            />
                            </LocalizationProvider>
                        </Box>
                    </Grid2>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center">
                        <Box margin={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha inicio inscripción"
                                value={fechaInicioInscripcion}
                                onChange={(newDate) => setFechaInicioInscripcion(newDate)}
                                className="text-field"
                                slotProps={{
                                textField: {
                                    size: "small",
                                    required: true,
                                },
                                }}
                            />
                            </LocalizationProvider>
                        </Box>
                    </Grid2>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center">
                        <Box margin={2}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha fin inscripción"
                                value={fechaFinInscripcion}
                                onChange={(newDate) => setFechaFinInscripcion(newDate)}
                                className="text-field"
                                slotProps={{
                                textField: {
                                    size: "small",
                                    required: true,
                                },
                                }}
                            />
                            </LocalizationProvider>
                        </Box>
                    </Grid2>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center" marginTop={2}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Descripción"
                            multiline
                            rows={4}
                        />
                    </Grid2>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center" marginTop={2}>
                        <FormControl>
                            <FormControlLabel 
                                control={
                                    <Checkbox />
                                }
                                label="Solo hombres"
                            />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel 
                                control={
                                    <Checkbox />
                                }
                                label="Solo mujeres"
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center">
                        <FormControl>
                            <FormControlLabel 
                                control={
                                    <Checkbox />
                                }
                                label="Evento gratis"
                            />
                        </FormControl>
                        <FormControl>
                            <FormControlLabel 
                                control={
                                    <Checkbox />
                                }
                                label="Mayores de edad"
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 container spacing={2} alignItems="center" justifyContent="center" marginTop={3}>
                        <Button
                            className="button px-4 py-2 rounded"
                            type="submit"
                        >
                            Registrar evento
                        </Button>
                    </Grid2>
                </form>
            </Box>
        </ThemeProvider>
    );
}
