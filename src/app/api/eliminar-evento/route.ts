import { NextRequest, NextResponse } from "next/server";
import pool from "@/config/database"; // Conexión a PostgreSQL

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { id_evento } = body;

        // Validar campos requeridos
        if (!id_evento) {
            return NextResponse.json(
                { success: false, error: "Falta el ID del evento" },
                { status: 400 }
            );
        }

        // Borrar llaves foraneas
        const deleteInscripcionesQuery = `
            DELETE FROM inscripcion
            WHERE id_evento = $1;
        `;

        await pool.query(deleteInscripcionesQuery, [id_evento]);

        // Borrar registros de la base de datos
        const query = `
            DELETE FROM evento
            WHERE id_evento = $1;
        `;
        const result = await pool.query(query, [id_evento]);

        // Verificar si se eliminó algún registro
        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, error: "No se encontró el evento con el ID proporcionado" },
                { status: 404 }
            );
        }

        // Respuesta exitosa
        return NextResponse.json(
            { success: true, message: "Evento eliminado exitosamente" },
            { status: 200 }
        );
    } catch (error) {
        // Manejo de errores
        console.error("Error al eliminar el evento:", error);
        return NextResponse.json(
            { success: false, error: "Ocurrió un error al eliminar el evento" },
            { status: 500 }
        );
    }
};
