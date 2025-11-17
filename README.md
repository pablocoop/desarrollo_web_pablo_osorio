# Tarea 4 – Desarrollo de Aplicaciones Web  
**Pablo Osorio Navarro – Sección 2**

---

# Descripción General

Esta aplicación web fue desarrollada en **Spring Boot**, utilizando **Thymeleaf** como motor de plantillas y **MySQL** como base de datos.  
El propósito es implementar una interfaz que permita:

1. **Listar todos los avisos de adopción**
2. **Mostrar el promedio de notas asignadas a cada uno**
3. **Registrar nuevas notas vía AJAX (sin recargar la página)**

La estructura del proyecto sigue el patrón MVC usado el curso:

- **Controller:** manejo de rutas y vistas  
- **Service:** lógica de negocio (cálculo de promedios)  
- **Repository:** acceso a la base de datos  
- **Templates Thymeleaf:** vistas HTML dinámicas  


# Estructura del Proyecto

src/main/java/com/petadopt/Tarea4/
├── controllers/
│ ├── AppController.java
│ └── NotaRestController.java
├── services/
│ └── AppService.java
├── models/
│ ├── AvisoAdopcion.java
│ ├── AvisoAdopcionRepository.java
│ ├── Nota.java
│ ├── NotaRepository.java
│ └── NotaRequest.java
└── Tarea4Application.java

src/main/resources/
├── templates/
│ ├── index.html
│ └── evaluaciones.html 
└── static/
├── css/style.css
└── js/app.js


---

# Base de Datos utilizada

Aunque el enunciado entregaba un archivo `tabla-notas.sql` basado en la base de datos **tarea2**, en esta tarea **solo se requieren dos tablas simples**:

- `aviso_adopcion`
- `nota` (relacionada a `aviso_adopcion` mediante FK)

Para simplificar la implementación y evitar arrastrar la complejidad de Tarea 2, se decidió:

> **Crear una nueva base de datos llamada `tarea4`**,  
> **basada en la estructura mínima necesaria para esta tarea.**

Esto permite cumplir el enunciado de manera más limpia, ordenada y coherente.

---

# Script SQL utilizado (tarea4.sql)



```sql

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
```

# Decisiones de diseño

- Se creó una base de datos nueva (`tarea4`) para simplificar la estructura y evitar dependencias innecesarias.
