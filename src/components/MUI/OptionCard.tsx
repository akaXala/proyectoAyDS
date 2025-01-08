import * as React from 'react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface OptionCardProps {
  title: string; // Título del card
  description: string; // Descripción
  image: string; // URL de la imagen
  redirectTo: string; // Ruta a redirigir
}

export default function OptionCard({
  title,
  description,
  image,
  redirectTo,
}: OptionCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(redirectTo); // Redirige al lugar especificado
  };

  return (
    <Card 
      sx={{
        width: '100%', // Ocupa el 100% del ancho del contenedor
        height: '100%', // Ocupa el 100% de la altura del contenedor
        display: 'flex', // Flex para manejar el contenido
        flexDirection: 'column', // Alinea verticalmente
        justifyContent: 'space-between', // Espaciado entre el contenido
      }}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
