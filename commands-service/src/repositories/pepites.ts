import pool from "../db.js";
import { Pepites } from "../types/commands.js";

export async function getAllPepites(): Promise<Pepites[]> {
  const { rows } = await pool.query(`
    SELECT
      id,
      pepite_name,
      quantity,
      created_at
    FROM pepites
    ORDER BY created_at DESC
  `);

  return rows;
}
