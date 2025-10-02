SET FOREIGN_KEY_CHECKS=0;

-- Empresas
INSERT INTO empresa (id, nombre, rut, direccion, celular, email, fecha_creacion, actualizacion) VALUES
(UUID_TO_BIN('11f09f01-2d49-5af6-a28f-d1aff7cc170c',1),'Acme S.A.','76.543.210-0','Av. Empresa 123, Santiago','+56 2 2222 1111','contacto@acme.com','2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f01-2d49-7aa4-a28f-d1aff7cc170c',1),'Tech Chile Ltda','99.123.456-7','Calle Innovación 45, Valpo','+56 2 2222 2222','soporte@techchile.com','2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f01-2d49-7c48-a28f-d1aff7cc170c',1),'Logística Sur','77.987.654-3','Bodega Central 7, Concepción','+56 2 2222 3333','info@logisticasur.com','2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f1f-3ee2-e160-81ac-682ca2a761f0',1),'TechNova Ltda','78.456.123-5','Las Condes','+56 2 2444 4444','contacto@technova.cl','2025-10-01 23:34:59','2025-10-01 23:34:59'),
(UUID_TO_BIN('11f09f1f-3ee3-f532-81ac-682ca2a761f0',1),'InnovaCorp SpA','79.654.321-8','Ñuñoa','+56 2 2555 5555','info@innovacorp.cl','2025-10-01 23:34:59','2025-10-01 23:34:59');

-- Personas
INSERT INTO persona (id, nombre, apellidos, rut, direccion, celular, email, fecha_nacimiento, fecha_creacion, actualizacion) VALUES
(UUID_TO_BIN('11f09f01-2d49-967e-a28f-d1aff7cc170c',1),'Carlos','Gómez','20.123.456-7','Valparaíso','+56 9 9123 0002','carlos.gomez@example.com','1988-07-22','2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f01-2d49-9714-a28f-d1aff7cc170c',1),'María','Rodríguez','15.987.654-3','Concepción','+56 9 9123 0003','maria.rodriguez@example.com','1995-01-10','2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f08-d709-7b28-a28f-d1aff7cc170c',1),'Ana','Pérez','12.345.678-9','Providencia','+56 9 5555 5555','ana.perez@example.com','1992-03-15','2025-10-01 20:54:36','2025-10-01 20:54:36');

-- Persona ↔ Empresa
INSERT INTO persona_empresa (id, persona_id, empresa_id, cargo, area, fecha_inicio, fecha_fin, es_actual, fecha_creacion, actualizacion) VALUES
(UUID_TO_BIN('11f09f01-2d49-c478-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-967e-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-7aa4-a28f-d1aff7cc170c',1),'Analista QA','Calidad','2022-05-01',NULL,1,'2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f01-2d49-cde2-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-9714-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-7c48-a28f-d1aff7cc170c',1),'Operador Logístico','Operaciones','2020-03-01','2023-12-31',0,'2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f1f-3ee5-0350-81ac-682ca2a761f0',1),UUID_TO_BIN('11f09f08-d709-7b28-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f1f-3ee2-e160-81ac-682ca2a761f0',1),'Ingeniera Senior','Desarrollo','2024-06-01',NULL,1,'2025-10-01 23:34:59','2025-10-01 23:34:59'),
(UUID_TO_BIN('11f09f1f-3ee6-3720-81ac-682ca2a761f0',1),UUID_TO_BIN('11f09f08-d709-7b28-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f1f-3ee3-f532-81ac-682ca2a761f0',1),'Analista de Sistemas','TI','2021-01-01','2023-12-31',0,'2025-10-01 23:34:59','2025-10-01 23:34:59');

SET FOREIGN_KEY_CHECKS=1;
