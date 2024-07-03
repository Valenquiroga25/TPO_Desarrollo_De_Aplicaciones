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
    datosImagen blob not null,
    idServicio BIGINT not null,
    constraint pk_imagen primary key(idImagen),
    constraint fk_imagen_servicio foreign key (idServicio) references servicios(idServicio)
)

create table imagenesReclamos(
    idImagen BIGINT not null AUTO_INCREMENT,
    datosImagen blob not null,
    idReclamo BIGINT not null,
    constraint pk_imagen primary key(idImagen),
    constraint fk_imagen_reclamo foreign key (idReclamo) references reclamos(idReclamo)
)

create table imagenesDenuncias(
    idImagen BIGINT not null AUTO_INCREMENT,
    datosImagen blob not null,
    idDenuncia BIGINT not null,
    constraint pk_imagen primary key(idImagen),
    constraint fk_imagen_denuncia foreign key (idDenuncia) references denuncias(idDenuncia)
)

INSERT personal (nombre, apellido, documento, sector, categoria, fechaIngreso) VALUES (N'RAMIRO', N'RODRIGUEZ', N'DNI30012288', N'Areas Verdes', 3, CAST(N'2018-08-19T00:00:00.000' AS DateTime));

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

select * from vecinos;
select * from personal;
select * from usuarios;
select * from reclamos
select * from denuncias
select * from servicios;
select * from rubros
select * from imagenesServicios
select * from imagenesReclamos
select * from imagenesDenuncias
select * from sitios
select * from desperfectos

truncate table desperfectos
drop table reclamos

insert into usuarios(identificador, contrasenia, mail, clave_acceso, tipoUsuario)
values ("2", "$2a$12$7IfyW0OGtJo7O2WQnBNi7.euDsXAc.Ng207kkAwMwLgZHDRjKtvD2", "valenquiroga67@gmail.com", "-", "Inspector")

delete from servicios where idServicio = 3
delete from imagenes where idServicio = 3

use municipios

delete from usuarios where identificador = '10'
drop table servicios
delete from usuarios where identificador='44367389'