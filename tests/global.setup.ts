import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function () {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error(" Falta DATABASE_URL");

  const schemaPath = path.resolve(__dirname, "../db/init/schema.sql");
  const seedsPath  = path.resolve(__dirname, "../db/init/seeds.sql");

  const schemaSql = fs.readFileSync(schemaPath, "utf8");
  const seedsSql  = fs.readFileSync(seedsPath, "utf8");

  const conn = await mysql.createConnection({
    uri: dbUrl,
    multipleStatements: true,
  });

  try {
    console.log("Aplicando schema y seeds en la base de datos de tests...");

    await conn.query("SELECT GET_LOCK('seed_lock', 60)");
    await conn.query("SET FOREIGN_KEY_CHECKS = 0");


    await conn.query(schemaSql);
    await conn.query(seedsSql);

    await conn.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("Schema y seeds aplicados correctamente");
  } catch (err) {
    console.error("Error ejecutando schema/seeds:", err);
    throw err;
  } finally {
    try { await conn.query("DO RELEASE_LOCK('seed_lock')"); } catch {}
    await conn.end();
  }
}
