SET FOREIGN_KEY_CHECKS=0;

-- Empresas - 10 --
INSERT INTO empresa (id, nombre, rut, direccion, celular, email, fecha_creacion, actualizacion) VALUES
(UUID_TO_BIN('11f09f01-2d49-5af6-a28f-d1aff7cc170c',1),'Acme S.A.','76543210-0','Av. Empresa 123, Santiago','+56 2 2222 1111','contacto@acme.com','2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f01-2d49-7aa4-a28f-d1aff7cc170c',1),'Tech Chile Ltda','99123456-7','Calle Innovación 45, Valpo','+56 2 2222 2222','soporte@techchile.com','2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f01-2d49-7c48-a28f-d1aff7cc170c',1),'Logística Sur','77987654-3','Bodega Central 7, Concepción','+56 2 2222 3333','info@logisticasur.com','2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f1f-3ee2-e160-81ac-682ca2a761f0',1),'TechNova Ltda','78456123-5','Las Condes','+56 2 2444 4444','contacto@technova.cl','2025-10-01 23:34:59','2025-10-01 23:34:59'),
(UUID_TO_BIN('11f09f1f-3ee3-f532-81ac-682ca2a761f0',1),'InnovaCorp SpA','79654321-8','Ñuñoa','+56 2 2555 5555','info@innovacorp.cl','2025-10-01 23:34:59','2025-10-01 23:34:59'),
(UUID_TO_BIN('22a11111-aaaa-b001-81ac-682ca2a761f0',1),'DataWorks SpA','76432109-1','Santiago Centro','+56 2 2333 1111','contacto@dataworks.cl','2025-10-02 12:00:00','2025-10-02 12:00:00'),
(UUID_TO_BIN('22a11111-aaaa-b002-81ac-682ca2a761f0',1),'Andes Retail','80345678-2','Viña del Mar','+56 2 2333 2222','contacto@andesretail.cl','2025-10-02 12:00:00','2025-10-02 12:00:00'),
(UUID_TO_BIN('22a11111-aaaa-b003-81ac-682ca2a761f0',1),'Finanzas Patagónicas','82567890-3','Puerto Montt','+56 2 2333 3333','contacto@finpat.cl','2025-10-02 12:00:00','2025-10-02 12:00:00'),
(UUID_TO_BIN('22a11111-aaaa-b004-81ac-682ca2a761f0',1),'BioChile Labs','84561234-4','Concepción','+56 2 2333 4444','contacto@biochile.cl','2025-10-02 12:00:00','2025-10-02 12:00:00'),
(UUID_TO_BIN('22a11111-aaaa-b005-81ac-682ca2a761f0',1),'Transporte Norte','86789012-5','Antofagasta','+56 2 2333 5555','contacto@transnorte.cl','2025-10-02 12:00:00','2025-10-02 12:00:00');

