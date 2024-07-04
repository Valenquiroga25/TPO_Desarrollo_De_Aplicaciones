create database municipios;
drop database municipios;

create table barrios(
    idBarrio BIGINT not null AUTO_INCREMENT,
    nombre varchar(150) not null,
    constraint pk_barrios primary key (idBarrio)
);

create table vecinos(
    documento varchar(20) not null,
    nombre varchar(150) not null,
    apellido varchar(150) not null,
    direccion varchar(250) null,
    codigoBarrio BIGINT null,
    constraint pk_vecinos primary key (documento),
    constraint fk_vecinos_barrios foreign key (codigoBarrio) references barrios(idBarrio)
);

create table personal(
    legajo varchar(20) not null,
    nombre varchar(150) not null,
    apellido varchar(150) not null,
    documento varchar(20) not null,
    sector varchar(200) not null,
    categoria int,
    fechaIngreso datetime,
    constraint pk_personal primary key (legajo)
);

create table usuarios(
    identificador varchar(20) not null,
    contrasenia varchar(100) null,
    mail varchar(50),
    clave_acceso varchar(20),
    tipoUsuario varchar(20),
    constraint pk_usuario primary key (identificador)
)

create table sitios(
    idSitio BIGINT not null AUTO_INCREMENT,
    latitud decimal(9,5),
    longitud decimal(9,5),
    calle varchar(150) null,
    numero int,
    entreCalleA varchar(150) null,
    entreCalleB varchar(150) null,
    descripcion varchar(300),
    aCargoDe varchar(200),
    apertura time,
    cierre time,
    comentarios text,
    constraint pk_sitios primary key (idSitio)
);

create table rubros(
    idRubro BIGINT not null AUTO_INCREMENT,
    descripcion varchar(200) not null,
    constraint pk_rubros primary key (idRubro)
);

create table desperfectos(
    idDesperfecto BIGINT not null AUTO_INCREMENT,
    descripcion varchar(200) not null,
    idRubro int null,
    constraint pk_desperfectos primary key (idDesperfecto)
);

create table reclamos(
    idReclamo BIGINT not null AUTO_INCREMENT,
    documentoVecino varchar(20),
    legajo varchar(20),
    idSitio BIGINT not null,
    idDesperfecto BIGINT,
    descripcion varchar(1000),
    estado varchar(30),
    IdReclamoUnificado int,
    constraint pk_reclamos primary key (idReclamo),
    constraint fk_reclamos_vecinos foreign key (documentoVecino) references vecinos(documento),
    constraint fk_reclamos_personal foreign key (legajo) references personal(legajo),
    constraint fk_reclamos_sitios foreign key (idSitio) references sitios(idSitio),
    constraint fk_reclamos_desperfectos foreign key (idDesperfecto) references desperfectos(idDesperfecto)
);

create table reclamosUnificados(
	idReclamoUnificado BIGINT not null AUTO_INCREMENT,
    idSitio BIGINT not null,
    idDesperfecto BIGINT not null,
	estado varchar(30),
	constraint pk_reclamosUnificados primary key (idReclamoUnificado),
    constraint fk_reclamosUnificados_sitios foreign key (idSitio) references sitios(idSitio),
    constraint fk_reclamosUnificados_desperfectos foreign key (idDesperfecto) references desperfectos(idDesperfecto)
)

create table movimientosReclamo(
    idMovimiento BIGINT not null AUTO_INCREMENT,
    idReclamo BIGINT not null,
    responsable varchar(150) not null,
    causa varchar(1000) not null,
    fecha datetime default current_timestamp(),
    constraint pk_movimientosReclamo primary key (idMovimiento),
    constraint fk_movimientosReclamo_reclamos foreign key (idReclamo) references reclamos(idReclamo)
);

create table denuncias(
    idDenuncia BIGINT not null AUTO_INCREMENT,
    vecino varchar(20) not null,
    sitio BIGINT not null,
    descripcion varchar(1000) not null,
    estado varchar(150),
    aceptaResponsabilidad int,
    constraint pk_denuncias primary key (idDenuncia),
    constraint fk_denuncias_vecinos foreign key (vecino) references vecinos(documento),
    constraint fk_denuncias_sitios foreign key (sitio) references sitios(idSitio)
);

