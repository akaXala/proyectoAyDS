"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { Grid2, Box, Typography, TextField, Button, MenuItem } from '@mui/material'

// Componentes MUI X
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

// Objeto Competidor
import Competidor from '@/ts/schemas/Competidor';

// Opciones para sexo
const SexoPersona = [
    {
        value: "Femenino",
        label: "Femenino",
    },
    {
        value: "Masculino",
        label: "Masculino",
    },
    {
        value: "Indefinido",
        label: "Prefiero no decirlo"
    }
];

const Login: React.FC = () => {
    // Estados para cada campo del formulario
    const [formData, setFormData] = React.useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        email: '',
        telefono: '',
        contrasena: '',
        contrasena2: '',
        genero: ''
    });

    // Estado para almacenar la fecha seleccionada, utilizando Dayjs como tipo.
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

    // Manejador del calendario
    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate);
    };

    // Manejador para campos de texto normales
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    // Nuevo manejador específico para el campo select
    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            genero: e.target.value
        }));
    };

    // Manejador para el registro
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.contrasena !== formData.contrasena2) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const competidor = new Competidor(
            formData.nombre,
            formData.apellidoPaterno,
            formData.apellidoMaterno || null,
            selectedDate ? selectedDate.toDate() : null,
            formData.genero || null,
            formData.email,
            formData.telefono || null,
            formData.contrasena
        );

        console.log('Competidor creado:', competidor);
        // Aquí puedes agregar la lógica para enviar el competidor al backend
    };

    return(
        <form onSubmit={handleSubmit}>
            <Box margin={2}>
                <TextField 
                    id='nombre' 
                    label='Nombre' 
                    variant='outlined' 
                    size='small'
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Box margin={2}>
                <TextField 
                    id='apellidoPaterno' 
                    label='Apellido Paterno'
                    variant='outlined'
                    size='small'
                    value={formData.apellidoPaterno}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Box margin={2}>
                <TextField 
                    id='apellidoMaterno' 
                    label='Apellido Materno' 
                    variant='outlined' 
                    size='small'
                    value={formData.apellidoMaterno}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Box margin={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Fecha de Nacimiento"
                        value={selectedDate}
                        onChange={handleDateChange}
                        slotProps={{
                            textField: {
                              size: 'small', // Aplica tamaño pequeño
                            },
                        }}
                    />
                </LocalizationProvider>
            </Box>
            <Box margin={2}>
                <TextField
                    id='genero'
                    select
                    label="Sexo"
                    value={formData.genero}
                    onChange={handleSelectChange}
                    size='small'
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
                    id='email'
                    label='Correo electronico'
                    variant='outlined'
                    size='small' 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Box margin={2}>
                <TextField 
                    id='telefono'
                    label='Telefono (10 digitos)'
                    variant='outlined'
                    size='small'
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Box margin={2}>
                <TextField
                    id='contrasena'
                    label='Contraseña'
                    type="password"
                    variant='outlined'
                    size='small'
                    value={formData.contrasena}
                    onChange={handleInputChange}
                    required
                />
            </Box>
            <Box margin={2}>
                <TextField
                    id='contrasena2'
                    label='Repite la contraseña'
                    type="password"
                    variant='outlined'
                    size='small'
                    value={formData.contrasena2}
                    onChange={handleInputChange}
                    required    
                />
            </Box>
            <Box margin={2}>
                <Button 
                    type="submit" 
                    variant="contained" 
                    className='button px-4 py-2 rounded'
                >
                    Registrarse
                </Button>
            </Box>
        </form>
    )
}

export default Login;