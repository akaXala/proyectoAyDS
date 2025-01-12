import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/database"; // Conexión a PostgreSQL

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Obtén los datos del cuerpo de la solicitud

    const { id_competidor } = body;

    if (!id_competidor) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Consulta SQL para obtener todos los eventos
    const query = `SELECT 
        e.id_evento,
        e.nombre_evento,
        e.tipo_evento,
        e.capacidad,
        e.fecha_inicio_inscripcion,
        e.fecha_fin_inscripcion,
        e.fecha_inicio,
        e.fecha_fin,
        e.hora_inicio,
        e.hora_fin,
        e.modalidad,
        e.costo,
        e.requisitos,
        e.reglas,
        e.descripcion,
        e.estatus,
        e.imagen
    FROM 
        Evento e
    INNER JOIN 
        Inscripcion i
    ON 
        e.id_evento = i.id_evento
    WHERE 
        i.id_competidor = $1;
    `;
    const values = [id_competidor];

    const result = await pool.query(query, values);

    // Respuesta con los datos de los eventos
    return NextResponse.json(
      { success: true, eventos: result.rows },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};
