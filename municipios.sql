create database Municipios;

create table barrios(
	idBarrio int not null AUTO_INCREMENT,
	nombre varchar(150) not null,
	constraint pk_barrios primary key (idBarrio)
);

create table vecinos(
	documento varchar(20) not null,
	nombre varchar(150) not null,
	apellido varchar(150) not null,
	direccion varchar(250) null, 
	codigoBarrio int null,
	constraint pk_vecinos primary key (documento),
    constraint fk_vecinos_barrios foreign key (codigoBarrio) references barrios(idBarrio)
);

create table personal(
	legajo int not null AUTO_INCREMENT,
	nombre varchar(150) not null,
	apellido varchar(150) not null,
	documento varchar(20) not null,
	password varchar(40) not null,
	sector varchar(200) not null,
	categoria int,
	fechaIngreso datetime,
	constraint pk_personal primary key (legajo)
);

create table sitios(
	idSitio int not null AUTO_INCREMENT,
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
	idRubro int not null AUTO_INCREMENT,
	descripcion varchar(200) not null,
	constraint pk_rubros primary key (idRubro)
);

create table desperfectos(
	idDesperfecto int not null AUTO_INCREMENT,
	descripcion varchar(200) not null,
	idRubro int null,
	constraint pk_desperfectos primary key (idDesperfecto)
);

create table reclamos(
	idReclamo int not null AUTO_INCREMENT,
	documento varchar(20) not null,
	idSitio int not null,
	idDesperfecto int null,
	descripcion varchar(1000) null,
	estado varchar(30),
	IdReclamoUnificado int null,
	constraint pk_reclamos primary key (idReclamo),
	constraint fk_reclamos_vecinos foreign key (documento) references vecinos(documento),
	constraint fk_reclamos_sitios foreign key (idSitio) references sitios(idSitio),
	constraint fk_reclamos_desperfectos foreign key (idDesperfecto) references desperfectos(idDesperfecto)
);

create table movimientosReclamo(
	idMovimiento int not null AUTO_INCREMENT,
	idReclamo int not null,
	responsable varchar(150) not null,
	causa varchar(1000) not null,
	fecha datetime default current_timestamp(),
	constraint pk_movimientosReclamo primary key (idMovimiento),
	constraint fk_movimientosReclamo_reclamos foreign key (idReclamo) references reclamos(idReclamo)
);

create table denuncias(
	idDenuncias int not null AUTO_INCREMENT,
	documento varchar(20) not null,
	idSitio int null,
	descripcion varchar(2000) null,
	estado varchar(150),
	aceptaResponsabilidad int not null,
	constraint pk_denuncias primary key (idDenuncias),
	constraint fk_denuncias_vecinos foreign key (documento) references vecinos(documento),
	constraint fk_denuncias_sitios foreign key (idSitio) references sitios(idSitio)
);

create table movimientosDenuncia(
	idMovimiento int not null AUTO_INCREMENT,
	idDenuncia int not null,
	responsable varchar(150) not null,
	causa varchar(4000) not null,
	fecha datetime default current_timestamp(),
	constraint pk_movimientosDenuncia primary key (idMovimiento),
	constraint fk_movimientosDenuncia_denuncias foreign key (idDenuncia) references denuncias(idDenuncias)
);

INSERT personal (nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (N'RAMIRO', N'RODRIGUEZ', N'DNI30012288', N'password', N'Areas Verdes', 3, CAST(N'2018-08-19T00:00:00.000' AS DateTime));

SET SESSION sql_mode='NO_AUTO_VALUE_ON_ZERO';
INSERT personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (2, N'JAVIER', N'ESPINOZA', N'DNI30616697', N'password', N'Escuelas', 2, CAST(N'2016-08-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (3, N'JOSE', N'OLIVERA', N'DNI30667193', N'password', N'Museos', 7, CAST(N'2015-02-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (4, N'MARCELO', N'DIAZ', N'DNI30669003', N'password', N'Bacheo y Demarcacion', 8, CAST(N'2020-07-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (5, N'PABLO', N'BLANCO', N'DNI30702760', N'password', N'Bacheo y Demarcacion', 6, CAST(N'2019-07-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (6, N'PABLO', N'CRUZ', N'DNI30724804', N'password', N'Plazas y Parques', 4, CAST(N'2020-12-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (7, N'CRISTIAN', N'MEDINA', N'DNI30732736', N'password', N'Semaforos y Señalectica', 6, CAST(N'2019-05-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (8, N'JORGE GUSTAVO', N'OLAS', N'DNI30745281', N'password', N'Edificios Publicos y Oficinas', 4, CAST(N'2019-11-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, password, sector, categoria, fechaIngreso) VALUES (9, N'ADRIAN', N'BEGUET', N'DNI30780521', N'password', N'Seguridad', 7, CAST(N'2020-05-19T00:00:00.000' AS DateTime));

select * from personal;