create table movimientosDenuncia(
    idMovimiento BIGINT not null AUTO_INCREMENT,
    idDenuncia BIGINT not null,
    responsable varchar(150) not null,
    causa varchar(1000) not null,
    fecha datetime default current_timestamp(),
    constraint pk_movimientosDenuncia primary key (idMovimiento),
    constraint fk_movimientosDenuncia_denuncias foreign key (idDenuncia) references denuncias(idDenuncias)
);

create table servicios(
    idServicio BIGINT not null AUTO_INCREMENT,
    documentoVecino varchar(20) not null,
    titulo varchar(100) not null,
    direccion varchar(100) not null,
    telefono varchar(100) not null,
    descripcion varchar(1000) not null,
    rubro BIGINT,
    tipoServicio varchar(100) not null,
    constraint pk_servicio primary key(idServicio),
    constraint fk_servicio_vecino foreign key (documentoVecino) references vecinos(documento),
    constraint fk_servicio_rubro foreign key (rubro) references rubros(idRubro)
);

create table imagenesServicios(
    idImagen BIGINT not null AUTO_INCREMENT,
    datosImagen longblob not null,
    idServicio BIGINT not null,
    constraint pk_imagen primary key(idImagen),
    constraint fk_imagen_servicio foreign key (idServicio) references servicios(idServicio)
)

create table imagenesReclamos(
    idImagen BIGINT not null AUTO_INCREMENT,
    datosImagen longblob not null,
    idReclamo BIGINT not null,
    constraint pk_imagen primary key(idImagen),
    constraint fk_imagen_reclamo foreign key (idReclamo) references reclamos(idReclamo)
)
drop table imagenesReclamos
truncate table reclamos
create table imagenesDenuncias(
    idImagen BIGINT not null AUTO_INCREMENT,
    datosImagen longblob not null,
    idDenuncia BIGINT not null,
    constraint pk_imagen primary key(idImagen),
    constraint fk_imagen_denuncia foreign key (idDenuncia) references denuncias(idDenuncia)
)

