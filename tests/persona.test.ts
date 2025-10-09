import request from "supertest";
import { app } from "../src/app";
import { pool } from "../src/db";

let createdId: string;

afterAll(async () => {
  await pool.end();
});

it("GET /api/persona -> devuelve lista paginada con estructura esperada", async () => {
  const res = await request(app).get("/api/persona");

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("data");
  expect(Array.isArray(res.body.data)).toBe(true);
  expect(res.body).toHaveProperty("pagination");
  expect(res.body.pagination).toHaveProperty("limit");
  expect(res.body.pagination).toHaveProperty("offset");
  expect(res.body).toHaveProperty("sort");
});


it("GET /api/persona?orderBy=nombre&dir=ASC -> ordena correctamente", async () => {
  const res = await request(app).get("/api/persona?orderBy=nombre&dir=ASC");

  expect(res.status).toBe(200);
  const nombres = res.body.data.map((p: any) => p.nombre);
  const sorted = [...nombres].sort();
  expect(nombres).toEqual(sorted);
});

it("GET /api/persona?limit=2&offset=1 -> aplica paginación", async () => {
  const res = await request(app).get("/api/persona?limit=2&offset=1");

  expect(res.status).toBe(200);
  expect(res.body.data.length).toBeLessThanOrEqual(2);
  expect(res.body.pagination.limit).toBe(2);
  expect(res.body.pagination.offset).toBe(1);
});

it("POST /api/persona -> crea", async () => {
  const payload = {
    nombre: "Test",
    apellidos: "Usuario",
    rut: "99.999.999-9",
    celular: "555555555",
    direccion: "Providencia",
    fecha_nacimiento: "2025-01-01",
    email: `test.user@example.com`
  };
  const res = await request(app).post("/api/persona").send(payload);
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

it("GET /api/persona?nombre=test -> Busca el nombre test", async () =>{
  const res = await request(app).get("/api/persona?nombre=test");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.data)).toBe(true);

  const hasName = res.body.data.some((p: any) =>
    p.nombre.toLowerCase().includes("test")
   );
   expect(hasName).toBe(true);
});

it("GET /api/persona?apellidos=usuario-> Busca apellido usuario", async () =>{
   const res = await request(app).get("/api/persona?apellidos=usuario");
   expect(res.status).toBe(200);
   expect(Array.isArray(res.body.data)).toBe(true);

   const hasLastName = res.body.data.some((p: any) =>
     p.apellidos.toLowerCase().includes("usuario") && p.nombre === "Test"
    );
    expect(hasLastName).toBe(true);

});

it("GET /api/persona?rut=99999999-> Busca por rut", async () =>{
   const res = await request(app).get("/api/persona?rut=99999999");
   expect(res.status).toBe(200);
   expect(Array.isArray(res.body.data)).toBe(true);

   const hasRut = res.body.data.some((p: any) =>
     p.rut.includes("99999999") && p.nombre === "Test"
    );
    expect(hasRut).toBe(true);

});

it("GET /api/persona?email=@example.com -> Busca por email", async () =>{
  const res = await request(app).get("/api/persona?email=@example.com");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.data)).toBe(true);
  const hasEmail = res.body.data.some((p: any) =>
    p.email.includes("@example.com") && p.nombre === "Test"
  );
  expect(hasEmail).toBe(true);

});

it("GET /api/persona?celular=555555555 -> Busca por celular", async () =>{
  const res = await request(app).get("/api/persona?celular=555555555");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.data)).toBe(true);

  const hasCelular = res.body.data.some((p: any) =>
    p.celular.includes("555555555") && p.nombre === "Test"
  );

  expect(hasCelular).toBe(true);

});

it("GET /api/persona?direccion=providencia -> Busca por direccion", async () =>{
  const res = await request(app).get("/api/persona?direccion=providencia");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.data)).toBe(true);

  const hasDireccion = res.body.data.some((p: any) =>
    p.direccion.toLowerCase().includes("providencia") && p.nombre === "Test"
  );

  expect(hasDireccion).toBe(true);

});

it("PUT /api/persona/:id -> actualiza", async () => {
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
