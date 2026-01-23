import { Router } from 'express';
import pool from '../db.js';
import { getAllCookies } from "../repositories/cookies.js";

const router = Router();

// GET /cookies
router.get("/", async (_req, res) => {
  try {
    const cookies = await getAllCookies();
    console.log(cookies);
    res.json(cookies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cookies" });
  }
});

// GET /cookies/pepite/:id
router.get('/pepite/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT * FROM cookies WHERE pepite_id = $1`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
