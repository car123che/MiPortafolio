CREATE DATABASE IF NOT EXISTS Portafolio;
USE Portafolio;

CREATE TABLE IF NOT EXISTS Proyecto(
    id_proyecto int not null primary key auto_increment, 
    nombre_proyecto varchar(100) not null,
    descripcion_proyecto varchar(300) not null,
    link_repositorio varchar(500) not null,
    imagen varchar(1000),
    link_deploy varchar(500)
);

CREATE TABLE IF NOT EXISTS Conocimiento(
    id_conocimiento int not null primary key auto_increment,
    nombre_conocimiento varchar(100) not null,
    descripcion_conocimiento varchar(100)  not null,
    imagen varchar(1000)
);