import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../db";
import { normalizarRut } from "../utils/rut";

const router = Router();

const personaCrear = z.object({
  nombre: z.string().min(1),
  apellidos: z.string().min(1),
  rut: z.string().min(3),
  direccion: z.string().optional(),
  celular: z.string().optional(),
  email: z.string().email().optional(),
  fecha_nacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const personaActualizar = personaCrear.partial();

const isDup = (e: any) => e?.code === "ER_DUP_ENTRY" || e?.errno === 1062;

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows] = await pool.execute(
      `SELECT BIN_TO_UUID(id,1) AS id, nombre, apellidos, rut, direccion, celular, email,
              fecha_nacimiento, fecha_creacion, actualizacion
       FROM persona
       ORDER BY fecha_creacion DESC`
    );
    res.json(rows);
  } catch (e) { next(e); }
});

router.get("/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const [rows] = await pool.execute(
      `SELECT BIN_TO_UUID(id,1) AS id, nombre, apellidos, rut, direccion, celular, email,
              fecha_nacimiento, fecha_creacion, actualizacion
       FROM persona
       WHERE id = UUID_TO_BIN(?,1)`,
      [req.params.id]
    );
    const arr = rows as any[];
    if (!arr[0]) return res.status(404).json({ error: "No encontrado" });
    res.json(arr[0]);
  } catch (e) { next(e); }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = personaCrear.parse(req.body);

    await pool.execute(
      `INSERT INTO persona (nombre, apellidos, rut, direccion, celular, email, fecha_nacimiento)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.nombre,
        data.apellidos,
        data.rut,
        data.direccion ?? null,
        data.celular ?? null,
        data.email ?? null,
        data.fecha_nacimiento,
      ]
    );

    const [rows] = await pool.execute(
      `SELECT BIN_TO_UUID(id,1) AS id, nombre, apellidos, rut, direccion, celular, email,
              fecha_nacimiento, fecha_creacion, actualizacion
       FROM persona
       WHERE rut = ?
       ORDER BY fecha_creacion DESC
       LIMIT 1`,
      [data.rut]
    );
    const arr = rows as any[];
    res.status(201).json(arr[0]);
  } catch (e: any) {
    if (isDup(e)) return res.status(409).json({ error: "Duplicado (rut/email/celular)" });
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.flatten() });
    next(e);
  }
});

router.put("/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const data = personaActualizar.parse(req.body);

    const [result]: any = await pool.execute(
      `UPDATE persona SET
         nombre = COALESCE(?, nombre),
         apellidos = COALESCE(?, apellidos),
         rut = COALESCE(?, rut),
         direccion = COALESCE(?, direccion),
         celular = COALESCE(?, celular),
         email = COALESCE(?, email),
         fecha_nacimiento = COALESCE(?, fecha_nacimiento)
       WHERE id = UUID_TO_BIN(?,1)`,
      [
        data.nombre ?? null,
        data.apellidos ?? null,
        data.rut ?? null,
        data.direccion ?? null,
        data.celular ?? null,
        data.email ?? null,
        data.fecha_nacimiento ?? null,
        req.params.id,
      ]
    );

    if (!result || result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });

    const [rows] = await pool.execute(
      `SELECT BIN_TO_UUID(id,1) AS id, nombre, apellidos, rut, direccion, celular, email,
              fecha_nacimiento, fecha_creacion, actualizacion
       FROM persona
       WHERE id = UUID_TO_BIN(?,1)
       LIMIT 1`,
      [req.params.id]
    );
    const arr = rows as any[];
    res.json(arr[0]);
  } catch (e: any) {
    if (isDup(e)) return res.status(409).json({ error: "Duplicado (rut/email/celular)" });
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.flatten() });
    next(e);
  }
});

router.delete("/:id", async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const [result]: any = await pool.execute(
      `DELETE FROM persona WHERE id = UUID_TO_BIN(?,1)`,
      [req.params.id]
    );
    if (!result || result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });

    res.status(204).end();
  } catch (e) { next(e); }
});

router.get("/:id/empresas", async (req, res, next) => {
  try {
    const personaId = req.params.id;

    const actual = typeof req.query.actual === "string" ? req.query.actual : undefined;
    const whereExtra =
      actual === "true"  ? "AND pe.es_actual = 1" :
      actual === "false" ? "AND pe.es_actual = 0" : "";

    const limit  = Math.min(parseInt(String(req.query.limit  ?? "20"), 10), 100);
    const offset = Math.max(parseInt(String(req.query.offset ?? "0"), 10), 0);

    const sql = `
      SELECT
        BIN_TO_UUID(pe.id,1)   AS relacion_id,
        BIN_TO_UUID(e.id,1)    AS empresa_id,
        e.nombre               AS empresa,
        pe.cargo, pe.area,
        pe.fecha_inicio, pe.fecha_fin, pe.es_actual
      FROM persona_empresa pe
      JOIN empresa e ON e.id = pe.empresa_id
      WHERE pe.persona_id = UUID_TO_BIN(?,1)
        ${whereExtra}
      ORDER BY pe.es_actual DESC, pe.fecha_inicio DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const [rows] = await pool.execute(sql, [personaId]);
    res.json({ data: rows, limit, offset });
  } catch (e) {
    next(e);
  }
});
export default router;
