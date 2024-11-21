"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes de MUI
import { Grid2, Box, Typography } from '@mui/material'

// Componente personalizado
import ModalLogin from '@/components/sweetAlert/ModalLogin';

// DOM de NextJS
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2} alignItems="center" justifyContent="center" margin={2} marginTop={6}>
          <Typography variant='h3'>
            Club de Leones
          </Typography>
        </Grid2>
      </Box>
      <Box>
        <Grid2 container spacing={2} alignItems="center" justifyContent="center" marginTop={6}>
          <Image 
            src="/LOGO.png"
            alt="Logo club de leones"
            width={350}
            height={350}
          />
        </Grid2>
      </Box>
      <Box>
        <Grid2 container spacing={2} alignItems="center" justifyContent="center" marginTop={6}>
          <Typography variant='h6'>
            Bienvenido al Club de Leones
          </Typography>
        </Grid2>
      </Box>
      <Box>
        <Grid2 container spacing={9} alignItems="center" justifyContent="center" marginTop={6}>
          <ModalLogin />
        </Grid2>
      </Box>
    </div>
  );
}
