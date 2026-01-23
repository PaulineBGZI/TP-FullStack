import { Router } from 'express';
import {
  getAllCookies,
  getCookie,
  deleteCookie,
  updateCookie,
  createCookie
} from "../repositories/cookies.js";

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

// GET /cookies/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cookies = await getCookie(id);
    if (cookies.length === 0) {
      return res.status(404).json({ error: "Cookie not found" });
    }
    res.json(cookies[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cookie" });
  }
});

// POST /cookies
router.post("/", async (req, res) => {
  const { pepite_id, cookie_name, quantity, price } = req.body;  
  try {
    const newCookie = await createCookie({ pepite_id, cookie_name, quantity, price });
    res.status(201).json(newCookie[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create cookie" });
  }
});

// PUT /cookies/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { pepite_id, cookie_name, quantity, price } = req.body;
  try {
    const updatedCookie = await updateCookie(id, { pepite_id, cookie_name, quantity, price });
    if (updatedCookie.length === 0) {
      return res.status(404).json({ error: "Cookie not found" });
    }
    res.json(updatedCookie[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update cookie" });
  }
});

// DELETE /cookies/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCookie = await deleteCookie(id);
    if (deletedCookie.length === 0) {
      return res.status(404).json({ error: "Cookie not found" });
    }
    res.json(deletedCookie[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete cookie" });
  }
});

export default router;
