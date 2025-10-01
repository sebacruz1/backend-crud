import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function ping() {
  const [rows] = await pool.query("SELECT 1 + 1 AS result");
  return rows[0].result === 2;
}
