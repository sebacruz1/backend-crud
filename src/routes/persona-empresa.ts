import { Router, Request, Response, NextFunction } from "express";
import { pool } from "../db";
import { z } from "zod";

const router = Router();

const isValidISODate = (s: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  if (m < 1 || m > 12) return false;
  const maxDay = new Date(y, m, 0).getDate();
  return d >= 1 && d <= maxDay;
};

const ISODate = z
  .string()
  .refine(isValidISODate, "Fecha inválida (YYYY-MM-DD y día/mes reales)");

const peCrear = z.object({
  persona_id: z.string().uuid(),
  empresa_id: z.string().uuid(),
  cargo: z.string().min(1).optional(),
  area: z.string().min(1).optional(),
  fecha_inicio: ISODate,
  fecha_fin: ISODate.nullable().optional(),
  es_actual: z.boolean().default(true),
});

const isFK = (e: any) =>
  e?.code === "ER_NO_REFERENCED_ROW_2" || e?.errno === 1452;

const isBadDate = (e: any) =>
  e?.code === "ER_TRUNCATED_WRONG_VALUE" || e?.errno === 1292;

router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const parsed = peCrear.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const data = parsed.data;
    const fechaFin = data.es_actual ? null : data.fecha_fin ?? null;

    try {
      await pool.execute(
        `INSERT INTO persona_empresa
          (persona_id, empresa_id, cargo, area, fecha_inicio, fecha_fin, es_actual)
         VALUES
          (UUID_TO_BIN(?,1), UUID_TO_BIN(?,1), ?, ?, ?, ?, ?)`,
        [
          data.persona_id,
          data.empresa_id,
          data.cargo ?? null,
          data.area ?? null,
          data.fecha_inicio,
          fechaFin,
          data.es_actual ? 1 : 0,
        ]
      );

      const [rows] = await pool.execute(
        `SELECT
           BIN_TO_UUID(pe.id,1)         AS id,
           BIN_TO_UUID(pe.persona_id,1) AS persona_id,
           BIN_TO_UUID(pe.empresa_id,1) AS empresa_id,
           pe.cargo, pe.area, pe.fecha_inicio, pe.fecha_fin, pe.es_actual,
           pe.fecha_creacion, pe.actualizacion
         FROM persona_empresa pe
         WHERE pe.persona_id = UUID_TO_BIN(?,1)
           AND pe.empresa_id = UUID_TO_BIN(?,1)
         ORDER BY pe.fecha_creacion DESC
         LIMIT 1`,
        [data.persona_id, data.empresa_id]
      );

      res.status(201).json((rows as any[])[0]);
    } catch (e: any) {
      if (isFK(e)) {
        res.status(400).json({ error: "Persona o empresa no existe" });
        return;
      }
      if (isBadDate(e)) {
        res.status(400).json({ error: "Fecha inválida" });
        return;
      }
      next(e);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const [result]: any = await pool.execute(
        `DELETE FROM persona_empresa WHERE id = UUID_TO_BIN(?,1)`,
        [req.params.id]
      );
      if (!result || result.affectedRows === 0) {
        res.status(404).json({ error: "No encontrado" });
        return;
      }
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  }
);

export default router;
