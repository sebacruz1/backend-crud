import request from "supertest";
import { app } from "../src/app";
import { pool } from "../src/db";

let personaId: string;
let empresaActualId: string;
let empresaPasadaId: string;
let relacionActualId: string;
let relacionPasadaId: string;

afterAll(async () => {
  await pool.end();
});

it("Crea persona con una empresa actual y una pasada", async () => {
  const u = Date.now();

  const p = await request(app).post("/api/persona").send({
    nombre: "Gothen",
    apellidos: "Cruz",
    rut: `90324237-1`,
    fecha_nacimiento: "2015-04-03",
    email: `gothen@example.com`,
  });
  expect(p.status, JSON.stringify(p.body)).toBe(201);
  personaId = p.body.id;

  const e1 = await request(app).post("/api/empresa").send({
    nombre: `Tech1`,
    rut: `78456123-0`,
    direccion: "Las Condes",
    email: `contacto${u}@tech1.cl`,
  });
  expect(e1.status, JSON.stringify(e1.body)).toBe(201);
  empresaActualId = e1.body.id;

  const e2 = await request(app).post("/api/empresa").send({
    nombre: "InnovaCorp1",
    rut: `79654321-2`,
    direccion: "Ñuñoa",
    email: `info${u}@innovacorp1.cl`,
  });
  expect(e2.status, JSON.stringify(e2.body)).toBe(201);
  empresaPasadaId = e2.body.id;
});

it("POST /api/persona-empresa -> Crea relacion actual", async () => {
  const r = await request(app).post("/api/persona-empresa").send({
    persona_id: personaId,
    empresa_id: empresaActualId,
    cargo: "Dev Senior",
    area: "Desarrollo",
    fecha_inicio: "2024-06-01",
    es_actual: true,
  });
  expect(r.status, JSON.stringify(r.body)).toBe(201);
  expect(r.body).toHaveProperty("id");
  expect(r.body.es_actual === 1 || r.body.es_actual === true).toBe(true);
  expect(r.body.fecha_fin).toBe(null);
  relacionActualId = r.body.id;
});

it("POST /api/persona-empresa -> Crea relacion pasada", async () => {
  const r = await request(app).post("/api/persona-empresa").send({
    persona_id: personaId,
    empresa_id: empresaPasadaId,
    cargo: "Dev Junior",
    area: "IT",
    fecha_inicio: "2004-01-09",
    fecha_fin: "2009-02-02",
    es_actual: false,
  });
  expect(r.status, JSON.stringify(r.body)).toBe(201);
  expect(r.body).toHaveProperty("id");
  expect(r.body.es_actual === 0 || r.body.es_actual === false).toBe(true);
  expect(r.body.fecha_fin).not.toBe(null);
  relacionPasadaId = r.body.id;
});

it("GET /api/persona/:id/empresas -> lista trabajos (actual + pasado)", async () => {
  const r = await request(app).get(`/api/persona/${personaId}/empresas`);
  expect(r.status).toBe(200);
  expect(Array.isArray(r.body.data)).toBe(true);
  expect(r.body.data.length).toBeGreaterThanOrEqual(2);
});

it("GET /api/persona/:id/empresas?actual=true -> solo el actual", async () => {
  const r = await request(app).get(`/api/persona/${personaId}/empresas?actual=true`);
  expect(r.status).toBe(200);
  expect(Array.isArray(r.body.data)).toBe(true);
  for (const it of r.body.data) {
    expect(it.es_actual === 1 || it.es_actual === true).toBe(true);
  }
});

it("DELETE /api/persona-empresa/:id -> elimina relación pasada", async () => {
  const r = await request(app).delete(`/api/persona-empresa/${relacionPasadaId}`);
  expect(r.status).toBe(204);
});

it("GET /api/persona/:id/empresas -> ahora debe quedar al menos la actual", async () => {
  const r = await request(app).get(`/api/persona/${personaId}/empresas`);
  expect(r.status).toBe(200);
  const hayActual = r.body.data.some((x: any) => x.es_actual === 1 || x.es_actual === true);
  expect(hayActual).toBe(true);
});

it("POST /api/persona-empresa -> 400 en FK inexistente", async () => {
  const bad = await request(app).post("/api/persona-empresa").send({
    persona_id: "11111111-1111-1111-1111-111111111111",
    empresa_id: "22222222-2222-2222-2222-222222222222",
    fecha_inicio: "2024-01-01",
    es_actual: true,
  });
  expect([400, 409]).toContain(bad.status);
});

it("POST /api/persona-empresa -> 400 por validación (fecha inválida)", async () => {
  const bad = await request(app).post("/api/persona-empresa").send({
    persona_id: personaId,
    empresa_id: empresaActualId,
    fecha_inicio: "2024-13-01",
    es_actual: true,
  });
  expect(bad.status).toBe(400);
});
