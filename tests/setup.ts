import { pool } from "../src/db";
import fs from "fs";
import path from "path";

export async function resetDb() {
  const seedsPath = path.resolve(__dirname, "../db/init/seeds.sql");
  const seedsSql = fs.readFileSync(seedsPath, "utf8");

  try {
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");
    await pool.query("TRUNCATE TABLE persona_empresa");
    await pool.query("TRUNCATE TABLE persona");
    await pool.query("TRUNCATE TABLE empresa");
    await pool.query("SET FOREIGN_KEY_CHECKS = 1");

    await pool.query(seedsSql);
  } catch (err) {
    console.error(" Error reseteando DB:", err);
    throw err;
  }
}
