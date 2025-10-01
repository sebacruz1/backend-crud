-- Crear base de datos
CREATE DATABASE IF NOT EXISTS crud
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE crud;

DROP TABLE IF EXISTS persona_empresa;
DROP TABLE IF EXISTS persona;
DROP TABLE IF EXISTS empresa;

CREATE TABLE empresa (
  id              BINARY(16)  NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), 1)),
  nombre          VARCHAR(255) NOT NULL,
  rut             VARCHAR(32)  NOT NULL UNIQUE,
  direccion       VARCHAR(255),
  celular         VARCHAR(64),
  email           VARCHAR(255) UNIQUE,
  fecha_creacion  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizacion   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE persona (
  id               BINARY(16)  NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), 1)),
  nombre           VARCHAR(120) NOT NULL,
  apellidos        VARCHAR(160) NOT NULL,
  rut              VARCHAR(32)  NOT NULL UNIQUE,
  direccion        VARCHAR(255),
  celular          VARCHAR(64) UNIQUE,
  email            VARCHAR(255) UNIQUE,
  fecha_nacimiento DATE NOT NULL,
  fecha_creacion   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizacion    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE persona_empresa (
  id              BINARY(16) NOT NULL PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), 1)),
  persona_id      BINARY(16) NOT NULL,
  empresa_id      BINARY(16) NOT NULL,
  cargo           VARCHAR(120),
  area            VARCHAR(120),
  fecha_inicio    DATE,
  fecha_fin       DATE,
  es_actual       BOOLEAN NOT NULL DEFAULT FALSE,
  fecha_creacion  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizacion   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_pe_persona FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE CASCADE,
  CONSTRAINT fk_pe_empresa FOREIGN KEY (empresa_id) REFERENCES empresa(id) ON DELETE CASCADE,
  CONSTRAINT chk_fechas_pe CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_inicio)
);

-- ===========================
-- Seeds de ejemplo
-- ===========================

-- Empresas
INSERT INTO empresa (id, nombre, rut, direccion, celular, email)
VALUES
  (UUID_TO_BIN(UUID(),1), 'Acme S.A.',       '76.543.210-0', 'Av. Empresa 123, Santiago', '+56 2 2222 1111', 'contacto@acme.com'),
  (UUID_TO_BIN(UUID(),1), 'Tech Chile Ltda', '99.123.456-7', 'Calle Innovación 45, Valpo','+56 2 2222 2222', 'soporte@techchile.com'),
  (UUID_TO_BIN(UUID(),1), 'Logística Sur',   '77.987.654-3', 'Bodega Central 7, Concepción', '+56 2 2222 3333', 'info@logisticasur.com');

-- Personas
INSERT INTO persona (id, nombre, apellidos, rut, direccion, celular, email, fecha_nacimiento)
VALUES
  (UUID_TO_BIN(UUID(),1), 'Ana',     'Pérez',     '12.345.678-9', 'Santiago Centro', '+56 9 9123 0001', 'ana.perez@example.com',    '1992-03-15'),
  (UUID_TO_BIN(UUID(),1), 'Carlos',  'Gómez',     '20.123.456-7', 'Valparaíso',      '+56 9 9123 0002', 'carlos.gomez@example.com', '1988-07-22'),
  (UUID_TO_BIN(UUID(),1), 'María',   'Rodríguez', '15.987.654-3', 'Concepción',      '+56 9 9123 0003', 'maria.rodriguez@example.com','1995-01-10');

-- Relaciones
INSERT INTO persona_empresa (persona_id, empresa_id, cargo, area, fecha_inicio, es_actual)
SELECT p.id, e.id, 'Desarrollador', 'TI', '2021-01-01', TRUE
FROM persona p, empresa e
WHERE p.nombre='Ana' AND e.nombre='Acme S.A.' LIMIT 1;

INSERT INTO persona_empresa (persona_id, empresa_id, cargo, area, fecha_inicio, es_actual)
SELECT p.id, e.id, 'Analista QA', 'Calidad', '2022-05-01', TRUE
FROM persona p, empresa e
WHERE p.nombre='Carlos' AND e.nombre='Tech Chile Ltda' LIMIT 1;

INSERT INTO persona_empresa (persona_id, empresa_id, cargo, area, fecha_inicio, fecha_fin, es_actual)
SELECT p.id, e.id, 'Operador Logístico', 'Operaciones', '2020-03-01', '2023-12-31', FALSE
FROM persona p, empresa e
WHERE p.nombre='María' AND e.nombre='Logística Sur' LIMIT 1;
