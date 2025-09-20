import { Router, Request, Response, NextFunction  } from "express";
import { pool } from "../db";
import { z } from "zod";

const router = Router();

const personaCrear = z.object({
  nombre: z.string().min(1),
  apellido: z.string().min(1),
  rut: z.string().min(3),
  direccion: z.string().optional(),
  celular: z.string().optional(),
  email: z.string().email().optional(),
  fecha_nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const personaActualizar = personaCrear.partial();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await pool.query("SELECT * FROM persona ORDER BY fecha_creacion DESC");
    res.json(rows);
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM persona WHERE id = $1", [req.params.id ])
    if (!rows[0]) return res.status(404).json({ error: "No Encontrado" });
    res.json(rows[0]);
  } catch (e) { next(e); }
});


router.post("/", async (req, res, next) => {
  try {
    const data = personaCrear.parse(req.body);
    const q = `
      INSERT INTO persona (nombre, apellidos, rut, direccion, celular, email, fecha_nacimiento)
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
      const vals = [
        data.nombre, data.apellidos, data.rut, data.direccion ?? null, data.celular ?? null, data.email ?? null, data.fecha_nacimiento,
      ];
      const { rows } = await pool.query(q, vals);
      res.status(201).json(rows[0]);
  } catch (e: any) {
    if (e.code === "23505") return res.status(409).json({ error: "Duplicado (rut/email/celular)" });
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.flatten() });
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const data = PersonaUpdate.parse(req.body);
    const q = `
      UPDATE persona SET
        nombre = COALESCE($1, nombre),
        apellidos = COALESCE($2, apellidos),
        rut = COALESCE($3, rut),
        direccion = COALESCE($4, direccion),
        celular = COALESCE($5, celular),
        email = COALESCE($6, email),
        fecha_nacimiento = COALESCE($7, fecha_nacimiento)
      WHERE id = $8
      RETURNING *`;
    const vals = [
      data.nombre ?? null, data.apellidos ?? null, data.rut ?? null,
      data.direccion ?? null, data.celular ?? null, data.email ?? null,
      data.fecha_nacimiento ?? null, req.params.id,
    ];
    const { rows } = await pool.query(q, vals);
    if (!rows[0]) return res.status(404).json({ error: "No encontrado" });
    res.json(rows[0]);
  } catch (e: any) {
    if (e.code === "23505") return res.status(409).json({ error: "Duplicado (rut/email/celular)" });
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.flatten() });
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM persona WHERE id = $1", [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: "No encontrado" });
    res.status(204).end();
  } catch (e) { next(e); }
});

export default router;
