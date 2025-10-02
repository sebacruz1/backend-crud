import { pool } from "../src/db";
import fs from "fs";
import path from "path";

export async function resetDb() {

  const schemaPath = path.resolve(__dirname, "../db/init/schema.sql");
  const seedsPath = path.resolve(__dirname, "../db/init/seeds.sql");

  const schemaSql = fs.readFileSync(schemaPath, "utf8");
  const seedsSql = fs.readFileSync(seedsPath, "utf8");

  try {
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");

    await pool.query("DROP TABLE IF EXISTS persona_empresa");
    await pool.query("DROP TABLE IF EXISTS persona");
    await pool.query("DROP TABLE IF EXISTS empresa");

    await pool.query("SET FOREIGN_KEY_CHECKS = 1");

    await pool.query(schemaSql);

    await pool.query(seedsSql);
  } catch (err) {
    console.error("Error reseteando DB:", err);
    throw err;
  }
}
