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

```
src/main/java/com/petadopt/Tarea4/ 
├── controllers/
│ ├── AppController.java
│ └── NotaRestController.java
├── services/
│ └── AppService.java
├── models/
│ ├── AvisoAdopcion.java
│ ├── AvisoAdopcionRepository.java
│ ├── Comuna.java
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
```

# Decisiones de diseño

A continuación se detallan las principales decisiones de diseño tomadas durante el desarrollo de esta tarea:

1. **Implementación de un modal interactivo para ingresar notas**

    El enunciado exige registrar notas mediante llamadas asíncronas (AJAX) al backend. Aunque una solución básica mediante `prompt()` habría sido suficiente, se optó por implementar una interfaz más clara y profesional:

    - Se creó un **modal personalizado** que aparece al presionar *"Evaluar"*.
    - El modal muestra **botones del 1 al 7**, permitiendo elegir la nota con un clic en lugar de escribirla manualmente.
    - La nota seleccionada se destaca en **verde**, mejorando la experiencia visual.
    - Al confirmar, la nota se envía mediante **fetch()** al backend y el promedio se actualiza dinámicamente sin recargar la página.

    Esta decisión mejora significativamente la usabilidad, evita errores de entrada y mantiene una interacción moderna sin agregar complejidad innecesaria al backend.

---

2. **Cálculo de promedios en el Service mediante un atributo `@Transient`**

    El promedio de notas no se almacena en la base de datos. En cambio:

    - Se calcula dinámicamente desde el **Service**, mediante una consulta agregada.
    - Se almacena temporalmente en un campo `@Transient` del modelo `AvisoAdopcion`.
    - La vista muestra **“–”** cuando no existen notas asociadas.

    Esto evita redundancia de datos, respeta la responsabilidad de cada capa del proyecto y mantiene el modelo limpio.

3. Simplificación del modelo `Comuna`
    - Se creó una entidad `Comuna` para representar las comunas en la base de datos.
    - La relación entre `AvisoAdopcion` y `Comuna` es de tipo **ManyToOne**.
    - Esto permite acceder fácilmente al nombre de la comuna desde el aviso, mejorando la claridad del código y la integridad referencial.
