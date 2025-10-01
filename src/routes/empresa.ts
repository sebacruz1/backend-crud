import { Router, Request, Response, NextFunction } from "express";
import { pool } from "../db";
import { z } from "zod";

const router = Router();

const empresaCrear = z.object({
  nombre: z.string().min(1),
  rut: z.string().min(3),
  direccion: z.string().optional(),
  celular: z.string().optional(),
  email: z.string().email().optional(),
});

const empresaActualizar = empresaCrear.partial();

const isDup = (e: any) => e?.code === "ER_DUP_ENTRY" || e?.errno === 1062;

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows] = await pool.query(
      `SELECT BIN_TO_UUID(id,1) AS id, nombre, rut, direccion, celular, email,
      fecha_creacion, actualizacion
      FROM empresa
      ORDER BY fecha_creacion DESC`
    );
    res.json(rows);
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT BIN_TO_UUID(id,1) AS id, nombre, rut, direccion, celular, email,
              fecha_creacion, actualizacion
       FROM empresa
       WHERE id = UUID_TO_BIN(?,1)`,
      [req.params.id]
    );
    const arr = rows as any[];
    if (!arr[0]) return res.status(404).json({ error: "No encontrado" });
    res.json(arr[0]);
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const data = empresaCrear.parse(req.body);

    await pool.query(
      `INSERT INTO empresa (nombre, rut, direccion, celular, email)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.nombre,
        data.rut,
        data.direccion ?? null,
        data.celular ?? null,
        data.email ?? null,
      ]
    );

    const [rows] = await pool.query(
      `SELECT BIN_TO_UUID(id,1) AS id, nombre, rut, direccion, celular, email,
              fecha_creacion, actualizacion
       FROM empresa
       WHERE rut = ?
       ORDER BY fecha_creacion DESC
       LIMIT 1`,
      [data.rut]
    );
    const arr = rows as any[];
    res.status(201).json(arr[0]);
  } catch (e: any) {
    if (isDup(e)) return res.status(409).json({ error: "Duplicado (rut/email)" });
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.flatten() });
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const data = empresaActualizar.parse(req.body);

    const [result]: any = await pool.query(
      `UPDATE empresa SET
         nombre = COALESCE(?, nombre),
         rut = COALESCE(?, rut),
         direccion = COALESCE(?, direccion),
         celular = COALESCE(?, celular),
         email = COALESCE(?, email)
       WHERE id = UUID_TO_BIN(?,1)`,
      [
        data.nombre ?? null,
        data.rut ?? null,
        data.direccion ?? null,
        data.celular ?? null,
        data.email ?? null,
        req.params.id,
      ]
    );

    if (!result || result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });

    const [rows] = await pool.query(
      `SELECT BIN_TO_UUID(id,1) AS id, nombre, rut, direccion, celular, email,
              fecha_creacion, actualizacion
       FROM empresa
       WHERE id = UUID_TO_BIN(?,1)
       LIMIT 1`,
      [req.params.id]
    );
    const arr = rows as any[];
    res.json(arr[0]);
  } catch (e: any) {
    if (isDup(e)) return res.status(409).json({ error: "Duplicado (rut/email)" });
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.flatten() });
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const [result]: any = await pool.query(
      `DELETE FROM empresa WHERE id = UUID_TO_BIN(?,1)`,
      [req.params.id]
    );
    if (!result || result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
    res.status(204).end();
  } catch (e) { next(e); }
});

export default router;
