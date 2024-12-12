"use client"; // Deja usar el cliente
import * as React from 'react';

// Funcionalidades Next.js
import { useRouter } from "next/navigation";

// Componentes de MUI
import { Grid2, Box, Typography, TextField, MenuItem, useMediaQuery, FormControl, FormGroup, FormControlLabel, Checkbox, Button, CssBaseline } from '@mui/material'

// Temas para la página
import { lightTheme, darkTheme } from '@/ts/customTheme';

// Componentes MUI X
import { LocalizationProvider, TimePicker, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ThemeProvider } from '@emotion/react';

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
  id_evento: number;
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

    // Router de Next.js
    const router = useRouter();

    // Estados para cada campo del formulario
    const [formData, setFormData] = React.useState<FormData>({
      id_evento: 0,
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

    // Recuperar el objeto desde sessionStorage
    React.useEffect(() => {
      const storedEvento = sessionStorage.getItem("evento");
      if (storedEvento) {
        const evento = JSON.parse(storedEvento);

        // Actualiza los estados con los datos recuperados
        setFormData({
          id_evento: evento.id_evento,
          nombre_evento: evento.nombre_evento || "",
          tipo_evento: evento.tipo_evento || "",
          capacidad: evento.capacidad || 1,
          modalidad: evento.modalidad || "",
          costo: evento.costo || 0,
          requisitos: evento.requisitos || "",
          reglas: evento.reglas || "",
          descripcion: evento.descripcion || "",
          imagen: evento.imagen || "",
        });

        setFechaInicioEvento(
          evento.fecha_inicio ? dayjs(evento.fecha_inicio) : null
        );
        setFechaFinEvento(evento.fecha_fin ? dayjs(evento.fecha_fin) : null);
        setFechaInicioInscripcion(
          evento.fecha_inicio_inscripcion
            ? dayjs(evento.fecha_inicio_inscripcion)
            : null
        );
        setFechaFinInscripcion(
          evento.fecha_fin_inscripcion
            ? dayjs(evento.fecha_fin_inscripcion)
            : null
        );
        setHoraInicio(
          evento.hora_inicio ? dayjs(evento.hora_inicio, "HH:mm:ss") : null
        );
        setHoraFin(
          evento.hora_fin ? dayjs(evento.hora_fin, "HH:mm:ss") : null
        );
        setCostoSeleccionado(evento.costo > 0 ? "De pago" : "Gratis");
      } else {
        router.push("/"); // Si no hay datos, redirige al inicio
      }
    }, [router]);

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
          id_evento: formData.id_evento,
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
          const response = await fetch("/api/modificar-evento", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(evento),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            mostrarAlerta("Éxito", "Evento actualizado correctamente", "Aceptar", "success");
            router.push("/eventos"); // Redirige a la página principal u otra de tu elección
          } else {
            mostrarAlerta("Error", data.error || "No se pudo actualizar el evento", "Aceptar", "error");
          }
        } catch (error) {
          console.error("Error al actualizar el evento:", error);
          mostrarAlerta("Error", "Error interno del servidor", "Aceptar", "error");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Grid2 container spacing={2} alignItems="center" justifyContent="center" margin={2} marginTop={2}>
                    <Typography variant='h3' className='text-center'>
                        Modificar evento
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
                                    value={formData.capacidad}
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
                              Modificar evento
                          </Button>
                      </Grid2>
                    </form>
                </Grid2>
            </CssBaseline>
        </ThemeProvider>
    );
}