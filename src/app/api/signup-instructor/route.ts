import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/config/database"; // Tu conexión a PostgreSQL

export const POST = async (req: NextRequest) => {
    try {
      const body = await req.json(); // Obtén los datos del cuerpo de la solicitud
  
      const {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        genero,
        email,
        telefono,
        contrasena,
      } = body;
  
      // Valida campos requeridos
      if (!nombre || !apellidoPaterno || !email || !contrasena) {
        return NextResponse.json(
          { success: false, error: "Faltan campos obligatorios" },
          { status: 400 }
        );
      }
  
      // Hashea la contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
  
      // Inserta datos en la base de datos
      const query = `
        INSERT INTO instructor (
          nombre,
          apellido_paterno,
          apellido_materno,
          fecha_nacimiento,
          genero,
          email,
          telefono,
          contraseña
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id_instructor;
      `;
  
      const values = [
        nombre,
        apellidoPaterno,
        apellidoMaterno || null,
        fechaNacimiento || null,
        genero || null,
        email,
        telefono || null,
        hashedPassword,
      ];
  
      const result = await pool.query(query, values);
  
      return NextResponse.json(
        { success: true, id: result.rows[0].id_instructor },
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
