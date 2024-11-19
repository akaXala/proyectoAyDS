import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // Configura SSL para conexiones encriptadas
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users'); // Cambiamos la consulta
    client.release();
    res.status(200).json(result.rows); // Devuelve todas las filas de la tabla users
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error);
    res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
  }
}
