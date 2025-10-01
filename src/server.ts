import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";

import { ping } from "./db";
import personaRouter from "./routes/persona";
import empresaRouter from "./routes/empresa";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (_req: Request, res: Response) => {
  try {
    const dbOk = await ping();
    res.json({ status: "ok", db: dbOk });
  } catch (err: any) {
    res.status(500).json({ status: "error", error: err?.message ?? "DB error" });
  }
});

app.use("/api/persona", personaRouter);
app.use("/api/empresa", empresaRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}` });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[ERROR]", err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      details: err.details || null,
    },
  });
});

const PORT = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, () => {
  console.log(` API escuchando en http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("\nApagando servidor...");
  server.close(() => {
    console.log("Servidor cerrado. ¡Chao!");
    process.exit(0);
  });
});
