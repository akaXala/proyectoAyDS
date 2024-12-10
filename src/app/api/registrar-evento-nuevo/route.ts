import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/database"; // Tu conexión a PostgreSQL

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Obtén los datos del cuerpo de la solicitud

    const {
      nombre_evento,
      tipo_evento,
      capacidad,
      fechaInicioInscripcion,
      fechaFinInscripcion,
      fechaInicioEvento,
      fechaFinEvento,
      horarios,
      modalidad,
      costo,
      requisitos,
      reglas,
      descripcion, 
    } = body;

    // Valida campos requeridos
    if (!nombre_evento || !tipo_evento || !capacidad || !fechaInicioInscripcion || !fechaFinInscripcion || !fechaInicioEvento || !fechaFinEvento || !horarios || !modalidad || !requisitos || !reglas || !descripcion) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Inserta datos en la base de datos
    const query = `
      INSERT INTO evento (
        nombre_evento,
        tipo_evento,
        capacidad,
        fecha_inicio_inscripcion,
        fecha_fin_inscripcion,
        fecha_inicio,
        fecha_fin,
        horarios,
        modalidad,
        costo,
        requisitos,
        reglas,
        descripcion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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
      horarios,
      modalidad,
      costo,
      requisitos,
      reglas,
      descripcion,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json(
      { success: true, id: result.rows[0].id_evento },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};
