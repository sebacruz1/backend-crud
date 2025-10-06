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

it("GET /api/empresa -> lista con estructura esperada", async () => {
  const res = await request(app).get("/api/empresa");
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("data");
  expect(Array.isArray(res.body.data)).toBe(true);
  expect(res.body).toHaveProperty("pagination");
  expect(res.body.pagination).toHaveProperty("limit");
  expect(res.body.pagination).toHaveProperty("offset");
  expect(res.body).toHaveProperty("sort");
});

it("POST /api/empresa -> crea", async () => {
  const payload = {
    nombre: "Empresa Test",
    rut: "88.888.888-8",
    direccion: "Santiago",
    celular: "+56 9 8888 8888",
    email: "empresa.test@example.com",
  };
  const res = await request(app).post("/api/empresa").send(payload);
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("id");
  createdId = res.body.id;
});

it("GET /api/empresa/:id -> obtiene creada", async () => {
  const res = await request(app).get(`/api/empresa/${createdId}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("id", createdId);
  expect(res.body).toHaveProperty("nombre", "Empresa Test");
});

it("PUT /api/empresa/:id -> actualiza", async () => {
  const res = await request(app).put(`/api/empresa/${createdId}`).send({
    direccion: "Providencia"
  });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("direccion", "Providencia");
});

it("DELETE /api/empresa/:id -> elimina", async () => {
  const res = await request(app).delete(`/api/empresa/${createdId}`);
  expect(res.status).toBe(204);
});

it("GET /api/empresa/:id (eliminada) -> 404", async () => {
  const res = await request(app).get(`/api/empresa/${createdId}`);
  expect(res.status).toBe(404);
});
