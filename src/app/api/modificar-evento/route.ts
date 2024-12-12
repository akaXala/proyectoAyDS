import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/database"; // Tu conexión a PostgreSQL

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Obtén los datos del cuerpo de la solicitud

    const {
      id_evento,
      nombre_evento,
      tipo_evento,
      capacidad,
      fechaInicioInscripcion,
      fechaFinInscripcion,
      fechaInicioEvento,
      fechaFinEvento,
      horaInicio,
      horaFin,
      modalidad,
      costo,
      requisitos,
      reglas,
      descripcion,
      imagen,
    } = body;

    // Valida campos requeridos
    if (
      !id_evento ||
      !nombre_evento ||
      !tipo_evento ||
      !capacidad ||
      !fechaInicioInscripcion ||
      !fechaFinInscripcion ||
      !fechaInicioEvento ||
      !fechaFinEvento ||
      !horaInicio ||
      !horaFin ||
      !modalidad ||
      !requisitos ||
      !reglas ||
      !descripcion ||
      !imagen
    ) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Actualiza datos en la base de datos
    const query = `
      UPDATE evento
      SET
        nombre_evento = $1,
        tipo_evento = $2,
        capacidad = $3,
        fecha_inicio_inscripcion = $4,
        fecha_fin_inscripcion = $5,
        fecha_inicio = $6,
        fecha_fin = $7,
        hora_inicio = $8,
        hora_fin = $9,
        modalidad = $10,
        costo = $11,
        requisitos = $12,
        reglas = $13,
        descripcion = $14,
        imagen = $15
      WHERE id_evento = $16
      RETURNING id_evento;
    `;

    const values = [
      nombre_evento,
      tipo_evento,
      capacidad,
      fechaInicioInscripcion,
      fechaFinInscripcion,
      fechaInicioEvento,
      fechaFinEvento,
      horaInicio,
      horaFin,
      modalidad,
      costo,
      requisitos,
      reglas,
      descripcion,
      imagen,
      id_evento,
    ];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, id: result.rows[0].id_evento },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la actualización:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};
