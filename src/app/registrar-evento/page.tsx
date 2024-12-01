"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { Grid2, Box, Typography, TextField, MenuItem, useMediaQuery, FormControl, FormGroup, FormControlLabel, Checkbox, Button, CssBaseline } from '@mui/material'

// Temas para la página
import { lightTheme, darkTheme } from '@/ts/customTheme';

// Componentes MUI X
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { ThemeProvider } from '@emotion/react';

// Alertas de SweetAlert
import { mostrarAlerta } from '@/components/sweetAlert/ModalAlerts';

// Opciones para sexo
const EventoClub = [
    { value: "1", label: "Acuatlón bajo techo" },
    { value: "2", label: "Rodada in-doors" },
    { value: "3", label: "Carrera 5k en cinta" },
    { value: "4", label: "Carrera 5k en exterior" },
    { value: "5", label: "Triatlon in-doors" },
];

// Opciones para modalidad
const Modalidad = [
  { value: "Individual", label: "Individual" },
  { value: "Equipos", label: "En equipos" },
  { value: "Relevos", label: "Relevos" },
];

// Opciones para costos
const Costo = [
  { value: "Gratis", label: "Gratis" },
  { value: "De pago", label: "De pago" },
]

export default function Home() {
    // Manejadores del tema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Detecta el modo de sistema
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    // Estados para cada fecha
    const [fechaInicioEvento, setFechaInicioEvento] = React.useState<Dayjs | null>(null);
    const [fechaFinEvento, setFechaFinEvento] = React.useState<Dayjs | null>(null);
    const [fechaInicioInscripcion, setFechaInicioInscripcion] = React.useState<Dayjs | null>(null);
    const [fechaFinInscripcion, setFechaFinInscripcion] = React.useState<Dayjs | null>(null);

    // Manejador de costo
    const [costoSeleccionado, setCostoSeleccionado] = React.useState<string>(""); // Estado para el costo seleccionado
    
    // Cambio del manejador de costo
    const handleCostoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCostoSeleccionado(e.target.value);
    };

    // Manejador del botón
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mostrarAlerta('Operación fallida', 'Ha ocurrido un error al registrar el evento', 'Volver al menú', 'error')
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Grid2 container spacing={2} alignItems="center" justifyContent="center" margin={2} marginTop={2}>
                    <Typography variant='h3' className='text-center'>
                        Registrar evento
                    </Typography>
                </Grid2>
                <Grid2 container spacing={5} alignItems="center" justifyContent="center" className="text-center">
                    <form onSubmit={handleSubmit}>
                        <Grid2 container spacing={2} marginTop={2}>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  label="Horario de inicio"
                                  className='text-field'
                                  slotProps={{
                                    textField: {
                                      size: "small",
                                      required: true
                                    },
                                  }}
                                />
                              </LocalizationProvider>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  label="Horario de termino"
                                  className='text-field'
                                  slotProps={{
                                    textField: {
                                      size: "small",
                                      required: true
                                    },
                                  }}
                                />
                              </LocalizationProvider>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <TextField
                                    id="modalidad"
                                    select
                                    label="Modalidad del evento"
                                    size="small"
                                    className='text-field'
                                    required
                                >
                                    {Modalidad.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                              <TextField
                                      id="costo"
                                      select
                                      label="Costo del evento"
                                      size="small"
                                      className='text-field'
                                      required
                                      onChange={handleCostoChange}  // Manejador de cambio
                                  >
                                    {Costo.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                              <TextField
                                id="precio"
                                label="Cantidad en MXN"
                                variant="outlined"
                                size="small"
                                className="text-field"
                                required
                                disabled={costoSeleccionado !== "De pago"}  // Deshabilita si el evento es gratis
                              />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                              <TextField
                                id="requisitos"
                                label="Requisitos"
                                variant="outlined"
                                size="small"
                                className="text-field"
                                required
                              />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                              <TextField
                                id="reglas"
                                label="Reglas"
                                variant="outlined"
                                size="small"
                                className="text-field"
                                required
                              />
                            </Grid2>
                            <Grid2 size={12}>
                              <TextField
                                id="descripcion"
                                label="Descripción del evento"
                                variant="outlined"
                                size="small"
                                className="text-field"
                                required
                                multiline
                                rows={4}
                              />
                            </Grid2>
                        </Grid2>
                        <Grid2 container spacing={2} alignItems="center" justifyContent="center" marginTop={3} marginBottom={3}>
                          <Button
                              className="button px-4 py-2 rounded"
                              type="submit"
                          >
                              Registrar evento
                          </Button>
                      </Grid2>
                    </form>
                </Grid2>
            </CssBaseline>
        </ThemeProvider>
    );
}