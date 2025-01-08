import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/database"; // Tu conexión a PostgreSQL

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json(); // Obtén los datos del cuerpo de la solicitud

        const {
            estatus_de_pago,
            id_competidor,
            id_evento,
        } = body;

        // Validar campos requeridos
        if (!estatus_de_pago || !id_competidor || !id_evento) {
            return NextResponse.json(
                { success: false, error: "Faltan campos obligatorios" },
                { status: 400 }
            );
        }

        // Insertar datos en la base de datos
        const query = `
            INSERT INTO inscripcion (
                estatus_de_pago,
                id_competidor,
                id_evento
            ) VALUES ($1, $2, $3)
            RETURNING id_inscripcion;
        `;

        const values = [
            estatus_de_pago || null,
            id_competidor,
            id_evento,
        ];

        const result = await pool.query(query, values);

        return NextResponse.json(
            { success: true, id_inscripcion: result.rows[0].id_inscripcion },
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