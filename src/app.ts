import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { ping } from "./db";
import { config } from "./config";
import { requestId } from "./middlewares/resquestId";

import personaRouter from "./routes/persona";
import empresaRouter from "./routes/empresa";
import personaEmpresaRouter from "./routes/persona-empresa";

export const app = express();

app.use(requestId);
app.use(helmet(config.helmet));
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    const ok = await ping();
    res.json({ status: "ok", db: ok});
  } catch (e: any) {
    res.status(500).json({ status: "error", error: e?.message ?? "DB error" });
  }
});

app.use("/api/persona", personaRouter);
app.use("/api/empresa", empresaRouter);
app.use("/api/persona-empresa", personaEmpresaRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}`, requestId: req.id });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[ERROR]", err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error", requestId: req.id });
});
