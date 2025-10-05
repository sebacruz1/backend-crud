# Backend CRUD API

![TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178c6.svg?logo=typescript)
![Express](https://img.shields.io/badge/Framework-Express.js-000000.svg?logo=express)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1.svg?logo=mysql)
![Build](https://github.com/sebacruz1/backend-crud/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

API RESTful para la gestión de **personas**, **empresas** y sus **relaciones laborales**, construida con **Node.js**, **Express**, **TypeScript**, y **MySQL**.
El proyecto incluye validaciones con **Zod**, tests automáticos con **Vitest + Supertest**, y configuración lista para **Docker** y **CI/CD en GitHub Actions**.

---

## Características principales

- CRUD completo para:
  - Personas
  - Empresas
  - Relaciones Persona–Empresa
- Validación de datos con **Zod**
- Consultas seguras con **prepared statements** (evita SQL Injection)
- Tests automáticos con **Vitest + Supertest**
- Base de datos **MySQL** con UUID binarios (`UUID_TO_BIN` / `BIN_TO_UUID`)
- Soporte para **Docker Compose** (backend + base de datos)
- **CI/CD** con GitHub Actions (lint, typecheck, build y tests)

---
## Estructura del proyecto backend-crud
```bash
backend-crud/
├── src/
│   ├── app.ts               # Configuración principal de Express
│   ├── server.ts            # Punto de entrada del servidor
│   ├── db.ts                # Conexión MySQL (pool)
│   ├── routes/
│   │   ├── persona.ts       # CRUD Personas
│   │   ├── empresa.ts       # CRUD Empresas
│   │   └── persona-empresa.ts # Relaciones Persona–Empresa
│   └── utils/               # Helpers y validadores
│
├── db/
│   ├── init/
│   │   ├── schema.sql       # Estructura de tablas
│   │   └── seeds.sql        # Datos iniciales
│
├── tests/
│   ├── persona.test.ts
│   ├── empresa.test.ts
│   ├── relacion.test.ts
│   └── setup.ts             # resetDb() para tests limpios
│
├── .github/workflows/ci.yml # CI/CD: lint, build, test
├── Dockerfile               # Imagen del backend
├── docker-compose.yml       # Backend + MySQL
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```
---

## Configuración del entorno

Crea un archivo `.env` en la raíz con las variables:

```bash
# Entorno local (npm run dev)
NODE_ENV=development
PORT=3000
DATABASE_URL=mysql://root:root@127.0.0.1:3306/crud

# Docker (usado por docker-compose)
Reemplaza tus creedenciales en el .env.example y cambiale el nombre a .env

## Uso con Docker

1. Construye e inicia los servicios:
```bash
   docker compose up -d --build
```
2. Accede a la API:
```bash
    http://localhost:3000/api/persona
```
3. Base de datos
```bash
    Host: 127.0.0.1
    Port: 3306
    User: root
    Password: root
    Database: crud
```

## Uso en entorno local (sin Docker)

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

3. Asegúrate de tener una instancia MySQL corriendo localmente.

4. Importa el esquema y los datos iniciales:

   ```bash
   mysql -u root -p crud < db/init/schema.sql
   mysql -u root -p crud < db/init/seeds.sql
   ```

---

## Tests automatizados

Ejecuta todos los tests con Vitest:

```bash
npm test
```

También puedes correrlos en modo observación:

```bash
npm run test:watch
```

Los tests se ejecutan automáticamente en cada push o pull request a través de **GitHub Actions**.

---

## CI/CD con GitHub Actions

El workflow (`.github/workflows/ci.yml`) ejecuta los siguientes pasos:

1. Levanta un contenedor MySQL.
2. Instala dependencias y genera la base de datos de prueba.
3. Ejecuta lint, typecheck, build y tests.

---

## Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/persona` | Lista todas las personas |
| POST | `/api/persona` | Crea una nueva persona |
| GET | `/api/persona/:id` | Obtiene una persona específica |
| PUT | `/api/persona/:id` | Actualiza una persona |
| DELETE | `/api/persona/:id` | Elimina una persona |
| GET | `/api/persona/:id/empresas` | Lista empleos actuales y pasados |
| POST | `/api/empresa` | Crea una empresa |
| GET | `/api/empresa` | Lista empresas |
| POST | `/api/persona-empresa` | Crea relación persona-empresa |
| DELETE | `/api/persona-empresa/:id` | Elimina relación persona-empresa |

---

## Linter y Tipos

Verifica el código con ESLint y TypeScript:

```bash
npm run lint
npm run typecheck
```

---

## Autor

**Sebastián Cruz**
Proyecto personal con fines de aprendizaje sobre desarrollo backend moderno.

---

## Licencia

Este proyecto se distribuye bajo la licencia [MIT](./LICENSE).

