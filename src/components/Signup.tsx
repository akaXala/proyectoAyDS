"use client"; // Deja usar el cliente

import * as React from "react";

// Componentes de MUI
import { Box, TextField, Button, MenuItem } from "@mui/material";

// Componentes MUI X
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

// Validaciones
import { expresiones, mensajesError } from "@/ts/validations";

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
  contrasena2: string;
  genero: string;
}

const Signup: React.FC = () => {
  // Estados para cada campo del formulario
  const [formData, setFormData] = React.useState<FormData>({
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

    // Nueva validación de edad
    if (selectedDate) {
      const today = dayjs();
      const age = today.diff(selectedDate, 'year');
      
      if (age < 13) {
        newErrors['fechaNacimiento'] = 'Debes tener al menos 13 años para registrarte';
      }
    }

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
        mostrarAlerta("Error al registrar", `${errorData.error}`, "Aceptar", "error");
        return;
      }
  
      const data = await response.json();
  
      if (data.success) {
        mostrarAlerta("¡Te has registrado exitosamente!", "Ahora puedes ingresar", "Aceptar", "success");
        // Limpia el formulario o redirige al usuario
      } else {
        mostrarAlerta("Error al registrar", `${data.error}`, "Aceptar", "error");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      mostrarAlerta("Hubo un problema con el registro", "Inténtalo de nuevo", "Aceptar", "error");
    }
  };
  
  return (
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
                error: formSubmitted && !!errors.fechaNacimiento,
                helperText: formSubmitted ? errors.fechaNacimiento : "",
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
          id="email"
          label="Correo electrónico"
          variant="outlined"
          size="small"
          value={formData.email}
          onChange={handleInputChange}
          error={formSubmitted && !!errors.email}
          helperText={formSubmitted ? errors.email : ""}
          className="text-field"
          required
        />
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
        <TextField
          id="contrasena"
          label="Contraseña"
          type="password"
          variant="outlined"
          size="small"
          value={formData.contrasena}
          onChange={handleInputChange}
          error={formSubmitted && !!errors.contrasena}
          helperText={formSubmitted ? errors.contrasena : ""}
          className="text-field"
          required
        />
      </Box>
      <Box margin={2}>
        <TextField
          id="contrasena2"
          label="Repite la contraseña"
          type="password"
          variant="outlined"
          size="small"
          value={formData.contrasena2}
          onChange={handleInputChange}
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
  );
};

export default Signup;
