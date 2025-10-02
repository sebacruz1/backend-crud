import mysql, { RowDataPacket } from "mysql2/promise";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("Falta DATABASE_URL en .env");
}

export const pool = mysql.createPool(process.env.DATABASE_URL);

// fila tipada para el ping
interface PingRow extends RowDataPacket {
  result: number;
}

export async function ping(): Promise<boolean> {
  const [rows] = await pool.query<PingRow[]>("SELECT 1 + 1 AS result");
  return rows[0]?.result === 2;
}
