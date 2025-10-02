import { app } from "./app";
import { pool } from "./db";

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
  console.log(` API escuchando en http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("\n  Apagando servidor...");
  server.close(async () => {
    try { await pool.end(); } catch (e) { console.error("Error cerrando pool:", e); }
    console.log("Servidor cerrado."); process.exit(0);
  });
});
