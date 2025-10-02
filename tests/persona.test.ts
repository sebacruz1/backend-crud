import request from "supertest";
import { app } from "../src/app";
import { pool } from "../src/db";
import { resetDb } from "./setup";

let createdId: string;

beforeAll(async () => {
  await resetDb();
});

afterAll(async () => {
  await pool.end();
});

it("GET /api/persona -> lista", async () => {
  const res = await request(app).get("/api/persona");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

it("POST /api/persona -> crea", async () => {
  const payload = {
    nombre: "Test",
    apellidos: "Usuario",
    rut: "99.999.999-9",
    fecha_nacimiento: "2025-01-01",
    email: "test.user@example.com"

  };
  const res = await request(app).post("/api/persona/").send(payload);
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("id");
  createdId = res.body.id;
});

it("GET /api/persona/:id -> obtiene creada", async () => {
  const res = await request(app).get(`/api/persona/${createdId}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("id", createdId);
  expect(res.body).toHaveProperty("nombre");
});

it("GET /api/persona/:id -> actualiza", async () => {
  const res = await request(app).put(`/api/persona/${createdId}`).send({
    direccion: "Santiago",
  });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("direccion", "Santiago");
});

it("DELETE /api/persona/:id -> elimina", async () => {
  const res = await request(app).delete(`/api/persona/${createdId}`);
  expect(res.status).toBe(204);
});

it("GET /api/persona/:id (eliminado) -> 404", async () => {
  const res = await request(app).get(`/api/persona/${createdId}`);
  expect(res.status).toBe(404);
});
