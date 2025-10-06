import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../db";
import { parseListParams } from "../utils/paginacion";
import { normalizarRut } from "../utils/rut";

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

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderBy, dir, limit, offset } = parseListParams(req.query, {
      allowedSort: {
        nombre: "e.nombre",
        rut: "e.rut",
        fecha_creacion: "e.fecha_creacion",
      },
      defaultSort: "fecha_creacion",
      defaultDir: "DESC",
      maxLimit: 100,
      defaultLimit: 20,
    });

    const sql = `
      SELECT BIN_TO_UUID(e.id,1) AS id,
      e.nombre,
      e.rut,
      e.direccion,
      e.celular,
      e.email,
      e.fecha_creacion,
      e.actualizacion
      FROM empresa e
      ORDER BY ${orderBy} ${dir}
      LIMIT ${limit} OFFSET ${offset}
    `;

    const [rows] = await pool.execute(sql, [limit, offset]);
    res.json({ data: rows, pagination: { limit, offset }, sort: { orderBy, dir } });
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
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

    let rutNorm: string;
    try {
      rutNorm = normalizarRut(data.rut);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "RUT inválido";
      return res.status(400).json({ error: msg });
    }

    await pool.execute(
      `INSERT INTO empresa (nombre, rut, direccion, celular, email)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.nombre,
        rutNorm,
        data.direccion ?? null,
        data.celular ?? null,
        data.email ?? null,
      ]
    );

    const [rows] = await pool.execute(
      `SELECT BIN_TO_UUID(id,1) AS id, nombre, rut, direccion, celular, email,
              fecha_creacion, actualizacion
       FROM empresa
       WHERE rut = ?
       ORDER BY fecha_creacion DESC
       LIMIT 1`,
      [rutNorm]
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

    let rutNorm: string | null = null;
    if (data.rut) {
      try {
        rutNorm = normalizarRut(data.rut);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "RUT inválido";
        return res.status(400).json({ error: msg });
      }
    }

    const [result]: any = await pool.execute(
      `UPDATE empresa SET
         nombre = COALESCE(?, nombre),
         rut = COALESCE(?, rut),
         direccion = COALESCE(?, direccion),
         celular = COALESCE(?, celular),
         email = COALESCE(?, email)
       WHERE id = UUID_TO_BIN(?,1)`,
      [
        data.nombre ?? null,
        rutNorm ?? null,
        data.direccion ?? null,
        data.celular ?? null,
        data.email ?? null,
        req.params.id,
      ]
    );

    if (!result || result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });

    const [rows] = await pool.execute(
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
    const [result]: any = await pool.execute(
      `DELETE FROM empresa WHERE id = UUID_TO_BIN(?,1)`,
      [req.params.id]
    );
    if (!result || result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
    res.status(204).end();
  } catch (e) { next(e); }
});

export default router;
