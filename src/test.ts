import { ping } from "./db";

(async () => {
  try {
    const ok = await ping();
    console.log("DB conectada:", ok);
    process.exit(0);
  } catch (err) {
    console.error("Error conectando a la DB:", err);
    process.exit(1);
  }
})();
