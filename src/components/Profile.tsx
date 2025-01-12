// components/UserProfile.tsx
import React from 'react';
import { Avatar, Typography, Grid2 } from '@mui/material';

interface UserProfileProps {
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
  fecha_nacimiento?: Date | null;
  genero?: string | null;
  email: string;
  telefono?: string | null;
  fotoPerfil: string; // URL o base64 de la foto de perfil
}

const UserProfile: React.FC<UserProfileProps> = ({
  nombre,
  apellido_paterno,
  apellido_materno,
  fecha_nacimiento,
  genero,
  email,
  telefono,
  fotoPerfil,
}) => {
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 5,
      }}
    >
      <Grid2>
        <Avatar
          src={fotoPerfil}
          alt={`${nombre} ${apellido_paterno}`}
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
      </Grid2>
      <Grid2>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {`${nombre} ${apellido_paterno} ${apellido_materno || ''}`}
        </Typography>
      </Grid2>
      <Grid2>
        <Typography variant="body1">
          <strong>Correo Electrónico:</strong> {email}
        </Typography>
      </Grid2>
      <Grid2>
        <Typography variant="body1">
          <strong>Fecha de Nacimiento:</strong>{' '}
          {fecha_nacimiento ? fecha_nacimiento.toLocaleDateString() : 'No especificado'}
        </Typography>
      </Grid2>
      <Grid2>
        <Typography variant="body1">
          <strong>Género:</strong> {genero || 'No especificado'}
        </Typography>
      </Grid2>
      <Grid2>
        <Typography variant="body1">
          <strong>Teléfono:</strong> {telefono || 'No especificado'}
        </Typography>
      </Grid2>
    </Grid2>
  );
};

export default UserProfile;