-- Personas - 20 --
INSERT INTO persona (id, nombre, apellidos, rut, direccion, celular, email, fecha_nacimiento, fecha_creacion, actualizacion) VALUES
(UUID_TO_BIN('11f09f01-2d49-967e-a28f-d1aff7cc170c',1),'Carlos','Gómez','20123456-7','Valparaíso','+56 9 9123 0002','carlos.gomez@example.com','1988-07-22','2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f01-2d49-9714-a28f-d1aff7cc170c',1),'María','Rodríguez','15987654-3','Concepción','+56 9 9123 0003','maria.rodriguez@example.com','1995-01-10','2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f08-d709-7b28-a28f-d1aff7cc170c',1),'Ana','Pérez','12345678-9','Providencia','+56 9 5555 5555','ana.perez@example.com','1992-03-15','2025-10-01 20:54:36','2025-10-01 20:54:36'),
(UUID_TO_BIN('33b20000-0000-0001-a28f-d1aff7cc170c',1),'Javier','Muñoz','11111111-1','Santiago','+56 9 9000 0001','javier.munoz@example.com','1990-01-01','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-0002-a28f-d1aff7cc170c',1),'Camila','Vargas','11111111-2','Ñuñoa','+56 9 9000 0002','camila.vargas@example.com','1993-02-02','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-0003-a28f-d1aff7cc170c',1),'Diego','Paredes','11111111-3','La Florida','+56 9 9000 0003','diego.paredes@example.com','1989-03-03','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-0004-a28f-d1aff7cc170c',1),'Valentina','Soto','11111111-4','Las Condes','+56 9 9000 0004','valentina.soto@example.com','1996-04-04','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-0005-a28f-d1aff7cc170c',1),'Tomás','Araya','11111111-5','Santiago','+56 9 9000 0005','tomas.araya@example.com','1991-05-05','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-0006-a28f-d1aff7cc170c',1),'Sofía','Reyes','11111111-6','Providencia','+56 9 9000 0006','sofia.reyes@example.com','1994-06-06','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-0007-a28f-d1aff7cc170c',1),'Matías','Herrera','11111111-7','Maipú','+56 9 9000 0007','matias.herrera@example.com','1990-07-07','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-0008-a28f-d1aff7cc170c',1),'Fernanda','Rojas','11111111-8','Peñalolén','+56 9 9000 0008','fernanda.rojas@example.com','1997-08-08','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-0009-a28f-d1aff7cc170c',1),'Benjamín','Cortés','11111111-9','La Reina','+56 9 9000 0009','benjamin.cortes@example.com','1988-09-09','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-000a-a28f-d1aff7cc170c',1),'Isidora','Salas','11111112-0','Providencia','+56 9 9000 0010','isidora.salas@example.com','1993-10-10','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-000b-a28f-d1aff7cc170c',1),'Ricardo','Figueroa','11111112-1','Santiago','+56 9 9000 0011','ricardo.figueroa@example.com','1985-11-11','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-000c-a28f-d1aff7cc170c',1),'Paula','Navarro','11111112-2','Ñuñoa','+56 9 9000 0012','paula.navarro@example.com','1992-12-12','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-000d-a28f-d1aff7cc170c',1),'Cristóbal','Aliaga','11111112-3','Macul','+56 9 9000 0013','cristobal.aliaga@example.com','1991-01-13','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-000e-a28f-d1aff7cc170c',1),'Josefa','Morales','11111112-4','Pirque','+56 9 9000 0014','josefa.morales@example.com','1996-02-14','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-000f-a28f-d1aff7cc170c',1),'Felipe','Saavedra','11111112-5','La Florida','+56 9 9000 0015','felipe.saavedra@example.com','1990-03-15','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-0010-a28f-d1aff7cc170c',1),'Antonia','Orellana','11111112-6','Las Condes','+56 9 9000 0016','antonia.orellana@example.com','1998-04-16','2025-10-02 12:30:00','2025-10-02 12:30:00'),
(UUID_TO_BIN('33b20000-0000-0011-a28f-d1aff7cc170c',1),'Gonzalo','Pizarro','11111112-7','Santiago','+56 9 9000 0017','gonzalo.pizarro@example.com','1987-05-17','2025-10-02 12:30:00','2025-10-02 12:30:00');


