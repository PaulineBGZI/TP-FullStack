import { Router } from "express";
import { getAllPepites } from "../repositories/pepites.js";

const router = Router();

// GET /pepites
router.get("/", async (_req, res) => {
  try {
    const pepites = await getAllPepites();
    console.log(pepites);
    res.json(pepites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch pepites" });
  }
});

export default router;