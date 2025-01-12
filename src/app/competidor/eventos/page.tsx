"use client"; // Deja usar el cliente
import * as React from "react";

// Navegación de Next.js
import { useRouter } from "next/navigation";

// Componentes de MUI
import { Typography, useMediaQuery, CssBaseline, Grid2, Box, Button, Modal, CardMedia, ThemeProvider } from "@mui/material";

// Temas para la página
import { lightTheme, darkTheme } from "@/ts/customTheme";

// Clase Evento
import { Evento } from "@/ts/schemas/Evento";

// Componentes custom MUI
import ResponsiveAppBar from '@/components/MUI/ResponsiveAppBar'
import EventCard from "@/components/MUI/EventCard";

// Componentes custom SweetAlert
import { ConfirmAlert } from "@/components/sweetAlert/ConfirmAlert";
import { mostrarAlerta } from "@/components/sweetAlert/ModalAlerts";

export default function Home() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(() => (prefersDarkMode ? darkTheme : lightTheme),[prefersDarkMode]);

  const [eventos, setEventos] = React.useState<Evento[]>([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = React.useState<Evento | null>(null);

  React.useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("/api/modificar-evento-datos");
        const data = await response.json();
        if (data.success && Array.isArray(data.eventos)) {
          const eventosCargados = data.eventos.map(
            (evento: any) => new Evento({
              ...evento,
              fecha_inicio_inscripcion: evento.fecha_inicio_inscripcion ? new Date(evento.fecha_inicio_inscripcion) : null,
              fecha_fin_inscripcion: evento.fecha_fin_inscripcion ? new Date(evento.fecha_fin_inscripcion) : null,
              fecha_inicio: evento.fecha_inicio ? new Date(evento.fecha_inicio) : null,
              fecha_fin: evento.fecha_fin ? new Date(evento.fecha_fin) : null,
            })
          );
          setEventos(eventosCargados);
        }
      } catch (error) {
        console.error("Error fetching eventos:", error);
      }
    };
    fetchEventos();
  }, []);

  const handleCardClick = (evento: Evento) => {
    setEventoSeleccionado(evento);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEventoSeleccionado(null);
  };

  const handleButtonClick = async () => {
    setModalOpen(false);

    const confirmado = await ConfirmAlert(
        "¿Estás seguro de quererte a inscribir a este evento?",
        "En caso de error podras cancelar tu inscripción",
        "Inscribirme",
        "Cancelar",
        "question",
    );

    let pago = "";
    let id = 0;

    if(eventoSeleccionado?.getCosto === 'Gratis'){
        pago = "t";
    } else {
        pago = "f";
    }

    try {
        // Obtenemos el ID
        const response = await fetch("/api/id-competidor", {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("No se pudo obtener el ID del competidor");
        }

        // Leemos el ID del competidor
        const id_res = await response.text();

        // Asignamos el ID a la variable
        id = Number(id_res.trim());
    } catch (error) {
        console.error("Error al obtener el ID del competidor:", error);
        mostrarAlerta("Error", "No se pudo obtener el ID del competidor", "Aceptar", "error");
    }

    if (confirmado) {
        const inscripcion = {
            estatus_de_pago: pago,
            id_competidor: id, // ID del competidor actual
            id_evento: eventoSeleccionado?.getIdEvento,
        };

        try {
            const response = await fetch("/api/inscripcion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inscripcion),
            });

            const data = await response.json();

            if (data.success) {
                mostrarAlerta("Inscripción exitosa", "Te has inscrito correctamente al evento", "Aceptar", "success");
            } else {
                mostrarAlerta("Error", `No se pudo completar la inscripción. ${data.error}`, "Aceptar", "error");
            }
        } catch (error) {
            console.error("Error en la inscripción:", error);
            mostrarAlerta("Error", "No se pudo completar la inscripción. Inténtalo de nuevo más tarde", "Aceptar", "error");
        }
    } else {
        setModalOpen(true);
    }
}

  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <ResponsiveAppBar
            pages={[
              { label: "Ver inscripciones", path: "/competidor/eventos-inscritos" },
            ]}
            avatarSrc="/LionAthlete.webp"
        />
        <Typography className="text-center" variant="h3" marginY={1}>
          Eventos
        </Typography>
        <Grid2 container spacing={5} alignItems="center" justifyContent="center" className="text-center" marginX={1}>
          <Grid2 container spacing={2} marginTop={1} justifyContent="center" className="text-center">
            {eventos.map((evento) => (
              <Grid2 size={{ xs: 12, sm: 6 }} key={evento.getIdEvento} display="flex" justifyContent="center">
                <EventCard
                  titulo={evento.getNombreEvento}
                  fechaEvento={evento.getFechaInicio + " - " + evento.getFechaFin}
                  fechaInscripcion={evento.getFechaInicioInscripcion + " - " + evento.getFechaFinInscripcion}
                  horaInicio={evento.getHoraInicio + " - " + evento.getHoraFin || ""}
                  modalidad={evento.getModalidad || "No especificada"}
                  imagen={evento.getImagen}
                  onClick={() => handleCardClick(evento)}
                />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        {/* Modal para mostrar los datos del evento */}
        <Modal open={modalOpen} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "800px",
              maxHeight: "90vh",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              overflowY: "auto",
            }}
          >
            {eventoSeleccionado && (
              <>
                {/* Imagen del evento */}
                <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                  <CardMedia
                    component="img"
                    image={eventoSeleccionado.getImagen}
                    alt={eventoSeleccionado.getNombreEvento}
                    sx={{
                      maxWidth: "20%",
                      height: "auto",
                      borderRadius: "8px",
                      margin: "0 auto",
                    }}
                  />
                </Box>

                {/* Título del evento */}
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{ marginBottom: 4 }}
                >
                  {eventoSeleccionado.getNombreEvento}
                </Typography>

                {/* Detalles en dos columnas */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: 4,
                    rowGap: 2,
                  }}
                >
                  <Typography>
                    <strong>Tipo de evento:</strong> {eventoSeleccionado.getTipoEvento || "No especificado"}
                  </Typography>
                  <Typography>
                    <strong>Capacidad:</strong> {eventoSeleccionado.getCapacidad || "No especificada"}
                  </Typography>
                  <Typography>
                    <strong>Fecha de inicio de inscripción:</strong> {eventoSeleccionado.getFechaInicioInscripcion}
                  </Typography>
                  <Typography>
                    <strong>Fecha de fin de inscripción:</strong> {eventoSeleccionado.getFechaFinInscripcion}
                  </Typography>
                  <Typography>
                    <strong>Fecha de inicio del evento:</strong> {eventoSeleccionado.getFechaInicio}
                  </Typography>
                  <Typography>
                    <strong>Fecha de fin del evento:</strong> {eventoSeleccionado.getFechaFin}
                  </Typography>
                  <Typography>
                    <strong>Hora de inicio:</strong> {eventoSeleccionado.getHoraInicio || "No especificada"}
                  </Typography>
                  <Typography>
                    <strong>Hora de fin:</strong> {eventoSeleccionado.getHoraFin || "No especificada"}
                  </Typography>
                  <Typography>
                    <strong>Modalidad:</strong> {eventoSeleccionado.getModalidad || "No especificada"}
                  </Typography>
                  <Typography>
                    <strong>Costo:</strong> {eventoSeleccionado.getCosto}
                  </Typography>
                  <Typography>
                    <strong>Requisitos:</strong> {eventoSeleccionado.getRequisitos || "No especificados"}
                  </Typography>
                  <Typography>
                    <strong>Reglas:</strong> {eventoSeleccionado.getReglas || "No especificadas"}
                  </Typography>
                  <Typography>
                    <strong>Descripción:</strong> {eventoSeleccionado.getDescripcion}
                  </Typography>
                  <Typography>
                    <strong>Estatus:</strong> {eventoSeleccionado.getEstatus || "No especificado"}
                  </Typography>
                </Box>

                {/* Botón de cierre */}
                <Box textAlign="center" marginTop={4}>
                  <Button 
                    onClick={handleButtonClick}
                    variant="contained"
                    className="button"
                  >
                    Inscribirse
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
    </ThemeProvider>
  );
}
