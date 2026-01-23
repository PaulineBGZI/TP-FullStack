import pool from "../db.js";
import { Cookie } from "../types/commands.js";

export async function getAllCookies(): Promise<Cookie[]> {
  const { rows } = await pool.query(`
    SELECT
      id,
      pepite_id,
      cookie_name,
      quantity,
      created_at
    FROM cookies
    ORDER BY created_at DESC
  `);

  return rows;
}
