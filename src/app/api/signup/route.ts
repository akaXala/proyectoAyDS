import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/config/database"; // Conexión a PostgreSQL

export const POST = async (req: NextRequest) => {
  try {
    // Procesar el cuerpo de la solicitud
    const body = await req.json();
    console.log("Datos recibidos en el servidor:", body); // Debugging

    const { email, contrasena } = body;

    // Validar que ambos campos estén presentes
    if (!email || !contrasena) {
      return NextResponse.json(
        { success: false, error: "Correo y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    // Buscar el usuario en la base de datos por correo
    const query = `SELECT contraseña FROM Competidor WHERE email = $1`;
    const result = await pool.query(query, [email]);

    // Verificar si el usuario existe
    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Correo no registrado" },
        { status: 404 }
      );
    }

    const hashedPassword = result.rows[0].contraseña;

    // Comparar la contraseña ingresada con la almacenada
    const isPasswordValid = await bcrypt.compare(contrasena, hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // Respuesta exitosa
    return NextResponse.json(
      { success: true, message: "Sesión iniciada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};
