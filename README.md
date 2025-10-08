# Tarea 2 - Desarrollo de Aplicaciones Web

Nombre: Pablo Osorio Navarro - Sección 2


# Desarrollo Tarea 2

Este repositorio contiene los archivos necesarios para la implementación de una aplicación web desarrollada con Flask que permite listar y mostrar detalles de publicaciones relacionadas con la adopción de mascotas. La aplicación utiliza SQLAlchemy como ORM para la gestión de la base de datos en MySQL, y Jinja2 como motor de plantillas para la renderización dinámica del contenido HTML.

Con respecto a decisiones de diseño y funcionalidades implementadas, no hay mucho que destacar, ya que se ha seguido fielmente el enunciado de la tarea. Sin embargo, se han realizado algunas mejoras menores en la estructura del código y en la organización de los archivos para facilitar su mantenimiento y comprensión. Por lo mismo es que el código de Javascript se encuentra dividido en 3 archivos distintos, cada uno con una función específica y escrito de manera modular.

## Configuración e importación de la base de datos tarea2

### Paso 1: Iniciar sesión en MySQL como usuario root
```bash
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -p
```
### Paso 2: Crear usuario cc5002 y otorgar permisos
```sql  
CREATE USER 'cc5002'@'localhost' IDENTIFIED BY 'programacionweb';
```
### Paso 3: Crear la base de datos con codificación UTF-8
```sql
CREATE DATABASE tarea2 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```
### Paso 4: Otorgar permisos al usuario cc5002 sobre la base de datos tarea2
```sql
GRANT ALL PRIVILEGES ON tarea2.* TO 'cc5002'@'localhost';
FLUSH PRIVILEGES;
```
### Paso 5: Salir de MySQL y volver a entrar con el nuevo usuario
```bash
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u cc5002 -p
``` 
### Paso 6: Seleccionar la base de datos tarea2
```sql
USE tarea2;
```
### Paso 7: Importar los archivos SQL con las tablas y datos necesarios
```sql
SOURCE C:\Users\pablo\OneDrive\Documentos\CC5002\desarrollo_web_pablo_osorio\tarea2.sql;

SOURCE C:\Users\pablo\OneDrive\Documentos\CC5002\desarrollo_web_pablo_osorio\region-comuna.sql;
```


## Importación correcta de la base de datos (UTF-8)

Para evitar errores de codificación como “Cha├▒aral” al importar las regiones y comunas, se debe asegurar que MySQL lea los archivos SQL en formato UTF-8.
El problema ocurre porque la consola de Windows usa la codificación cp850 por defecto, lo que altera los caracteres especiales (ñ, tildes) al importar.

Para ello se realizó lo siguiente:

1. Eliminar base anterior y crearla con codificación UTF-8:
```sql
DROP DATABASE IF EXISTS tarea2;
CREATE DATABASE tarea2 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```
2. Importar los archivos con codificación forzada UTF-8 desde CMD (no PowerShell):
```bash
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" --default-character-set=utf8mb4 -u cc5002 -p tarea2 < "C:\Users\pablo\OneDrive\Documentos\CC5002\desarrollo_web_pablo_osorio\tarea2.sql"

"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" --default-character-set=utf8mb4 -u cc5002 -p tarea2 < "C:\Users\pablo\OneDrive\Documentos\CC5002\desarrollo_web_pablo_osorio\region-comuna.sql"
```
De esta forma, MySQL interpreta correctamente los caracteres especiales y la importación se realiza sin errores de codificación.
