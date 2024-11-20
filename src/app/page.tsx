"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { Grid2, Box, Typography } from '@mui/material'

// Componente personalizado
import Login from '@/components/sweetAlert/ModalLogin';

// DOM de NextJS
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2} alignItems="center" justifyContent="center">
          <Image 
            src="/LOGO.png"
            alt="Logo club de leones"
            width={50}
            height={50}
          />
          <Typography variant='h4'>
            Club de Leones
          </Typography>
        </Grid2>
      </Box>
      <Box>
        <Grid2>
          <Typography>
            Bienvenido al Club de Leones
          </Typography>
        </Grid2>
      </Box>
      <Box>
        <Grid2>
          <Login />
        </Grid2>
      </Box>
    </div>
  );
}
