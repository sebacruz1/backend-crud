import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { pool } from "../db";
import { normalizarRut } from "../utils/rut";
import { parseListParams } from "../utils/paginacion";

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

router.get("/", async (req, res, next) => {
  try {
    const { orderBy, dir, limit, offset } = parseListParams(req.query, {
      allowedSort: {
        nombre: "p.nombre",
        apellidos: "p.apellidos",
        rut: "p.rut",
        fecha_creacion: "p.fecha_creacion",
      },
      defaultSort: "fecha_creacion",
      defaultDir: "DESC",
      maxLimit: 100,
      defaultLimit: 20,
    });

    const filters = {
      nombre: (req.query.nombre as string | undefined)?.trim(),
      apellidos: (req.query.apellidos as string | undefined)?.trim(),
      rut: (req.query.rut as string | undefined)?.trim(),
      email: (req.query.email as string | undefined)?.trim(),
      celular: (req.query.celular as string | undefined)?.trim(),
      direccion: (req.query.direccion as string | undefined)?.trim(),
    };

    const where: string[] = [];
    const params: any[] = [];
    for (const [key, val] of Object.entries(filters)) {
      if (!val) continue;
      where.push(`p.${key} LIKE ?`);
      params.push(`%${val}%`);
    }
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const sql = `
      SELECT
        BIN_TO_UUID(p.id,1) AS id,
        p.nombre, p.apellidos, p.rut, p.direccion,
        p.celular, p.email, p.fecha_nacimiento,
        p.fecha_creacion, p.actualizacion,
        COUNT(pe.id)                           AS empleos_totales,
        MAX(pe.es_actual = 1)                  AS tiene_trabajo_actual
      FROM persona p
      LEFT JOIN persona_empresa pe
        ON pe.persona_id = p.id
      ${whereSql}
      GROUP BY p.id
      ORDER BY ${orderBy} ${dir}
      LIMIT ? OFFSET ?;
    `;

    params.push(limit, offset);

    const [rows] = await pool.query(sql, params);
    res.json({ data: rows, pagination: { limit, offset }, sort: { orderBy, dir }, filters });
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

    let rutNorm: string;
    try {
      rutNorm = normalizarRut(data.rut);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "RUT inválido";
      return res.status(400).json({ error: msg });
    }

    await pool.execute(
      `INSERT INTO persona (nombre, apellidos, rut, direccion, celular, email, fecha_nacimiento)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.nombre,
        data.apellidos,
        rutNorm,
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
      [rutNorm]
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
        rutNorm ?? null,
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
        BIN_TO_UUID(p.id,1)    AS persona_id,
        p.nombre               AS persona_nombre,
        p.apellidos            AS persona_apellidos,
        pe.cargo, pe.area,
        pe.fecha_inicio, pe.fecha_fin, pe.es_actual
      FROM persona_empresa pe
      JOIN persona p ON p.id = pe.persona_id
      JOIN empresa e ON e.id = pe.empresa_id
      WHERE pe.persona_id = UUID_TO_BIN(?,1)
        ${whereExtra}
      ORDER BY pe.es_actual DESC, pe.fecha_inicio DESC
      LIMIT ?, ?
    `;
    const params = [personaId, offset, limit];
    const [rows] = await pool.query(sql, params);
    res.json({ data: rows, limit, offset });
  } catch (e) { next(e); }
});

export default router;
