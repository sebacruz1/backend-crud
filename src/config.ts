import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),

  db: {
    url: process.env.DATABASE_URL,
  },

  corsOrigin:
    process.env.NODE_ENV === "production"
      ? []
      : "*",

  helmet: {
    contentSecurityPolicy:
      process.env.NODE_ENV === "production"
        ? undefined
        : false,
  },
};
