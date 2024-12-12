import { NextResponse } from "next/server";
import pool from "@/config/database"; // Conexión a PostgreSQL

export const GET = async () => {
  try {
    // Consulta SQL para obtener todos los eventos
    const query = `SELECT * FROM Evento`;
    const result = await pool.query(query);

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
