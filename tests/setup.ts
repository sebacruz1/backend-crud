import { pool } from "../src/db";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

export async function resetDb() {
  const seedsPath = path.resolve(__dirname, "../db/init/seeds.sql");
  const seedsSql = fs.readFileSync(seedsPath, "utf8");

  try {
    // 1) Deja las tablas vacías (más rápido que recrear schema)
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");
    await pool.query("TRUNCATE TABLE persona_empresa");
    await pool.query("TRUNCATE TABLE persona");
    await pool.query("TRUNCATE TABLE empresa");
    await pool.query("SET FOREIGN_KEY_CHECKS = 1");

    // 2) Usa una conexión AD-HOC que permita múltiples sentencias para cargar seeds
    const conn = await mysql.createConnection({
      uri: process.env.DATABASE_URL,     // p.ej. mysql://root:root@127.0.0.1:3306/crud_test
      multipleStatements: true,
    });
    try {
      await conn.query(seedsSql);
    } finally {
      await conn.end();
    }
  } catch (err) {
    console.error("❌ Error reseteando DB:", err);
    throw err;
  }
}