-- Relaciones --
INSERT INTO persona_empresa (id, persona_id, empresa_id, cargo, area, fecha_inicio, fecha_fin, es_actual, fecha_creacion, actualizacion) VALUES
(UUID_TO_BIN('11f09f01-2d49-c478-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-967e-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-7aa4-a28f-d1aff7cc170c',1),'Analista QA','Calidad','2022-05-01',NULL,1,'2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f01-2d49-cde2-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-9714-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-7c48-a28f-d1aff7cc170c',1),'Operador Logístico','Operaciones','2020-03-01','2023-12-31',0,'2025-10-01 19:59:45','2025-10-01 19:59:45'),
(UUID_TO_BIN('11f09f1f-3ee5-0350-81ac-682ca2a761f0',1),UUID_TO_BIN('11f09f08-d709-7b28-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f1f-3ee2-e160-81ac-682ca2a761f0',1),'Ingeniera Senior','Desarrollo','2024-06-01',NULL,1,'2025-10-01 23:34:59','2025-10-01 23:34:59'),
(UUID_TO_BIN('11f09f1f-3ee6-3720-81ac-682ca2a761f0',1),UUID_TO_BIN('11f09f08-d709-7b28-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f1f-3ee3-f532-81ac-682ca2a761f0',1),'Analista de Sistemas','TI','2021-01-01','2023-12-31',0,'2025-10-01 23:34:59','2025-10-01 23:34:59'),
(UUID_TO_BIN('44c00000-0000-0001-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-967e-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-5af6-a28f-d1aff7cc170c',1),'Tester','QA','2020-01-01','2022-04-30',0,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0002-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-9714-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b002-81ac-682ca2a761f0',1),'Supervisora','Operaciones','2024-01-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0003-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0001-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b004-81ac-682ca2a761f0',1),'Químico','I+D','2021-02-01','2023-06-30',0,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0004-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0001-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f1f-3ee2-e160-81ac-682ca2a761f0',1),'Líder Técnico','Desarrollo','2023-07-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0005-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0002-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b001-81ac-682ca2a761f0',1),'Data Analyst','BI','2022-08-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0006-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0003-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-5af6-a28f-d1aff7cc170c',1),'Soporte','TI','2019-01-01','2021-12-31',0,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0007-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0003-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f1f-3ee3-f532-81ac-682ca2a761f0',1),'DevOps','Infraestructura','2022-01-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0008-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0004-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-7aa4-a28f-d1aff7cc170c',1),'QA Engineer','Calidad','2023-10-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0009-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0005-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-7aa4-a28f-d1aff7cc170c',1),'Soporte N2','TI','2021-01-01','2022-12-31',0,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-000a-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0005-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b003-81ac-682ca2a761f0',1),'Analista Financiero','Finanzas','2023-01-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-000b-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0006-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b001-81ac-682ca2a761f0',1),'Data Engineer','Datos','2024-02-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-000c-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0007-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b005-81ac-682ca2a761f0',1),'Planner','Operaciones','2022-09-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-000d-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0008-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-7c48-a28f-d1aff7cc170c',1),'Operaria','Operaciones','2020-05-01','2022-12-31',0,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-000e-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0008-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b002-81ac-682ca2a761f0',1),'Jefa de Sala','Retail','2023-01-15',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-000f-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0009-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-5af6-a28f-d1aff7cc170c',1),'Full Stack Dev','TI','2024-01-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0010-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-000a-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b004-81ac-682ca2a761f0',1),'Investigadora','I+D','2023-03-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0011-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-000b-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f1f-3ee3-f532-81ac-682ca2a761f0',1),'SysAdmin','TI','2019-01-01','2022-12-31',0,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0012-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-000b-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f1f-3ee2-e160-81ac-682ca2a761f0',1),'SRE','Plataforma','2023-01-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0013-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-000c-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f1f-3ee3-f532-81ac-682ca2a761f0',1),'UX Researcher','Producto','2024-05-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0014-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-000d-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-7aa4-a28f-d1aff7cc170c',1),'QA Lead','Calidad','2022-10-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0015-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-000e-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b002-81ac-682ca2a761f0',1),'Vendedora','Retail','2021-02-01','2023-01-14',0,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0016-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-000e-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b001-81ac-682ca2a761f0',1),'Data Steward','Datos','2023-02-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0017-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-000f-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b005-81ac-682ca2a761f0',1),'Jefe de Turno','Operaciones','2024-04-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0018-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0010-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b004-81ac-682ca2a761f0',1),'Bioinformática','I+D','2020-06-01','2022-12-31',0,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-0019-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0010-a28f-d1aff7cc170c',1),UUID_TO_BIN('11f09f01-2d49-5af6-a28f-d1aff7cc170c',1),'Data Scientist','TI','2023-01-01',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00'),
(UUID_TO_BIN('44c00000-0000-001a-a28f-d1aff7cc170c',1),UUID_TO_BIN('33b20000-0000-0011-a28f-d1aff7cc170c',1),UUID_TO_BIN('22a11111-aaaa-b003-81ac-682ca2a761f0',1),'Auditor','Finanzas','2024-01-15',NULL,1,'2025-10-02 12:40:00','2025-10-02 12:40:00');

SET FOREIGN_KEY_CHECKS=1;
