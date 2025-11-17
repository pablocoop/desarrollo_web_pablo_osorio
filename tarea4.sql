
--   CREACIÓN DE BASE DE DATOS TAREA 4

-- 1. Crear la base de datos nueva
CREATE DATABASE tarea4
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

-- 2. Seleccionar la base de datos
USE tarea4;

--   TABLA: aviso_adopcion
CREATE TABLE aviso_adopcion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_ingreso DATETIME NOT NULL,
    sector VARCHAR(100),
    cantidad INT NOT NULL,
    tipo VARCHAR(20) NOT NULL,   
    edad INT NOT NULL,          
    comuna VARCHAR(255)          
);

--   TABLA: nota
CREATE TABLE IF NOT EXISTS `tarea4`.`nota` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `aviso_id` INT NOT NULL,
  `nota` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_nota_aviso1_idx` (`aviso_id` ASC),
  CONSTRAINT `fk_nota_aviso1`
    FOREIGN KEY (`aviso_id`)
    REFERENCES `tarea4`.`aviso_adopcion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;

--   INSERTS DE PRUEBA 
INSERT INTO aviso_adopcion (fecha_ingreso, sector, cantidad, tipo, edad, comuna)
VALUES
    (NOW(), 'Gral. Urrutia #398', 2, 'perro', 3, 'Pucón'),
    (NOW(), 'Segunda Faja, Río Baker #1556 ', 1, 'gato', 1, 'Villarrica'),
    (NOW(), 'Porto Seguro #355', 4, 'perro', 2, 'Estación Central'),
    (NOW(), 'Camilo Henríquez #404', 1, 'perro', 4, 'Villarrica');

-- Notas de ejemplo
INSERT INTO nota (aviso_id, nota) VALUES
    (1, 5),
    (1, 7),
    (2, 5),
    (3, 4),
    (3, 5);
