CREATE DATABASE municipios

create table barrios(
	idBarrio int not null identity,
	nombre varchar(150) not null,
	constraint pk_barrios primary key (idBarrio),
)

create table vecinos(
	documento varchar(20) not null,
	nombre varchar(150) not null,
	apellido varchar(150) not null,
	direccion varchar(250) null, 
	codigoBarrio int null
	constraint pk_vecinos primary key (documento),
	constraint fk_vecinos_barrios foreign key (codigoBarrio) references barrios
)

create table personal(
	legajo int not null identity,
	nombre varchar(150) not null,
	apellido varchar(150) not null,
	documento varchar(20) not null,
	password varchar(40) not null,
	sector varchar(200) not null,
	categoria int,  --Los inspectores son categoria 8
	fechaIngreso datetime,
	constraint pk_personal primary key (legajo)
)

create table sitios(
	idSitio int not null identity,
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
)

create table rubros(
	idRubro int not null identity,
	descripcion varchar(200) not null,
	constraint pk_rubros primary key (idRubro),
)

create table desperfectos(
	idDesperfecto int not null identity,
	descripcion varchar(200) not null,
	idRubro int null,
	constraint pk_desperfectos primary key (idDesperfecto)
)

create table reclamos(
	idReclamo int not null identity,
	documento varchar(20) not null,
	idSitio int not null,
	idDesperfecto int null,
	descripcion varchar(1000) null,
	estado varchar(30),
	IdReclamoUnificado int null
	constraint pk_reclamos primary key (idReclamo),
	constraint fk_reclamos_vecinos foreign key (documento) references vecinos,
	constraint fk_reclamos_sitios foreign key (idSitio) references sitios,
	constraint fk_reclamos_desperfectos foreign key (idDesperfecto) references sitios,
	constraint fk_reclamos_reclamos foreign key (IdReclamoUnificado) references reclamos,
)

create table movimientosReclamo(
	idMovimiento int not null identity,
	idReclamo int not null,
	responsable varchar(150) not null,
	causa varchar(1000) not null,
	fecha datetime default getDate(),
	constraint pk_movimientosReclamo primary key (idMovimiento),
	constraint fk_movimientosReclamo_reclamos foreign key (idReclamo) references reclamos	
)

create table denuncias(
	idDenuncias int not null identity,
	documento varchar(20) not null,
	idSitio int null,
	descripcion varchar(2000) null,
	estado varchar(150),
	aceptaResponsabilidad int not null,
	constraint pk_denuncias primary key (idDenuncias),
	constraint fk_denuncias_vecinos foreign key (documento) references vecinos,
	constraint fk_denuncias_sitios foreign key (idSitio) references sitios
)

create table movimientosDenuncia(
	idMovimiento int not null identity,
	idDenuncia int not null,
	responsable varchar(150) not null,
	causa varchar(4000) not null,
	fecha datetime default getDate(),
	constraint pk_movimientosDenuncia primary key (idMovimiento),
	constraint fk_movimientosDenuncia_denuncias foreign key (idDenuncia) references denuncias	
)

