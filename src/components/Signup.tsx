"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { Grid2, Box, Typography, TextField, Button } from '@mui/material'

// Componentes MUI X
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

const Signup: React.FC = () => {
    // Estado para almacenar la fecha seleccionada, utilizando Dayjs como tipo.
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate);
    };

    return(
        <div>
            <Box margin={2}>
                <TextField id='email' label='Correo Electronico' variant='outlined' size='small' />
            </Box>
            <Box margin={2}>
                <TextField id='contrasena' label='Contraseña' variant='outlined' size='small' />
            </Box>
            <Box margin={2}>
                <Button className='button px-4 py-2 rounded'>
                    Ingresar
                </Button>
            </Box>
        </div>
    )
}

export default Signup;