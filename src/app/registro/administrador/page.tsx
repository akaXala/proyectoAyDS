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
import { expresiones, mensajesError } from "@/ts/validationsSpecial";

// Importar los temas personalizados
import { lightTheme, darkTheme } from '@/ts/customTheme';

// Alertas de SweetAlert
import { mostrarAlerta } from '@/components/sweetAlert/ModalAlerts';

// Opciones para sexo
const SexoPersona = [
    { value: "Femenino", label: "Femenino" },
    { value: "Masculino", label: "Masculino" },
    { value: "Indefinido", label: "Prefiero no decirlo" },
];

interface FormData {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    telefono: string;
    contrasena: string;
    genero: string;
}

export default function Home(){
    // Detecta el modo de color preferido del sistema
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

    // Modificador para los TextField
    const isMobile = useMediaQuery('(max-width:600px)');

    // Estados para cada campo del formulario
    const [formData, setFormData] = React.useState<FormData>({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        email: "",
        telefono: "",
        contrasena:"",
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

    // Función para quitar carácteres especiales del nombre
    function quitarCaracteresEspeciales(cadena: string): string {
        // Usamos normalize para transformar los caracteres con diacríticos en su forma base.
        return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // Manejador para el registro
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        setFormSubmitted(true);
    
        if (!validateForm()) {
        return;
        }

        let id = 0;

        try {
            const response = await fetch("/api/count-administrador", {
              method: "GET",
            });
      
            if (!response.ok) {
              throw new Error("Error en la solicitud al servidor");
            }
      
            const data = await response.json();
      
            if (data.success) {
              const count = data.count; // Extraer el conteo del JSON
              id = count + 1;
            } else {
              console.error("Error del servidor:", data.error);
            }
          } catch (error) {
            console.error("Error al comunicarse con el servidor:", error);
        }

        const newEmail = formData.nombre.charAt(0).toLocaleLowerCase()+
                         formData.apellidoPaterno.toLocaleLowerCase()+
                         formData.apellidoMaterno.charAt(0).toLocaleLowerCase()+
                         id+
                         "@administrador.clubleones.mx";

        const newContrasena = formData.nombre+(selectedDate ? selectedDate.toISOString().split("T")[0] : null)+formData.apellidoPaterno;
    
        const instructor = {
        nombre: formData.nombre,
        apellidoPaterno: formData.apellidoPaterno,
        apellidoMaterno: formData.apellidoMaterno || null,
        fechaNacimiento: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
        genero: formData.genero || null,
        email: quitarCaracteresEspeciales(newEmail),
        telefono: formData.telefono || null,
        contrasena: quitarCaracteresEspeciales(newContrasena),
        };
    
        try {
            const response = await fetch("/api/signup-administrador", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(instructor),
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                mostrarAlerta("Error al registrar", `${errorData.error}`, "Aceptar", "error");
                return;
            }
        
            const data = await response.json();
        
            if (data.success) {
                mostrarAlerta("¡Administador registrado exitosamente!", `"Correo: ${newEmail}"`, "Aceptar", "success");
            } else {
                mostrarAlerta("Error al registrar", `${data.error}`, "Aceptar", "error");
            }
        } catch (error) {
            console.error("Error al registrar:", error);
            mostrarAlerta("Hubo un problema con el registro", "Inténtalo de nuevo", "Aceptar", "error");
        }
    };

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Grid2 container spacing={2} alignItems="center" justifyContent="center" margin={1} marginTop={2}>
                    <Typography variant='h3' className='text-center'>
                        Registro administrador
                    </Typography>
                </Grid2>
                <Grid2 container spacing={2} alignItems="center" justifyContent="center" margin={1} marginTop={2}>
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
                        <Box margin={2} className="text-center">
                            <Button
                            type="submit"
                            variant="contained"
                            className="button px-4 py-2 rounded"
                            >
                            Registrar administrador
                            </Button>
                        </Box>
                    </form>
                </Grid2>
            </CssBaseline>
        </ThemeProvider>
    )
}