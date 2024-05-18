create database municipios;

create table barrios(
    idBarrio BIGINT not null AUTO_INCREMENT,
    nombre varchar(150) not null,
    constraint pk_barrios primary key (idBarrio)
);

create table vecinos(
    documento varchar(20) not null,
    contrasenia varchar(20) null,
    nombre varchar(150) not null,
    apellido varchar(150) not null,
    mail varchar(50),
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
    contrasenia varchar(20) not null,
    clave_acceso varchar(20) not null,
    tipoUsuario varchar(20) not null,
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
     idDesperfecto BIGINT null,
     descripcion varchar(1000) null,
     estado varchar(30),
     IdReclamoUnificado int null,
     constraint pk_reclamos primary key (idReclamo),
     constraint fk_reclamos_vecinos foreign key (documentoVecino) references vecinos(documento),
     constraint fk_reclamos_personal foreign key (legajo) references personal(legajo),
     constraint fk_reclamos_sitios foreign key (idSitio) references sitios(idSitio),
     constraint fk_reclamos_desperfectos foreign key (idDesperfecto) references desperfectos(idDesperfecto)
);

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
    idDenuncias BIGINT not null AUTO_INCREMENT,
    documentoVecino varchar(20) not null,
    idSitio BIGINT not null,
    descripcion varchar(1000) not null,
    estado varchar(150),
    aceptaResponsabilidad int,
    constraint pk_denuncias primary key (idDenuncias),
    constraint fk_denuncias_vecinos foreign key (documentoVecino) references vecinos(documento),
    constraint fk_denuncias_sitios foreign key (idSitio) references sitios(idSitio)
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
    rubro BIGINT,
    descripcion varchar(1000) not null,
    constraint pk_servicio primary key(idServicio),
    constraint fk_servicio_vecino foreign key (documentoVecino) references vecinos(documento),
    constraint fk_servicio_rubro foreign key (rubro) references rubros(idRubro)
);

create table imagenes(
     idImagen BIGINT not null AUTO_INCREMENT primary key,
     datosImagen blob not null
)

INSERT personal (nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES (N'RAMIRO', N'RODRIGUEZ', N'DNI30012288', N'Areas Verdes', 3, CAST(N'2018-08-19T00:00:00.000' AS DateTime));

SET SESSION sql_mode='NO_AUTO_VALUE_ON_ZERO';
INSERT personal (legajo, nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES ('2', N'JAVIER', N'ESPINOZA', N'DNI30616697', N'Escuelas', 2, CAST(N'2016-08-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES ('3', N'JOSE', N'OLIVERA', N'DNI30667193', N'Museos', 7, CAST(N'2015-02-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES ('4', N'MARCELO', N'DIAZ', N'DNI30669003', N'Bacheo y Demarcacion', 8, CAST(N'2020-07-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento , sector, categoria, fechaIngreso) VALUES ('5', N'PABLO', N'BLANCO', N'DNI30702760', N'Bacheo y Demarcacion', 6, CAST(N'2019-07-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento , sector, categoria, fechaIngreso) VALUES ('6', N'PABLO', N'CRUZ', N'DNI30724804', N'Plazas y Parques', 4, CAST(N'2020-12-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento , sector, categoria, fechaIngreso) VALUES ('7', N'CRISTIAN', N'MEDINA', N'DNI30732736', N'Semaforos y Señalectica', 6, CAST(N'2019-05-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento , sector, categoria, fechaIngreso) VALUES ('8', N'JORGE GUSTAVO', N'OLAS', N'DNI30745281', N'Edificios Publicos y Oficinas', 4, CAST(N'2019-11-19T00:00:00.000' AS DateTime));
INSERT personal (legajo, nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES ('9', N'ADRIAN', N'BEGUET', N'DNI30780521', N'Seguridad', 7, CAST(N'2020-05-19T00:00:00.000' AS DateTime));

select * from personal;
select * from reclamos





