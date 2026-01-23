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

export async function getCookie(id: string): Promise<Cookie[]> {
  const { rows } = await pool.query(`
    SELECT
          id,
          pepite_id,
          cookie_name,
          quantity,
          created_at
        FROM cookies
        WHERE id = $1;
  `);

  return rows;
}

export async function createCookie(data: Partial<Cookie>): Promise<Cookie[]> {
  const { rows } = await pool.query(`
    INSERT INTO cookies (pepite_id, cookie_name, quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [data.pepite_id, data.cookie_name, data.quantity, data.price]);
  return rows;
}

export async function deleteCookie(id: string): Promise<Cookie[]> {
  const { rows } = await pool.query(`
    DELETE FROM cookies
    WHERE id = $1
    RETURNING *;
  `, [id]);

  return rows;
}

export async function updateCookie(id: string, data: Partial<Cookie>): Promise<Cookie[]> {
  const { rows } = await pool.query(`
    UPDATE cookies
    SET pepite_id = $2, cookie_name = $3, quantity = $4, price = $5
    WHERE id = $1
    RETURNING *;
  `, [id, data.pepite_id, data.cookie_name, data.quantity, data.price]);

  return rows;
}
