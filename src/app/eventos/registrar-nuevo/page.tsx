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

// Objeto evento
import { Evento } from '@/ts/schemas/Evento';

// Alertas de SweetAlert
import { mostrarAlerta } from '@/components/sweetAlert/ModalAlerts';

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
];

interface FormData {
  nombre_evento: string;
  tipo_evento: string;
  capacidad: number;
  modalidad: string;
  costo: number;
  requisitos: string;
  reglas: string;
  descripcion: string;
}

export default function Home() {
    // Manejadores del tema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Detecta el modo de sistema
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    // Estados para cada campo del formulario
    const [formData, setFormData] = React.useState<FormData>({
      nombre_evento: "",
      tipo_evento: "",
      capacidad: 0,
      modalidad: "",
      costo: 0,
      requisitos: "",
      reglas: "",
      descripcion: "",
    });

    // Estados para cada fecha
    const [fechaInicioEvento, setFechaInicioEvento] = React.useState<Dayjs | null>(null);
    const [fechaFinEvento, setFechaFinEvento] = React.useState<Dayjs | null>(null);
    const [fechaInicioInscripcion, setFechaInicioInscripcion] = React.useState<Dayjs | null>(null);
    const [fechaFinInscripcion, setFechaFinInscripcion] = React.useState<Dayjs | null>(null);

    // Manejador de costo
    const [costoSeleccionado, setCostoSeleccionado] = React.useState<string>(""); // Estado para el costo seleccionado
    
    // Cambio del manejador de costo
    const handleCostoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedValue = e.target.value;
      setCostoSeleccionado(selectedValue);
      setFormData((prevState) => ({
        ...prevState,
        costo: selectedValue === "De pago" ? 0 : 0, // Ajusta el costo según la selección
      }));
    };

    // Nuevo manejador para el campo select
    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState) => ({
      ...prevState,
      modalidad: e.target.value,
      }));
    };

    // Manejador del botón
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        //mostrarAlerta('Operación fallida', 'Ha ocurrido un error al registrar el evento', 'Volver al menú', 'error');
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Grid2 container spacing={2} alignItems="center" justifyContent="center" margin={2} marginTop={2}>
                    <Typography variant='h3' className='text-center'>
                        Crear evento nuevo
                    </Typography>
                </Grid2>
                <Grid2 container spacing={5} alignItems="center" justifyContent="center" className="text-center" marginX={5}>
                    <form onSubmit={handleSubmit}>
                        <Grid2 container spacing={2} marginTop={2}>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <TextField
                                    id="nombreEvento"
                                    label="Nombre del evento"
                                    size="small"
                                    className='text-field'
                                    required
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <TextField
                                    id="tipoEvento"
                                    label="Tipo del evento"
                                    size="small"
                                    className='text-field'
                                    required
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <TextField
                                    id="capacidadEvento"
                                    label="Capacidad del evento"
                                    type='number'
                                    size="small"
                                    className='text-field'
                                    required
                                />
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
                                    value={formData.modalidad}
                                    onChange={handleSelectChange}
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
                                      value={costoSeleccionado} // Mantiene el valor seleccionado
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
                                value={formData.costo} // Controlado por formData
                                onChange={(e) => setFormData({ ...formData, costo: Number(e.target.value) })} // Actualiza el costo
                              />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6 }}>
                              <TextField
                                id="requisitos"
                                label="Requisitos"
                                variant="outlined"
                                size="small"
                                className= "text-field"
                                multiline
                                rows={3}
                                required
                              />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6 }}>
                              <TextField
                                id="reglas"
                                label="Reglas"
                                variant="outlined"
                                size="small"
                                className="text-field"
                                multiline
                                rows={3}
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
                                multiline
                                rows={5}
                                required
                              />
                            </Grid2>
                        </Grid2>
                        <Grid2 container spacing={2} alignItems="center" justifyContent="center" marginTop={3} marginBottom={3}>
                          <Button
                              className="button px-4 py-2 rounded"
                              type="submit"
                          >
                              Crear Evento
                          </Button>
                      </Grid2>
                    </form>
                </Grid2>
            </CssBaseline>
        </ThemeProvider>
    );
}