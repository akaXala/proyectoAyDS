"use client";
import React from 'react';

import { Box, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';

// Componentes custom
import SimpleAppBar from '@/components/MUI/SimpleAppBar';
import UserProfileCard from '@/components/Profile';

// Alertas SweetAlert
import { mostrarAlerta } from "@/components/sweetAlert/ModalAlerts";

// Importar los temas personalizados
import { lightTheme, darkTheme } from '@/ts/customTheme';

// Objetos de usuario
import Administrador from '@/ts/schemas/Administrador';
import Organizador from '@/ts/schemas/Organizador';
import Instructor from '@/ts/schemas/Instructor';
import Competidor from '@/ts/schemas/Competidor';

const roleToClassMap: Record<string, any> = {
  administrador: Administrador,
  organizador: Organizador,
  instructor: Instructor,
  competidor: Competidor,
};

function createUserInstance(rol: string, data: any): any {
  const UserClass = roleToClassMap[rol.toLowerCase()];
  if (!UserClass) {
    throw new Error(`No se encontró una clase para el rol: ${rol}`);
  }
  return new UserClass(
    data.nombre,
    data.apellido_paterno,
    data.apellido_materno,
    data.fecha_nacimiento ? new Date(data.fecha_nacimiento) : null,
    data.genero,
    data.email,
    data.telefono,
    data.contraseña || '', // Proporciona un valor predeterminado si falta
    data.id, // id_user
    data.fecha_registro ? new Date(data.fecha_registro) : null,
    data.id_categoria || data.id_evento || data.id_resultado || null // Otros campos opcionales
  );
}

const Home: React.FC = () => {
  // Detecta el modo de color preferido del sistema
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

  const [id, setID] = React.useState<number>(0);
  const [rol, setRol] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("");
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      let id_user = 0;
      let rol_user = ""

      try {
        // Obtenemos el ID
        const response = await fetch("/api/id-rol", {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("No se pudo obtener el ID del competidor");
        }

        // Leemos el ID del competidor
        const data = await response.json();
        id_user = data.id;
        rol_user = data.rol;

        setID(id_user);
        setRol(rol_user);

        if (!id_user || !rol_user) {
          throw new Error("Datos inválidos recibidos desde el servidor");
        }
      } catch (error) {
        console.error("Error al obtener el ID y rol del competidor:", error);
        mostrarAlerta("Error", "No se pudo obtener el ID y rol del competidor", "Aceptar", "error");
      }

      try {
        const userResponse = await fetch("/api/user-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({ id: id_user, rol: rol_user }),
        });

        const userData = await userResponse.json();

        if (!userData.success) {
          throw new Error("No se pudo obtener los datos del usuario");
        }

        const userInstance = createUserInstance(rol_user, userData.data[0]);
        console.log(userData.data);
        setUserData(userInstance); // Guarda la instancia en el estado

        console.log(userInstance);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        mostrarAlerta("Error", "No se pudo obtener los datos del usuario", "Aceptar", "error");
      }
    }
  fetchUser();
  }, []);

  React.useEffect(() => {
    const image_user = () => {
      if(rol === "administrador"){
        setImage("/LionAdmin.webp");
      } else if (rol === "organizador"){
        setImage("/LionOrganizer.webp");
      } else if (rol === "instructor"){
        setImage("/LionTrainer.webp");
      } else {
        setImage("/LionAthlete.webp");
      }
    };
    image_user();
  }, [rol]);

  const user = userData
    ? {
        nombre: userData.nombre,
        apellido_paterno: userData.apellido_paterno,
        apellido_materno: userData.apellido_materno,
        fecha_nacimiento: userData.fecha_nacimiento,
        genero: userData.genero,
        email: userData.email,
        telefono: userData.telefono,
        fotoPerfil: image,
      }
    : null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box marginBottom={2}>
        <SimpleAppBar logoText='' avatarSrc={image} />
      </Box>
      {!user ? <div>Cargando...</div> : <UserProfileCard {...user} />}
    </ThemeProvider>
  );
};

export default Home;
