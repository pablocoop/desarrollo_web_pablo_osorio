import re
from datetime import datetime, timedelta


def validate_nombre(nombre: str) -> bool:
    return bool(nombre and 3 <= len(nombre.strip()) <= 200)

def validate_email(email: str) -> bool:
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(email and len(email) <= 100 and re.match(pattern, email))

def validate_telefono(tel: str) -> bool:
    if not tel:
        return True  # opcional
    return bool(re.match(r'^\+569\.\d{8}$', tel))

def validate_sector(sector: str) -> bool:
    return not sector or len(sector.strip()) <= 100

def validate_tipo(tipo: str) -> bool:
    return tipo in ['perro', 'gato']

def validate_cantidad(cantidad: str) -> bool:
    return cantidad.isdigit() and int(cantidad) >= 1

def validate_edad(edad: str) -> bool:
    return edad.isdigit() and int(edad) >= 1

def validate_unidad(unidad: str) -> bool:
    return unidad in ['a', 'm', 'años', 'meses']

def validate_fecha_entrega(fecha_str: str) -> bool:
    if not fecha_str:
        return False
    try:
        fecha = datetime.fromisoformat(fecha_str)
        return fecha > datetime.now() + timedelta(hours=3)
    except ValueError:
        return False

def validate_fotos(files) -> bool:
    return bool(files) and 1 <= len(files) <= 5 and all(f.filename for f in files)

def validate_region_comuna(region, comuna) -> bool:
    return bool(region and comuna)
def validate_comentario_form(data):
    errores = []
    nombre = data.get("nombre", "").strip()
    texto = data.get("texto", "").strip()
    aviso_id = data.get("aviso_id")

    if not (3 <= len(nombre) <= 80):
        errores.append("El nombre debe tener entre 3 y 80 caracteres.")
    if len(texto) < 5:
        errores.append("El comentario debe tener al menos 5 caracteres.")
    if not aviso_id:
        errores.append("Falta el ID del aviso asociado.")

    return len(errores) == 0, errores

# Validación global
def validate_aviso_form(data, files):
    errores = []

    if not validate_region_comuna(data.get('region'), data.get('comuna')):
        errores.append("Debe seleccionar región y comuna.")
    if not validate_sector(data.get('sector')):
        errores.append("Sector: máximo 100 caracteres.")
    if not validate_nombre(data.get('nombre')):
        errores.append("Nombre: mínimo 3, máximo 200 caracteres.")
    if not validate_email(data.get('email')):
        errores.append("Correo: formato inválido o largo mayor a 100.")
    if not validate_telefono(data.get('telefono')):
        errores.append("Teléfono: debe tener formato +569.12345678.")
    if not validate_tipo(data.get('especie')):
        errores.append("Tipo: obligatorio (perro o gato).")
    if not validate_cantidad(data.get('cantidad')):
        errores.append("Cantidad: mínimo 1.")
    if not validate_edad(data.get('edad')):
        errores.append("Edad: mínimo 1.")
    if not validate_unidad(data.get('unidad_edad')):
        errores.append("Unidad de edad: debe ser 'años' o 'meses'.")
    if not validate_fecha_entrega(data.get('fecha_entrega')):
        errores.append("Fecha de entrega: debe ser al menos 3 horas en el futuro.")
    if not validate_fotos(files):
        errores.append("Fotos: se requiere entre 1 y 5 imágenes válidas.")

    return len(errores) == 0, errores