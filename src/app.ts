// src/app.ts
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { ping } from "./db.js"; // o "./db" si usas CJS
import personaRouter from "./routes/persona.js";
import empresaRouter from "./routes/empresa.js";
import personaEmpresaRouter from "./routes/persona-empresa.js";

export const app = express();

app.use(cors());
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
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}` });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[ERROR]", err);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});
