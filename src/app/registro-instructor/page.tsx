"use client";
import * as React from "react";

// Componentes MUI
import { Box, Button, CssBaseline, ThemeProvider, useMediaQuery, Typography, TextField, MenuItem, Grid2 } from '@mui/material';

// Componentes MUI X
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

// Validaciones
import { expresiones, mensajesError } from "@/ts/validations";

// Importar los temas personalizados
import { lightTheme, darkTheme } from '@/ts/customTheme';

// Opciones para sexo
const SexoPersona = [
    { value: "Femenino", label: "Femenino" },
    { value: "Masculino", label: "Masculino" },
    { value: "Indefinido", label: "Prefiero no decirlo" },
  ];

export default function Home(){
    // Detecta el modo de color preferido del sistema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    // Modificador para los TextField
    const isMobile = useMediaQuery('(max-width:600px)');

    // Estados para cada campo del formulario
    const [formData, setFormData] = React.useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        telefono: "",
        contrasena: "",
        contrasena2: "",
        genero: "",
    });

    // Estado para almacenar la fecha seleccionada
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

    // Estado para los errores de validación
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    // Estado para controlar si el formulario ha sido enviado
    const [formSubmitted, setFormSubmitted] = React.useState(false);

    // Manejador del calendario
    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate);
    };

    // Manejador para campos de texto normales
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
        ...prevState,
        [id]: value,
        }));
    };

    // Nuevo manejador para el campo select
    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
        ...prevState,
        genero: e.target.value,
        }));
    };

    // Validar todos los campos del formulario
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
        if (expresiones[key] && !expresiones[key].test(formData[key])) {
            newErrors[key] = mensajesError[key];
        }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    // Manejador para el registro
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        setFormSubmitted(true);
    
        if (!validateForm()) {
        return;
        }
    
        if (formData.contrasena !== formData.contrasena2) {
        alert('error');
        return;
        }
    
        const competidor = {
        nombre: formData.nombre,
        apellidoPaterno: formData.apellidoPaterno,
        apellidoMaterno: formData.apellidoMaterno || null,
        fechaNacimiento: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
        genero: formData.genero || null,
        email: formData.email,
        telefono: formData.telefono || null,
        contrasena: formData.contrasena,
        };
    
        try {
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(competidor),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error al registrar: ${errorData.error}`);
            return;
        }
    
        const data = await response.json();
    
        if (data.success) {
            alert("¡Competidor registrado exitosamente!");
            // Limpia el formulario o redirige al usuario
        } else {
            alert(`Error al registrar: ${data.error}`);
        }
        } catch (error) {
        console.error("Error al registrar:", error);
        alert("Hubo un problema con el registro. Inténtalo de nuevo.");
        }
    };

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Grid2 container spacing={2} alignItems="center" justifyContent="center" margin={1} marginTop={2}>
                    <Typography variant='h3' className='text-center'>
                        Registro instructor
                    </Typography>
                </Grid2>
                <Grid2 container spacing={5} alignItems="center" justifyContent="center" className="text-center" marginX={5}>
                    <form onSubmit={handleSubmit}>
                        <Box margin={2}>
                            <TextField
                            id="nombre"
                            label="Nombre"
                            variant="outlined"
                            size="small"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            error={formSubmitted && !!errors.nombre}
                            helperText={formSubmitted ? errors.nombre : ""}
                            className="text-field"
                            required
                            />
                        </Box>
                        <Box margin={2}>
                            <TextField
                            id="apellidoPaterno"
                            label="Apellido Paterno"
                            variant="outlined"
                            size="small"
                            value={formData.apellidoPaterno}
                            onChange={handleInputChange}
                            error={formSubmitted && !!errors.apellidoPaterno}
                            helperText={formSubmitted ? errors.apellidoPaterno : ""}
                            className="text-field"
                            required
                            />
                        </Box>
                        <Box margin={2}>
                            <TextField
                            id="apellidoMaterno"
                            label="Apellido Materno"
                            variant="outlined"
                            size="small"
                            value={formData.apellidoMaterno}
                            onChange={handleInputChange}
                            error={formSubmitted && !!errors.apellidoMaterno}
                            helperText={formSubmitted ? errors.apellidoMaterno : ""}
                            className="text-field"
                            required
                            />
                        </Box>
                        <Box margin={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha de Nacimiento"
                                value={selectedDate}
                                onChange={handleDateChange}
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
                        <Box margin={2}>
                            <TextField
                            id="genero"
                            select
                            label="Sexo"
                            value={formData.genero}
                            onChange={handleSelectChange}
                            size="small"
                            className="text-field"
                            required
                            >
                            {SexoPersona.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                        </Box>
                        <Box margin={2}>
                            <TextField
                            id="telefono"
                            label="Teléfono (10 dígitos)"
                            variant="outlined"
                            size="small"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            error={formSubmitted && !!errors.telefono}
                            helperText={formSubmitted ? errors.telefono : ""}
                            className="text-field"
                            required
                            />
                        </Box>
                        <Box margin={2}>
                            <Button
                            type="submit"
                            variant="contained"
                            className="button px-4 py-2 rounded"
                            >
                            Registrarse
                            </Button>
                        </Box>
                    </form>
                </Grid2>
            </CssBaseline>
        </ThemeProvider>
    )
}