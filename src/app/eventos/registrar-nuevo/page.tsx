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

// ResponsiveAppBar
import ResponsiveAppBar from '@/components/MUI/ResponsiveAppBar';

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
  imagen: string;
}

export default function Home() {
    // Manejadores del tema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // Detecta el modo de sistema
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    // Estados para cada campo del formulario
    const [formData, setFormData] = React.useState<FormData>({
      nombre_evento: "",
      tipo_evento: "",
      capacidad: 1,
      modalidad: "",
      costo: 0,
      requisitos: "",
      reglas: "",
      descripcion: "",
      imagen: "",
    });

    // Estados para cada fecha
    const [fechaInicioEvento, setFechaInicioEvento] = React.useState<Dayjs | null>(null);
    const [fechaFinEvento, setFechaFinEvento] = React.useState<Dayjs | null>(null);
    const [fechaInicioInscripcion, setFechaInicioInscripcion] = React.useState<Dayjs | null>(null);
    const [fechaFinInscripcion, setFechaFinInscripcion] = React.useState<Dayjs | null>(null);

    // Manejador de costo
    const [costoSeleccionado, setCostoSeleccionado] = React.useState<string>(""); // Estado para el costo seleccionado

    // Estado para controlar si el formulario ha sido enviado
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    // Estados para las horas
    const [horaInicio, setHoraInicio] = React.useState<Dayjs | null>(null); // Estado para la hora de inicio
    const [horaFin, setHoraFin] = React.useState<Dayjs | null>(null); // Estado para la hora de fin

    // Manejador para campos de texto normales
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };
    
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setFormSubmitted(true);

        const fechaActual = dayjs();

        // Verifica que las fechas no sean anteriores a la actual
        if (fechaInicioInscripcion && fechaInicioInscripcion.isBefore(fechaActual)){
          mostrarAlerta("Error", "La fecha de inicio de inscripciones es anterior a la fecha actual", "Aceptar", "error");
          return;
        }

        // Verificación de que la fecha de fin de inscripciones no sea anterior a la fecha de inicio de inscripciones
        if (fechaInicioInscripcion && fechaFinInscripcion && fechaFinInscripcion.isBefore(fechaInicioInscripcion)) {
          mostrarAlerta("Error", "La fecha de fin de inscripciones no puede ser anterior a la fecha de inicio de inscripciones", "Aceptar", "error");
          return;
        }
        
        // Verificación de que la fecha de fin no sea anterior a la fecha de inicio
        if (fechaInicioEvento && fechaFinEvento && fechaFinEvento.isBefore(fechaInicioEvento)) {
          mostrarAlerta("Error", "La fecha de fin del evento no puede ser anterior a la fecha de inicio del evento", "Aceptar", "error");
          return;
        }

        // Verificación de que la fecha de inicio de inscripciones no sea posterior a la fecha de inicio del evento
        if (fechaInicioInscripcion && fechaInicioEvento && fechaInicioInscripcion.isAfter(fechaInicioEvento)) {
          mostrarAlerta("Error", "La fecha de inicio de inscripciones no puede ser posterior a la fecha de inicio del evento", "Aceptar", "error");
          return;
        }

        // Verificación de que la hora de fin no sea anterior a la hora de inicio si es el mismo día
        if (horaInicio && horaFin && fechaInicioEvento && fechaFinEvento && fechaInicioEvento.isSame(fechaFinEvento, 'day') && horaFin.isBefore(horaInicio)) {
          mostrarAlerta("Error", "La hora de fin no puede ser anterior a la hora de inicio en el mismo día", "Aceptar", "error");
          return;
        }

        // Convertimos las fechas a un formato de yyyy-mm-dd
        let fechaIniIns = fechaInicioInscripcion ? fechaInicioInscripcion.toISOString().split("T")[0] : null;
        let fechaFinIns = fechaFinEvento ? fechaFinEvento.toISOString().split("T")[0] : null;

        // Comporbamos que las fechas de inscripción no sean las mismas
        if (fechaIniIns === fechaFinIns){
          mostrarAlerta("Error", "La fecha de inicio y cierre de inscripciones es la misma", "Aceptar", "error");
          return;
        }

        // Convertimos las horas a un formato de hh:mm:ss
        let horaI = horaInicio ? horaInicio.format("HH:mm:ss") : null;
        let horaF = horaFin ? horaFin.format("HH:mm:ss") : null;

        // Comprobamos que las horas de inicio y fin no sean las mismas
        if (horaI === horaF){
          mostrarAlerta("Error", "La hora de inicio y fin de evento es la misma", "Aceptar", "error");
          return;
        }
        
        const evento = {
          nombre_evento: formData.nombre_evento,
          tipo_evento: formData.tipo_evento,
          capacidad: formData.capacidad,
          fechaInicioInscripcion: fechaIniIns,
          fechaFinInscripcion: fechaFinIns,
          fechaInicioEvento: fechaInicioEvento ? fechaInicioEvento.toISOString().split("T")[0]: null,
          fechaFinEvento: fechaFinEvento ? fechaFinEvento.toISOString().split("T")[0] : null,
          horaInicio: horaI,
          horaFin: horaF,
          modalidad: formData.modalidad,
          costo: formData.costo,
          requisitos: formData.requisitos,
          reglas: formData.reglas,
          descripcion: formData.descripcion,
          imagen: formData.imagen,
        }

        try {
          const response = await fetch("/api/registrar-evento", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(evento),
          });

          if(!response.ok){
            const errorData = await response.json();
            mostrarAlerta("Error al registrar", `${errorData.error}`, "Aceptar", "error");
            return;
          }

          const data = await response.json();

          if(data.success){
            mostrarAlerta("¡Evento registrado correctamente!", "El evento ha sido registrado", "Aceptar", "success");
          } else {
            mostrarAlerta("Error al registrar", `${data.error}`, "Aceptar", "error");
          }
        } catch (error) {
          console.error("Error al registrar:", error);
          mostrarAlerta("Hubo un problema con el registro", "Inténtalo de nuevo", "Aceptar", "error");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <ResponsiveAppBar
                  pages={[
                    { label: "Registrar Evento", path: "/eventos/registrar" },
                  ]}
                  avatarSrc="/LionOrganizer.webp"
                />
                <Grid2 container spacing={2} alignItems="center" justifyContent="center" margin={2} marginTop={2}>
                    <Typography variant='h3' className='text-center'>
                        Registrar nuevo evento
                    </Typography>
                </Grid2>
                <Grid2 container spacing={5} alignItems="center" justifyContent="center" className="text-center" marginX={5}>
                    <form onSubmit={handleSubmit}>
                        <Grid2 container spacing={2} marginTop={2}>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <TextField
                                    id="nombre_evento"
                                    label="Nombre del evento"
                                    size="small"
                                    value={formData.nombre_evento}
                                    onChange={handleInputChange}
                                    className='text-field'
                                    required
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <TextField
                                    id="tipo_evento"
                                    label="Tipo del evento"
                                    size="small"
                                    value={formData.tipo_evento}
                                    onChange={handleInputChange}
                                    className='text-field'
                                    required
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <TextField
                                    id="capacidad"
                                    label="Capacidad del evento"
                                    type='number'
                                    size="small"
                                    onChange={handleInputChange}
                                    className='text-field'
                                    required
                                />
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
                                <TimePicker
                                  label="Horario de inicio"
                                  value={horaInicio} // Vincula el valor al estado
                                  onChange={(newTime) => setHoraInicio(newTime)} // Actualiza el estado
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
                                  label="Horario de término"
                                  value={horaFin} // Vincula el valor al estado
                                  onChange={(newTime) => setHoraFin(newTime)} // Actualiza el estado
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
                                value={formData.requisitos}
                                onChange={handleInputChange}
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
                                value={formData.reglas}
                                onChange={handleInputChange}
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
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                className="text-field"
                                multiline
                                rows={5}
                                required
                              />
                            </Grid2>
                            <Grid2 size={12}>
                              <TextField
                                id="imagen"
                                label="Imagen del evento"
                                variant="outlined"
                                size="small"
                                value={formData.imagen}
                                onChange={handleInputChange}
                                className="text-field"
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