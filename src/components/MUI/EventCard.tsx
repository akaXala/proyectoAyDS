import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Stack } from '@mui/material';

// Definir los tipos de las propiedades
interface MediaControlCardProps {
  titulo: string;
  fechaEvento: string;
  fechaInscripcion: string;
  horaInicio: string;
  modalidad: string;
  imagen: string;
  onClick: () => void;
}

const MediaControlCard: React.FC<MediaControlCardProps> = ({ titulo, fechaEvento, fechaInscripcion, horaInicio, modalidad, imagen, onClick }) => {
  return (
    <Card sx={{ maxWidth: 500 }} onClick={onClick}>
      <CardActionArea>
        <Stack direction="row">
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150 }}
            image={imagen}
            alt={titulo || "Imagen del evento"}
          />
          <CardContent>
            <Typography component="div" variant="h5">
              {titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary" align='center'>
              Fecha del evento: {fechaEvento}
            </Typography>
            <Typography variant="body2" color="text.secondary" align='center'>
              Fecha inscripción: {fechaInscripcion}
            </Typography>
            <Typography variant="body2" color="text.secondary" align='center'>
              Horarios: {horaInicio}
            </Typography>
            <Typography variant="body2" color="text.secondary" align='center'>
              Modalidad: {modalidad}
            </Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default MediaControlCard;
