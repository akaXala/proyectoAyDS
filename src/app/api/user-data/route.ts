import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/database"; // Conexión a PostgreSQL

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json(); // Obtén los datos del cuerpo de la solicitud

    const { id, rol } = body;

    if (!id || !rol) {
        return NextResponse.json(
            { success: false, error: "Faltan datos" }, 
            { status: 400 }
        );
    }

    const id_user = 'id_'+rol;

    const query = `
        SELECT * FROM ${rol} WHERE ${id_user} = $1;
    `;

    const values = [id];
    const result = await pool.query(query, values);

    // Respuesta con los datos del usuario
    return NextResponse.json(
        { success: true, data: result.rows },
        { status: 200 }
    );    
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    return NextResponse.json(
        { success: false, error: "Error interno del servidor" },
        { status: 500 }
    );
  }
};