INSERT personal (nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES (N'RAMIRO', N'RODRIGUEZ', N'DNI30012288', N'Areas Verdes', 3, CAST(N'2018-08-19T00:00:00.000' AS DateTime));

INSERT INTO barrios (nombre) VALUES 
('Agronomía'),
('Almagro'),
('Balvanera'),
('Barracas'),
('Belgrano'),
('Boedo'),
('Caballito'),
('Chacarita'),
('Coghlan'),
('Colegiales'),
('Constitución'),
('Flores'),
('Floresta'),
('La Boca'),
('La Paternal'),
('Liniers'),
('Mataderos'),
('Monserrat'),
('Monte Castro'),
('Nueva Pompeya'),
('Núñez'),
('Parque Avellaneda'),
('Parque Chacabuco'),
('Parque Chas'),
('Parque Patricios'),
('Puerto Madero'),
('Recoleta'),
('Retiro'),
('Saavedra'),
('San Cristóbal'),
('San Nicolás'),
('San Telmo'),
('Vélez Sársfield'),
('Versalles'),
('Villa Crespo'),
('Villa del Parque'),
('Villa Devoto'),
('Villa Gral. Mitre'),
('Villa Lugano'),
('Villa Luro'),
('Villa Ortúzar'),
('Villa Pueyrredón'),
('Villa Real'),
('Villa Riachuelo'),
('Villa Santa Rita'),
('Villa Soldati'),
('Villa Urquiza');

INSERT INTO sitios (latitud, longitud, calle, numero, entreCalleA, entreCalleB, descripcion, aCargoDe, apertura, cierre, comentarios) VALUES
(-34.603722, -58.381592, 'Las Heras', 3744, 'Ugarteche', 'Scalabrini Ortiz', 'Peatonal comercial', 'Juan Gómez', '10:00:00', '18:00:00', 'Zona de tiendas y cafés.'),
(-34.615277, -58.377778, 'Perú', 120, 'Chile', 'Venezuela', 'Edificio gubernamental', 'Laura Rodríguez', '09:00:00', '19:00:00', 'Edificio histórico de Buenos Aires.'),
(-32.950000, -60.633333, 'San Luis', 150, 'San Juan', 'San Martín', 'Centro comercial de Rosario', 'Ana Torres', '08:30:00', '19:00:00', 'Calle principal de Rosario.'),
(-34.610818, -58.417260, 'Uspallata', 140, 'Larrea', 'Anchordoqui', 'Hospital de Clínicas', 'Luis Fernández', '07:00:00', '21:00:00', 'Hospital de referencia en Buenos Aires.'),
(-34.603722, -58.371482, 'Tucumán', 180, 'Lavalle', 'Corrientes', 'Teatro Colón', 'María González', '09:00:00', '22:00:00', 'Famoso teatro de Buenos Aires.'),
(-31.420083, -64.188743, '27 de Abril', 500, 'Pueyrredón', 'Olmos', 'Costanera de Córdoba', 'Pedro Sánchez', '08:00:00', '20:00:00', 'Zona de paseo y esparcimiento.'),
(-34.614209, -58.377476, 'Juncal', 150, 'Arroyo', 'Posadas', 'Avenida de los Museos', 'Martín Díaz', '10:00:00', '18:00:00', 'Zona de museos y galerías de arte.'),
(-36.616667, -60.666667, 'Buenos Aires', 800, 'San Juan', 'Mitre', 'Plaza San Martín', 'Claudia Ramírez', '09:00:00', '17:00:00', 'Plaza histórica de la ciudad.'),
(-30.633333, -60.716667, 'Rioja', 160, 'Tucumán', 'Santa Fe', 'Centro Cívico de Santa Fe', 'Ricardo López', '08:00:00', '19:00:00', 'Centro administrativo de Santa Fe.'),
(-34.595932, -58.443318, 'Acoyte', 320, 'Rivadavia', 'Yatay', 'Parque Centenario', 'Sofía Martínez', '06:00:00', '22:00:00', 'Parque popular de Buenos Aires.');

SET SESSION sql_mode='NO_AUTO_VALUE_ON_ZERO';
INSERT personal (legajo, nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES ("2", N'JAVIER', N'ESPINOZA', N'DNI30616697', N'Escuelas', 2, CAST(N'2016-08-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES ("3", N'JOSE', N'OLIVERA', N'DNI30667193', N'Museos', 7, CAST(N'2015-02-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES ("4", N'MARCELO', N'DIAZ', N'DNI30669003', N'Bacheo y Demarcacion', 8, CAST(N'2020-07-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento , sector, categoria, fechaIngreso) VALUES ("5", N'PABLO', N'BLANCO', N'DNI30702760', N'Bacheo y Demarcacion', 6, CAST(N'2019-07-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento , sector, categoria, fechaIngreso) VALUES ("6", N'PABLO', N'CRUZ', N'DNI30724804', N'Plazas y Parques', 4, CAST(N'2020-12-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento , sector, categoria, fechaIngreso) VALUES ("7", N'CRISTIAN', N'MEDINA', N'DNI30732736', N'Semaforos y Señalectica', 6, CAST(N'2019-05-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento , sector, categoria, fechaIngreso) VALUES ("8", N'JORGE GUSTAVO', N'OLAS', N'DNI30745281', N'Edificios Publicos y Oficinas', 4, CAST(N'2019-11-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES ("10", N'PEPE', N'SANZ', N'DNI30780522', N'Seguridad', 7, CAST(N'2020-05-19T00:00:00.000' AS DateTime));

INSERT INTO rubros (descripcion) VALUES ('Agua'), ('Electricidad'), ('Alcantarillado'), ('Internet'), ('Semáforos'), ('Carreteras'), ('Calefacción'), ('Transformadores eléctricos'), ('Vidrios y ventanas'), ('Presión de agua'), ('Jardineria'), ('Plomeria'), ('Informatica'), ('Farmacia'), ('Consultorio medico'), ('Comercio indumentaria'), ('Joyeria'), ('Banco');
INSERT INTO desperfectos (descripcion, idRubro) VALUES ('Agua', 1);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ('Energía', 2);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ('Alcantarillado', 3);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ('Internet', 4);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ('Semáforos/Tráfico', 5);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ('Carreteras', 6);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ('Calefacción', 7);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ('Electricidad', 8);
INSERT INTO desperfectos (descripcion, idRubro) VALUES ('Edificios/Infraestructura', 9);

INSERT INTO `vecinos` (`documento`, `nombre`, `apellido`, `direccion`, `codigoBarrio`) VALUES
('28000046', 'Lagos', 'Andres  Leopoldo', '1 Roth Terrace', 4),
('28000075', 'Rodriguez', 'Oscar  Alberto', '37409 Lillian Place', 5),
('28000185', 'Ibañez', 'Raul  Alberto', '1523 Del Mar Park', 3),
('28000388', 'Ruiz diaz', 'Roberto  Carlos', '8399 Charing Cross Junction', 2),
('28000429', 'Ramirez', 'Julio  Oscar', '6443 Badeau Plaza', 6),
('28000793', 'Moreyra', 'Leandro  Omar', '1704 Ludington Lane', 7),
('28001270', 'Sanchez', 'Daniel  Esteban', '285 Spohn Street', 7),
('28001275', 'Gimenez', 'Dario  Osvaldo', '34364 Artisan Road', 9),
('28001586', 'Barraza', 'Milton  Silvestre', '53 Ilene Place', 5),
('28002032', 'Gaitan', 'Adrian  Maximiliano', '71 Mockingbird Hill', 8),
('28002509', 'Alegre', 'Gustavo  Fabian', '7 Dapin Junction', 7),
('28002514', 'Visconti', 'Omar  Federico', '0266 Orin Parkway', 5),
('28002569', 'Alderete', 'Emilio  Alberto', '3035 Calypso Place', 3),
('28003227', 'Carcamo', 'Anibal  David', '6 Glendale Junction', 7),
('28003899', 'Baigorria', 'Carlos  David', '5 Norway Maple Point', 3),
('28003939', 'Perez', 'Pablo  Abel', '77082 Bayside Alley', 6),
('28004289', 'Ponce', 'Carlos  Rodrigo', '3 Hoepker Trail', 6),
('28004647', 'Sandoval', 'Carlos  Reinaldo', '40 Hoffman Circle', 4),
('28005063', 'Vargas', 'Eduardo  Daniel', '644 Kim Circle', 4),
('28005358', 'Guajardo', 'Raul  Eduardo', '0887 Village Green Parkway', 4),
('28005394', 'Tinto gimenez', 'Fernando', '7 Fisk Plaza', 4),
('28005556', 'Mercado', 'Marcelo  Alberto', '8874 Meadow Ridge Trail', 3),
('28005826', 'Paez', 'Rodolfo  Javier', '5771 Rutledge Junction', 3),
('28006119', 'Gonzalez', 'Jorge  Fernando', '18158 Del Sol Pass', 4),
('28006364', 'Romero', 'Alberto  Orlando', '38 Schmedeman Way', 2),
('28006406', 'Cardozo', 'Hugo  Oscar', '879 Village Green Circle', 4),
('28006433', 'Guzman', 'Sergio  Ariel', '530 Myrtle Center', 6),
('28006802', 'Ortiz', 'Alberto  Ramon', '596 Delladonna Pass', 4),
('28007461', 'Robledo', 'Cesar  Gustavo', '2 Bartillon Point', 4),
('28008019', 'Aap', 'Marcos  Daniel', '3 Sunnyside Place', 5),
('28008072', 'Quiroga', 'Daniel  Alberto', '3 Memorial Alley', 4),
('28008210', 'Cardenas', 'Eduardo  Javier', '6 Walton Court', 8),
('28008346', 'Acosta', 'Daniel  Maximiliano', '4337 Grasskamp Terrace', 3),
('28008428', 'Sauza', 'Diego  Ezequiel', '2 Oxford Alley', 6),
('28008513', 'Ojeda alvarado', 'Victor  Hugo', '0 Graceland Park', 4),
('28008566', 'Manfredotti lanzares', 'Carlos  Cesar gabriel', '9 Sage Parkway', 6),
('28008862', 'Contreras vargas', 'Mauricio  Alejandro', '1 Kings Parkway', 4),
('28008984', 'Almonacid', 'Bruno  Daniel', '8111 Fulton Park', 5),
('28009010', 'Guerrero', 'Claudio  Andres', '0 Butternut Trail', 6),
('28009028', 'Santana', 'Fernando', '44202 Mcbride Road', 4),
('28009124', 'Ruiz', 'Richard  Sergio', '02033 Old Shore Pass', 4),
('28009146', 'Torres', 'Jose  David', '294 Orin Point', 3),
('28012893', 'Forlin', 'Gustavo  Alejandro', '7 Brown Street', 1),
('28012898', 'Ramos', 'Pedro  David', '05337 Superior Parkway', 6),
('28015938', 'Fernandez', 'Marcelo', '94867 Westerfield Park', 8),
('28017031', 'Benitez', 'Claudio  Marcelo', '110 Kim Lane', 5),
('28017127', 'Prada', 'Cristian  Luis', '4327 Birchwood Crossing', 9),
('28017149', 'Ibarra', 'Norberto  Nicolas', '2 Sloan Circle', 2),
('28017496', 'Felipelli', 'German  Andres', '31085 Westport Drive', 6),
('28018274', 'Samaniego', 'Roberto  Carlos', '687 Springview Junction', 5),
('28018279', 'Sanchez', 'Alcides  Gabriel', '8 Linden Court', 5),
('28018385', 'Benitez', 'Diego  Rafael', '423 Eggendart Parkway', 7),
('28018590', 'Miño', 'Miguel  Alcides', '773 Thierer Court', 7),
('28018726', 'Esteche', 'Carlos  Martin', '972 Hazelcrest Circle', 3),
('28020780', 'Acosta', 'Ruarte', '58966 Farragut Junction', 9),
('28021317', 'Gonzalo', 'Gustavo  Javier', '518 Texas Road', 5),
('28022201', 'Accinelli', 'Sergio  Abel', '35243 Russell Parkway', 9),
('28023942', 'Cabrera', 'Nazareno  Ezequiel', '082 Toban Alley', 1),
('28024423', 'Chacon', 'Julio  Cesar', '8552 Vermont Alley', 5),
('28024903', 'Orellano', 'Gerardo  Roque Del Lujan', '835 Butternut Junction', 4),
('28029303', 'Gomez', 'Leonardo  Luis', '0 Sloan Center', 4),
('28036981', 'Nardelli', 'Bruno  Jose', '8 Truax Park', 6),
('28040111', 'Velazquez', 'Julio  Gabriel', '075 Hanover Junction', 9),
('28040333', 'Flores', 'Raul  Alejandro', '390 Mcbride Pass', 4),
('28040344', 'Gallardo', 'Jorge  Horacio', '1 Elka Way', 4),
('28040386', 'Sosa', 'Nestor  Gabriel', '7601 Walton Alley', 3)

select * from vecinos;
select * from personal;
select * from usuarios;
select * from reclamos
select * from reclamosUnificados

select * from denuncias
select * from servicios;
select * from rubros
select * from imagenesServicios
select * from imagenesReclamos
select * from imagenesDenuncias
select * from sitios
select * from desperfectos
select * from barrios

drop table imagenesDenuncias

insert into usuarios(identificador, contrasenia, mail, clave_acceso, tipoUsuario)
values ("2", "$2a$12$7IfyW0OGtJo7O2WQnBNi7.euDsXAc.Ng207kkAwMwLgZHDRjKtvD2", "valenquiroga67@gmail.com", "-", "Inspector")

delete from servicios where idServicio = 3
delete from imagenes where idServicio = 3

use municipios

delete from usuarios where identificador = '10'
drop table servicios
delete from usuarios where identificador='44367389'