/*PERSONAL*/
INSERT personal ([nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (N'RAMIRO', N'RODRIGUEZ', N'DNI30012288', N'password', N'Areas Verdes', 3, CAST(N'2018-08-19T00:00:00.000' AS DateTime))
GO
SET IDENTITY_INSERT personal ON 

INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (1, N'RAMIRO', N'RODRIGUEZ', N'DNI30012288', N'password', N'Areas Verdes', 3, CAST(N'2018-08-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (2, N'JAVIER', N'ESPINOZA', N'DNI30616697', N'password', N'Escuelas', 2, CAST(N'2016-08-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (3, N'JOSE', N'OLIVERA', N'DNI30667193', N'password', N'Museos', 7, CAST(N'2015-02-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (4, N'MARCELO', N'DIAZ', N'DNI30669003', N'password', N'Bacheo y Demarcacion', 8, CAST(N'2020-07-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (5, N'PABLO', N'BLANCO', N'DNI30702760', N'password', N'Bacheo y Demarcacion', 6, CAST(N'2019-07-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (6, N'PABLO', N'CRUZ', N'DNI30724804', N'password', N'Plazas y Parques', 4, CAST(N'2020-12-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (7, N'CRISTIAN', N'MEDINA', N'DNI30732736', N'password', N'Semaforos y Señalectica', 6, CAST(N'2019-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (8, N'JORGE GUSTAVO', N'OLAS', N'DNI30745281', N'password', N'Edificios Publicos y Oficinas', 4, CAST(N'2019-11-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (9, N'ADRIAN', N'BEGUET', N'DNI30780521', N'password', N'Seguridad', 7, CAST(N'2020-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (10, N'MAURICIO', N'ROMERO', N'DNI30800519', N'password', N'Semaforos y Señalectica', 5, CAST(N'2017-10-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (11, N'PABLO', N'BARRIL', N'DNI30816148', N'password', N'Escuelas', 9, CAST(N'2018-11-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (12, N'SERGIO', N'BAIGORRIA', N'DNI30819573', N'password', N'Museos', 6, CAST(N'2016-09-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (13, N'FACUNDO', N'GUTIERREZ', N'DNI30866787', N'password', N'Seguridad', 1, CAST(N'2017-12-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (14, N'MATIAS', N'GARCIA', N'DNI30868883', N'password', N'Escuelas', 9, CAST(N'2018-09-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (15, N'DANIEL', N'HERRERA', N'DNI30885642', N'password', N'Semaforos y Señalectica', 9, CAST(N'2015-11-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (16, N'JESUS', N'DIAZ', N'DNI30888538', N'password', N'Plazas y Parques', 8, CAST(N'2017-03-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (17, N'GABRIEL', N'PETAGNA', N'DNI30912099', N'password', N'Edificios Publicos y ', 2, CAST(N'2019-04-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (18, N'MARTIN', N'PURCHEL', N'DNI30944156', N'password', N'Escuelas', 7, CAST(N'2014-11-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (19, N'ALFREDO', N'RODRIGUEZ', N'DNI30952992', N'password', N'Semaforos y Señalectica', 4, CAST(N'2021-06-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (20, N'ARTURO', N'MUÑOZ', N'DNI30980277', N'password', N'Museos', 2, CAST(N'2014-11-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (21, N'SEBASTIAN', N'FERNANDEZ', N'DNI31032143', N'password', N'Bacheo y Demarcacion', 4, CAST(N'2015-02-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (22, N'LEONARDO', N'GONZALEZ', N'DNI31070616', N'password', N'Bacheo y Demarcacion', 6, CAST(N'2015-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (23, N'MAXIMILIANO', N'ALBORNOZ', N'DNI31079668', N'password', N'Plazas y Parques', 1, CAST(N'2021-10-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (24, N'MARIO', N'CASTRO', N'DNI31079744', N'password', N'Bacheo y Demarcacion', 9, CAST(N'2020-08-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (25, N'MARIANO', N'MOGARTE', N'DNI31156237', N'password', N'Escuelas', 7, CAST(N'2019-04-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (26, N'RUBEN', N'IMASAKA', N'DNI31177539', N'password', N'Museos', 5, CAST(N'2018-09-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (27, N'DIEGO', N'BARRIOS', N'DNI31189490', N'password', N'Semaforos y Señalectica', 5, CAST(N'2015-07-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (28, N'JUAN', N'CANALES', N'DNI31239205', N'password', N'Escuelas', 1, CAST(N'2019-09-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (29, N'VICTOR', N'ZARATE', N'DNI31244038', N'password', N'Plazas y Parques', 9, CAST(N'2021-09-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (30, N'LEANDRO', N'SANCHEZ', N'DNI31253023', N'password', N'Seguridad', 5, CAST(N'2014-08-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (31, N'NICOLAS', N'GEREZ', N'DNI31262291', N'password', N'Areas Verdes', 8, CAST(N'2014-06-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (32, N'MATIAS', N'DI BELLO', N'DNI31282335', N'password', N'Edificios Publicos y Oficinas', 9, CAST(N'2014-07-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (33, N'NESTOR', N'SUELDO', N'DNI31283679', N'password', N'Escuelas', 2, CAST(N'2018-11-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (34, N'PABLO', N'GIGLIO', N'DNI31293173', N'password', N'Semaforos y Señalectica', 7, CAST(N'2017-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (35, N'LUCAS', N'VENERE', N'DNI31293846', N'password', N'Museos', 8, CAST(N'2017-01-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (36, N'PABLO', N'MORETTI', N'DNI31297900', N'password', N'Seguridad', 8, CAST(N'2021-03-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (37, N'MARIO', N'SANTILLAN', N'DNI31325403', N'password', N'Edificios Publicos y Oficinas', 2, CAST(N'2019-10-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (38, N'FEDERICO', N'NAVARRO', N'DNI31362192', N'password', N'Plazas y Parques', 1, CAST(N'2015-09-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (39, N'PABLO', N'AGUADA', N'DNI31362419', N'password', N'Semaforos y Señalectica', 3, CAST(N'2016-10-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (40, N'NESTOR', N'MAGUNA', N'DNI31374667', N'password', N'Escuelas', 8, CAST(N'2015-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (41, N'RUBEN', N'ALBORNOZ', N'DNI31443543', N'password', N'Areas Verdes', 5, CAST(N'2019-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (42, N'MATIAS', N'SALINAS', N'DNI31444272', N'password', N'Areas Verdes', 7, CAST(N'2019-09-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (43, N'WALTER', N'LOPEZ', N'DNI31470110', N'password', N'Escuelas', 7, CAST(N'2015-11-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (44, N'CRISTIAN', N'CHAPARRO', N'DNI31531124', N'password', N'Seguridad', 2, CAST(N'2015-06-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (45, N'DARIO', N'ROLANDO', N'DNI31617553', N'password', N'Escuelas', 8, CAST(N'2015-10-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (46, N'ARIEL', N'PICCHI', N'DNI31617728', N'password', N'Seguridad', 3, CAST(N'2021-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (47, N'FEDERICO', N'FARFAN', N'DNI31650048', N'password', N'Escuelas', 7, CAST(N'2014-09-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (48, N'CARLOS', N'SEGADE', N'DNI31658901', N'password', N'Edificios Publicos y Oficinas', 8, CAST(N'2020-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (49, N'CRISTIAN', N'MOREIRA', N'DNI31681421', N'password', N'Semaforos y Señalectica', 8, CAST(N'2019-08-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (50, N'JUAN', N'RODRIGUEZ', N'DNI31684432', N'password', N'Seguridad', 4, CAST(N'2014-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (51, N'JORGE', N'CALIVA', N'DNI31687570', N'password', N'Plazas y Parques', 6, CAST(N'2017-01-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (52, N'SEBASTIAN', N'GONZALEZ', N'DNI31727399', N'password', N'Plazas y Parques', 6, CAST(N'2022-01-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (53, N'JULIAN', N'PEREYRA', N'DNI31727824', N'password', N'Seguridad', 3, CAST(N'2016-08-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (54, N'IVAN', N'CANO', N'DNI31731313', N'password', N'Edificios Publicos y Oficinas', 6, CAST(N'2018-07-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (55, N'MAURICIO', N'CARUSO', N'DNI31740027', N'password', N'Escuelas', 1, CAST(N'2015-07-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (56, N'ESTEBAN', N'MEDINA', N'DNI31740346', N'password', N'Escuelas', 2, CAST(N'2020-08-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (57, N'FEDERICO', N'POLANCO', N'DNI31750377', N'password', N'Edificios Publicos y Oficinas', 7, CAST(N'2020-01-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (58, N'SEBASTIAN', N'GALAN', N'DNI31761910', N'password', N'Bacheo y Demarcacion', 9, CAST(N'2020-04-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (59, N'CRISTIAN', N'GATTO', N'DNI31763069', N'password', N'Bacheo y Demarcacion', 2, CAST(N'2021-12-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (60, N'LEANDRO', N'VAÑOS', N'DNI31764083', N'password', N'Bacheo y Demarcacion', 8, CAST(N'2015-06-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (61, N'GABRIEL', N'BENITEZ', N'DNI31772732', N'password', N'Semaforos y Señalectica', 5, CAST(N'2019-12-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (62, N'EMANUEL', N'OSTOISCH', N'DNI31774039', N'password', N'Semaforos y Señalectica', 8, CAST(N'2017-09-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (63, N'PABLO', N'BARRIONUEVO', N'DNI31781455', N'password', N'Bacheo y Demarcacion', 7, CAST(N'2015-07-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (64, N'DANIEL', N'PIZARRO', N'DNI31781643', N'password', N'Edificios Publicos y Oficinas', 4, CAST(N'2019-11-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (65, N'DAMIAN', N'RODRIGUEZ', N'DNI31797782', N'password', N'Seguridad', 6, CAST(N'2020-12-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (66, N'GABRIEL', N'TORRES', N'DNI31797902', N'password', N'Plazas y Parques', 1, CAST(N'2017-10-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (67, N'WALTER', N'MARTINEZ', N'DNI31827019', N'password', N'Semaforos y Señalectica', 7, CAST(N'2015-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (68, N'ANTONIO', N'CARDOZO', N'DNI31876635', N'password', N'Edificios Publicos y Oficinas', 3, CAST(N'2016-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (69, N'SEBASTIAN', N'OCAMPO', N'DNI31895478', N'password', N'Escuelas', 2, CAST(N'2019-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (70, N'MATIAS', N'PINCINI', N'DNI31899200', N'password', N'Edificios Publicos y Oficinas', 4, CAST(N'2018-05-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (71, N'MIGUEL', N'NOVIELLI', N'DNI31899211', N'password', N'Semaforos y Señalectica', 2, CAST(N'2018-08-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (72, N'ARIEL', N'CARUSO', N'DNI31899301', N'password', N'Bacheo y Demarcacion', 5, CAST(N'2015-07-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (73, N'CRISTIAN', N'GONZALEZ', N'DNI31916459', N'password', N'Bacheo y Demarcacion', 3, CAST(N'2014-11-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (74, N'LUCAS', N'GENOVESE', N'DNI31953929', N'password', N'Areas Verdes', 4, CAST(N'2017-09-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (75, N'MANUEL', N'FLEITAS', N'DNI31978771', N'password', N'Edificios Publicos y Oficinas', 8, CAST(N'2014-03-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (76, N'ARIEL', N'FERREIRA', N'DNI32063815', N'password', N'Plazas y Parques', 5, CAST(N'2014-02-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (77, N'LUIS MIGUEL', N'ROMERO', N'DNI32427681', N'password', N'Escuelas', 4, CAST(N'2018-08-19T00:00:00.000' AS DateTime))
INSERT personal ([legajo], [nombre], [apellido], [documento], [password], [sector], [categoria], [fechaIngreso]) VALUES (78, N'EDGAR', N'GARCETE', N'DNI92920447', N'password', N'Edificios Publicos y Oficinas', 5, CAST(N'2020-05-19T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT personal OFF
GO

/*VECINOS*/

INSERT vecinos([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28000046', N'Lagos', N'Andres  Leopoldo', N'1 Roth Terrace', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28000075', N'Rodriguez', N'Oscar  Alberto', N'37409 Lillian Place', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28000185', N'Ibañez', N'Raul  Alberto', N'1523 Del Mar Park', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28000388', N'Ruiz diaz', N'Roberto  Carlos', N'8399 Charing Cross Junction', 2)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28000429', N'Ramirez', N'Julio  Oscar', N'6443 Badeau Plaza', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28000793', N'Moreyra', N'Leandro  Omar', N'1704 Ludington Lane', 7)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28001270', N'Sanchez', N'Daniel  Esteban', N'285 Spohn Street', 7)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28001275', N'Gimenez', N'Dario  Osvaldo', N'34364 Artisan Road', 9)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28001586', N'Barraza', N'Milton  Silvestre', N'53 Ilene Place', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28002032', N'Gaitan', N'Adrian  Maximiliano', N'71 Mockingbird Hill', 8)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28002509', N'Alegre', N'Gustavo  Fabian', N'7 Dapin Junction', 7)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28002514', N'Visconti', N'Omar  Federico', N'0266 Orin Parkway', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28002569', N'Alderete', N'Emilio  Alberto', N'3035 Calypso Place', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28003227', N'Carcamo', N'Anibal  David', N'6 Glendale Junction', 7)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28003899', N'Baigorria', N'Carlos  David', N'5 Norway Maple Point', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28003939', N'Perez', N'Pablo  Abel', N'77082 Bayside Alley', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28004289', N'Ponce', N'Carlos  Rodrigo', N'3 Hoepker Trail', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28004647', N'Sandoval', N'Carlos  Reinaldo', N'40 Hoffman Circle', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28005063', N'Vargas', N'Eduardo  Daniel', N'644 Kim Circle', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28005358', N'Guajardo', N'Raul  Eduardo', N'0887 Village Green Parkway', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28005394', N'Tinto gimenez', N'Fernando  ', N'7 Fisk Plaza', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28005556', N'Mercado', N'Marcelo  Alberto', N'8874 Meadow Ridge Trail', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28005826', N'Paez', N'Rodolfo  Javier', N'5771 Rutledge Junction', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28006119', N'Gonzalez', N'Jorge  Fernando', N'18158 Del Sol Pass', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28006364', N'Romero', N'Alberto  Orlando', N'38 Schmedeman Way', 2)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28006406', N'Cardozo', N'Hugo  Oscar', N'879 Village Green Circle', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28006433', N'Guzman', N'Sergio  Ariel', N'530 Myrtle Center', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28006802', N'Ortiz', N'Alberto  Ramon', N'596 Delladonna Pass', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28007461', N'Robledo', N'Cesar  Gustavo', N'2 Bartillon Point', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28008019', N'Aap', N'Marcos  Daniel', N'3 Sunnyside Place', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28008072', N'Quiroga', N'Daniel  Alberto', N'3 Memorial Alley', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28008210', N'Cardenas', N'Eduardo  Javier', N'6 Walton Court', 8)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28008346', N'Acosta', N'Daniel  Maximiliano', N'4337 Grasskamp Terrace', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28008428', N'Sauza', N'Diego  Ezequiel', N'2 Oxford Alley', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28008513', N'Ojeda alvarado', N'Victor  Hugo', N'0 Graceland Park', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28008566', N'Manfredotti lanzares', N'Carlos  Cesar gabriel', N'9 Sage Parkway', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28008862', N'Contreras vargas', N'Mauricio  Alejandro', N'1 Kings Parkway', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28008984', N'Almonacid', N'Bruno  Daniel', N'8111 Fulton Park', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28009010', N'Guerrero', N'Claudio  Andres', N'0 Butternut Trail', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28009028', N'Santana', N'Fernando  ', N'44202 Mcbride Road', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28009124', N'Ruiz', N'Richard  Sergio', N'02033 Old Shore Pass', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28009146', N'Torres', N'Jose  David', N'294 Orin Point', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28012893', N'Forlin', N'Gustavo  Alejandro', N'7 Brown Street', 1)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28012898', N'Ramos', N'Pedro  David', N'05337 Superior Parkway', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28015938', N'Fernandez', N'Marcelo', N'94867 Westerfield Park', 8)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28017031', N'Benitez', N'Claudio  Marcelo', N'110 Kim Lane', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28017127', N'Prada', N'Cristian  Luis', N'4327 Birchwood Crossing', 9)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28017149', N'Ibarra', N'Norberto  Nicolas', N'2 Sloan Circle', 2)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28017496', N'Felipelli', N'German  Andres', N'31085 Westport Drive', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28018274', N'Samaniego', N'Roberto  Carlos', N'687 Springview Junction', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28018279', N'Sanchez', N'Alcides  Gabriel', N'8 Linden Court', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28018385', N'Benitez', N'Diego  Rafael', N'423 Eggendart Parkway', 7)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28018590', N'Miño', N'Miguel  Alcides', N'773 Thierer Court', 7)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28018726', N'Esteche', N'Carlos  Martin', N'972 Hazelcrest Circle', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28020780', N'Acosta', N'Ruarte  ', N'58966 Farragut Junction', 9)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28021317', N'Gonzalo', N'Gustavo  Javier', N'518 Texas Road', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28022201', N'Accinelli', N'Sergio  Abel', N'35243 Russell Parkway', 9)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28023942', N'Cabrera', N'Nazareno  Ezequiel', N'082 Toban Alley', 1)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28024423', N'Chacon', N'Julio  Cesar', N'8552 Vermont Alley', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28024903', N'Orellano', N'Gerardo  Roque Del Lujan', N'835 Butternut Junction', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28029303', N'Gomez', N'Leonardo  Luis', N'0 Sloan Center', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28036981', N'Nardelli', N'Bruno  Jose', N'8 Truax Park', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28040111', N'Velazquez', N'Julio  Gabriel', N'075 Hanover Junction', 9)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28040333', N'Flores', N'Raul  Alejandro', N'390 Mcbride Pass', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28040344', N'Gallardo', N'Jorge  Horacio', N'1 Elka Way', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28040386', N'Sosa', N'Nestor  Gabriel', N'7601 Walton Alley', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28040420', N'Escudero', N'Seferino  Daniel', N'85325 Calypso Trail', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28040596', N'Gonzalez vargas', N'Dario  ', N'816 Farragut Place', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28041258', N'Luque', N'Gustavo  Daniel', N'6 Hudson Avenue', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28041259', N'Soto', N'Sergio  Gabriel', N'69885 Bunker Hill Terrace', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28044215', N'Rivero', N'Hugo  Horacio', N'93 Dayton Trail', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28045079', N'Guzman', N'Carlos  Ivan', N'9305 Bluejay Alley', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047014', N'Gimenez', N'Javier  Emilio', N'956 Bartelt Park', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047078', N'Peichoto', N'Jorge  Ariel', N'81 Autumn Leaf Terrace', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047084', N'Villalba', N'Ruben  Dario', N'5 Katie Crossing', 2)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047158', N'Escobar', N'Leandro  Dario', N'979 Melody Alley', 5)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047198', N'Chamorro', N'Ricardo  Javier dionel', N'32 Express Center', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047255', N'Acuña', N'Diego  Fernando', N'592 Mariners Cove Point', 7)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047316', N'Franco', N'Antonio  Ariel', N'8 Jenna Parkway', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047376', N'Leyes', N'Paulo  Luis', N'2461 Anniversary Court', 7)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047453', N'Cajal', N'Leonardo', N'6 Stephen Place', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047594', N'Mereles', N'Mario', N'1 Autumn Leaf Point', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047638', N'Acevedo', N'Oscar  Norberto', N'00 Mayfield Drive', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047641', N'Saavedra', N'Ruben  Marcelo', N'66 Kim Avenue', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047710', N'Sotelo', N'Luis  Humberto', N'325 Muir Terrace', 7)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047781', N'Coronel', N'Juan  Elvio', N'25 American Place', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047784', N'Gonzalez', N'Esteban  Ariel', N'4073 Stephen Terrace', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047855', N'Mambrin', N'Jorge  Ramon', N'07147 Old Shore Parkway', 2)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047861', N'Gutierrez', N'Juan  Esteban', N'4 Spohn Pass', 2)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047865', N'Barrios', N'Alfredo  Miguel', N'76 Ridge Oak Crossing', 3)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28047891', N'Leguizamon', N'Rodolfo  Aldo', N'020 Bay Alley', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28048091', N'Gomez dodda', N'Carlos  Ruben', N'412 International Pass', 8)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28048093', N'Zacarias', N'Roberto  Daniel', N'67 Hallows Terrace', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28048171', N'Quiroz', N'Edgardo  Javier', N'259 Canary Crossing', 7)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28048270', N'Ramos', N'Fernando  Ezequiel', N'0185 Crest Line Street', 2)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28048356', N'Fernandez', N'Enrique', N'5230 Di Loreto Point', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28048408', N'Delgado', N'Emilio  Andres', N'90 Columbus Street', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28048498', N'Romero', N'Sergio  David', N'6911 Harper Road', 6)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28048552', N'Coronel', N'Javier  Nazareno', N'532 Veith Alley', 4)
INSERT vecinos ([documento], [nombre], [apellido], [direccion], [codigoBarrio]) VALUES (N'DNI28048741', N'Bimas', N'Gustavo  Enrique', N'9 Reinke Lane', 6)
GO