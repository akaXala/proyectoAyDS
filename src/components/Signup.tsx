"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { Box, TextField, Button } from '@mui/material'

const Signup: React.FC = () => {
    return(
        <div>
            <Box margin={2}>
                <TextField id='email' label='Correo Electronico' variant='outlined' size='small' className='text-field' />
            </Box>
            <Box margin={2}>
                <TextField id='contrasena' label='Contraseña' variant='outlined' size='small' className='text-field' />
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